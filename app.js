/* CCA website — application logic (routing, rendering, request flow).
   Content lives in data.js. Styling lives in assets/css/styles.css. */

(function(){
"use strict";
var $=function(s){return document.querySelector(s)};
var esc=function(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};
var MONTH=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var FULLM=["January","February","March","April","May","June","July","August","September","October","November","December"];
var DAY=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var PIC=["hero.jpg","adv.jpg","ev1.jpg","ev2.jpg","ev3.jpg","ev4.jpg"];

var S={mode:"public",view:"home",p:{},q:"",gq:"",slide:0,cat:"All",evTab:"upcoming",signed:false,soc:"lds",draft:{},inbox:"all",sheet:false};
var toastT=null;
function soc(id){for(var i=0;i<SOCIETIES.length;i++)if(SOCIETIES[i].id===id)return SOCIETIES[i];return SOCIETIES[0]}
function venue(id){for(var i=0;i<VENUES.length;i++)if(VENUES[i].id===id)return VENUES[i];return null}
function rtype(id){for(var i=0;i<REQ_TYPES.length;i++)if(REQ_TYPES[i].id===id)return REQ_TYPES[i];return REQ_TYPES[0]}
function reqByRef(r){for(var i=0;i<REQUESTS.length;i++)if(REQUESTS[i].ref===r)return REQUESTS[i];return null}
function dayOf(iso){var p=iso.split("-");return DAY[new Date(+p[0],+p[1]-1,+p[2]).getDay()]}
function fmtD(iso){var p=iso.split("-");return dayOf(iso)+", "+(+p[2])+" "+FULLM[+p[1]-1]}
function dnum(i){return +i.split("-")[2]} function dmon(i){return MONTH[+i.split("-")[1]-1]}
function go(v,p){S.view=v;if(S.sheet==="menu"||S.sheet==="search")S.sheet=false;S.p=p||{};window.scrollTo({top:0,behavior:"instant"});render()}
function toast(m){var o=$("#toast");if(o)o.remove();var d=document.createElement("div");d.className="toast";d.id="toast";d.textContent=m;document.body.appendChild(d);clearTimeout(toastT);toastT=setTimeout(function(){var t=$("#toast");if(t)t.remove()},3400)}
function sendMail(to,cc,s,b){EMAILS.unshift({to:to,cc:cc,subj:s,body:b,when:"just now"});$("#mailCount").textContent=EMAILS.length}

var I={search:'<circle cx="8" cy="8" r="5.5"/><path d="M12.5 12.5 16 16"/>',arrow:'<path d="M3 9h12M10 4l5 5-5 5"/>',back:'<path d="M15 9H3M8 4 3 9l5 5"/>',
 cal:'<rect x="2.5" y="3.5" width="13" height="12" rx="1"/><path d="M2.5 7h13M6 2v3M12 2v3"/>',pin:'<path d="M9 16s5.5-5 5.5-9A5.5 5.5 0 0 0 3.5 7c0 4 5.5 9 5.5 9Z"/><circle cx="9" cy="7" r="2"/>',
 building:'<rect x="3" y="2.5" width="12" height="13" rx="1"/><path d="M6.5 6h2M9.5 6h2M6.5 9h2M9.5 9h2M7.5 15.5v-3h3v3"/>',mega:'<path d="M3 7v4l9 4V3L3 7Z"/><path d="M12 6a3 3 0 0 1 0 6"/>',
 box:'<path d="M2.5 6 9 2.5 15.5 6v6L9 15.5 2.5 12V6Z"/><path d="M2.5 6 9 9.5 15.5 6M9 9.5v6"/>',doc:'<path d="M4.5 2.5h6L14 6v9.5H4.5Z"/><path d="M10.5 2.5V6H14"/><path d="M6.5 9h5M6.5 12h5"/>',
 user:'<circle cx="9" cy="6" r="3"/><path d="M3.5 15.5c.8-3 2.9-4.5 5.5-4.5s4.7 1.5 5.5 4.5"/>',mail:'<rect x="2.5" y="4" width="13" height="10" rx="1"/><path d="m3 5.5 6 4.5 6-4.5"/>',
 check:'<path d="M3.5 9.5 7 13l7.5-8"/>'};
function ic(n){return '<svg class="ico" viewBox="0 0 18 18" aria-hidden="true">'+I[n]+'</svg>'}

var MODES=[["public","Public site"],["portal","Society portal"],["staff","CCA staff"]];
var NAVS={
 public:[["home","Home"],["about","About Us"],["socs","Societies & Clubs"],["events","Events Calendar"],["resources","Resources"],["work","Work with Us"]],
 portal:[["dash","Dashboard"],["new","Start a Request"],["mine","My Requests"],["profile","Our Profile"]],
 staff:[["inbox","Request Inbox"],["cal","Venue Calendar"],["pubq","Website Queue"]]
};
function paintChrome(){
  $("#roles").innerHTML=MODES.map(function(m){return '<button class="role" data-mode="'+m[0]+'" aria-pressed="'+(S.mode===m[0])+'">'+m[1]+'</button>'}).join("");
  var nav=NAVS[S.mode];if(S.mode==="portal"&&!S.signed)nav=[];
  var cur={soc:"socs",event:"events",form:"new",sent:"new",req:"mine",sreq:"inbox"}[S.view]||S.view;
  $("#nav").innerHTML=nav.map(function(n){return '<button data-go="'+n[0]+'"'+(cur===n[0]?' aria-current="page"':'')+'>'+esc(n[1])+'</button>'}).join("");
  $("#officeTitle").textContent="Office of Co-Curricular Activities";
  document.querySelector(".brandtitle .bk").textContent=S.mode==="staff"?"CCA staff workspace":S.mode==="portal"?"Society portal":"LUMS Campus Life";
  $("#whoami").innerHTML=S.mode==="portal"&&S.signed?'<b>'+esc(soc(S.soc).short)+'</b>Society executive'
    :(S.mode==="staff"?'<b>Ayesha Arshad</b>CCA staff':'');
  $("#mailCount").textContent=EMAILS.length;
}
var SLIDES=[
 {pic:0,kick:"Welcome to CCA",title:"Find your people.<br>Do what matters.",text:"Every society, every event, and every way to get involved at LUMS \u2014 all in one place.",btn:["socs","Explore societies"]},
 {pic:2,kick:"Spring 2027",title:"Recruitment season<br>is open.",text:"Debate, film, startups, service and more. Applications close at the end of February.",btn:["socs","See who\u2019s recruiting"]},
 {pic:3,kick:"This week on campus",title:"Something on,<br>every evening.",text:"Screenings, open houses, workshops and tournaments, all approved and listed by CCA.",btn:["events","Open the calendar"]}
];
function heroBlock(){
  if(!(S.mode==="public"&&S.view==="home"))return "";
  return '<section class="slider" aria-roledescription="carousel" aria-label="Highlights">'
   +SLIDES.map(function(s,i){return '<div class="slide'+(i===S.slide?' on':'')+'" aria-hidden="'+(i!==S.slide)+'"><img class="bg" src="'+PIC[s.pic]+'" alt="">'
     +'<div class="inner"><div class="panel"><div class="kick">'+s.kick+'</div><h2>'+s.title+'</h2><div class="rule"></div><p>'+s.text+'</p>'
     +'<div class="row"><button class="btn gold" data-go="'+s.btn[0]+'"'+(i!==S.slide?' tabindex="-1"':'')+'>'+s.btn[1]+' '+ic("arrow")+'</button></div></div></div></div>'}).join("")
   +'<div class="sctl"><button class="sarr" data-slide="prev" aria-label="Previous slide">'+ic("back")+'</button>'
   +'<span class="dots">'+SLIDES.map(function(s,i){return '<button class="sdot" data-slide="'+i+'" aria-label="Slide '+(i+1)+'" aria-current="'+(i===S.slide)+'"></button>'}).join("")+'</span>'
   +'<button class="sarr" data-slide="next" aria-label="Next slide">'+ic("arrow")+'</button></div></section>';
}
function setSlide(n){
  S.slide=(n+SLIDES.length)%SLIDES.length;
  var sl=document.querySelectorAll(".slide"),dt=document.querySelectorAll(".sdot");
  for(var i=0;i<sl.length;i++){sl[i].classList.toggle("on",i===S.slide);sl[i].setAttribute("aria-hidden",i!==S.slide);
    var b=sl[i].querySelector(".btn");if(b){if(i===S.slide)b.removeAttribute("tabindex");else b.setAttribute("tabindex","-1")}}
  for(var k=0;k<dt.length;k++)dt[k].setAttribute("aria-current",k===S.slide);
}
if(!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches))
  setInterval(function(){var s=document.querySelector(".slider");if(s&&!s.matches(":hover")&&!s.contains(document.activeElement))setSlide(S.slide+1)},6500);
function statsBlock(){
  if(!(S.mode==="public"&&S.view==="home"))return "";
  var S4=[["45+","Societies &amp; Clubs"],["300+","Annual Events / Projects"],["1000+","Event Participants"],["2,078,005","Sponsorship Raised (PKR)"]];
  return '<div class="stats"><div class="inner"><h2 class="h2 sh">Quick facts</h2><div class="sg">'+S4.map(function(s){return '<div><div class="n tnum">'+s[0]+'</div><div class="l">'+s[1]+'</div></div>'}).join("")+'</div></div></div>';
}

function evCard(e){
  return '<button class="card" data-ev="'+e.id+'"><span class="ev"><span class="datebox"><span class="dd tnum">'+dnum(e.d)+'</span><span class="mm">'+dmon(e.d)+'</span></span>'
   +'<span class="body"><span class="when">'+esc(dayOf(e.d))+' &middot; '+esc(e.t)+'</span><span class="t">'+esc(e.title)+'</span>'
   +'<span class="d">'+esc(soc(e.soc).name)+'</span><span class="d">'+esc(e.venue)+'</span></span></span></button>';
}
function socCard(s){
  return '<button class="card photo" data-soc="'+s.id+'"><img src="'+PIC[s.pic]+'" alt=""><span class="body">'
   +'<span>'+(s.recruiting?'<span class="pill ok">Recruiting</span>':'<span class="pill grey">Applications closed</span>')+'</span>'
   +'<span class="t">'+esc(s.name)+'</span><span class="d">'+esc(s.tag)+'</span></span></button>';
}
var AUDIENCE=[
 ["New to LUMS",[["socs","Browse all societies"],["events","Orientation events"],["about","What CCA does"]]],
 ["Current students",[["socs","Join a society"],["events","Events calendar"],["resources","Policies and forms"]]],
 ["Faculty advisors",[["resources","Advisor handbook"],["about","How approvals work"],["work","Contact the office"]]],
 ["Parents & visitors",[["events","Public events"],["about","About campus life"],["work","Get in touch"]]]
];
function vHome(){
  var h='<div class="welcome"><h1 class="h1">Welcome to Campus Life</h1><div class="rule"></div>'
   +'<p class="lede">The Office of Co-Curricular Activities supports 45+ student societies at LUMS \u2014 the debates, festivals, '
   +'film nights, hackathons and service projects that make up life outside the classroom.</p></div>';
  h+='<div class="quick"><div class="qh">Quick menu</div><div class="grid g4">'
   +AUDIENCE.map(function(g){return '<div class="qcol"><h3 class="h3">'+esc(g[0])+'</h3><ul>'
     +g[1].map(function(l){return '<li><button data-go="'+l[0]+'">'+esc(l[1])+'</button></li>'}).join("")+'</ul></div>'}).join("")+'</div></div>';
  h+='<div class="grid ne">'
   +'<div class="sec"><div class="hd"><h2 class="h2">News</h2><button class="link" data-toast="In the live site this opens the CCA news archive.">All news</button></div><ul class="nlist">'
   +NEWS.map(function(n){return '<li><button data-toast="In the live site this opens the full story."><span class="when">'+esc(dnum(n.d)+" "+dmon(n.d)+" "+n.d.split("-")[0])+'</span><span class="t">'+esc(n.title)+'</span></button></li>'}).join("")+'</ul></div>'
   +'<div class="sec"><div class="hd"><h2 class="h2">Events</h2><button class="link" data-go="events">All events</button></div><ul class="elist">'
   +EVENTS.slice(0,4).map(function(e){return '<li><button data-ev="'+e.id+'"><span class="datebox"><span class="dd tnum">'+dnum(e.d)+'</span><span class="mm">'+dmon(e.d)+'</span></span>'
     +'<span class="b"><span class="t">'+esc(e.title)+'</span><span class="d">'+esc(e.t)+' &middot; '+esc(e.venue)+'</span></span></button></li>'}).join("")+'</ul></div></div>';
  h+='<div class="sec"><div class="hd"><h2 class="h2">Recruiting now</h2><button class="link" data-go="socs">All societies</button></div><div class="grid g3">'
   +SOCIETIES.filter(function(s){return s.recruiting}).slice(0,3).map(socCard).join("")+'</div></div>';
  h+='<div class="sec"><div class="hd"><h2 class="h2">Life at CCA</h2><button class="link" data-toast="In the live site this opens the full media gallery.">View all</button></div><div class="gallery">'
   +GALLERY.map(function(g){return '<figure><img src="'+PIC[g.pic]+'" alt="'+esc(g.cap)+'" loading="lazy"><figcaption>'+esc(g.cap)+'</figcaption></figure>'}).join("")+'</div></div>';
  return h;
}
var MENU=[
 ["Explore CCA",[["about","About Us"],["work","Work with Us"],["work","Contact"]]],
 ["Get involved",[["socs","Societies & Clubs"],["socs","Recruiting now"],["resources","Start a society"]]],
 ["Events",[["events","Events Calendar"],["events","Past events"]]],
 ["Resources",[["resources","Policies and forms"],["resources","Society handbook"],["resources","Templates"]]]
];
function vMenu(){
  return '<div class="overlay" id="sheet"><div class="mega"><div class="inner">'
   +'<div class="row" style="justify-content:space-between;align-items:center"><span class="kick" style="color:var(--cyan)">Menu</span><button class="xbtn" data-close="1" aria-label="Close menu">\u00d7</button></div>'
   +'<div class="mgrid">'+MENU.map(function(g){return '<div><h3>'+esc(g[0])+'</h3><ul>'
     +g[1].map(function(l){return '<li><button data-pub="'+l[0]+'">'+esc(l[1])+'</button></li>'}).join("")+'</ul></div>'}).join("")+'</div></div></div></div>';
}
function searchResults(){
  var q=S.gq.trim().toLowerCase();if(!q)return '<p class="small" style="color:#C3C6E0">Try \u201cdebate\u201d, \u201cfilm\u201d or \u201cLUMUN\u201d.</p>';
  var so=SOCIETIES.filter(function(s){return (s.name+" "+s.tag+" "+s.short+" "+s.cat).toLowerCase().indexOf(q)>=0}).slice(0,5);
  var ev=EVENTS.filter(function(e){return (e.title+" "+e.venue+" "+e.cat).toLowerCase().indexOf(q)>=0}).slice(0,5);
  if(!so.length&&!ev.length)return '<p class="small" style="color:#C3C6E0">Nothing matches \u201c'+esc(S.gq)+'\u201d.</p>';
  return (so.length?'<h3>Societies</h3><ul>'+so.map(function(s){return '<li><button data-soc="'+s.id+'">'+esc(s.name)+'</button></li>'}).join("")+'</ul>':'')
   +(ev.length?'<h3>Events</h3><ul>'+ev.map(function(e){return '<li><button data-ev="'+e.id+'">'+esc(e.title)+' <span>'+esc(dnum(e.d)+" "+dmon(e.d))+'</span></button></li>'}).join("")+'</ul>':'');
}
function vSearch(){
  return '<div class="overlay" id="sheet"><div class="mega"><div class="inner">'
   +'<div class="row" style="justify-content:space-between;align-items:center"><span class="kick" style="color:var(--cyan)">Search</span><button class="xbtn" data-close="1" aria-label="Close search">\u00d7</button></div>'
   +'<div class="search big">'+ic("search")+'<input id="gq" placeholder="Search for societies, events and much more\u2026" value="'+esc(S.gq)+'" aria-label="Search the site"></div>'
   +'<div id="gqr" class="mres">'+searchResults()+'</div></div></div></div>';
}
function vSocs(){
  var q=S.q.trim().toLowerCase();
  var list=SOCIETIES.filter(function(s){
    return (S.cat==="All"||s.cat===S.cat)&&(!q||(s.name+" "+s.tag+" "+s.cat+" "+s.short).toLowerCase().indexOf(q)>=0)});
  return '<div><div class="kick">Get involved</div><h1 class="h1">Societies &amp; Clubs</h1>'
   +'<p class="lede">LUMS has 45+ student-led societies. '+SOCIETIES.length+' are loaded in this prototype.</p></div>'
   +'<div class="sec"><div class="search">'+ic("search")+'<input id="q" placeholder="Search societies" value="'+esc(S.q)+'" aria-label="Search societies"></div>'
   +'<div class="chips"><button class="chip" data-cat="All" aria-pressed="'+(S.cat==="All")+'">All</button>'
   +CATS.map(function(c){return '<button class="chip" data-cat="'+esc(c)+'" aria-pressed="'+(S.cat===c)+'">'+esc(c)+'</button>'}).join("")+'</div>'
   +'<p class="small muted">'+list.length+' societ'+(list.length===1?"y":"ies")+(q?' matching \u201c'+esc(S.q)+'\u201d':'')+'</p>'
   +(list.length?'<div class="grid g3">'+list.map(socCard).join("")+'</div>':'<div class="note">Nothing matches that. Try a shorter word or clear the filters.</div>')
   +'</div>';
}
function vSoc(){
  var s=soc(S.p.id),evs=EVENTS.filter(function(e){return e.soc===s.id});
  return '<div><button class="back" data-go="socs">'+ic("back")+'Societies &amp; Clubs</button></div>'
   +'<div class="cover"><img src="'+PIC[s.pic]+'" alt=""></div>'
   +'<div><div>'+(s.recruiting?'<span class="pill ok">Recruiting</span>':'<span class="pill grey">Applications closed</span>')+'</div>'
   +'<h1 class="h1" style="margin-top:7px">'+esc(s.name)+'</h1><p class="lede">'+esc(s.tag)+'</p></div>'
   +'<div class="sec"><div class="hd"><h2 class="h2">About</h2></div><p>'+esc(s.about)+'</p></div>'
   +'<div class="sec"><div class="hd"><h2 class="h2">How to join</h2></div>'
   +(s.recruiting?'<div class="note ok"><b>Applications are open.</b> Apply by '+esc(s.deadline)+'.</div><div class="row"><button class="btn gold" data-toast="In the live site this opens the society\u2019s application form.">Apply to join '+ic("arrow")+'</button></div>'
     :'<div class="note"><b>Applications are closed for now.</b> Follow '+esc(s.insta)+' to hear when they open.</div>')+'</div>'
   +'<div class="sec"><div class="hd"><h2 class="h2">Upcoming events</h2><button class="link" data-go="events">View all</button></div>'
   +(evs.length?'<div class="grid g2">'+evs.map(evCard).join("")+'</div>':'<p class="muted small">No events listed yet this term.</p>')+'</div>'
   +'<div class="sec"><div class="hd"><h2 class="h2">Connect</h2></div><dl class="kv"><dt>Email</dt><dd>'+esc(s.email)+'</dd><dt>Instagram</dt><dd>'+esc(s.insta)+'</dd></dl>'
   +'<p class="small muted">Last updated '+esc(s.updated)+' &middot; kept current by the society through the portal.</p></div>';
}
function vEvents(){
  var up=S.evTab==="upcoming",list=up?EVENTS:PAST;
  var h='<div><div class="kick">Campus calendar</div><h1 class="h1">Events</h1></div>'
   +'<div class="sec"><div class="chips"><button class="chip" data-tab="upcoming" aria-pressed="'+up+'">Upcoming</button>'
   +'<button class="chip" data-tab="past" aria-pressed="'+(!up)+'">Past events</button></div>';
  if(up){
    h+='<p class="small muted">'+list.length+' approved events. Each came from a society request and went live the moment CCA approved it.</p>';
    var day="";
    for(var i=0;i<list.length;i++){ if(list[i].d!==day){day=list[i].d;h+='<p class="kick" style="margin-top:9px">'+esc(fmtD(day))+'</p>'} h+=evCard(list[i]) }
  }else{
    h+='<p class="small muted">Past events keep their page, so recaps and photos stay findable.</p>';
    h+=list.map(function(p){return '<div class="card"><span class="row" style="justify-content:space-between"><span class="t">'+esc(p.title)+'</span><span class="pill grey">Recap</span></span>'
      +'<span class="d">'+esc(soc(p.soc).name)+' &middot; '+esc(fmtD(p.d))+' &middot; '+esc(p.venue)+'</span></div>'}).join("");
  }
  return h+'</div>';
}
function vEvent(){
  var e=null;for(var i=0;i<EVENTS.length;i++)if(EVENTS[i].id===S.p.id)e=EVENTS[i];
  if(!e)return '<p>Event not found.</p>';
  var s=soc(e.soc);
  return '<div><button class="back" data-go="events">'+ic("back")+'Events Calendar</button></div>'
   +'<div class="cover" style="height:190px"><img src="'+PIC[e.pic]+'" alt=""></div>'
   +'<div><span class="pill gold">'+esc(e.open)+'</span><h1 class="h1" style="margin-top:8px">'+esc(e.title)+'</h1>'
   +'<button class="link" data-soc="'+s.id+'">'+esc(s.name)+' &rsaquo;</button></div>'
   +'<div class="sec"><dl class="kv"><dt>'+ic("cal")+'</dt><dd>'+esc(fmtD(e.d))+'<br><span class="small muted" style="font-weight:400">'+esc(e.t)+'</span></dd>'
   +'<dt>'+ic("pin")+'</dt><dd>'+esc(e.venue)+'<br><span class="small muted" style="font-weight:400">LUMS campus</span></dd></dl>'
   +'<div class="row"><button class="btn" data-toast="Registration opens in the live site.">Register '+ic("arrow")+'</button>'
   +'<button class="btn plain" data-toast="An .ics file downloads in the live site.">'+ic("cal")+'Add to calendar</button></div></div>'
   +'<div class="sec"><div class="hd"><h2 class="h2">About this event</h2></div><p>'+esc(e.blurb)+'</p></div>';
}
function vAbout(){
  var rows=[["Event approvals and the calendar","Programme Development","5 working days"],["Venue and auditorium bookings","Operations","3 working days"],
   ["PR, screens and the student mailer","Communications","2 working days"],["Sponsorship and NOCs","Programme Development + Finance","5 working days"]];
  return '<div><div class="kick">About</div><h1 class="h1">The Office of Co-Curricular Activities</h1>'
   +'<p class="lede">CCA supports 45+ student societies at LUMS: approving events, booking venues, clearing sponsorships and running the campus calendar.</p></div>'
   +'<div class="sec"><div class="hd"><h2 class="h2">Who handles what</h2></div><div class="tablewrap"><table><thead><tr><th>Area</th><th>Goes to</th><th>Usual reply</th></tr></thead><tbody>'
   +rows.map(function(r){return '<tr><td><b>'+r[0]+'</b></td><td>'+r[1]+'</td><td class="muted">'+r[2]+'</td></tr>'}).join("")
   +'</tbody></table></div><div class="note"><b>Every one of those arrives by email today.</b> The portal keeps the email but adds a status, a reference and a record that survives the council handover.</div></div>';
}
function vResources(){
  var rows=[["Society Handbook 2026\u201327","Policy","12 Jan 2027"],["Society Constitution template","Template","4 Sep 2026"],
   ["Event proposal guidelines","Policy","20 Oct 2026"],["Venue booking rules","Policy","3 Nov 2026"],
   ["Sponsorship and NOC policy","Policy","18 Dec 2026"],["Post-event report form","Template","12 Jan 2027"]];
  return '<div><div class="kick">Resources</div><h1 class="h1">Policies and forms</h1>'
   +'<p class="lede">One page per policy, each with the date it last changed. The FAQ links here instead of repeating the rules.</p></div>'
   +'<div class="sec"><div class="tablewrap"><table><thead><tr><th>Document</th><th>Type</th><th>Last updated</th></tr></thead><tbody>'
   +rows.map(function(r){return '<tr><td><b>'+r[0]+'</b></td><td><span class="pill grey">'+r[1]+'</span></td><td class="muted">'+r[2]+'</td></tr>'}).join("")
   +'</tbody></table></div></div>';
}
function vWork(){
  return '<div><div class="kick">Work with us</div><h1 class="h1">Partner with a LUMS society</h1>'
   +'<p class="lede">LUMS societies raised PKR 2,078,005 in sponsorship last year. Tell us what you are looking for and CCA routes it to the right society.</p></div>'
   +'<div class="sec"><div class="grid g3">'
   +'<div class="card"><span class="t">Sponsor an event</span><span class="d">Title, gold and stall packages across flagship events.</span></div>'
   +'<div class="card"><span class="t">Recruit on campus</span><span class="d">Career sessions, stalls and society partnerships.</span></div>'
   +'<div class="card"><span class="t">Run a workshop</span><span class="d">Skills sessions co-hosted with a relevant society.</span></div></div>'
   +'<div class="note"><b>This section is new.</b> Your call mentions collaboration opportunities, and right now a sponsor has nowhere to start. The enquiry form feeds the same request inbox staff already use.</div>'
   +'<div class="row"><button class="btn gold" data-toast="The enquiry form feeds the CCA request inbox.">Start an enquiry '+ic("arrow")+'</button></div></div>';
}

function vSignin(){
  return '<div><div class="kick">Society portal</div><h1 class="h1">Sign in</h1>'
   +'<p class="lede">For society presidents and their executive council. Sign-in uses the LUMS account, so CCA always knows which society a request came from.</p></div>'
   +'<div class="sec" style="max-width:440px"><div class="note"><b>Prototype.</b> No real accounts and no passwords here. Pick a society and continue.</div>'
   +'<label class="f">Sign in as<select id="whoSoc">'+SOCIETIES.map(function(s){return '<option value="'+s.id+'"'+(s.id===S.soc?' selected':'')+'>'+esc(s.name)+'</option>'}).join("")+'</select></label>'
   +'<button class="btn" id="signin">Continue with LUMS account '+ic("arrow")+'</button></div>';
}
function mineReqs(){return REQUESTS.filter(function(r){return r.soc===S.soc})}
function tile(n,l){return '<div class="tile"><div class="n tnum">'+esc(n)+'</div><div class="l">'+esc(l)+'</div></div>'}
function typeCard(t){return '<button class="card" data-type="'+t.id+'">'+ic(t.icon)+'<span class="t">'+esc(t.name)+'</span><span class="d">'+esc(t.blurb)+'</span><span class="small muted">Usual reply: '+esc(t.sla)+'</span></button>'}
function reqTable(list){
  if(!list.length)return '<p class="muted small">Nothing here yet.</p>';
  return '<div class="tablewrap"><table><thead><tr><th>Reference</th><th>Request</th><th>Type</th><th>Status</th></tr></thead><tbody>'
   +list.map(function(r){var st=STATUS[r.status];
     return '<tr class="clickable" data-req="'+esc(r.ref)+'"><td><span class="mono">'+esc(r.ref)+'</span></td>'
      +'<td><b>'+esc(r.title)+'</b><br><span class="small muted">'+esc(soc(r.soc).short)+'</span></td>'
      +'<td class="muted">'+esc(rtype(r.type).name)+'</td><td><span class="pill '+st.cls+'">'+esc(st.label)+'</span></td></tr>'}).join("")
   +'</tbody></table></div>';
}
function vDash(){
  var s=soc(S.soc),m=mineReqs();
  var open=m.filter(function(r){return r.status==="submitted"||r.status==="review"||r.status==="changes"}).length;
  var act=m.filter(function(r){return r.status==="changes"});
  var h='<div class="row" style="align-items:center;gap:13px;flex-wrap:nowrap"><span class="avatar" style="width:52px;height:52px;font-size:14px">'+esc(s.short)+'</span>'
   +'<span><span class="h2" style="font-family:var(--disp);font-weight:700;color:var(--head);display:block">'+esc(s.name)+'</span><span class="small muted">Signed in as a society executive</span></span></div>'
   +'<div class="grid g4">'+tile(open,"Open requests")+tile(EVENTS.filter(function(e){return e.soc===s.id}).length,"Events on the website")
   +tile(act.length,"Need your attention")+tile(s.recruiting?"Open":"Closed","Applications")+'</div>';
  if(act.length)h+='<div class="note warn"><b>CCA has asked for changes on '+esc(act[0].ref)+'.</b> '+esc(act[0].note||"")+' <button class="link" data-req="'+act[0].ref+'">Open the request</button></div>';
  h+='<div class="sec"><div class="hd"><h2 class="h2">Start a request</h2><span class="small muted">Everything CCA receives by email today</span></div>'
   +'<div class="grid g3">'+REQ_TYPES.map(typeCard).join("")+'</div></div>'
   +'<div class="sec"><div class="hd"><h2 class="h2">Recent activity</h2><button class="link" data-go="mine">All requests</button></div>'+reqTable(m.slice(0,4))+'</div>';
  return h;
}
function vNew(){
  return '<div><div class="kick">Society portal</div><h1 class="h1">Start a request</h1>'
   +'<p class="lede">Six things societies currently email CCA about. Each becomes a tracked request with a reference number \u2014 and CCA still gets the email.</p></div>'
   +'<div class="sec"><div class="grid g2">'+REQ_TYPES.map(typeCard).join("")+'</div>'
   +'<div class="note"><b>Why not just email?</b> An email has no status, no reference, and no record once the sender graduates. A request has all three, and CCA still receives a copy in Outlook for anyone who prefers working there.</div></div>';
}
function clashes(v,d,f,t){if(!v||!d||!f||!t)return [];return BOOKINGS.filter(function(b){return b.venue===v&&b.d===d&&!(t<=b.from||f>=b.to)})}
function fi(l,k,t,v){return '<label class="f">'+esc(l)+'<input data-d="'+k+'" type="'+t+'" value="'+esc(v||"")+'"></label>'}
function ta(l,v){return '<label class="f">'+esc(l)+'<textarea data-d="body" placeholder="A few lines is enough">'+esc(v||"")+'</textarea></label>'}
function checks(items,d){var sel=d.checks||[];return items.map(function(it){var on=sel.indexOf(it)>=0;
  return '<label class="check'+(on?" on":"")+'"><input type="checkbox" data-c="'+esc(it)+'"'+(on?" checked":"")+'>'+esc(it)+'</label>'}).join("")}
function vForm(){
  var t=rtype(S.p.type),d=S.draft;
  var h='<div><button class="back" data-go="new">'+ic("back")+'Request types</button>'
   +'<div class="kick" style="margin-top:7px">'+esc(soc(S.soc).name)+'</div><h1 class="h1">'+esc(t.name)+'</h1>'
   +'<p class="lede">'+esc(t.blurb)+' CCA usually replies within '+esc(t.sla)+'.</p></div><div class="sec">';
  if(t.id==="venue"){
    h+='<div class="grid g2"><label class="f">Venue<select data-d="venue"><option value="">Choose a venue</option>'
     +VENUES.map(function(v){return '<option value="'+v.id+'"'+(d.venue===v.id?' selected':'')+'>'+esc(v.name)+' \u2014 seats '+v.cap+'</option>'}).join("")+'</select></label>'
     +fi("Date","date","date",d.date||"2027-02-18")+fi("From","from","time",d.from||"18:00")+fi("To","to","time",d.to||"21:00")
     +fi("Expected attendance","att","number",d.att||"200")+'</div>'
     +'<label class="f">Setup needed<span class="checks">'+checks(["AV and projector","Microphones","Stage","Extra seating","Registration desk"],d)+'</span></label>'
     +ta("What is the booking for",d.body);
    if(d.venue){var cl=clashes(d.venue,d.date||"2027-02-18",d.from||"18:00",d.to||"21:00");
      h+=cl.length?'<div class="note bad"><b>'+esc(venue(d.venue).name)+' is already booked then.</b> '+esc(cl[0].by)+' holds it '+esc(cl[0].from)+'\u2013'+esc(cl[0].to)+' for '+esc(cl[0].what)+'. Pick another time or venue, or send it anyway and CCA will decide.</div>'
        :'<div class="note ok"><b>'+esc(venue(d.venue).name)+' is free then.</b> Seats '+venue(d.venue).cap+'. '+esc(venue(d.venue).notes)+'.</div>'}
  }else if(t.id==="pr"){
    h+='<label class="f">Where should this go<span class="checks">'+checks(["CCA Instagram","Student mailer","Campus screens","Notice boards","CCA website banner"],d)+'</span></label>'
     +'<div class="grid g2">'+fi("Publish on","date","date",d.date||"2027-02-15")+fi("Event date","date2","date",d.date2||"2027-02-22")+'</div>'
     +ta("Caption or copy to publish",d.body)
     +'<label class="f">Poster<span class="card" style="border-style:dashed;align-items:center;text-align:center;padding:20px"><span class="d">Upload poster (JPG or PNG)</span><span class="small muted">Prototype \u2014 upload disabled</span></span></label>';
  }else if(t.id==="event"){
    h+='<div class="grid g2">'+fi("Event title","title","text",d.title||"")
     +'<label class="f">Category<select data-d="cat">'+CATS.map(function(c){return '<option'+(d.cat===c?' selected':'')+'>'+esc(c)+'</option>'}).join("")+'</select></label>'
     +fi("Date","date","date",d.date||"2027-03-05")+fi("Start time","from","time",d.from||"18:00")
     +'<label class="f">Venue<select data-d="venue"><option value="">Choose a venue</option>'+VENUES.map(function(v){return '<option value="'+v.id+'"'+(d.venue===v.id?' selected':'')+'>'+esc(v.name)+'</option>'}).join("")+'</select></label>'
     +fi("Expected attendance","att","number",d.att||"120")+'</div>'+ta("Describe the event",d.body)
     +'<div class="note"><b>Approve once, publish everywhere.</b> When CCA approves this, the event appears on the website, on your society page and in the campus calendar. Nothing is retyped.</div>';
  }else if(t.id==="logistics"){
    h+='<label class="f">What do you need<span class="checks">'+checks(["Chairs","Tables","Sound system","Projector","Standees","Extension cables","Water coolers"],d)+'</span></label>'
     +'<div class="grid g2">'+fi("Deliver on","date","date",d.date||"2027-02-20")+fi("Deliver by","from","time",d.from||"15:00")
     +fi("Drop-off point","place","text",d.place||"Academic Block, Room 101")+fi("Collect after","to","time",d.to||"21:00")+'</div>'
     +ta("Anything else the logistics team should know",d.body);
  }else if(t.id==="noc"){
    h+='<div class="grid g2">'+fi("Company or organisation","title","text",d.title||"")
     +'<label class="f">Package<select data-d="cat"><option>Title sponsor</option><option>Gold</option><option>Silver</option><option>Stall only</option><option>In-kind</option></select></label>'
     +fi("Amount (PKR)","att","text",d.att||"")+fi("Society contact","place","text",d.place||"")+'</div>'
     +ta("What is being offered, and what does the sponsor get",d.body)
     +'<div class="note warn"><b>Finance rules apply.</b> A sponsorship over PKR 500,000 also needs the Treasurer\u2019s sign-off. The portal routes it automatically.</div>';
  }else{
    var s2=soc(S.soc);
    h+=ta("About the society",d.body||s2.about)
     +'<div class="grid g2">'+fi("How to join","title","text",d.title||(s2.recruiting?"Applications open until "+s2.deadline:"Applications closed"))
     +fi("Contact email","place","text",d.place||s2.email)+fi("Instagram","att","text",d.att||s2.insta)+'</div>'
     +'<div class="note"><b>CCA approves profile changes before they go live,</b> so the directory stays accurate without CCA having to type it.</div>';
  }
  h+='<hr class="rule"><div class="note"><b>'+ic("mail")+' A copy goes to email.</b> On submit, the portal emails cca@lums.edu.pk and '+esc(soc(S.soc).email)+' with the reference number, so the thread still exists in Outlook.</div>'
   +'<div class="row"><button class="btn gold" id="submitReq">Submit request '+ic("arrow")+'</button><button class="btn plain" data-go="new">Cancel</button></div></div>';
  return h;
}
function submitReq(){
  var t=rtype(S.p.type),d=S.draft,s=soc(S.soc);
  seq++;
  var ref="CCA-"+{venue:"AUD",pr:"PR",event:"EVT",logistics:"LOG",noc:"NOC",profile:"PRF"}[t.id]+"-0"+seq;
  var f={};
  if(t.id==="venue")f={Venue:(venue(d.venue)||{name:"Not chosen"}).name,Date:d.date||"18 February 2027",From:d.from||"18:00",To:d.to||"21:00",Attendance:d.att||"200",Setup:(d.checks||[]).join(", ")||"None"};
  else if(t.id==="pr")f={Channels:(d.checks||[]).join(", ")||"None chosen","Publish on":d.date||"15 February 2027","Event date":d.date2||"22 February 2027"};
  else if(t.id==="event")f={Title:d.title||"Untitled event",Category:d.cat||"Academic",Date:d.date||"2027-03-05",Time:d.from||"18:00",Venue:(venue(d.venue)||{name:"To be confirmed"}).name,Attendance:d.att||"120"};
  else if(t.id==="logistics")f={Items:(d.checks||[]).join(", ")||"None","Deliver on":d.date||"20 February 2027","Deliver by":d.from||"15:00","Drop-off":d.place||"Not given"};
  else if(t.id==="noc")f={Company:d.title||"Not given",Package:d.cat||"Gold",Amount:d.att||"Not given",Contact:d.place||"Not given"};
  else f={"How to join":d.title||"",Email:d.place||"",Instagram:d.att||""};
  var title=d.title||(t.id==="venue"?((venue(d.venue)||{name:"Venue"}).name+" booking"):t.name);
  REQUESTS.unshift({ref:ref,type:t.id,soc:S.soc,title:title,status:"submitted",created:"2027-02-14",fields:f,body:d.body||"",
    trail:[["Submitted by you ("+s.short+")","just now"],["Emailed to CCA and "+s.email,"just now"]],published:false});
  sendMail("cca@lums.edu.pk",s.email,"["+ref+"] New "+t.name.toLowerCase()+" \u2014 "+title,
    "A new request was submitted through the CCA website by "+s.name+". Open the request to approve, ask for changes or decline.");
  S.draft={};go("sent",{ref:ref});
}
function vSent(){
  var r=reqByRef(S.p.ref),s=soc(S.soc);
  return '<div style="text-align:center;display:flex;flex-direction:column;align-items:center;gap:11px">'
   +'<span class="avatar" style="width:56px;height:56px;border-color:var(--ok);background:var(--ok-bg);color:var(--ok)">'+ic("check")+'</span>'
   +'<h1 class="h1">Request submitted</h1>'
   +'<p class="lede" style="text-align:center">Your reference is <b class="mono">'+esc(r.ref)+'</b>. CCA usually replies within '+esc(rtype(r.type).sla)+'.</p></div>'
   +'<div class="note ok"><b>Two emails just went out.</b> One to cca@lums.edu.pk and one to '+esc(s.email)+', both carrying the reference number. Reply to either and it lands on this request.</div>'
   +'<div class="row" style="justify-content:center"><button class="btn" data-req="'+esc(r.ref)+'">Track this request '+ic("arrow")+'</button>'
   +'<button class="btn plain" data-go="dash">Back to dashboard</button></div>';
}
function vMine(){
  return '<div><div class="kick">'+esc(soc(S.soc).name)+'</div><h1 class="h1">My requests</h1>'
   +'<p class="lede">Every request this society has sent CCA, with its current status. No more searching a mailbox for what happened.</p></div>'
   +'<div class="sec">'+reqTable(mineReqs())+'</div>';
}
function vReq(staff){
  var r=reqByRef(S.p.ref);if(!r)return '<p>Request not found.</p>';
  var st=STATUS[r.status],s=soc(r.soc);
  var h='<div><button class="back" data-go="'+(staff?"inbox":"mine")+'">'+ic("back")+(staff?"Request Inbox":"My requests")+'</button>'
   +'<div class="row" style="justify-content:space-between;align-items:baseline;margin-top:7px"><span class="mono muted">'+esc(r.ref)+'</span><span class="pill '+st.cls+'">'+esc(st.label)+'</span></div>'
   +'<h1 class="h1">'+esc(r.title)+'</h1><p class="lede">'+esc(rtype(r.type).name)+' &middot; '+esc(s.name)+'</p></div>'
   +'<div class="sec"><div class="hd"><h3 class="h3">Details</h3></div><dl class="kv">';
  for(var k in r.fields)if(r.fields.hasOwnProperty(k))h+='<dt>'+esc(k)+'</dt><dd>'+esc(r.fields[k])+'</dd>';
  h+='</dl>'+(r.body?'<p class="small">'+esc(r.body)+'</p>':'')+'</div>';
  if(staff&&r.type==="venue"&&r.status!=="approved")h+='<div class="sec"><div class="hd"><h3 class="h3">Venue check</h3></div><div class="note ok"><b>No clash found.</b> The venue is free for the time requested.</div></div>';
  if(r.note&&!staff)h+='<div class="note warn"><b>CCA asked for changes.</b> '+esc(r.note)+'</div>';
  h+='<div class="sec"><div class="hd"><h3 class="h3">History</h3></div><ul class="steps">'
   +r.trail.map(function(t,i){return '<li><span class="dot '+(i===r.trail.length-1?"now":"done")+'"></span><span class="txt"><b>'+esc(t[0])+'</b><span>'+esc(t[1])+'</span></span></li>'}).join("")+'</ul></div>';
  if(staff){
    if(r.status==="approved"||r.status==="declined"){
      h+='<div class="note'+(r.status==="approved"?" ok":" bad")+'"><b>This request is '+esc(st.label.toLowerCase())+'.</b> '+(r.published?'It is live on the website.':'The society has been emailed.')+'</div>';
    }else{
      h+='<div class="sec"><div class="hd"><h3 class="h3">Decision</h3></div>';
      if(r.type==="event")h+='<label class="check on" style="align-self:flex-start"><input type="checkbox" id="pubToggle" checked>Publish to the website on approval</label>';
      h+='<div class="row"><button class="btn okb" data-act="approve" data-ref="'+esc(r.ref)+'">'+ic("check")+'Approve</button>'
       +'<button class="btn plain" data-act="changes" data-ref="'+esc(r.ref)+'">Request changes</button>'
       +'<button class="btn badb" data-act="decline" data-ref="'+esc(r.ref)+'">Decline</button></div>'
       +'<p class="small muted">Whichever you choose, the society is emailed automatically and the thread keeps the same reference.</p></div>';
    }
  }else if(r.status==="changes"){
    h+='<div class="row"><button class="btn gold" data-toast="In the live portal this reopens the form with your answers kept.">Update and resend '+ic("arrow")+'</button></div>';
  }
  return h;
}
function vInbox(){
  var f=S.inbox;
  var list=REQUESTS.filter(function(r){return f==="all"?true:(f==="open"?(r.status==="submitted"||r.status==="review"||r.status==="changes"):r.type===f)});
  return '<div><div class="kick">CCA staff</div><h1 class="h1">Request inbox</h1>'
   +'<p class="lede">Everything societies send this office by email today, in one queue with a status on each.</p></div>'
   +'<div class="grid g4">'+tile(REQUESTS.filter(function(r){return r.status==="submitted"||r.status==="review"}).length,"Waiting on CCA")
   +tile(REQUESTS.filter(function(r){return r.type==="venue"}).length,"Venue bookings")
   +tile(REQUESTS.filter(function(r){return r.status==="approved"}).length,"Approved")+tile(EMAILS.length,"Emails sent")+'</div>'
   +'<div class="sec"><div class="chips"><button class="chip" data-inbox="all" aria-pressed="'+(f==="all")+'">All</button>'
   +'<button class="chip" data-inbox="open" aria-pressed="'+(f==="open")+'">Waiting on us</button>'
   +REQ_TYPES.map(function(t){return '<button class="chip" data-inbox="'+t.id+'" aria-pressed="'+(f===t.id)+'">'+esc(t.name.split(" ")[0])+'</button>'}).join("")
   +'</div>'+reqTable(list)+'</div>';
}
function vCal(){
  return '<div><div class="kick">CCA staff</div><h1 class="h1">Venue calendar</h1>'
   +'<p class="lede">Who holds which space, and when. The booking form checks this before a society can double-book the auditorium.</p></div>'
   +'<div class="sec"><div class="tablewrap"><table><thead><tr><th>Venue</th><th>Date</th><th>Time</th><th>Society</th><th>Event</th></tr></thead><tbody>'
   +BOOKINGS.map(function(b){return '<tr><td><b>'+esc(venue(b.venue).name)+'</b></td><td class="tnum">'+esc(fmtD(b.d))+'</td><td class="tnum">'+esc(b.from)+'\u2013'+esc(b.to)+'</td><td>'+esc(b.by)+'</td><td class="muted">'+esc(b.what)+'</td></tr>'}).join("")
   +'</tbody></table></div><div class="note"><b>Capacity is checked too.</b> If a society books Room 101 for 300 people, the form says so before it reaches you.</div></div>';
}
function vPubQ(){
  return '<div><div class="kick">CCA staff</div><h1 class="h1">Website queue</h1>'
   +'<p class="lede">What is live on cca.lums.edu.pk right now, and where it came from. Nothing reaches the public site without passing through here.</p></div>'
   +'<div class="sec"><div class="tablewrap"><table><thead><tr><th>Event</th><th>Society</th><th>Date</th><th>Status</th></tr></thead><tbody>'
   +EVENTS.map(function(e){return '<tr><td><b>'+esc(e.title)+'</b></td><td class="muted">'+esc(soc(e.soc).name)+'</td><td class="tnum">'+esc(fmtD(e.d))+'</td><td><span class="pill ok">Live</span></td></tr>'}).join("")
   +'</tbody></table></div><div class="note"><b>Society profiles follow the same route.</b> A profile update sits here until CCA approves it, which is how the directory stops showing last year\u2019s council.</div></div>';
}
function decide(ref,act){
  var r=reqByRef(ref);if(!r)return;var s=soc(r.soc);
  if(act==="approve"){
    r.status="approved";r.trail.push(["Approved by Ayesha Arshad (CCA)","just now"]);
    var pub=$("#pubToggle");
    if(r.type==="event"&&(!pub||pub.checked)){
      r.published=true;r.trail.push(["Published to the website","just now"]);
      EVENTS.push({id:"n"+r.ref,soc:r.soc,title:r.fields.Title||r.title,d:/^\d{4}-/.test(r.fields.Date||"")?r.fields.Date:"2027-03-05",
        t:r.fields.Time||"6:00 PM",venue:r.fields.Venue||"To be confirmed",cat:r.fields.Category||"Academic",open:"Open to all",
        pic:Math.floor(Math.random()*PIC.length),blurb:r.body||"Details to follow."});
      toast("Approved \u2014 and it is now live on the public Events page");
    }else toast("Approved \u2014 "+s.short+" has been emailed");
    sendMail(s.email,"cca@lums.edu.pk","["+r.ref+"] Approved \u2014 "+r.title,"Your request has been approved by CCA."+(r.published?" The event is now live on the website.":""));
  }else if(act==="changes"){
    r.status="changes";r.note="Please add the missing details and resend.";
    r.trail.push(["Changes requested by Ayesha Arshad (CCA)","just now"]);
    sendMail(s.email,"cca@lums.edu.pk","["+r.ref+"] Changes requested \u2014 "+r.title,"CCA has asked for changes before this can be approved.");
    toast("Sent back to "+s.short+" with a note");
  }else{
    r.status="declined";r.trail.push(["Declined by Ayesha Arshad (CCA)","just now"]);
    sendMail(s.email,"cca@lums.edu.pk","["+r.ref+"] Declined \u2014 "+r.title,"CCA is unable to approve this request.");
    toast("Declined \u2014 "+s.short+" has been emailed");
  }
  render();
}
function gstep(t,d){return '<li><span class="dot done"></span><span class="txt"><b>'+esc(t)+'</b><span>'+esc(d)+'</span></span></li>'}
function vGuide(){
  return '<div class="sheet" id="sheet"><div class="box">'
   +'<div class="row" style="justify-content:space-between;align-items:center"><h2 class="h2">Demo guide</h2><button class="btn plain sm" data-close="1">Close</button></div>'
   +'<p class="small muted">A four-minute path through the prototype. The three buttons in the black bar switch roles.</p>'
   +'<ul class="steps" style="margin-top:14px">'
   +gstep("1 \u00b7 Open as a student","Public site \u2192 Societies & Clubs. Type \u201cdeb\u201d and watch the list filter as you type. Open LUMS Debating Society, then its event.")
   +gstep("2 \u00b7 Switch to a society executive","Society portal \u2192 sign in as LUMS Debating Society. Point at the dashboard: open requests, and one that needs attention.")
   +gstep("3 \u00b7 Book the auditorium","Start a Request \u2192 Auditorium or venue booking. Main Auditorium, 18 February, 6\u20139 PM. The clash with LUMUN appears before they can submit.")
   +gstep("4 \u00b7 Submit an event proposal","Start a Request \u2192 Event proposal. Fill it in and submit. Note the reference number and the two emails that go out.")
   +gstep("5 \u00b7 Approve it as CCA","CCA staff \u2192 Request Inbox. Open the new request and approve. Say the line: approve once, publish everywhere.")
   +gstep("6 \u00b7 Show it live","Public site \u2192 Events Calendar. The event is on the calendar. Then open the email trail to show nothing left Outlook behind.")
   +'</ul><div class="note" style="margin-top:14px"><b>If they ask what is real:</b> the colours, the Noto Sans type, the crest and the photographs are taken from lums.edu.pk and cca.lums.edu.pk. The data lives in the page, so anything approved during the demo resets on reload.</div></div></div>';
}
function vMailSheet(){
  return '<div class="sheet" id="sheet"><div class="box">'
   +'<div class="row" style="justify-content:space-between;align-items:center"><h2 class="h2">Email trail</h2><button class="btn plain sm" data-close="1">Close</button></div>'
   +'<p class="small muted">Every request and every decision also goes out as email, so CCA\u2019s record in Outlook stays complete. '+EMAILS.length+' sent in this session.</p>'
   +'<div class="grid" style="margin-top:14px;gap:9px">'
   +EMAILS.map(function(m){return '<div class="mail"><span class="s">'+esc(m.subj)+'</span><span class="m">To '+esc(m.to)+(m.cc?' &middot; cc '+esc(m.cc):'')+' &middot; '+esc(m.when)+'</span><span>'+esc(m.body)+'</span></div>'}).join("")
   +'</div></div></div>';
}
function render(){
  paintChrome();
  $("#hero").innerHTML=heroBlock();
  $("#stats").innerHTML=statsBlock();
  var h="";
  if(S.mode==="public"){
    h=({home:vHome,socs:vSocs,soc:vSoc,events:vEvents,event:vEvent,about:vAbout,resources:vResources,work:vWork}[S.view]||vHome)();
  }else if(S.mode==="portal"){
    h=S.signed?({dash:vDash,"new":vNew,form:vForm,sent:vSent,mine:vMine,req:function(){return vReq(false)},
      profile:function(){S.p={type:"profile"};return vForm()}}[S.view]||vDash)():vSignin();
  }else{
    h=({inbox:vInbox,cal:vCal,pubq:vPubQ,sreq:function(){return vReq(true)}}[S.view]||vInbox)();
  }
  $("#page").innerHTML=h;
  var o=$("#sheet");if(o)o.remove();
  if(S.sheet==="guide")document.body.insertAdjacentHTML("beforeend",vGuide());
  if(S.sheet==="mail")document.body.insertAdjacentHTML("beforeend",vMailSheet());
  if(S.sheet==="menu")document.body.insertAdjacentHTML("beforeend",vMenu());
  if(S.sheet==="search")document.body.insertAdjacentHTML("beforeend",vSearch());
  $("#menuBtn").setAttribute("aria-expanded",S.sheet==="menu");
  var q=S.sheet==="search"?$("#gq"):$("#q");if(q){q.focus();q.setSelectionRange(q.value.length,q.value.length)}
}
document.addEventListener("input",function(e){
  var t=e.target;
  if(t.id==="q"){S.q=t.value;render();return}
  if(t.id==="gq"){S.gq=t.value;$("#gqr").innerHTML=searchResults();return}
  if(t.hasAttribute&&t.hasAttribute("data-d")){S.draft[t.getAttribute("data-d")]=t.value;
    if(S.view==="form"&&S.p.type==="venue")render();}
});
document.addEventListener("change",function(e){
  var t=e.target;
  if(t.hasAttribute&&t.hasAttribute("data-c")){
    var v=t.getAttribute("data-c"),cur=S.draft.checks||[],i=cur.indexOf(v);
    if(i>=0)cur.splice(i,1);else cur.push(v);
    S.draft.checks=cur;t.parentNode.classList.toggle("on",i<0);return;
  }
  if(t.id==="whoSoc")S.soc=t.value;
});
document.addEventListener("keydown",function(e){if(e.key==="Escape"){togglePmenu(false);if(S.sheet){S.sheet=false;render()}}});
function togglePmenu(force){var m=$("#pmenu"),b=$("#portalBtn");var open=force!=null?force:m.hidden;m.hidden=!open;b.setAttribute("aria-expanded",open)}
document.addEventListener("click",function(e){
  if(!e.target.closest("#portalBtn")&&$("#pmenu"))togglePmenu(false);
  var t=e.target.closest("[data-mode],[data-go],[data-soc],[data-ev],[data-cat],[data-tab],[data-type],[data-req],[data-act],[data-inbox],[data-jump],[data-toast],[data-close],[data-slide],[data-pub],#signin,#submitReq,#guideBtn,#mailBtn,#themeBtn,#menuBtn,#searchBtn,#portalBtn,.sheet,.overlay");
  if(!t)return;
  var a=function(n){return t.getAttribute(n)};
  if((t.classList.contains("sheet")||t.classList.contains("overlay"))&&e.target===t){S.sheet=false;render();return}
  if(t.classList.contains("overlay")||t.classList.contains("sheet"))return;
  if(t.id==="portalBtn"){togglePmenu();return}
  if(t.id==="menuBtn"){S.sheet=S.sheet==="menu"?false:"menu";render();return}
  if(t.id==="searchBtn"){S.sheet=S.sheet==="search"?false:"search";render();return}
  if(a("data-slide")){var v=a("data-slide");setSlide(v==="prev"?S.slide-1:v==="next"?S.slide+1:+v);return}
  if(a("data-pub")){S.mode="public";go(a("data-pub"));return}
  if(a("data-close")){S.sheet=false;render();return}
  if(t.id==="guideBtn"){S.sheet=S.sheet==="guide"?false:"guide";render();return}
  if(t.id==="mailBtn"){S.sheet=S.sheet==="mail"?false:"mail";render();return}
  if(t.id==="themeBtn"){setTheme(document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark");return}
  if(a("data-mode")){S.mode=a("data-mode");S.sheet=false;
    S.view=S.mode==="public"?"home":(S.mode==="portal"?(S.signed?"dash":"signin"):"inbox");
    window.scrollTo({top:0,behavior:"instant"});render();return}
  if(a("data-jump")){S.sheet=false;if(a("data-jump")==="portal"){S.mode="portal";S.view=S.signed?"new":"signin"}else S.view=a("data-jump");
    window.scrollTo({top:0,behavior:"instant"});render();return}
  if(a("data-toast")){toast(a("data-toast"));return}
  if(t.id==="signin"){S.signed=true;go("dash");return}
  if(t.id==="submitReq"){submitReq();return}
  if(a("data-act")){decide(a("data-ref"),a("data-act"));return}
  if(a("data-cat")){S.cat=a("data-cat");render();return}
  if(a("data-tab")){S.evTab=a("data-tab");render();return}
  if(a("data-soc")){S.mode="public";S.sheet=false;go("soc",{id:a("data-soc")});return}
  if(a("data-ev")){S.mode="public";S.sheet=false;go("event",{id:a("data-ev")});return}
  if(a("data-type")){S.draft={};go("form",{type:a("data-type")});return}
  if(a("data-req")){S.view=S.mode==="staff"?"sreq":"req";S.p={ref:a("data-req")};window.scrollTo({top:0,behavior:"instant"});render();return}
  if(a("data-go")){go(a("data-go"));return}
});
function setTheme(m){document.documentElement.setAttribute("data-theme",m);
  var b=$("#themeBtn"),l=m==="dark"?"Switch to light mode":"Switch to dark mode";b.setAttribute("aria-label",l);b.setAttribute("title",l);
  try{localStorage.setItem("cca-theme",m)}catch(e){}}
(function(){var m="light";try{m=localStorage.getItem("cca-theme")||"light"}catch(e){}setTheme(m)})();
function syncProto(){var p=document.querySelector(".proto");if(p)document.documentElement.style.setProperty("--protoH",p.offsetHeight+"px")}
window.addEventListener("resize",syncProto);
render();syncProto();
})();
