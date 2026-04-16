/* SecretNote — Shared Components & Icons */

/* SecretNote Logo — Black notebook with white chains and padlock */
var SnLogo = function(props) {
  var size = props.size || 72;
  return React.createElement("svg",{width:size,height:size,viewBox:"0 0 100 100",fill:"none",xmlns:"http://www.w3.org/2000/svg"},
    /* Notebook body — dark */
    React.createElement("rect",{x:22,y:10,width:56,height:80,rx:4,fill:"#111111",stroke:"#333",strokeWidth:1.5}),
    /* Notebook spine */
    React.createElement("rect",{x:22,y:10,width:8,height:80,rx:2,fill:"#1A1A1A",stroke:"#333",strokeWidth:1}),
    /* Page lines */
    React.createElement("line",{x1:36,y1:30,x2:70,y2:30,stroke:"#333",strokeWidth:0.7}),
    React.createElement("line",{x1:36,y1:38,x2:70,y2:38,stroke:"#333",strokeWidth:0.7}),
    React.createElement("line",{x1:36,y1:46,x2:70,y2:46,stroke:"#333",strokeWidth:0.7}),
    React.createElement("line",{x1:36,y1:54,x2:70,y2:54,stroke:"#333",strokeWidth:0.7}),
    React.createElement("line",{x1:36,y1:62,x2:70,y2:62,stroke:"#333",strokeWidth:0.7}),
    /* Chain horizontal */
    React.createElement("path",{d:"M10 50 Q15 47 20 50 Q25 53 30 50 Q35 47 40 50 Q45 53 50 50 Q55 47 60 50 Q65 53 70 50 Q75 47 80 50 Q85 53 90 50",stroke:"#FFFFFF",strokeWidth:2.2,fill:"none",strokeLinecap:"round",opacity:0.9}),
    /* Chain vertical */
    React.createElement("path",{d:"M50 5 Q47 10 50 15 Q53 20 50 25 Q47 30 50 35 Q53 40 50 45 Q47 50 50 55 Q53 60 50 65 Q47 70 50 75 Q53 80 50 85 Q47 90 50 95",stroke:"#FFFFFF",strokeWidth:2.2,fill:"none",strokeLinecap:"round",opacity:0.9}),
    /* Chain links (small circles at intersections) */
    React.createElement("circle",{cx:50,cy:50,r:3,fill:"none",stroke:"#FFFFFF",strokeWidth:1.8}),
    React.createElement("circle",{cx:30,cy:50,r:2.5,fill:"none",stroke:"#FFFFFF",strokeWidth:1.5,opacity:0.7}),
    React.createElement("circle",{cx:70,cy:50,r:2.5,fill:"none",stroke:"#FFFFFF",strokeWidth:1.5,opacity:0.7}),
    React.createElement("circle",{cx:50,cy:30,r:2.5,fill:"none",stroke:"#FFFFFF",strokeWidth:1.5,opacity:0.7}),
    React.createElement("circle",{cx:50,cy:70,r:2.5,fill:"none",stroke:"#FFFFFF",strokeWidth:1.5,opacity:0.7}),
    /* Padlock body */
    React.createElement("rect",{x:42,y:44,width:16,height:13,rx:2,fill:"#FFFFFF"}),
    /* Padlock shackle */
    React.createElement("path",{d:"M45 44 V39 A5 5 0 0 1 55 39 V44",stroke:"#FFFFFF",strokeWidth:2.5,fill:"none",strokeLinecap:"round"}),
    /* Keyhole */
    React.createElement("circle",{cx:50,cy:50,r:2,fill:"#111111"}),
    React.createElement("rect",{x:49.2,y:50,width:1.6,height:4,rx:0.5,fill:"#111111"})
  );
};

