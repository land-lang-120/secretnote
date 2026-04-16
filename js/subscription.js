/* SecretNote — Subscription / Plans Screen */

function SubscriptionScreen({ plan, onBack, onSelectPlan }) {
  var plans = [
    {
      id: "basic",
      icon: "📖",
      name: sn("planBasic"),
      price: PLANS.basic.price+"$"+sn("perMonth"),
      features: [
        PLANS.basic.maxPages+" "+sn("pagesPerNotebook"),
        PLANS.basic.maxNotebooks+" "+sn("notebook"),
        sn("encrypted"),
      ],
      current: plan === "basic",
    },
    {
      id: "monthly",
      icon: "⭐",
      name: sn("planMonthly"),
      price: PLANS.monthly.price+"$"+sn("perMonth"),
      features: [
        PLANS.monthly.maxPages+" "+sn("pagesPerNotebook"),
        PLANS.monthly.maxNotebooks+" "+sn("notebooksMax"),
        sn("encrypted"),
        sn("prioritySupport"),
      ],
      current: plan === "monthly",
      popular: true,
    },
    {
      id: "monthlyPlus",
      icon: "💫",
      name: sn("planMonthlyPlus"),
      price: PLANS.monthlyPlus.price+"$"+sn("perMonth"),
      features: [
        PLANS.monthlyPlus.maxPages+" "+sn("pagesPerNotebook"),
        PLANS.monthlyPlus.maxNotebooks+" "+sn("notebooksMax"),
        sn("encrypted"),
        sn("prioritySupport"),
      ],
      current: plan === "monthlyPlus",
    },
    {
      id: "yearly",
      icon: "💎",
      name: sn("planYearly"),
      price: PLANS.yearly.price+"$"+sn("perYear"),
      features: [
        PLANS.yearly.maxPages+" "+sn("pagesPerNotebook"),
        PLANS.yearly.maxNotebooks+" "+sn("notebooksMax"),
        sn("encrypted"),
        sn("prioritySupport"),
        sn("bestValue"),
      ],
      current: plan === "yearly",
    },
  ];

  return React.createElement("div",null,
    /* Header */
    React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:24}},
      React.createElement("button",{onClick:onBack,style:{width:36,height:36,borderRadius:10,background:S.surface2,border:"1px solid "+S.line,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:S.sub}},Si.back),
      React.createElement("h2",{style:{fontFamily:"'Lora',serif",fontSize:22,fontWeight:700,color:S.title,margin:0}},sn("unlock"))
    ),

    /* Subtitle */
    React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:14,fontWeight:500,color:S.muted,fontStyle:"italic",marginBottom:28,lineHeight:1.7}},sn("unlockDesc")),

    /* Plans */
    plans.map(function(p){
      return React.createElement("div",{key:p.id,style:{
        background:p.current?S.surface3:S.surface,
        borderRadius:16,
        border:p.popular?"2px solid "+S.white:"1px solid "+S.line,
        padding:"20px 18px",marginBottom:14,
        position:"relative",overflow:"hidden",
      }},
        /* Popular badge */
        p.popular && React.createElement("div",{style:{
          position:"absolute",top:0,right:0,
          background:S.white,color:S.bg,
          fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:800,
          padding:"4px 12px",borderRadius:"0 14px 0 10px",
          textTransform:"uppercase",letterSpacing:"0.05em",
        }},sn("popular")),

        /* Plan header */
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:14}},
          React.createElement("span",{style:{fontSize:28}},p.icon),
          React.createElement("div",{style:{flex:1}},
            React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:18,fontWeight:700,color:S.title,margin:0}},p.name),
            React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:14,fontWeight:700,color:p.current?S.muted:S.white,margin:"2px 0 0"}},p.price)
          ),
          p.current && React.createElement("span",{style:{
            fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:700,
            color:S.sub,background:S.surface2,padding:"4px 10px",borderRadius:100,
            border:"1px solid "+S.line,
          }},sn("currentPlan"))
        ),

        /* Features */
        React.createElement("div",{style:{marginBottom:16}},
          p.features.map(function(f,i){
            return React.createElement("div",{key:i,style:{display:"flex",alignItems:"center",gap:8,marginBottom:6}},
              React.createElement("span",{style:{color:S.sub,fontSize:14}},"✓"),
              React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:500,color:S.sub}},f)
            );
          })
        ),

        /* Button */
        !p.current && React.createElement(SBtn,{
          variant:p.popular?"primary":"outline",
          full:true,small:true,
          onClick:function(){ onSelectPlan(p.id); }
        },sn("subscribe")),

        p.current && React.createElement("div",{style:{
          padding:"8px 0",textAlign:"center",
          fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,color:S.muted,
        }},sn("activePlan"))
      );
    }),

    /* Encrypted badge */
    React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"12px 14px",background:S.accentSoft,borderRadius:10,marginTop:20,border:"1px solid "+S.line}},
      React.createElement("span",{style:{color:S.sub}},Si.shield),
      React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted}},sn("noOneCanSee"))
    )
  );
}
