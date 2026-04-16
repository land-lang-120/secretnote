/* SecretNote — Notebook (Main Screen) */

function NotebookScreen({ secrets, notebooks, activeNotebook, trash, onAdd, onOpenPage, onSearch, onSettings, onSwitchNotebook, onNewNotebook, onOpenTrash, onOpenNotebooks }) {
  var currentSecrets = secrets.filter(function(s){ return s.notebookId === activeNotebook.id && !s.torn; });
  /* Newest first */
  var sorted = currentSecrets.slice().sort(function(a,b){ return b.id - a.id; });
  /* Only show pages with content */
  var withContent = sorted.filter(function(s){ return s.content && s.content.trim().length > 0; });
  var totalChars = withContent.reduce(function(a,s){ return a + charCount(s.content); },0);
  var trashCount = trash.length;

  return React.createElement("div",null,
    /* Header */
    React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}},
      React.createElement("div",null,
        React.createElement("h1",{style:{fontFamily:"'Lora',serif",fontWeight:700,fontSize:26,color:S.title,margin:"0 0 4px"}},sn("mySecrets")),
        React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:13,fontWeight:500,color:S.muted,fontStyle:"italic",margin:0}},sn("slogan"))
      ),
      React.createElement("div",{style:{display:"flex",gap:8}},
        React.createElement("button",{onClick:onSearch,style:{width:40,height:40,borderRadius:12,background:S.surface2,border:"1px solid "+S.line,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:S.sub}},Si.search),
        React.createElement("button",{onClick:onSettings,style:{width:40,height:40,borderRadius:12,background:S.surface2,border:"1px solid "+S.line,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:S.sub}},Si.settings)
      )
    ),

    /* Notebook button — opens full notebooks screen */
    React.createElement("button",{onClick:onOpenNotebooks,style:{
      display:"flex",alignItems:"center",gap:10,width:"100%",
      padding:"12px 16px",borderRadius:12,marginBottom:20,
      background:S.surface,border:"1px solid "+S.line,cursor:"pointer",
    }},
      React.createElement("span",{style:{fontSize:18}},activeNotebook.emoji||"📓"),

      React.createElement("div",{style:{flex:1,textAlign:"left"}},
        React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:14,fontWeight:700,color:S.title,margin:0}},activeNotebook.name),
        React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted,margin:"2px 0 0"}},notebooks.length+" "+sn("notebookCount"))
      ),
      React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:600,color:S.sub}},sn("notebooks")),
      React.createElement("span",{style:{color:S.muted}},Si.chevR)
    ),

    /* Stats bar */
    React.createElement("div",{style:{display:"flex",gap:10,marginBottom:20}},
      [{v:withContent.length,l:sn("pages"),icon:"📄"},{v:totalChars,l:sn("chars"),icon:"✍️"}].map(function(st){
        return React.createElement("div",{key:st.l,style:{flex:1,background:S.surface2,borderRadius:12,padding:"14px 12px",textAlign:"center",border:"1px solid "+S.line}},
          React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:22,fontWeight:700,color:S.title,margin:"0 0 2px"}},st.v),
          React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:600,color:S.muted,margin:0}},st.l)
        );
      })
    ),

    /* Encrypted badge */
    React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:S.accentSoft,borderRadius:10,marginBottom:22,border:"1px solid "+S.line}},
      React.createElement("span",{style:{color:S.sub}},Si.shield),
      React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,color:S.sub}},sn("encrypted")),
      React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted,marginLeft:4}},"— "+sn("noOneCanSee"))
    ),

    /* Empty state — show rules page */
    withContent.length === 0 && React.createElement(NotebookPage,{pageNum:0},
      React.createElement("div",{style:{paddingTop:20}},
        React.createElement("h2",{style:{fontFamily:"'Lora',serif",fontSize:20,fontWeight:700,color:S.ink,margin:"0 0 24px",fontStyle:"italic",textAlign:"center"}},"— "+sn("appName")+" —"),
        (NOTEBOOK_RULES[_snLang] || NOTEBOOK_RULES.fr || NOTEBOOK_RULES.en).map(function(rule,i){
          return React.createElement("p",{key:i,style:{fontFamily:"'Lora',serif",fontSize:14,fontWeight:500,color:S.ink,lineHeight:2,margin:"0 0 4px",fontStyle:"italic"}},
            (i+1)+". "+rule
          );
        }),
        React.createElement("div",{style:{textAlign:"center",marginTop:30}},
          React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:36,color:S.inkMuted,margin:0}},"🔒"),
          React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:13,fontWeight:500,color:S.inkMuted,fontStyle:"italic",marginTop:10}},sn("startWriting"))
        )
      )
    ),

    /* Secret pages list — newest first, only with content */
    withContent.length > 0 && React.createElement("div",null,
      React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}},
        React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,color:S.muted,letterSpacing:"0.08em",textTransform:"uppercase"}},sn("timeline")),
        React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted}},sn("recentFirst"))
      ),
      withContent.map(function(secret){
        var cc = charCount(secret.content);
        var pct = Math.min(100, Math.round(cc / CHARS_PER_PAGE * 100));
        var isFull = cc >= CHARS_PER_PAGE;
        return React.createElement("div",{key:secret.id,onClick:function(){onOpenPage(secret.id)},style:{
          background:S.surface,borderRadius:14,border:"1px solid "+S.line,
          padding:"0",marginBottom:10,cursor:"pointer",overflow:"hidden",
        }},
          React.createElement("div",{style:{display:"flex"}},
            React.createElement("div",{style:{width:5,background:S.page,flexShrink:0,borderRadius:"14px 0 0 14px",opacity:0.5}}),
            React.createElement("div",{style:{flex:1,padding:"16px 16px"}},
              React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}},
                React.createElement("div",{style:{display:"flex",alignItems:"center",gap:6}},
                  secret.bookmarked && React.createElement("span",{style:{fontSize:12}},"🔖"),
                  React.createElement("span",{style:{fontFamily:"'Lora',serif",fontSize:13,fontWeight:700,color:S.title}},sn("page")+" "+secret.page),
                  secret.category && React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:600,color:S.muted,background:S.surface2,padding:"2px 8px",borderRadius:100,border:"1px solid "+S.line}},secret.category),
                  isFull && React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:700,color:S.gold,background:S.goldSoft,padding:"2px 8px",borderRadius:100}},sn("pageFull")),
                  secret.stickers && secret.stickers.length > 0 && React.createElement("span",{style:{fontSize:12}},secret.stickers.join(""))
                ),
                React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted}},snFmtDay(secret.date))
              ),
              React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:14,fontWeight:500,color:S.sub,lineHeight:1.7,margin:"0 0 10px",fontStyle:"italic",
                overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"
              }},secret.content),
              React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
                React.createElement("div",{style:{flex:1,height:3,background:S.line,borderRadius:2,overflow:"hidden"}},
                  React.createElement("div",{style:{width:pct+"%",height:"100%",background:isFull?S.gold:S.sub,borderRadius:2}})
                ),
                React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:600,color:S.muted,flexShrink:0}},cc+" / "+CHARS_PER_PAGE)
              )
            )
          )
        );
      })
    ),

    /* Trash mini FAB */
    trashCount > 0 && React.createElement("button",{onClick:onOpenTrash,style:{
      position:"fixed",bottom:100,right:"calc(50% - 215px + 20px)",
      width:40,height:40,borderRadius:12,
      background:S.surface2,border:"1px solid "+S.line,cursor:"pointer",
      display:"flex",alignItems:"center",justifyContent:"center",
      boxShadow:"0 2px 10px rgba(0,0,0,0.3)",zIndex:640,color:S.muted,
      fontSize:16,position:"fixed",
    }},
      "🗑️",
      React.createElement("span",{style:{position:"absolute",top:-4,right:-4,width:18,height:18,borderRadius:"50%",background:S.danger,color:"white",fontFamily:"'Inter',sans-serif",fontSize:9,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}},trashCount)
    ),

    /* FAB — new page */
    React.createElement("button",{onClick:onAdd,style:{
      position:"fixed",bottom:32,right:"calc(50% - 215px + 18px)",
      width:56,height:56,borderRadius:"50%",
      background:S.white,border:"none",cursor:"pointer",
      display:"flex",alignItems:"center",justifyContent:"center",
      boxShadow:"0 4px 20px rgba(255,255,255,0.15)",zIndex:650,color:S.bg,
    }},Si.plus)
  );
}
