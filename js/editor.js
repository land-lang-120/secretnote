/* SecretNote — Page Editor (3000 chars, bookmarks, stickers, tear, auto-advance) */

function PageEditor({ secret, onSave, onBack, onTear, onToggleBookmark, onAddSticker, onRemoveSticker, pageNum, totalPages, notebookId, autoAdvance }) {
  var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;
  var [text, setText] = useState(secret ? secret.content : "");
  var [cat, setCat]   = useState(secret ? secret.category || "" : "");
  var [saved, setSaved] = useState(false);
  var [showCats, setShowCats] = useState(false);
  var [showStickers, setShowStickers] = useState(false);
  var [showTearConfirm, setShowTearConfirm] = useState(false);
  var textRef = useRef(null);
  var cc = charCount(text);
  var remaining = Math.max(0, CHARS_PER_PAGE - cc);
  var isFull = cc >= CHARS_PER_PAGE;
  var pct = Math.min(100, Math.round(cc / CHARS_PER_PAGE * 100));
  var isBookmarked = secret ? secret.bookmarked : false;
  var currentStickers = secret ? (secret.stickers || []) : [];

  /* Auto-save every 3 seconds */
  useEffect(function(){
    var timer = setTimeout(function(){
      if (text !== (secret ? secret.content : "")) {
        doSave(true);
      }
    }, 3000);
    return function(){ clearTimeout(timer); };
  },[text]);

  var doSave = function(silent){
    var data = {
      id: secret ? secret.id : Date.now(),
      notebookId: notebookId,
      page: pageNum,
      date: secret ? secret.date : snTodayStr(),
      time: new Date().toLocaleTimeString(snLocale(),{hour:"2-digit",minute:"2-digit"}),
      category: cat || null,
      content: text,
      sealed: true,
      bookmarked: isBookmarked,
      stickers: currentStickers,
      torn: false,
    };
    onSave(data);
    if (!silent) {
      setSaved(true);
      setTimeout(function(){setSaved(false)},1200);
    }
  };

  var handleManualSave = function(){
    doSave(false);
    /* Auto-advance: after explicit save, go to next page */
    if (autoAdvance && text.trim()) {
      setTimeout(function(){ autoAdvance(); }, 600);
    }
  };

  var handleTextChange = function(e){
    var newText = e.target.value;
    if (charCount(newText) <= CHARS_PER_PAGE + 20) {
      setText(newText);
    }
  };

  var handleTear = function(){
    setShowTearConfirm(false);
    if (secret && onTear) {
      onTear(secret.id);
    }
  };

  return React.createElement("div",{style:{minHeight:"100vh",background:S.bg,padding:"0 0 40px"}},
    /* Top bar */
    React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px 12px",position:"sticky",top:0,zIndex:50,background:S.bg}},
      React.createElement("button",{onClick:function(){ if(text.trim()) doSave(true); onBack(); },style:{width:36,height:36,borderRadius:10,background:S.surface2,border:"1px solid "+S.line,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:S.sub}},Si.back),
      React.createElement("div",{style:{display:"flex",alignItems:"center",gap:6}},
        React.createElement("span",{style:{fontFamily:"'Lora',serif",fontSize:14,fontWeight:700,color:S.title}},sn("page")+" "+pageNum),
        React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,color:S.muted}},"·"),
        React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:isFull?S.gold:S.muted}},cc+" / "+CHARS_PER_PAGE)
      ),
      React.createElement("div",{style:{display:"flex",gap:6}},
        saved && React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:600,color:S.sub,display:"flex",alignItems:"center",gap:4}},React.createElement("span",{style:{color:S.sub}},Si.check)," ",sn("saved")),
        !saved && React.createElement("button",{onClick:handleManualSave,disabled:!text.trim(),style:{padding:"7px 14px",borderRadius:8,background:S.white,color:S.bg,border:"none",fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:700,cursor:text.trim()?"pointer":"default",opacity:text.trim()?1:0.3}},sn("save"))
      )
    ),

    /* Action bar: category, bookmark, stickers, tear */
    React.createElement("div",{style:{padding:"0 20px",marginBottom:12}},
      React.createElement("div",{style:{display:"flex",gap:6,overflowX:"auto",paddingBottom:4,alignItems:"center"}},
        /* Category */
        React.createElement("button",{onClick:function(){setShowCats(!showCats);setShowStickers(false)},style:{
          padding:"5px 12px",borderRadius:100,
          border:"1px dashed "+S.line2,background:"transparent",
          color:S.muted,fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:600,
          cursor:"pointer",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:4,
        }},cat ? "📁 "+cat : "📁 "+sn("category")),

        /* Bookmark toggle */
        secret && React.createElement("button",{onClick:function(){ if(onToggleBookmark) onToggleBookmark(secret.id); },style:{
          padding:"5px 12px",borderRadius:100,
          border:"1px solid "+(isBookmarked?S.gold:S.line),
          background:isBookmarked?S.goldSoft:"transparent",
          color:isBookmarked?S.gold:S.muted,fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:600,
          cursor:"pointer",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:4,
        }},"🔖 "+(isBookmarked?sn("bookmarked"):sn("bookmark"))),

        /* Stickers button */
        React.createElement("button",{onClick:function(){setShowStickers(!showStickers);setShowCats(false)},style:{
          padding:"5px 12px",borderRadius:100,
          border:"1px solid "+S.line,background:"transparent",
          color:S.muted,fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:600,
          cursor:"pointer",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:4,
        }},currentStickers.length > 0 ? currentStickers.join("") : "✨ "+sn("stickers")),

        /* Tear page */
        secret && React.createElement("button",{onClick:function(){setShowTearConfirm(true)},style:{
          padding:"5px 12px",borderRadius:100,
          border:"1px solid "+S.dangerSoft,background:"transparent",
          color:S.danger,fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:600,
          cursor:"pointer",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:4,marginLeft:"auto",
        }},"🗑️ "+sn("tearPage"))
      ),

      /* Category options */
      showCats && React.createElement("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginTop:8}},
        DEFAULT_CATEGORIES.map(function(c){
          var active = cat === c.name;
          return React.createElement("button",{key:c.id,onClick:function(){setCat(active?"":c.name);setShowCats(false)},style:{
            padding:"5px 12px",borderRadius:100,
            border:"1px solid "+(active?S.sub:S.line),
            background:active?S.surface3:"transparent",
            color:active?S.title:S.muted,
            fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:active?700:500,
            cursor:"pointer",whiteSpace:"nowrap",
          }},c.name);
        })
      ),

      /* Sticker picker */
      showStickers && React.createElement("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginTop:8,padding:"8px 0"}},
        STICKERS.map(function(st){
          var has = currentStickers.indexOf(st) !== -1;
          return React.createElement("button",{key:st,onClick:function(){
            if(has && onRemoveSticker && secret) { onRemoveSticker(secret.id,st); }
            else if(!has && onAddSticker && secret) { onAddSticker(secret.id,st); }
          },style:{
            width:36,height:36,borderRadius:8,
            background:has?S.accentMid:S.surface2,
            border:"1px solid "+(has?S.sub:S.line),
            cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",
          }},st);
        })
      )
    ),

    /* Tear confirm modal */
    showTearConfirm && React.createElement("div",{style:{position:"fixed",inset:0,zIndex:900,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}},
      React.createElement("div",{style:{background:S.surface,borderRadius:16,border:"1px solid "+S.line,padding:24,maxWidth:320,width:"100%",textAlign:"center"}},
        React.createElement("p",{style:{fontSize:36,marginBottom:12}},"🗑️"),
        React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:16,fontWeight:600,color:S.title,marginBottom:8}},sn("tearPage")),
        React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,color:S.muted,marginBottom:24,lineHeight:1.6}},sn("tearConfirm")),
        React.createElement("div",{style:{display:"flex",gap:10}},
          React.createElement(SBtn,{variant:"ghost",full:true,onClick:function(){setShowTearConfirm(false)}},sn("cancel")),
          React.createElement(SBtn,{variant:"danger",full:true,onClick:handleTear},sn("tearPage"))
        )
      )
    ),

    /* The notebook page */
    React.createElement("div",{style:{padding:"0 12px"}},
      React.createElement(NotebookPage,{pageNum:pageNum,totalPages:totalPages},
        /* Date header on page */
        React.createElement("div",{style:{textAlign:"center",marginBottom:20,paddingTop:8}},
          React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:13,fontWeight:600,color:S.inkMuted,fontStyle:"italic",margin:0}},
            secret ? snFmtLong(secret.date) : snFmtLong(snTodayStr())
          ),
          React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:500,color:S.inkMuted,margin:"4px 0 0",letterSpacing:"0.06em"}},
            secret ? secret.time : new Date().toLocaleTimeString(snLocale(),{hour:"2-digit",minute:"2-digit"})
          )
        ),

        /* Text area */
        React.createElement("textarea",{
          ref:textRef,
          value:text,
          onChange:handleTextChange,
          placeholder:text ? sn("continueWriting") : sn("writeHere"),
          autoFocus:true,
          style:{
            width:"100%",minHeight:400,
            background:"transparent",border:"none",outline:"none",resize:"none",
            fontFamily:"'Lora',serif",fontSize:16,fontWeight:500,fontStyle:"italic",
            color:S.ink,lineHeight:"28px",
            padding:0,boxSizing:"border-box",
          }
        }),

        /* Char counter at bottom of page */
        React.createElement("div",{style:{marginTop:20,paddingTop:12,borderTop:"1px solid "+S.pageLine2}},
          React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"}},
            React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.inkMuted}},
              remaining+" "+sn("charsLeft")
            ),
            React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,color:isFull?"#8B6914":S.inkMuted}},
              pct+"%"
            )
          ),
          React.createElement("div",{style:{height:4,background:S.pageLines,borderRadius:2,marginTop:6,overflow:"hidden"}},
            React.createElement("div",{style:{width:pct+"%",height:"100%",background:isFull?"#C9A84C":"#888888",borderRadius:2,transition:"width 0.3s"}})
          ),
          isFull && React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:12,fontWeight:500,color:"#8B6914",fontStyle:"italic",textAlign:"center",marginTop:10}},
            sn("pageFullDesc")
          )
        )
      )
    )
  );
}
