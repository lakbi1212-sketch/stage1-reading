(function(){
var stages=[
{n:1,name:"المرحلة الأولى",icon:'<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true"><rect x="4" y="12" width="56" height="40" rx="10" fill="#fff" stroke="#b35c10" stroke-width="3"/><text x="32" y="43" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="26" fill="#b35c10">Aa</text></svg>',color:"#b35c10",bg:"#fdeed9",desc:"أصوات وكلمات وجمل: تسمع، تدمج، تقرأ، ثم تبني وتكتب.",ready:true},
{n:2,name:"المرحلة الثانية",icon:'<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true"><path d="M32 16c-6-5-16-6-24-4v36c8-2 18-1 24 4 6-5 16-6 24-4V12c-8-2-18-1-24 4z" fill="#fff" stroke="#166b54" stroke-width="3" stroke-linejoin="round"/><path d="M32 16v36" stroke="#166b54" stroke-width="3"/></svg>',color:"#166b54",bg:"#e3f2ec",desc:"أصوات جديدة وكلمات وجمل أكثر.",ready:true},
{n:3,name:"المرحلة الثالثة",icon:'<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true"><path d="M12 52l4-14 28-28 10 10-28 28z" fill="#fff" stroke="#1a62a8" stroke-width="3" stroke-linejoin="round"/><path d="M40 14l10 10M16 38l10 10" stroke="#1a62a8" stroke-width="3"/><path d="M12 52l4-14 10 10z" fill="#1a62a8"/></svg>',color:"#1a62a8",bg:"#e4f0fb",desc:"",ready:true},
{n:4,name:"المرحلة الرابعة",icon:'<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true"><path d="M32 6l7.5 17 18.5 1.8-14 12.3 4.2 18.2L32 45.6 15.8 55.3 20 37.1 6 24.8 24.5 23z" fill="#fff" stroke="#6a3fa0" stroke-width="3" stroke-linejoin="round"/></svg>',color:"#6a3fa0",bg:"#f0eafa",desc:"",ready:true}];
var root=document.getElementById("root");
var s=document.createElement("style");
s.textContent=".hm{max-width:720px;margin:0 auto;padding:24px 16px 40px;color:#242022;font-family:'Noto Kufi Arabic',sans-serif}.hm h1{font-size:24px;margin:8px 0 6px}.hm p.sub{margin:0 0 20px;font-size:15px;opacity:.8}.hm-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.hm-card{border:2px solid;border-radius:20px;padding:22px 12px;text-align:center;cursor:pointer;font:inherit;display:flex;flex-direction:column;align-items:center;gap:8px}.hm-card:active{transform:scale(.98)}.hm-ic{font-size:52px;line-height:1}.hm-nm{font-size:18px;font-weight:800}.hm-st{font-size:12px;opacity:.85}.hm-det{border:2px solid;border-radius:20px;padding:24px 18px;text-align:center}.hm-det .hm-ic{font-size:64px}.hm-back{position:fixed;top:10px;left:10px;z-index:50;background:#fff;border:1px solid #eae9ea;border-radius:999px;padding:8px 14px;font:inherit;font-size:14px;cursor:pointer;box-shadow:0 1px 4px #0002}.hm-btn{margin-top:12px;padding:10px 20px;border-radius:12px;border:0;color:#fff;font:inherit;font-size:15px;cursor:pointer}@media(max-width:380px){.hm-grid{gap:10px}.hm-nm{font-size:16px}}";
document.head.appendChild(s);
var home=document.createElement("div");home.dir="rtl";home.id="home";root.parentNode.insertBefore(home,root);
var back=document.createElement("button");back.className="hm-back";back.dir="rtl";back.textContent="الرئيسية";back.style.display="none";back.onclick=function(){location.hash=""};document.body.appendChild(back);
function esc(t){return t}
function render(){
var h=location.hash.replace("#","");var m=/^stage(\d)$/.exec(h);var n=m?+m[1]:0;
var st=stages[n-1];
if(n>=2&&n<=4&&window['Stage'+n]){back.style.display='';root.style.display='none';home.style.display='';window['Stage'+n].render(home);window.scrollTo(0,0);return}
if(n===1){home.style.display="none";root.style.display="";back.style.display="";window.scrollTo(0,0);return}
root.style.display="none";home.style.display="";
if(!st){back.style.display="none";
home.innerHTML='<div class="hm"><h1>تدريب القراءة والكتابة بالإنجليزية</h1><p class="sub">اختر مرحلتك وابدأ التدريب.</p><div class="hm-grid">'+stages.map(function(x){return '<button class="hm-card" style="background:'+x.bg+';border-color:'+x.color+';color:'+x.color+'" onclick="location.hash=\'stage'+x.n+'\'"><span class="hm-ic">'+x.icon+'</span><span class="hm-nm">'+x.name+'</span><span class="hm-st">'+(x.ready?"ابدأ":"قيد البناء")+'</span></button>'}).join("")+'</div></div>';
}else{back.style.display="";
home.innerHTML='<div class="hm" style="padding-top:56px"><div class="hm-det" style="background:'+st.bg+';border-color:'+st.color+';color:'+st.color+'"><div class="hm-ic">'+st.icon+'</div><h1>'+st.name+'</h1><p class="sub" style="color:#242022">'+st.desc+'</p><p class="sub" style="color:#242022">التدريبات قيد البناء، وتُفتح قريبًا بإذن الله.</p><button class="hm-btn" style="background:'+st.color+'" onclick="location.hash=\'\'">العودة للرئيسية</button></div></div>';}
window.scrollTo(0,0)}
window.addEventListener("hashchange",render);render();
})();
