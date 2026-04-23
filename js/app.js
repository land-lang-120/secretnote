/* SecretNote — Main App (full state: notebooks, trash, bookmarks, stickers, auto-advance) */

function TrashScreen({ trash, onBack, onRestore, onDestroyAll }) {
  var [showDestroy, setShowDestroy] = React.useState(false);

  return React.createElement("div",null,
    React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20}},
      React.createElement("button",{onClick:onBack,style:{width:36,height:36,borderRadius:10,background:S.surface2,border:"1px solid "+S.line,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:S.sub}},Si.back),
      React.createElement("h2",{style:{fontFamily:"'Lora',serif",fontSize:22,fontWeight:700,color:S.title,margin:0}},sn("trash")),
      React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,color:S.muted,background:S.surface2,padding:"2px 10px",borderRadius:100}},trash.length+" "+sn("tornPages"))
    ),

    trash.length === 0 && React.createElement("div",{style:{textAlign:"center",padding:"60px 20px"}},
      React.createElement("p",{style:{fontSize:40,marginBottom:12}},"🗑️"),
      React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:16,fontWeight:600,color:S.sub,fontStyle:"italic"}},sn("trashEmpty"))
    ),

    trash.length > 0 && React.createElement("div",null,
      trash.map(function(secret){
        return React.createElement("div",{key:secret.id,style:{
          background:S.surface,borderRadius:14,border:"1px solid "+S.line,
          padding:"14px 16px",marginBottom:10,opacity:0.7,
        }},
          React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}},
            React.createElement("span",{style:{fontFamily:"'Lora',serif",fontSize:13,fontWeight:700,color:S.title}},sn("page")+" "+secret.page),
            React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted}},snFmtDay(secret.date))
          ),
          React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:13,fontWeight:500,color:S.sub,lineHeight:1.6,margin:"0 0 10px",fontStyle:"italic",
            overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"
          }},secret.content),
          React.createElement("button",{onClick:function(){onRestore(secret.id)},style:{
            padding:"6px 14px",borderRadius:8,background:S.surface2,border:"1px solid "+S.line,
            color:S.sub,fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,cursor:"pointer",
            display:"flex",alignItems:"center",gap:6,
          }},"↩️ "+sn("restore"))
        );
      }),

      React.createElement("div",{style:{marginTop:24}},
        React.createElement(SBtn,{variant:"danger",full:true,onClick:function(){setShowDestroy(true)}},"💀 "+sn("destroyAll"))
      )
    ),

    /* Destroy confirm */
    showDestroy && React.createElement("div",{style:{position:"fixed",inset:0,zIndex:900,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}},
      React.createElement("div",{style:{background:S.surface,borderRadius:16,border:"1px solid "+S.line,padding:24,maxWidth:320,width:"100%",textAlign:"center"}},
        React.createElement("p",{style:{fontSize:36,marginBottom:12}},"💀"),
        React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:16,fontWeight:600,color:S.danger,marginBottom:8}},sn("destroyAll")),
        React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,color:S.muted,marginBottom:24,lineHeight:1.6}},sn("destroyConfirm")),
        React.createElement("div",{style:{display:"flex",gap:10}},
          React.createElement(SBtn,{variant:"ghost",full:true,onClick:function(){setShowDestroy(false)}},sn("cancel")),
          React.createElement(SBtn,{variant:"danger",full:true,onClick:function(){setShowDestroy(false);onDestroyAll();}},sn("confirm"))
        )
      )
    )
  );
}

