/* SecretNote — Search Screen (page#, notebook#, keyword) */

function SearchScreen({ secrets, notebooks, onBack, onOpenPage, onSwitchNotebook }) {
  var useState = React.useState;
  var [query, setQuery] = useState("");

  var q = query.trim().toLowerCase();

  var results = [];
  var notebookResults = [];

  if (q.length > 0) {
    /* Check if searching by page number: "p3", "page 3", "3" */
    var pageMatch = q.match(/^(?:p(?:age)?\s*)?(\d+)$/i);
    var pageNum = pageMatch ? parseInt(pageMatch[1]) : null;

    /* Check if searching by notebook: "n1", "notebook 1", "cahier 2" */
    var nbMatch = q.match(/^(?:n(?:otebook|b)?\s*|cahier\s*)(\d+)$/i);
    var nbNum = nbMatch ? parseInt(nbMatch[1]) : null;

    /* Notebook results */
    if (nbNum) {
      notebookResults = notebooks.filter(function(nb){ return nb.id === nbNum; });
    }
    /* Also search notebook names */
    notebookResults = notebookResults.concat(
      notebooks.filter(function(nb){
        if (nbNum && nb.id === nbNum) return false; /* avoid dupe */
        return nb.name.toLowerCase().indexOf(q) !== -1;
      })
    );

    /* Page results */
    var activeSecrets = secrets.filter(function(s){ return !s.torn; });

    if (pageNum) {
      /* Direct page number match first */
      var directMatch = activeSecrets.filter(function(s){ return s.page === pageNum; });
      results = directMatch;
    }

    /* Also text/category search */
    var textResults = activeSecrets.filter(function(s){
      /* Skip if already in results */
      if (pageNum && s.page === pageNum) return false;
      return (s.content && s.content.toLowerCase().indexOf(q) !== -1) ||
             (s.category && s.category.toLowerCase().indexOf(q) !== -1);
    });
    results = results.concat(textResults);
  }

  return React.createElement("div",null,
    /* Header */
    React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20}},
      React.createElement("button",{onClick:onBack,style:{width:36,height:36,borderRadius:10,background:S.surface2,border:"1px solid "+S.line,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:S.sub}},Si.back),
      React.createElement("h2",{style:{fontFamily:"'Lora',serif",fontSize:22,fontWeight:700,color:S.title,margin:0}},sn("search"))
    ),

    /* Search input */
    React.createElement("div",{style:{position:"relative",marginBottom:22}},
      React.createElement("div",{style:{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:S.muted}},Si.search),
      React.createElement("input",{
        type:"text",value:query,
        onChange:function(e){setQuery(e.target.value)},
        placeholder:sn("searchPlaceholder"),
        autoFocus:true,
        style:{
          width:"100%",padding:"14px 14px 14px 44px",borderRadius:14,
          background:S.surface2,border:"1px solid "+S.line,color:S.title,
          fontFamily:"'Inter',sans-serif",fontSize:14,fontWeight:500,
          outline:"none",boxSizing:"border-box",
        }
      })
    ),

    /* Results */
    q.length > 0 && React.createElement("div",null,
      /* Notebook results */
      notebookResults.length > 0 && React.createElement("div",{style:{marginBottom:20}},
        React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,color:S.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:10}},sn("notebooks")),
        notebookResults.map(function(nb){
          var count = secrets.filter(function(s){return s.notebookId===nb.id&&!s.torn&&s.content&&s.content.trim()}).length;
          return React.createElement("div",{key:"nb-"+nb.id,onClick:function(){ onSwitchNotebook(nb.id); onBack(); },style:{
            background:S.surface,borderRadius:14,border:"1px solid "+S.line,
            padding:"14px 16px",marginBottom:8,cursor:"pointer",
            display:"flex",alignItems:"center",gap:12,
          }},
            React.createElement("span",{style:{fontSize:20}},nb.emoji||"📓"),
            React.createElement("div",{style:{flex:1}},
              React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:14,fontWeight:700,color:S.title,margin:0}},nb.name),
              React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted,margin:"2px 0 0"}},count+" "+sn("pages"))
            ),
            React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:600,color:S.muted}},"#"+nb.id)
          );
        })
      ),

      /* Page results */
      React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,color:S.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:10}},
        results.length+" "+sn("results")
      ),
      results.length === 0 && notebookResults.length === 0 && React.createElement("div",{style:{textAlign:"center",padding:"40px 20px"}},
        React.createElement("p",{style:{fontSize:36,marginBottom:12}},"🔍"),
        React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:16,fontWeight:600,color:S.sub,fontStyle:"italic"}},sn("noResults"))
      ),
      results.map(function(secret){
        var idx = secret.content.toLowerCase().indexOf(q);
        var snippet;
        if (idx !== -1) {
          var start = Math.max(0, idx - 40);
          var end = Math.min(secret.content.length, idx + q.length + 60);
          snippet = (start > 0 ? "…" : "") + secret.content.substring(start, end) + (end < secret.content.length ? "…" : "");
        } else {
          snippet = secret.content.substring(0, 100) + (secret.content.length > 100 ? "…" : "");
        }
        var nb = notebooks.find(function(n){return n.id===secret.notebookId});
        return React.createElement("div",{key:secret.id,onClick:function(){onOpenPage(secret.id)},style:{
          background:S.surface,borderRadius:14,border:"1px solid "+S.line,
          padding:"14px 16px",marginBottom:10,cursor:"pointer",
        }},
          React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}},
            React.createElement("div",{style:{display:"flex",alignItems:"center",gap:6}},
              secret.bookmarked && React.createElement("span",{style:{fontSize:12}},"🔖"),
              React.createElement("span",{style:{fontFamily:"'Lora',serif",fontSize:13,fontWeight:700,color:S.title}},sn("page")+" "+secret.page),
              nb && React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:600,color:S.muted,background:S.surface2,padding:"2px 8px",borderRadius:100}},(nb.emoji||"📓")+" "+nb.name)
            ),
            React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted}},snFmtDay(secret.date))
          ),
          React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:14,fontWeight:500,color:S.sub,lineHeight:1.7,margin:0,fontStyle:"italic"}},snippet)
        );
      })
    ),

    /* Hint before search */
    q.length === 0 && React.createElement("div",{style:{textAlign:"center",padding:"60px 20px"}},
      React.createElement("p",{style:{fontSize:40,marginBottom:16}},"🔐"),
      React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:15,fontWeight:500,color:S.muted,fontStyle:"italic",lineHeight:1.7}},sn("slogan2"))
    )
  );
}
