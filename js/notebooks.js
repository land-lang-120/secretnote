/* SecretNote — Notebooks List Screen (scalable for 1000+ notebooks) */

function NotebooksScreen({ notebooks, secrets, activeNotebookId, onBack, onSelect, onNewNotebook }) {
  var useState = React.useState;
  var [query, setQuery] = useState("");

  var q = query.trim().toLowerCase();

  /* Sort: most recent first (last created = highest id) */
  var sorted = notebooks.slice().sort(function(a,b){ return b.id - a.id; });

  /* Filter by search */
  var filtered = q.length > 0
    ? sorted.filter(function(nb){
        /* Match by name, emoji, or id number */
        var numMatch = q.match(/^#?(\d+)$/);
        if (numMatch && nb.id === parseInt(numMatch[1])) return true;
        return nb.name.toLowerCase().indexOf(q) !== -1 ||
               (nb.emoji && nb.emoji.indexOf(q) !== -1);
      })
    : sorted;

  return React.createElement("div",null,
    /* Header */
    React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20}},
      React.createElement("button",{onClick:onBack,style:{width:36,height:36,borderRadius:10,background:S.surface2,border:"1px solid "+S.line,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:S.sub}},Si.back),
      React.createElement("h2",{style:{fontFamily:"'Lora',serif",fontSize:22,fontWeight:700,color:S.title,margin:0,flex:1}},sn("notebooks")),
      React.createElement("button",{onClick:onNewNotebook,style:{
        padding:"8px 14px",borderRadius:10,background:S.white,color:S.bg,border:"none",
        fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:700,cursor:"pointer",
        display:"flex",alignItems:"center",gap:4,
      }},Si.plus," "+sn("newNotebook"))
    ),

    /* Search bar */
    React.createElement("div",{style:{position:"relative",marginBottom:18}},
      React.createElement("div",{style:{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:S.muted}},Si.search),
      React.createElement("input",{
        type:"text",value:query,
        onChange:function(e){setQuery(e.target.value)},
        placeholder:sn("searchNotebooks"),
        style:{
          width:"100%",padding:"12px 14px 12px 44px",borderRadius:12,
          background:S.surface2,border:"1px solid "+S.line,color:S.title,
          fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,
          outline:"none",boxSizing:"border-box",
        }
      })
    ),

    /* Count */
    React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,color:S.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:12}},
      filtered.length+" "+sn("notebookCount")
    ),

    /* Notebooks list */
    filtered.length === 0 && React.createElement("div",{style:{textAlign:"center",padding:"40px 20px"}},
      React.createElement("p",{style:{fontSize:36,marginBottom:12}},"📓"),
      React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:16,fontWeight:600,color:S.sub,fontStyle:"italic"}},sn("noResults"))
    ),

    filtered.map(function(nb){
      var isActive = nb.id === activeNotebookId;
      var count = secrets.filter(function(s){return s.notebookId===nb.id && !s.torn && s.content && s.content.trim()}).length;
      var totalChars = secrets.filter(function(s){return s.notebookId===nb.id && !s.torn}).reduce(function(a,s){return a+charCount(s.content)},0);

      return React.createElement("div",{key:nb.id,onClick:function(){onSelect(nb.id)},style:{
        background:isActive?S.surface3:S.surface,
        borderRadius:14,
        border:isActive?"1.5px solid "+S.white+"30":"1px solid "+S.line,
        padding:"16px",marginBottom:10,cursor:"pointer",
        transition:"all 0.15s",
      }},
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12}},
          /* Emoji */
          React.createElement("div",{style:{width:44,height:44,borderRadius:12,background:S.surface2,border:"1px solid "+S.line,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}},nb.emoji||"📓"),

          /* Info */
          React.createElement("div",{style:{flex:1,minWidth:0}},
            React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:4}},
              React.createElement("span",{style:{fontFamily:"'Lora',serif",fontSize:15,fontWeight:700,color:S.title,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},nb.name),
              isActive && React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:9,fontWeight:700,color:S.bg,background:S.white,padding:"2px 7px",borderRadius:100}},sn("current"))
            ),
            React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
              React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted}},count+" "+sn("pages")),
              React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,color:S.line}},"·"),
              React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted}},totalChars+" "+sn("chars")),
              nb.createdAt && React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,color:S.line}},"·"),
              nb.createdAt && React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted}},snFmtDay(nb.createdAt))
            )
          ),

          /* Arrow */
          React.createElement("span",{style:{color:S.muted,flexShrink:0}},Si.chevR)
        )
      );
    })
  );
}