function NewNotebookSheet({ onClose, onCreate }) {
  var [name, setName] = React.useState("");
  var [emoji, setEmoji] = React.useState("📓");
  var emojis = ["📓","📕","📗","📘","📙","📔","🔒","💀","🖤","🤍","❤️","💎","🔥","✨","🌙","⭐","🎭","👁️","🗝️","💌"];

  return React.createElement("div",{style:{position:"fixed",inset:0,zIndex:900,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"flex-end",justifyContent:"center"}},
    React.createElement("div",{style:{background:S.surface,borderRadius:"20px 20px 0 0",border:"1px solid "+S.line,padding:24,maxWidth:430,width:"100%",animation:"fadeUp .25s ease"}},
      React.createElement("div",{style:{width:40,height:4,borderRadius:2,background:S.line2,margin:"0 auto 20px"}}),
      React.createElement("h3",{style:{fontFamily:"'Lora',serif",fontSize:20,fontWeight:700,color:S.title,margin:"0 0 20px",textAlign:"center"}},sn("newNotebook")),

      /* Emoji picker */
      React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",marginBottom:20}},
        emojis.map(function(e){
          return React.createElement("button",{key:e,onClick:function(){setEmoji(e)},style:{
            width:40,height:40,borderRadius:10,fontSize:20,
            background:emoji===e?S.accentMid:S.surface2,
            border:"1px solid "+(emoji===e?S.sub:S.line),
            cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
          }},e);
        })
      ),

      /* Name input */
      React.createElement("input",{
        type:"text",value:name,
        onChange:function(e){setName(e.target.value)},
        placeholder:sn("notebookName"),
        autoFocus:true,
        style:{
          width:"100%",padding:"14px 16px",borderRadius:12,
          background:S.surface2,border:"1px solid "+S.line,color:S.title,
          fontFamily:"'Lora',serif",fontSize:16,fontWeight:600,fontStyle:"italic",
          outline:"none",boxSizing:"border-box",marginBottom:20,
        }
      }),

      React.createElement("div",{style:{display:"flex",gap:10}},
        React.createElement(SBtn,{variant:"ghost",full:true,onClick:onClose},sn("cancel")),
        React.createElement(SBtn,{variant:"primary",full:true,onClick:function(){
          if(name.trim()){onCreate({name:name.trim(),emoji:emoji})}
        },disabled:!name.trim()},sn("confirm"))
      )
    )
  );
}

/* Page limit overlay */
function PageLimitOverlay({ maxPages, onClose, onUpgrade }) {
  return React.createElement("div",{style:{position:"fixed",inset:0,zIndex:900,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}},
    React.createElement("div",{style:{background:S.surface,borderRadius:16,border:"1px solid "+S.line,padding:24,maxWidth:320,width:"100%",textAlign:"center"}},
      React.createElement("p",{style:{fontSize:36,marginBottom:12}},"📖"),
      React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:16,fontWeight:700,color:S.title,marginBottom:8}},sn("pageLimitTitle")),
      React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,color:S.muted,marginBottom:24,lineHeight:1.6}},sn("pageLimitDesc").replace("{n}",maxPages)),
      React.createElement("div",{style:{display:"flex",gap:10}},
        React.createElement(SBtn,{variant:"ghost",full:true,onClick:onClose},sn("close")),
        React.createElement(SBtn,{variant:"primary",full:true,onClick:onUpgrade},sn("unlock"))
      )
    )
  );
}

/* Notebook limit overlay */
function NotebookLimitOverlay({ maxNotebooks, onClose, onUpgrade }) {
  return React.createElement("div",{style:{position:"fixed",inset:0,zIndex:900,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}},
    React.createElement("div",{style:{background:S.surface,borderRadius:16,border:"1px solid "+S.line,padding:24,maxWidth:320,width:"100%",textAlign:"center"}},
      React.createElement("p",{style:{fontSize:36,marginBottom:12}},"📓"),
      React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:16,fontWeight:700,color:S.title,marginBottom:8}},sn("notebookLimitTitle")),
      React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,color:S.muted,marginBottom:24,lineHeight:1.6}},sn("notebookLimitDesc").replace("{n}",maxNotebooks)),
      React.createElement("div",{style:{display:"flex",gap:10}},
        React.createElement(SBtn,{variant:"ghost",full:true,onClick:onClose},sn("close")),
        React.createElement(SBtn,{variant:"primary",full:true,onClick:onUpgrade},sn("unlock"))
      )
    )
  );
}