const Si = {
  lock:     React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("rect",{x:3,y:11,width:18,height:11,rx:2}),React.createElement("path",{d:"M7 11V7a5 5 0 0110 0v4"})),
  unlock:   React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("rect",{x:3,y:11,width:18,height:11,rx:2}),React.createElement("path",{d:"M7 11V7a5 5 0 019.9-1"})),
  book:     React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("path",{d:"M4 19.5A2.5 2.5 0 016.5 17H20"}),React.createElement("path",{d:"M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"})),
  pen:      React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("path",{d:"M17 3a2.85 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5Z"})),
  search:   React.createElement("svg",{width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("circle",{cx:11,cy:11,r:8}),React.createElement("line",{x1:21,y1:21,x2:16.65,y2:16.65})),
  x:        React.createElement("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("line",{x1:18,y1:6,x2:6,y2:18}),React.createElement("line",{x1:6,y1:6,x2:18,y2:18})),
  back:     React.createElement("svg",{width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("polyline",{points:"15,18 9,12 15,6"})),
  chevR:    React.createElement("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("polyline",{points:"9,18 15,12 9,6"})),
  chevL:    React.createElement("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("polyline",{points:"15,18 9,12 15,6"})),
  plus:     React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("line",{x1:12,y1:5,x2:12,y2:19}),React.createElement("line",{x1:5,y1:12,x2:19,y2:12})),
  clock:    React.createElement("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("circle",{cx:12,cy:12,r:10}),React.createElement("polyline",{points:"12 6 12 12 16 14"})),
  shield:   React.createElement("svg",{width:16,height:16,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"})),
  settings: React.createElement("svg",{width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("circle",{cx:12,cy:12,r:3}),React.createElement("path",{d:"M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"})),
  check:    React.createElement("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2.5,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("polyline",{points:"20 6 9 17 4 12"})),
  bookmark: React.createElement("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("path",{d:"M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"})),
  globe:    React.createElement("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("circle",{cx:12,cy:12,r:10}),React.createElement("line",{x1:2,y1:12,x2:22,y2:12}),React.createElement("path",{d:"M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"})),
  trash:    React.createElement("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("polyline",{points:"3 6 5 6 21 6"}),React.createElement("path",{d:"M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"})),
};

/* Reusable button */
function SBtn({ children, onClick, disabled, variant, full, small, style:extra }) {
  var v = variant || "primary";
  var styles = {
    primary: { bg:S.white, fg:S.bg, bd:"none" },
    outline: { bg:"transparent", fg:S.white, bd:"1.5px solid "+S.line2 },
    ghost:   { bg:S.surface2, fg:S.sub, bd:"none" },
    danger:  { bg:S.danger, fg:"#fff", bd:"none" },
  };
  var st = styles[v] || styles.primary;
  return React.createElement("button",{onClick:onClick,disabled:disabled,style:{
    display:"flex",alignItems:"center",justifyContent:"center",gap:7,
    width:full?"100%":"auto",
    padding:small?"9px 16px":"13px 22px",borderRadius:10,
    background:disabled?S.line:st.bg,color:disabled?S.muted:st.fg,border:st.bd||"none",
    fontFamily:"'Inter',sans-serif",fontSize:small?13:14,fontWeight:600,
    cursor:disabled?"default":"pointer",transition:"all 0.15s",letterSpacing:"0.01em",
    ...(extra||{})
  }},children);
}

/* Notebook-style page wrapper */
function NotebookPage({ children, pageNum, totalPages, style:extra }) {
  /* Generate ruled lines */
  var lines = [];
  for (var i = 0; i < 30; i++) {
    lines.push(React.createElement("div",{key:i,style:{
      position:"absolute", left:60, right:20,
      top: 80 + i * 28,
      height:1, background:S.pageLine2, opacity:0.6,
    }}));
  }

  return React.createElement("div",{style:{
    background:S.page,
    borderRadius:4,
    minHeight:500,
    position:"relative",
    overflow:"hidden",
    boxShadow:"4px 4px 20px rgba(0,0,0,0.5), inset 0 0 60px rgba(0,0,0,0.03)",
    border:"1px solid rgba(255,255,255,0.05)",
    ...(extra||{})
  }},
    /* Left margin line */
    React.createElement("div",{style:{position:"absolute",left:52,top:0,bottom:0,width:1.5,background:"#C4A882",opacity:0.35}}),
    React.createElement("div",{style:{position:"absolute",left:55,top:0,bottom:0,width:0.5,background:"#C4A882",opacity:0.2}}),
    /* Top margin line */
    React.createElement("div",{style:{position:"absolute",left:0,right:0,top:72,height:1,background:S.pageLines,opacity:0.4}}),
    /* Ruled lines */
    lines,
    /* Spiral holes (left side) */
    Array.from({length:8}).map(function(_,i){
      return React.createElement("div",{key:"hole"+i,style:{
        position:"absolute",left:8,top:60+i*60,
        width:16,height:16,borderRadius:"50%",
        background:S.bg,border:"1px solid "+S.lineLight,
        boxShadow:"inset 0 1px 3px rgba(0,0,0,0.3)",
      }});
    }),
    /* Page content */
    React.createElement("div",{style:{position:"relative",zIndex:1,padding:"24px 24px 24px 68px",minHeight:500}},
      children
    ),
    /* Page number */
    pageNum && React.createElement("div",{style:{
      position:"absolute",bottom:14,right:20,
      fontFamily:"'Lora',serif",fontSize:12,fontStyle:"italic",color:S.inkMuted,
    }},sn("page")+" "+pageNum+(totalPages?" / "+totalPages:""))
  );
}
