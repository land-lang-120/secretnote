/* SecretNote — Settings Screen */

function SettingsScreen({ secrets, notebooks, plan, maxPages, onBack }) {
  var useState = React.useState;
  var [showLangs, setShowLangs] = useState(false);
  var [changingPin, setChanging] = useState(false);
  var [pinStep, setPinStep] = useState("old"); /* old → new → confirm */
  var [oldPin, setOldPin] = useState("");
  var [newPin, setNewPin] = useState("");
  var [confirmP, setConfirmP] = useState("");
  var [pinMsg, setPinMsg] = useState("");

  var activeSecrets = secrets.filter(function(s){return !s.torn && s.content && s.content.trim()});
  var totalChars = activeSecrets.reduce(function(a,s){ return a + charCount(s.content); },0);
  var currentLangObj = SN_LANGS.find(function(l){return l.code===_snLang}) || SN_LANGS[0];

  var changeLang = function(code){
    snSetLang(code);
    window.location.reload();
  };

  return React.createElement("div",null,
    /* Header */
    React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:24}},
      React.createElement("button",{onClick:onBack,style:{width:36,height:36,borderRadius:10,background:S.surface2,border:"1px solid "+S.line,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:S.sub}},Si.back),
      React.createElement("h2",{style:{fontFamily:"'Lora',serif",fontSize:22,fontWeight:700,color:S.title,margin:0}},sn("settings"))
    ),

    /* Stats card */
    React.createElement("div",{style:{background:S.surface,borderRadius:16,border:"1px solid "+S.line,padding:"20px 18px",marginBottom:20}},
      React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}},
        [{v:activeSecrets.length,l:sn("secretCount"),e:"📝"},{v:totalChars,l:sn("totalChars"),e:"✍️"},
         {v:(notebooks||[]).length,l:sn("notebookCount"),e:"📓"},
         {v:activeSecrets.length+" / "+(maxPages*((notebooks||[]).length||1)),l:sn("pagesUsed"),e:"📖"}
        ].map(function(st){
          return React.createElement("div",{key:st.l,style:{textAlign:"center",padding:"10px 0"}},
            React.createElement("p",{style:{fontSize:18,margin:"0 0 4px"}},st.e),
            React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:18,fontWeight:700,color:S.title,margin:"0 0 2px"}},st.v),
            React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:600,color:S.muted,margin:0}},st.l)
          );
        })
      )
    ),

    /* Plan badge */
    React.createElement("div",{style:{background:S.surface,borderRadius:16,border:"1px solid "+S.line,padding:"16px 18px",marginBottom:12,display:"flex",alignItems:"center",justifyContent:"space-between"}},
      React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
        React.createElement("span",{style:{fontSize:18}},plan==="basic"?"📖":"⭐"),
        React.createElement("div",null,
          React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:14,fontWeight:700,color:S.title,margin:0}},plan==="basic"?sn("planBasic"):plan==="monthly"?sn("planMonthly"):sn("planYearly")),
          React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted,margin:"2px 0 0"}},maxPages+" "+sn("pages")+" max")
        )
      ),
      plan==="basic" && React.createElement("button",{style:{
        padding:"7px 14px",borderRadius:8,background:S.white,color:S.bg,border:"none",
        fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:700,cursor:"pointer",
      }},sn("unlock"))
    ),

    /* Language selector */
    React.createElement("div",{style:{background:S.surface,borderRadius:16,border:"1px solid "+S.line,marginBottom:12,overflow:"hidden"}},
      React.createElement("button",{onClick:function(){setShowLangs(!showLangs)},style:{
        width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"16px 18px",background:"transparent",border:"none",cursor:"pointer",
      }},
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
          React.createElement("span",{style:{color:S.sub}},Si.globe),
          React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:14,fontWeight:600,color:S.title}},sn("language"))
        ),
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:6}},
          React.createElement("span",{style:{fontSize:18}},currentLangObj.flag),
          React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,color:S.sub}},currentLangObj.label),
          React.createElement("span",{style:{color:S.muted,transform:"rotate("+(showLangs?90:0)+"deg)",transition:"transform 0.2s"}},Si.chevR)
        )
      ),
      showLangs && React.createElement("div",{style:{padding:"0 14px 14px",maxHeight:300,overflowY:"auto"}},
        SN_LANGS.map(function(lang){
          var active = _snLang === lang.code;
          return React.createElement("button",{key:lang.code,onClick:function(){changeLang(lang.code)},style:{
            width:"100%",display:"flex",alignItems:"center",gap:10,padding:"10px 12px",
            background:active?S.accentSoft:"transparent",
            border:"1px solid "+(active?S.line2:"transparent"),
            borderRadius:10,marginBottom:4,cursor:"pointer",
          }},
            React.createElement("span",{style:{fontSize:18}},lang.flag),
            React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:active?700:500,color:active?S.title:S.sub,flex:1,textAlign:"left"}},lang.label),
            active && React.createElement("span",{style:{color:S.white}},Si.check)
          );
        })
      )
    ),

    /* Change PIN */
    React.createElement("div",{style:{background:S.surface,borderRadius:16,border:"1px solid "+S.line,marginBottom:12}},
      React.createElement("button",{onClick:function(){setChanging(!changingPin)},style:{
        width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"16px 18px",background:"transparent",border:"none",cursor:"pointer",
      }},
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
          React.createElement("span",{style:{color:S.sub}},Si.lock),
          React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:14,fontWeight:600,color:S.title}},sn("changePin"))
        ),
        React.createElement("span",{style:{color:S.muted}},Si.chevR)
      )
    ),

    /* Encrypted notice */
    React.createElement("div",{style:{display:"flex",gap:10,padding:"14px 16px",background:S.surface,borderRadius:14,border:"1px solid "+S.line,marginTop:20}},
      React.createElement("span",{style:{fontSize:18,flexShrink:0}},"🔒"),
      React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:12,fontWeight:500,color:S.muted,lineHeight:1.7,margin:0,fontStyle:"italic"}},
        sn("noOneCanSee")
      )
    ),

    /* Version */
    React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted,textAlign:"center",marginTop:24}},"SecretNote v1.0 · CloneX Studio")
  );
}