function SecretNoteApp() {
  var useState = React.useState, useEffect = React.useEffect;
  var [locked, setLocked]               = useState(true);
  var [view, setView]                   = useState("notebook"); /* notebook | editor | search | settings | trash */
  var [secrets, setSecrets]             = useState(function(){
    try {
      var raw = localStorage.getItem("sn_secrets");
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("[SecretNote] Failed to hydrate secrets, using defaults", e);
    }
    return SAMPLE_SECRETS;
  });
  var [notebooks, setNotebooks]         = useState(function(){
    try {
      var raw = localStorage.getItem("sn_notebooks");
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("[SecretNote] Failed to hydrate notebooks, using defaults", e);
    }
    return DEFAULT_NOTEBOOKS;
  });
  var [activeNotebookId, setActiveNbId] = useState(1);
  var [editId, setEditId]               = useState(null);
  var [toast, setToast]                 = useState("");
  var [showNewNb, setShowNewNb]         = useState(false);
  var [showPageLimit, setShowPageLimit] = useState(false);
  var [showNbLimit, setShowNbLimit]     = useState(false);
  var [plan, setPlan]                   = useState("basic"); /* basic | monthly | monthlyPlus | yearly */

  /* ─── PERSISTANCE ─── */
  /* Sauve secrets/notebooks à chaque changement. Quota dépassé → log + on continue. */
  useEffect(function(){
    try {
      localStorage.setItem("sn_secrets", JSON.stringify(secrets));
    } catch (e) {
      console.error("[SecretNote] Failed to persist secrets (quota?)", e);
    }
  }, [secrets]);
  useEffect(function(){
    try {
      localStorage.setItem("sn_notebooks", JSON.stringify(notebooks));
    } catch (e) {
      console.error("[SecretNote] Failed to persist notebooks (quota?)", e);
    }
  }, [notebooks]);

  var currentPlan = PLANS[plan] || PLANS.basic;
  var maxPages = currentPlan.maxPages;
  var maxNotebooks = currentPlan.maxNotebooks;

  var showToast = function(msg){ setToast(msg); setTimeout(function(){setToast("")},2000); };

  var activeNotebook = notebooks.find(function(nb){return nb.id===activeNotebookId}) || notebooks[0];

  /* Derived: trash = torn secrets */
  var trash = secrets.filter(function(s){ return s.torn; });
  /* Active (non-torn) secrets for current notebook */
  var currentSecrets = secrets.filter(function(s){ return s.notebookId === activeNotebookId && !s.torn; });

  /* ─── SAVE ─── */
  var handleSave = function(secret){
    setSecrets(function(prev){
      var exists = prev.find(function(s){ return s.id === secret.id; });
      if (exists) {
        return prev.map(function(s){ return s.id === secret.id ? Object.assign({},s,secret) : s; });
      }
      return [secret].concat(prev);
    });
    showToast("✓ "+sn("saved"));
  };

  /* ─── OPEN PAGE ─── */
  var openPage = function(id){
    /* Find the secret and switch to its notebook */
    var s = secrets.find(function(x){return x.id===id});
    if (s && s.notebookId !== activeNotebookId) {
      setActiveNbId(s.notebookId);
    }
    setEditId(id);
    setView("editor");
  };

  /* ─── NEW PAGE ─── */
  var newPage = function(){
    /* Check page limit per notebook */
    var nbSecrets = secrets.filter(function(s){return s.notebookId===activeNotebookId && !s.torn && s.content && s.content.trim()});
    if (nbSecrets.length >= maxPages) {
      setShowPageLimit(true);
      return;
    }
    setEditId(null);
    setView("editor");
  };

  /* ─── AUTO-ADVANCE: create next blank page after save ─── */
  var autoAdvanceToNext = function(){
    var nbSecrets = secrets.filter(function(s){return s.notebookId===activeNotebookId && !s.torn && s.content && s.content.trim()});
    if (nbSecrets.length >= maxPages) {
      setShowPageLimit(true);
      return;
    }
    setEditId(null);
  };

  /* ─── TEAR PAGE ─── */
  var tearPage = function(id){
    setSecrets(function(prev){
      return prev.map(function(s){ return s.id === id ? Object.assign({},s,{torn:true}) : s; });
    });
    showToast("🗑️ "+sn("tearPage"));
    setView("notebook");
  };

  /* ─── RESTORE ─── */
  var restorePage = function(id){
    setSecrets(function(prev){
      return prev.map(function(s){ return s.id === id ? Object.assign({},s,{torn:false}) : s; });
    });
    showToast("↩️ "+sn("restored"));
  };

  /* ─── DESTROY ALL TRASH ─── */
  var destroyAllTrash = function(){
    setSecrets(function(prev){
      return prev.filter(function(s){ return !s.torn; });
    });
    showToast("💀 "+sn("destroyed"));
    setView("notebook");
  };

  /* ─── BOOKMARK ─── */
  var toggleBookmark = function(id){
    setSecrets(function(prev){
      return prev.map(function(s){
        if (s.id === id) return Object.assign({},s,{bookmarked:!s.bookmarked});
        return s;
      });
    });
  };

  /* ─── STICKERS ─── */
  var addSticker = function(id, sticker){
    setSecrets(function(prev){
      return prev.map(function(s){
        if (s.id === id) {
          var st = (s.stickers||[]).slice();
          if (st.indexOf(sticker) === -1) st.push(sticker);
          return Object.assign({},s,{stickers:st});
        }
        return s;
      });
    });
  };
  var removeSticker = function(id, sticker){
    setSecrets(function(prev){
      return prev.map(function(s){
        if (s.id === id) {
          var st = (s.stickers||[]).filter(function(x){return x!==sticker});
          return Object.assign({},s,{stickers:st});
        }
        return s;
      });
    });
  };

  /* ─── NOTEBOOKS ─── */
  var switchNotebook = function(id){
    setActiveNbId(id);
  };

  var createNotebook = function(data){
    /* Check notebook limit */
    if (notebooks.length >= maxNotebooks) {
      setShowNewNb(false);
      setShowNbLimit(true);
      return;
    }
    var newId = notebooks.length > 0 ? Math.max.apply(null,notebooks.map(function(n){return n.id})) + 1 : 1;
    setNotebooks(function(prev){
      return prev.concat([{id:newId,name:data.name,emoji:data.emoji,createdAt:snTodayStr(),color:"#333"}]);
    });
    setActiveNbId(newId);
    setShowNewNb(false);
    showToast("📓 "+data.name);
  };

  /* Page numbers */
  var editingSecret = editId ? secrets.find(function(s){ return s.id === editId; }) : null;
  var nextPageNum = currentSecrets.length > 0 ? Math.max.apply(null, currentSecrets.map(function(s){return s.page})) + 1 : 1;
  var currentPageNum = editingSecret ? editingSecret.page : nextPageNum;

  /* ─── PIN LOCK ─── */
  if (locked) {
    return React.createElement(PinScreen,{onUnlock:function(){setLocked(false)}});
  }

  /* ─── EDITOR ─── */
  if (view === "editor") {
    return React.createElement(PageEditor,{
      secret:editingSecret,
      pageNum:currentPageNum,
      totalPages:currentSecrets.filter(function(s){return s.content&&s.content.trim()}).length + (editingSecret ? 0 : 1),
      notebookId:activeNotebookId,
      onSave:handleSave,
      onBack:function(){setView("notebook")},
      onTear:tearPage,
      onToggleBookmark:toggleBookmark,
      onAddSticker:addSticker,
      onRemoveSticker:removeSticker,
      autoAdvance:autoAdvanceToNext,
    });
  }

  /* ─── MAIN SHELL ─── */
  return React.createElement("div",null,
    React.createElement("div",{style:{minHeight:"100vh",background:S.bg,display:"flex",justifyContent:"center"}},
      React.createElement("div",{style:{width:"100%",maxWidth:430,position:"relative",minHeight:"100vh"}},

        /* Top bar */
        React.createElement("div",{style:{height:56,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px",background:S.surface,borderBottom:"1px solid "+S.line,position:"sticky",top:0,zIndex:600}},
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
            React.createElement("div",{style:{width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center"}},React.createElement(SnLogo,{size:32})),
            React.createElement("span",{style:{fontFamily:"'Lora',serif",fontSize:18,fontWeight:700,color:S.title}},"SecretNote")
          ),
          React.createElement("button",{onClick:function(){setView("plans")},style:{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:600,color:S.muted,background:S.surface2,padding:"4px 10px",borderRadius:100,border:"1px solid "+S.line,display:"flex",alignItems:"center",gap:4,cursor:"pointer"}},
            plan==="basic"?"📖":plan==="monthly"?"⭐":plan==="monthlyPlus"?"💫":"💎",
            " ",sn("plan"+plan.charAt(0).toUpperCase()+plan.slice(1))
          )
        ),

        /* Content */
        React.createElement("div",{style:{padding:"22px 20px 40px",animation:"fadeUp .25s ease"}},
          view === "notebook" && React.createElement(NotebookScreen,{
            secrets:secrets,
            notebooks:notebooks,
            activeNotebook:activeNotebook,
            trash:trash,
            onAdd:newPage,
            onOpenPage:openPage,
            onSearch:function(){setView("search")},
            onSettings:function(){setView("settings")},
            onSwitchNotebook:switchNotebook,
            onNewNotebook:function(){setShowNewNb(true)},
            onOpenTrash:function(){setView("trash")},
            onOpenNotebooks:function(){setView("notebooks")},
          }),
          view === "notebooks" && React.createElement(NotebooksScreen,{
            notebooks:notebooks,
            secrets:secrets,
            activeNotebookId:activeNotebookId,
            onBack:function(){setView("notebook")},
            onSelect:function(id){switchNotebook(id);setView("notebook");},
            onNewNotebook:function(){setShowNewNb(true)},
          }),
          view === "search" && React.createElement(SearchScreen,{
            secrets:secrets,
            notebooks:notebooks,
            onBack:function(){setView("notebook")},
            onOpenPage:openPage,
            onSwitchNotebook:switchNotebook,
          }),
          view === "settings" && React.createElement(SettingsScreen,{
            secrets:secrets,
            notebooks:notebooks,
            plan:plan,
            maxPages:maxPages,
            onBack:function(){setView("notebook")},
          }),
          view === "plans" && React.createElement(SubscriptionScreen,{
            plan:plan,
            onBack:function(){setView("notebook")},
            onSelectPlan:function(p){setPlan(p);showToast("⭐ "+sn("planUpdated"));setView("notebook");},
          }),
          view === "trash" && React.createElement(TrashScreen,{
            trash:trash,
            onBack:function(){setView("notebook")},
            onRestore:restorePage,
            onDestroyAll:destroyAllTrash,
          })
        )
      )
    ),

    /* New Notebook Sheet */
    showNewNb && React.createElement(NewNotebookSheet,{onClose:function(){setShowNewNb(false)},onCreate:createNotebook}),

    /* Page Limit Overlay */
    showPageLimit && React.createElement(PageLimitOverlay,{maxPages:maxPages,onClose:function(){setShowPageLimit(false)},onUpgrade:function(){setShowPageLimit(false);setView("plans")}}),

    /* Notebook Limit Overlay */
    showNbLimit && React.createElement(NotebookLimitOverlay,{maxNotebooks:maxNotebooks,onClose:function(){setShowNbLimit(false)},onUpgrade:function(){setShowNbLimit(false);setView("plans")}}),

    /* Toast */
    toast && React.createElement("div",{style:{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:S.white,color:S.bg,padding:"10px 22px",borderRadius:100,fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:600,zIndex:999,boxShadow:"0 4px 20px rgba(255,255,255,0.15)",animation:"fadeUp .25s ease"}},toast)
  );
}
