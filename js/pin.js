/* SecretNote — PIN Lock Screen */

function PinScreen({ onUnlock }) {
  var useState = React.useState;
  var hasPin = !!(localStorage.getItem("sn_pin_hash") || localStorage.getItem("sn_pin"));
  var [mode, setMode] = useState(hasPin ? "enter" : "create");
  var [pin, setPin] = useState("");
  var [createdPin, setCreatedPin] = useState("");
  var [error, setError] = useState("");
  var [shake, setShake] = useState(false);
  var [transitioning, setTransitioning] = useState(false);

  var doShake = function(){ setShake(true); setTimeout(function(){setShake(false)},500); };

  /* Hash + persiste un nouveau PIN. Nettoie la clé legacy en clair. */
  var savePinHash = function(plainPin) {
    return snHashPin(plainPin).then(function(result){
      try {
        localStorage.setItem("sn_pin_hash", result.hashB64);
        localStorage.setItem("sn_pin_salt", result.saltB64);
        localStorage.removeItem("sn_pin");
      } catch (e) {
        console.error("[SecretNote] Failed to persist PIN hash", e);
      }
    });
  };

  /* Vérifie le PIN entré. Migre l'ancien format en clair à la première réussite. */
  var verifyPin = function(enteredPin) {
    var storedHash = localStorage.getItem("sn_pin_hash");
    var storedSalt = localStorage.getItem("sn_pin_salt");
    if (storedHash && storedSalt) {
      return snHashPin(enteredPin, storedSalt).then(function(result){
        return snConstantTimeEqual(result.hashB64, storedHash);
      });
    }
    /* Legacy fallback : sn_pin en clair (avant migration crypto). */
    var legacy = localStorage.getItem("sn_pin");
    if (legacy && enteredPin === legacy) {
      return savePinHash(enteredPin).then(function(){ return true; });
    }
    return Promise.resolve(false);
  };

  var handleDigit = function(d) {
    if (transitioning) return;
    setError("");

    if (mode === "create") {
      if (pin.length < PIN_LENGTH) {
        var np = pin + d;
        setPin(np);
        if (np.length === PIN_LENGTH) {
          setTransitioning(true);
          setTimeout(function(){
            setCreatedPin(np);
            setPin("");
            setMode("confirm");
            setTransitioning(false);
          }, 400);
        }
      }
    } else if (mode === "confirm") {
      if (pin.length < PIN_LENGTH) {
        var nc = pin + d;
        setPin(nc);
        if (nc.length === PIN_LENGTH) {
          setTransitioning(true);
          if (nc === createdPin) {
            savePinHash(createdPin).then(function(){
              setTimeout(onUnlock, 300);
            });
          } else {
            setError(sn("pinMismatch"));
            doShake();
            setTimeout(function(){
              setPin("");
              setCreatedPin("");
              setMode("create");
              setTransitioning(false);
            }, 800);
          }
        }
      }
    } else {
      /* enter mode */
      if (pin.length < PIN_LENGTH) {
        var ne = pin + d;
        setPin(ne);
        if (ne.length === PIN_LENGTH) {
          setTransitioning(true);
          verifyPin(ne).then(function(ok){
            if (ok) {
              setTimeout(onUnlock, 300);
            } else {
              setError(sn("wrongPin"));
              doShake();
              setTimeout(function(){
                setPin("");
                setTransitioning(false);
              }, 500);
            }
          });
        }
      }
    }
  };

  var handleDelete = function() {
    if (transitioning) return;
    setPin(pin.slice(0,-1));
    setError("");
  };

  var title = mode === "create" ? sn("createPin") : mode === "confirm" ? sn("confirmPin") : sn("enterPin");

  return React.createElement("div",{style:{
    position:"fixed",inset:0,zIndex:1000,
    background:S.bg,
    display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
    padding:24,
  }},
    /* Logo */
    React.createElement("div",{style:{marginBottom:28}},
      React.createElement(SnLogo,{size:80})
    ),
    React.createElement("h1",{style:{fontFamily:"'Lora',serif",fontSize:24,fontWeight:700,color:S.title,margin:"0 0 8px",textAlign:"center"}},"SecretNote"),
    React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,color:S.muted,margin:"0 0 36px",textAlign:"center"}},title),

    /* PIN dots */
    React.createElement("div",{style:{display:"flex",gap:16,marginBottom:16,animation:shake?"shakeX .4s ease":"none"}},
      Array.from({length:PIN_LENGTH}).map(function(_,i){
        var filled = i < pin.length;
        return React.createElement("div",{key:i,style:{
          width:18,height:18,borderRadius:"50%",
          background:filled?S.white:"transparent",
          border:"2px solid "+(filled?S.white:S.line2),
          transition:"all 0.15s",
          transform:filled?"scale(1.1)":"scale(1)",
        }});
      })
    ),

    /* Error */
    error && React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:600,color:S.danger,margin:"0 0 16px",height:20}},error),
    !error && React.createElement("div",{style:{height:36}}),

    /* Numpad */
    React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,maxWidth:280,width:"100%"}},
      [1,2,3,4,5,6,7,8,9,null,0,"del"].map(function(d,i){
        if (d === null) return React.createElement("div",{key:i});
        var isDel = d === "del";
        return React.createElement("button",{key:i,onClick:function(){ isDel ? handleDelete() : handleDigit(String(d)); },style:{
          width:"100%",aspectRatio:"1",borderRadius:16,
          background:isDel?"transparent":S.surface2,
          border:isDel?"none":"1px solid "+S.line,
          color:isDel?S.muted:S.title,
          fontFamily:isDel?"'Inter',sans-serif":"'Lora',serif",
          fontSize:isDel?14:26,fontWeight:isDel?600:700,
          cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
          transition:"all 0.1s",
          opacity:transitioning?0.5:1,
        }},isDel?"⌫":d);
      })
    ),

    /* Slogan */
    React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:12,fontWeight:500,color:S.muted,fontStyle:"italic",marginTop:32,textAlign:"center",maxWidth:260}},sn("slogan2"))
  );
}
