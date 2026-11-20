/* CCA website: public site. Routing, rendering, motion and interactions.
   Content lives in data.js. Styling lives in styles.css. No libraries. */

(function(){
"use strict";
var $=function(s){return document.querySelector(s)};
var esc=function(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};
var MONTH=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var FULLM=["January","February","March","April","May","June","July","August","September","October","November","December"];
var DAY=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
function dayOf(iso){var p=iso.split("-");return DAY[new Date(+p[0],+p[1]-1,+p[2]).getDay()]}
function fmtD(iso){var p=iso.split("-");return dayOf(iso)+", "+(+p[2])+" "+FULLM[+p[1]-1]}
function dnum(i){return +i.split("-")[2]} function dmon(i){return MONTH[+i.split("-")[1]-1]}
function pad(n){return (n<10?"0":"")+n}
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}

var S={view:"home",p:{},q:"",cat:"All",rec:false,evTab:"upcoming",sheet:false,gq:""};
var RM=!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);
var FINE=!!(window.matchMedia&&window.matchMedia("(pointer: fine)").matches);
var READY=false,toastT=null;
function soc(id){for(var i=0;i<SOCIETIES.length;i++)if(SOCIETIES[i].id===id)return SOCIETIES[i];return SOCIETIES[0]}
function ev(id){for(var i=0;i<EVENTS.length;i++)if(EVENTS[i].id===id)return EVENTS[i];return null}
function toast(m){var o=$("#toast");if(o)o.remove();var d=document.createElement("div");d.className="toast";d.id="toast";d.setAttribute("role","status");d.textContent=m;document.body.appendChild(d);
  clearTimeout(toastT);toastT=setTimeout(function(){var t=$("#toast");if(t)t.remove()},3400)}

var I={search:'<circle cx="8" cy="8" r="5.5"/><path d="M12.5 12.5 16 16"/>',arrow:'<path d="M3 9h12M10 4l5 5-5 5"/>',back:'<path d="M15 9H3M8 4 3 9l5 5"/>',
 cal:'<rect x="2.5" y="3.5" width="13" height="12" rx="1.5"/><path d="M2.5 7h13M6 2v3M12 2v3"/>',pin:'<path d="M9 16s5.5-5 5.5-9A5.5 5.5 0 0 0 3.5 7c0 4 5.5 9 5.5 9Z"/><circle cx="9" cy="7" r="2"/>',
 clock:'<circle cx="9" cy="9" r="6.5"/><path d="M9 5.5V9l2.5 1.5"/>',users:'<circle cx="7" cy="6" r="2.5"/><path d="M2.5 15c.5-2.5 2.2-4 4.5-4s4 1.5 4.5 4"/><path d="M12 4a2.3 2.3 0 0 1 0 4.5M13.5 11c1.2.5 2 1.8 2.3 4"/>',
 doc:'<path d="M4.5 2.5h6L14 6v9.5H4.5Z"/><path d="M10.5 2.5V6H14"/><path d="M6.5 9h5M6.5 12h5"/>',mail:'<rect x="2.5" y="4" width="13" height="10" rx="1.5"/><path d="m3 5.5 6 4.5 6-4.5"/>',
 at:'<circle cx="9" cy="9" r="2.8"/><path d="M11.8 9v1.2a2 2 0 0 0 4 0V9A6.8 6.8 0 1 0 13 14.5"/>',close:'<path d="M4 4l10 10M14 4 4 14"/>',
 down:'<path d="M9 3v10M4.5 8.5 9 13l4.5-4.5M3.5 15.5h11"/>',check:'<path d="M3.5 9.5 7 13l7.5-8"/>',
 flag:'<path d="M4 16V2.5M4 3h9l-2 3.5 2 3.5H4"/>',grid:'<rect x="2.5" y="2.5" width="5" height="5" rx="1"/><rect x="10.5" y="2.5" width="5" height="5" rx="1"/><rect x="2.5" y="10.5" width="5" height="5" rx="1"/><rect x="10.5" y="10.5" width="5" height="5" rx="1"/>',
 build:'<rect x="3" y="2.5" width="12" height="13" rx="1"/><path d="M6.5 6h2M9.5 6h2M6.5 9h2M9.5 9h2M7.5 15.5v-3h3v3"/>',hand:'<path d="M2.5 10.5 6 8l3 1.5 3.5-3 3 2.5"/><path d="M2.5 14.5h13"/>',
 star:'<path d="M9 2.5l1.9 4 4.4.5-3.3 3 .9 4.3L9 12.1l-3.9 2.2.9-4.3-3.3-3 4.4-.5Z"/>'};
function ic(n){return '<svg class="ico" viewBox="0 0 18 18" aria-hidden="true">'+I[n]+'</svg>'}

var NAV=[["home","Home"],["about","About"],["socs","Societies"],["events","Events"],["resources","Resources"],["partner","Partner with us"]];
function go(v,p){S.view=v;S.p=p||{};S.sheet=false;jump(0);render()}

/* ---------- building blocks ---------- */
function logo(s){return s.logo?'<img src="'+esc(s.logo)+'" alt="'+esc(s.name)+' logo" loading="lazy">':'<span class="mono">'+esc(s.short)+'</span>'}
function status(s,glass){return s.recruiting?'<span class="tag ok">Recruiting</span>':'<span class="tag'+(glass?' glass':'')+'">Applications closed</span>'}
function socCard(s){
  return '<button class="scard" data-soc="'+s.id+'"><span class="slogo">'+logo(s)+'</span><span class="sbody">'
   +'<span class="tags">'+status(s)+'<span class="tag soft">'+esc(s.cat)+'</span></span>'
   +'<span class="sname">'+esc(s.name)+'</span><span class="stag">'+esc(s.tag)+'</span>'
   +'<span class="smore">View society '+ic("arrow")+'</span></span></button>';
}
function eventCard(e,i){
  var s=soc(e.soc);
  return '<button class="ecard v'+(i%4)+'" data-ev="'+e.id+'"><span class="edate"><b>'+dnum(e.d)+'</b><span>'+dmon(e.d)+'<i>'+dayOf(e.d).slice(0,3)+'</i></span></span>'
   +'<span class="ecat">'+esc(e.cat)+'</span><span class="etitle">'+esc(e.title)+'</span>'
   +'<span class="emeta">'+ic("clock")+esc(e.t)+'</span><span class="emeta">'+ic("pin")+esc(e.venue)+'</span>'
   +'<span class="esoc">'+(s.logo?'<span class="elogo"><img src="'+esc(s.logo)+'" alt=""></span>':'')+esc(s.name)+'</span></button>';
}
function pageHead(title,lead,extra,crumb){
  return '<section class="phead"><div class="glow" aria-hidden="true"></div><div class="orb" aria-hidden="true"></div><div class="wrap">'
   +(crumb?'<button class="crumb" data-go="'+crumb[0]+'">'+ic("back")+esc(crumb[1])+'</button>':'')
   +'<h1 class="display lg words rv">'+title+'</h1>'+(lead?'<p class="lead rv">'+lead+'</p>':'')+(extra||'')+'</div></section>';
}
function shead(title,link){return '<div class="shead"><h2 class="display md words rv">'+title+'</h2>'+(link?'<button class="tlink" data-go="'+link[0]+'">'+esc(link[1])+ic("arrow")+'</button>':'')+'</div>'}

/* ---------- home ---------- */
var FACTS=[["45+","societies and clubs"],["300+","events and projects a year"],["1000+","event participants"],["2,078,005","PKR raised in sponsorship by societies"]];
var KIN=["Debate","Theatre","Service","Polo","Radio","Film","Startups","Chess","Music","Photography","Treks","Policy"];
function coverflow(){
  var n=HIGHLIGHTS.length;
  return '<div class="cf" id="cf" aria-roledescription="carousel" aria-label="Society highlights"><div class="cfstage" id="cfstage">'
   +HIGHLIGHTS.map(function(h,i){var s=soc(h.soc);
     return '<div class="cfs" data-i="'+i+'" role="group" aria-roledescription="slide" aria-label="'+(i+1)+' of '+n+': '+esc(h.title)+'">'
      +'<img src="'+esc(h.src)+'" alt="'+esc(h.title+", "+s.name)+'" draggable="false"><span class="cfshade" aria-hidden="true"></span>'
      +'<div class="cfcap"><span class="cfsoc">'+(s.logo?'<span class="elogo"><img src="'+esc(s.logo)+'" alt=""></span>':'')+esc(s.name)+'</span>'
      +'<b>'+esc(h.title)+'</b><span class="cft">'+esc(h.text)+'</span><button class="cfgo" data-soc="'+s.id+'" tabindex="-1">Visit society '+ic("arrow")+'</button></div></div>'}).join("")
   +'</div><div class="wrap cfctl"><button class="cfb" data-cf="prev" aria-label="Previous highlight">'+ic("back")+'</button>'
   +'<span class="cfbar"><span id="cfbar"></span></span>'
   +'<button class="cfb" data-cf="next" aria-label="Next highlight">'+ic("arrow")+'</button></div></div>';
}
function vHome(){
  var withLogo=SOCIETIES.filter(function(s){return s.logo});
  var strip=withLogo.map(function(s){return '<button class="mlogo" data-soc="'+s.id+'" title="'+esc(s.name)+'" tabindex="-1"><img src="'+esc(s.logo)+'" alt="'+esc(s.name)+'"></button>'}).join("");
  var counts={};SOCIETIES.forEach(function(s){counts[s.cat]=(counts[s.cat]||0)+1});
  var rec=SOCIETIES.filter(function(s){return s.recruiting});
  var spot=soc("riayat");
  var kin=function(off){var w=KIN.slice(off).concat(KIN.slice(0,off));var row=w.map(function(x,i){return '<span class="kw'+(i%2?' o':'')+'">'+x+'</span><span class="ks">'+ic("star")+'</span>'}).join("");return row+row};

  var h='<section class="hero" id="hero"><canvas class="fx" id="fx" aria-hidden="true"></canvas><div class="grain" aria-hidden="true"></div>'
   +'<div class="hzoom"><div class="wrap htop" id="htop">'
   +'<h1 class="display xl words rv">45+ societies. <em>One campus.</em></h1>'
   +'<div class="hrow"><p class="lead rv">Debate, theatre, service, sport, tech and everything between. Find the society that fits you, and every event at LUMS this term.</p>'
   +'<div class="hfindw rv"><form class="hfind" id="hfind" role="search"><span class="hfi">'+ic("search")+'</span>'
   +'<input id="hq" name="q" placeholder="Find a society: debate, polo, film\u2026" aria-label="Find a society" autocomplete="off"><button type="submit">Search</button></form>'
   +'<div class="hcats"><span>Popular:</span>'+["Debate & MUN","Service","Sports","Arts & Culture"].map(function(c){return '<button data-catgo="'+esc(c)+'">'+esc(c)+'</button>'}).join("")+'</div></div></div>'
   +'</div>'+coverflow()+'</div></section>';

  h+='<section class="marq" aria-label="Some of the societies at LUMS"><p class="wrap mlabel">Home to societies like</p>'
   +'<div class="marquee"><div class="mtrack">'+strip+'<span class="mdup" aria-hidden="true">'+strip+'</span></div></div></section>';

  h+='<section class="sec erowsec"><div class="wrap"><div class="shead"><h2 class="display md words rv">What\u2019s <em>on</em></h2>'
   +'<div class="row"><button class="rbtn" data-row="-1" aria-label="Scroll events left">'+ic("back")+'</button><button class="rbtn" data-row="1" aria-label="Scroll events right">'+ic("arrow")+'</button>'
   +'<button class="tlink" data-go="events">Full calendar'+ic("arrow")+'</button></div></div></div>'
   +'<div class="ptrack" id="ptrack">'+EVENTS.map(eventCard).join("")
   +'<button class="emore" data-go="events"><span class="display sm on">The full <em>calendar</em></span>'+ic("arrow")+'</button></div></section>';

  h+='<section class="kin" aria-hidden="true"><div class="krow"><div class="ktrack">'+kin(0)+'</div></div><div class="krow rev"><div class="ktrack">'+kin(6)+'</div></div></section>';

  var tiles=CATS.map(function(c,i){return '<button class="cat k'+i+'" data-catgo="'+esc(c)+'"><span class="cn">'+(counts[c]||0)+'</span><span class="cname">'+esc(c)+'</span>'+ic("arrow")+'</button>'}).join("");
  var wall=withLogo.slice(0,12).map(function(s){return '<span><img src="'+esc(s.logo)+'" alt=""></span>'}).join("");
  h+='<section class="sec tint"><div class="wrap">'+shead("Find your <em>people</em>")
   +'<div class="bento rv"><button class="cat big" data-catgo="All"><span class="lwall" aria-hidden="true">'+wall+'</span><span class="cn">45+</span><span class="cname">Every society at LUMS</span><span class="cgo">Browse all '+ic("arrow")+'</span></button>'+tiles+'</div></div></section>';

  h+='<section class="sec"><div class="wrap spot"><figure class="sfig rv"><img src="img/photo/riayat.jpg" alt="Riayat LUMS Chapter with students from a partner school" loading="lazy"></figure>'
   +'<div class="stext"><span class="tag soft rv">Society spotlight</span><h2 class="display md words rv">'+esc(spot.name)+'</h2>'
   +'<p class="lead dark rv">'+esc(spot.about)+'</p>'
   +'<div class="row rv"><button class="btn solid mag" data-soc="'+spot.id+'">Visit the society '+ic("arrow")+'</button>'+status(spot)+'</div></div></div></section>';

  h+='<section class="sec tint"><div class="wrap">'+shead("Recruiting <em>now</em>",["socs","All societies"])
   +'<div class="rgrid">'+rec.slice(0,4).map(function(s){return '<button class="rcard rv" data-soc="'+s.id+'"><span class="rlogo">'+logo(s)+'</span>'
     +'<span class="rname">'+esc(s.name)+'</span><span class="rdate">'+ic("cal")+'Apply by '+esc(s.deadline)+'</span></button>'}).join("")+'</div></div></section>';

  h+='<section class="sec"><div class="wrap">'+shead("Moments from <em>campus</em>")
   +'<div class="mosaic">'+GALLERY.map(function(g,i){return '<button class="tile rv t'+i+'" data-soc="'+g.soc+'"><img src="'+g.src+'" alt="'+esc(g.cap)+'" loading="lazy"><span class="tcap">'+esc(g.cap)+'</span></button>'}).join("")+'</div></div></section>';

  h+='<section class="facts"><div class="glow" aria-hidden="true"></div><div class="orb" aria-hidden="true"></div><div class="wrap"><h2 class="display md on words rv">CCA in <em>numbers</em></h2><div class="fgrid4">'
   +FACTS.map(function(f){var n=+f[0].replace(/[^0-9]/g,""),suf=f[0].replace(/[0-9,]/g,"");
     return '<div class="fact rv"><span class="fn" data-to="'+n+'" data-suf="'+suf+'">'+esc(f[0])+'</span><span class="fl">'+esc(f[1])+'</span></div>'}).join("")
   +'</div></div></section>';

  h+='<section class="sec"><div class="wrap ncta"><div>'+shead("Latest <em>news</em>")
   +'<ul class="news">'+NEWS.map(function(n){return '<li class="rv"><button data-toast="In the live site this opens the full story."><span class="nd">'+dnum(n.d)+' '+dmon(n.d)+'</span><span class="nt">'+esc(n.title)+'</span>'+ic("arrow")+'</button></li>'}).join("")+'</ul></div>'
   +'<div class="cta rv"><div class="glow" aria-hidden="true"></div><h3 class="display sm on">Starting a new <em>society?</em></h3>'
   +'<p>The handbook covers registration, your constitution, and how events and sponsorships get approved.</p>'
   +'<button class="btn primary mag" data-go="resources">Read the handbook '+ic("arrow")+'</button></div></div></section>';
  return h;
}

/* ---------- societies ---------- */
function socList(){
  var q=S.q.trim().toLowerCase();
  return SOCIETIES.filter(function(s){
    return (S.cat==="All"||s.cat===S.cat)&&(!S.rec||s.recruiting)&&(!q||(s.name+" "+s.tag+" "+s.cat+" "+s.short).toLowerCase().indexOf(q)>=0)});
}
function socGrid(){var l=socList();return l.length?l.map(socCard).join(""):'<div class="empty">'+ic("search")+'<b>No society matches that.</b><span>Try a shorter word, or clear the filters.</span></div>'}
function socCount(){var n=socList().length;return n+' societ'+(n===1?"y":"ies")+(S.q.trim()?' matching “'+esc(S.q.trim())+'”':'')}
function vSocs(){
  return pageHead('Societies <em>&amp; clubs</em>','Debate, theatre, service, sport, tech and more. Find a society that fits you and see who is recruiting right now.',
    '<label class="hsearch rv">'+ic("search")+'<input id="q" placeholder="Search by name, interest or category" value="'+esc(S.q)+'" aria-label="Search societies" autocomplete="off"></label>')
   +'<section class="sec tight"><div class="wrap"><div class="filters"><button class="chip" data-cat="All" aria-pressed="'+(S.cat==="All")+'">All</button>'
   +CATS.map(function(c){return '<button class="chip" data-cat="'+esc(c)+'" aria-pressed="'+(S.cat===c)+'">'+esc(c)+'</button>'}).join("")
   +'<button class="chip rec" data-rec="1" aria-pressed="'+S.rec+'">'+ic("check")+'Recruiting now</button></div>'
   +'<p class="count" id="scount">'+socCount()+'</p><div class="sgrid" id="sgrid">'+socGrid()+'</div></div></section>';
}
function socPhotos(s){
  var out=[],seen={};
  function add(src,cap){if(src&&!seen[src]){seen[src]=1;out.push([src,cap])}}
  HIGHLIGHTS.forEach(function(h){if(h.soc===s.id)add(h.src,h.title)});
  GALLERY.forEach(function(g){if(g.soc===s.id)add(g.src,g.cap)});
  add(s.photo,s.name);
  return out;
}
function socFaq(s,evs){
  if(s.faq&&s.faq.length)return s.faq;
  var nx=evs[0];
  return [
    ["How do I join "+s.short+"?",s.recruiting?"Applications are open until "+s.deadline+". Use the Apply to join button on this page to send your application."
      :"Applications are closed right now. Follow "+s.insta+" on Instagram to hear when the next round opens."],
    ["Do I need any experience?","Not usually. If a role needs specific skills or experience, the application will say so."],
    ["What does "+s.short+" do?",s.about],
    ["When is the next event?",nx?nx.title+", on "+fmtD(nx.d)+" at "+nx.venue+".":"Nothing is listed for this term yet. New events appear on this page and in the Events calendar once CCA approves them."],
    ["How can I contact the society?","Email "+s.email+" or message "+s.insta+" on Instagram."]
  ];
}
function vSoc(){
  var s=soc(S.p.id),evs=EVENTS.filter(function(e){return e.soc===s.id});
  var idx=SOCIETIES.indexOf(s),next=SOCIETIES[(idx+1)%SOCIETIES.length],photos=socPhotos(s);
  var related=SOCIETIES.filter(function(o){return o.cat===s.cat&&o.id!==s.id});
  SOCIETIES.forEach(function(o){if(related.length<3&&o.id!==s.id&&o.recruiting&&related.indexOf(o)<0)related.push(o)});
  related=related.slice(0,3);
  var k=CATS.indexOf(s.cat);
  var cell=function(l,v){return '<div class="ssc"><span>'+l+'</span><b>'+v+'</b></div>'};
  var h='<section class="shero k'+k+(s.photo?' has':'')+'">'+(s.photo?'<img class="sbg" src="'+esc(s.photo)+'" alt="">':'')
   +'<div class="glow" aria-hidden="true"></div><div class="orb" aria-hidden="true"></div><span class="sart" aria-hidden="true">'+esc(s.short)+'</span><div class="wrap">'
   +'<button class="crumb" data-go="socs">'+ic("back")+'All societies</button>'
   +'<div class="sid"><span class="sbadge rv">'+logo(s)+'</span><div><div class="tags rv">'+status(s,true)+'<span class="tag glass">'+esc(s.cat)+'</span></div>'
   +'<h1 class="display lg words rv">'+esc(s.name)+'</h1><p class="lead rv">'+esc(s.tag)+'</p></div></div></div></section>';
  h+='<div class="wrap"><div class="sstats rv">'+cell("Category",esc(s.cat))+cell("Applications",s.recruiting?"Open until "+esc(s.deadline):"Closed for now")
   +cell("Upcoming events",evs.length?evs.length+" listed":"None yet")+cell("Instagram",esc(s.insta))+'</div></div>';
  h+='<section class="sec"><div class="wrap split"><div class="mainc">'
   +'<p class="pull rv">'+esc(s.about)+'</p>'
   +(photos.length?'<h2 class="display sm sub rv">In <em>pictures</em></h2><div class="sgal n'+Math.min(photos.length,3)+'">'+photos.map(function(p){return '<figure class="rv"><img src="'+esc(p[0])+'" alt="'+esc(p[1])+'" loading="lazy"><figcaption>'+esc(p[1])+'</figcaption></figure>'}).join("")+'</div>':'')
   +'<h2 class="display sm sub rv">Upcoming <em>events</em></h2>'
   +(evs.length?'<div class="egrid">'+evs.map(eventCard).join("")+'</div>':'<div class="empty left rv">'+ic("cal")+'<b>No events listed yet this term.</b><span>Follow '+esc(s.insta)+' to hear about the next one.</span></div>')
   +'<h2 class="display sm sub words rv">Frequently asked <em>questions</em></h2><div class="faq">'
   +socFaq(s,evs).map(function(f,i){return '<details class="rv"'+(i===0?' open':'')+'><summary>'+esc(f[0])+'<span class="fx-i" aria-hidden="true"></span></summary><p>'+esc(f[1])+'</p></details>'}).join("")
   +'</div></div><aside class="panel rv"><h3>How to join</h3>'
   +(s.recruiting?'<p>Applications are open until <b>'+esc(s.deadline)+'</b>.</p><button class="btn solid wide mag" data-toast="In the live site this opens the society’s application form.">Apply to join '+ic("arrow")+'</button>'
     :'<p>Applications are closed for now. Follow '+esc(s.insta)+' to hear when they open.</p>')
   +'<hr><h3>Connect</h3><p class="cline">'+ic("mail")+esc(s.email)+'</p><p class="cline">'+ic("at")+esc(s.insta)+'</p>'
   +'<p class="small">Last updated '+esc(s.updated)+'</p></aside></div></section>';
  h+='<section class="sec tint"><div class="wrap">'+shead("More in <em>"+esc(s.cat)+"</em>",["socs","All societies"])+'<div class="sgrid">'+related.map(socCard).join("")+'</div></div></section>';
  h+='<button class="nextsoc" data-soc="'+next.id+'"><span class="wrap"><span class="nl">Next society</span><span class="nn">'+esc(next.name)+'</span>'+ic("arrow")+'</span></button>';
  return h;
}

/* ---------- events ---------- */
function vEvents(){
  var up=S.evTab==="upcoming";
  var h=pageHead('Events <em>calendar</em>','Talks, screenings, tournaments and drives across campus, every one approved by CCA.',
    '<div class="tabs rv"><button class="tab" data-tab="upcoming" aria-pressed="'+up+'">Upcoming</button><button class="tab" data-tab="past" aria-pressed="'+(!up)+'">Past events</button></div>');
  h+='<section class="sec tight"><div class="wrap">';
  if(up){
    h+='<div class="tl">'+EVENTS.map(function(e){var s=soc(e.soc);
      return '<div class="tli rv"><div class="tld"><b>'+dnum(e.d)+'</b><span>'+dmon(e.d)+'</span><i>'+dayOf(e.d)+'</i></div>'
       +'<button class="tlc" data-ev="'+e.id+'"><span class="tags"><span class="tag soft">'+esc(e.cat)+'</span><span class="tag">'+esc(e.open)+'</span></span>'
       +'<span class="tlt">'+esc(e.title)+'</span><span class="tlm">'+ic("clock")+esc(e.t)+'<span class="sep"></span>'+ic("pin")+esc(e.venue)+'</span>'
       +'<span class="tls">'+(s.logo?'<span class="elogo"><img src="'+esc(s.logo)+'" alt=""></span>':'')+esc(s.name)+'</span>'+ic("arrow")+'</button></div>'}).join("")+'</div>';
  }else{
    h+='<div class="pgrid">'+PAST.map(function(p){var s=soc(p.soc);
      return '<button class="pcard rv" data-soc="'+s.id+'"><span class="pd">'+esc(fmtD(p.d))+' '+p.d.split("-")[0]+'</span><span class="pt">'+esc(p.title)+'</span>'
       +'<span class="ps">'+esc(s.name)+' · '+esc(p.venue)+'</span><span class="tag soft">Recap coming soon</span></button>'}).join("")+'</div>';
  }
  return h+'</div></section>';
}
function vEvent(){
  var e=ev(S.p.id);if(!e)return pageHead("Event not found","This event may have been removed.",'',["events","Events"]);
  var s=soc(e.soc);
  var h='<section class="phead ehead"><div class="glow" aria-hidden="true"></div><div class="orb" aria-hidden="true"></div><div class="wrap">'
   +'<button class="crumb" data-go="events">'+ic("back")+'All events</button>'
   +'<div class="eh"><div class="bigdate rv"><b>'+dnum(e.d)+'</b><span>'+FULLM[+e.d.split("-")[1]-1]+'</span><i>'+dayOf(e.d)+'</i></div>'
   +'<div><div class="tags rv"><span class="tag glass">'+esc(e.cat)+'</span><span class="tag ok">'+esc(e.open)+'</span></div><h1 class="display lg words rv">'+esc(e.title)+'</h1>'
   +'<button class="hostby rv" data-soc="'+s.id+'">'+(s.logo?'<span class="elogo"><img src="'+esc(s.logo)+'" alt=""></span>':'')+'Hosted by '+esc(s.name)+ic("arrow")+'</button></div></div></div></section>';
  h+='<section class="sec"><div class="wrap split"><div class="mainc"><h2 class="display sm rv">About this <em>event</em></h2><p class="pull rv">'+esc(e.blurb)+'</p></div>'
   +'<aside class="panel rv"><p class="cline">'+ic("cal")+esc(fmtD(e.d))+'</p><p class="cline">'+ic("clock")+esc(e.t)+'</p><p class="cline">'+ic("pin")+esc(e.venue)+', LUMS</p>'
   +'<button class="btn solid wide mag" data-toast="Registration opens in the live site.">Register '+ic("arrow")+'</button>'
   +'<button class="btn outline wide" data-toast="An .ics file downloads in the live site.">'+ic("cal")+'Add to calendar</button></aside></div></section>';
  return h;
}

/* ---------- about, resources, partner ---------- */
function vAbout(){
  var DO=[["flag","Approve events","Every society event is reviewed and approved by CCA before it goes on the campus calendar."],
    ["build","Book venues","Rooms, auditoriums and open spaces across campus, booked for society events and sessions."],
    ["hand","Clear sponsorships","Sponsorship approvals and no-objection certificates, so societies can work with partners."],
    ["users","Support student leaders","Guidance for councils on running a society, from the constitution to handover."]];
  return pageHead('About <em>CCA</em>','The Office of Co-Curricular Activities supports 45+ student societies at LUMS: approving events, booking venues, clearing sponsorships and running the campus calendar.')
   +'<section class="sec"><div class="wrap">'+shead("What we <em>do</em>")+'<div class="dgrid">'
   +DO.map(function(d,i){return '<div class="dcard rv"><span class="dnum">0'+(i+1)+'</span><span class="dic">'+ic(d[0])+'</span><h3>'+esc(d[1])+'</h3><p>'+esc(d[2])+'</p></div>'}).join("")
   +'</div></div></section>'
   +'<section class="sec tint"><div class="wrap split2"><div>'+shead("Get in <em>touch</em>")+'<p class="prose rv">For anything about societies, events or sponsorships, email the office. We usually reply within one working day.</p></div>'
   +'<div class="panel contact rv"><p class="cline">'+ic("mail")+'cca@lums.edu.pk</p><p class="cline">'+ic("clock")+'Monday to Friday, 9 AM to 5 PM</p><p class="cline">'+ic("pin")+'Office of Student Affairs, LUMS, DHA, Lahore</p></div></div></section>';
}
function vResources(){
  var D=[["Society Handbook 2026–27","Policy","12 Jan 2027","How societies are registered, run and handed over."],
    ["Society Constitution template","Template","4 Sep 2026","A starting point for new and existing societies."],
    ["Event proposal guidelines","Policy","20 Oct 2026","What CCA looks for before an event is approved."],
    ["Venue booking rules","Policy","3 Nov 2026","Which spaces can be booked, and how far ahead."],
    ["Sponsorship and NOC policy","Policy","18 Dec 2026","Working with sponsors and getting a no-objection certificate."],
    ["Post-event report form","Template","12 Jan 2027","A short report after every approved event."]];
  return pageHead('Policies <em>&amp; forms</em>','Every policy and template a society needs, with the date each one last changed.')
   +'<section class="sec tight"><div class="wrap"><div class="docs">'
   +D.map(function(d){return '<button class="doc rv" data-toast="In the live site this downloads the document."><span class="dic">'+ic("doc")+'</span>'
     +'<span class="dmain"><span class="dt">'+esc(d[0])+'</span><span class="dd">'+esc(d[3])+'</span></span><span class="tag soft">'+esc(d[1])+'</span>'
     +'<span class="ddate">Updated '+esc(d[2])+'</span><span class="ddl">'+ic("down")+'</span></button>'}).join("")
   +'</div></div></section>';
}
function vPartner(){
  var P=[["Sponsor an event","Title, gold and stall packages across flagship events like LUMUN, YLES and LUMICS."],
    ["Recruit on campus","Career sessions, stalls and partnerships with the societies closest to your field."],
    ["Run a workshop","Skills sessions co-hosted with a society, for students who want to learn by doing."]];
  return pageHead('Partner <em>with us</em>','LUMS societies raised PKR 2,078,005 in sponsorship last year. Tell us what you are looking for and CCA connects you with the right society.')
   +'<section class="sec"><div class="wrap"><div class="pgrid3">'
   +P.map(function(p,i){return '<div class="ocard rv k'+i+'"><span class="dnum">0'+(i+1)+'</span><h3 class="display sm">'+esc(p[0])+'</h3><p>'+esc(p[1])+'</p></div>'}).join("")
   +'</div><div class="cta wide rv"><div class="glow" aria-hidden="true"></div><h3 class="display sm on">Ready to <em>talk?</em></h3><p>Email cca@lums.edu.pk with what you have in mind, or start an enquiry and we will get back to you.</p>'
   +'<button class="btn primary mag" data-toast="In the live site this opens the partnership enquiry form.">Start an enquiry '+ic("arrow")+'</button></div></div></section>';
}

/* ---------- overlays ---------- */
function vMenu(){
  return '<div class="overlay" id="sheet" role="dialog" aria-label="Menu"><div class="glow" aria-hidden="true"></div><div class="wrap obar"><span></span><button class="ib" data-close="1" aria-label="Close menu">'+ic("close")+'</button></div>'
   +'<nav class="wrap olinks">'+NAV.map(function(n,i){return '<button data-go="'+n[0]+'" style="--i:'+i+'"><span>0'+(i+1)+'</span>'+esc(n[1])+'</button>'}).join("")+'</nav>'
   +'<div class="wrap ofoot">cca@lums.edu.pk · Monday to Friday, 9 AM to 5 PM</div></div>';
}
function searchResults(){
  var q=S.gq.trim().toLowerCase();if(!q)return '<p class="ohint">Try “debate”, “polo”, “film” or “LUMUN”.</p>';
  var so=SOCIETIES.filter(function(s){return (s.name+" "+s.tag+" "+s.short+" "+s.cat).toLowerCase().indexOf(q)>=0}).slice(0,6);
  var es=EVENTS.filter(function(e){return (e.title+" "+e.venue+" "+e.cat).toLowerCase().indexOf(q)>=0}).slice(0,5);
  if(!so.length&&!es.length)return '<p class="ohint">Nothing matches “'+esc(S.gq)+'”.</p>';
  return (so.length?'<h3>Societies</h3><div class="ores">'+so.map(function(s){return '<button data-soc="'+s.id+'"><span class="elogo">'+logo(s)+'</span>'+esc(s.name)+'</button>'}).join("")+'</div>':'')
   +(es.length?'<h3>Events</h3><div class="ores">'+es.map(function(e){return '<button data-ev="'+e.id+'"><span class="odate">'+dnum(e.d)+' '+dmon(e.d)+'</span>'+esc(e.title)+'</button>'}).join("")+'</div>':'');
}
function vSearch(){
  return '<div class="overlay" id="sheet" role="dialog" aria-label="Search"><div class="glow" aria-hidden="true"></div><div class="wrap obar"><span></span><button class="ib" data-close="1" aria-label="Close search">'+ic("close")+'</button></div>'
   +'<div class="wrap"><label class="hsearch big">'+ic("search")+'<input id="gq" placeholder="Search societies and events" value="'+esc(S.gq)+'" aria-label="Search the site" autocomplete="off"></label>'
   +'<div id="gqr" class="oresults">'+searchResults()+'</div></div></div>';
}

/* ---------- render ---------- */
function paintNav(){
  var cur={soc:"socs",event:"events"}[S.view]||S.view;
  $("#nav").innerHTML=NAV.map(function(n){return '<button data-go="'+n[0]+'"'+(cur===n[0]?' aria-current="page"':'')+'>'+esc(n[1])+'</button>'}).join("");
}
var lastView="";
function render(){
  paintNav();
  var v={home:vHome,socs:vSocs,soc:vSoc,events:vEvents,event:vEvent,about:vAbout,resources:vResources,partner:vPartner}[S.view]||vHome;
  var key=S.view+"|"+JSON.stringify(S.p),fresh=key!==lastView;lastView=key;
  var pg=$("#page");pg.innerHTML=v();
  if(fresh&&READY&&!RM){pg.classList.remove("enter");void pg.offsetWidth;pg.classList.add("enter")}
  document.body.setAttribute("data-view",S.view);
  var o=$("#sheet");if(o)o.remove();
  document.body.classList.toggle("locked",!!S.sheet);
  if(S.sheet==="menu")document.body.insertAdjacentHTML("beforeend",vMenu());
  if(S.sheet==="search")document.body.insertAdjacentHTML("beforeend",vSearch());
  $("#menuBtn").setAttribute("aria-expanded",S.sheet==="menu");
  var q=S.sheet==="search"?$("#gq"):null;if(q){q.focus();q.setSelectionRange(q.value.length,q.value.length)}
  enhance(fresh);cfInit();fxInit();onScroll();
}

/* ---------- reveal: words rise, blocks ease in, numbers count ---------- */
var io=null;
function splitWords(el){
  if(el.getAttribute("data-split"))return;el.setAttribute("data-split","1");var k=0;
  (function walk(node){[].slice.call(node.childNodes).forEach(function(ch){
    if(ch.nodeType===3){var parts=ch.textContent.split(/(\s+)/),frag=document.createDocumentFragment();
      parts.forEach(function(p){if(!p)return;if(/^\s+$/.test(p)){frag.appendChild(document.createTextNode(" "));return}
        var w=document.createElement("span");w.className="w";var i=document.createElement("span");i.textContent=p;i.style.transitionDelay=(k++*75)+"ms";w.appendChild(i);frag.appendChild(w)});
      node.replaceChild(frag,ch)}
    else if(ch.nodeType===1&&ch.tagName!=="BR")walk(ch)})})(el);
}
function enhance(fresh){
  var els=document.querySelectorAll("#page .rv");
  if(RM||!("IntersectionObserver" in window)){for(var k=0;k<els.length;k++)els[k].classList.add("in");return}
  var sp=document.querySelectorAll("#page .words");for(var j=0;j<sp.length;j++)splitWords(sp[j]);
  if(!READY)return;
  if(io)io.disconnect();
  io=new IntersectionObserver(function(es){es.forEach(function(en){if(!en.isIntersecting)return;en.target.classList.add("in");io.unobserve(en.target);
    var n=en.target.querySelector("[data-to]");if(n)countUp(n)})},{rootMargin:"0px 0px -8% 0px"});
  for(var i=0;i<els.length;i++){if(fresh){if(!els[i].classList.contains("words"))els[i].style.transitionDelay=(i%4)*80+"ms";io.observe(els[i])}else els[i].classList.add("in")}
}
function countUp(el){
  var to=+el.getAttribute("data-to"),suf=el.getAttribute("data-suf")||"",t0=null;
  function step(ts){if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/1600),e=1-Math.pow(1-p,4);
    el.textContent=(to>=10000?Math.round(to*e).toLocaleString("en-US"):Math.round(to*e))+suf;if(p<1)requestAnimationFrame(step)}
  requestAnimationFrame(step);
}

/* ---------- 3D highlights carousel ---------- */
var CF={pos:0,timer:null,drag:null,hover:false,step:1};
function cfSlides(){return document.querySelectorAll("#cfstage .cfs")}
function cfLayout(){
  var els=cfSlides(),n=els.length;if(!n)return;
  var w=els[0].offsetWidth;CF.step=w*(window.innerWidth<700?.74:.66);
  for(var i=0;i<n;i++){
    var o=i-CF.pos;o=((o%n)+n)%n;if(o>n/2)o-=n;
    var a=Math.abs(o),sg=o<0?-1:1;
    var x=sg*(a<=1?a*CF.step:CF.step+(a-1)*CF.step*.6);
    var sc=a<=1?1-.27*a:.73-.09*(a-1),rot=-sg*Math.min(a,1)*18;
    var op=a<2.2?1:Math.max(0,1-(a-2.2)*2);
    els[i].style.transform="translate(-50%,-50%) translateX("+x.toFixed(1)+"px) perspective(1600px) rotateY("+rot.toFixed(2)+"deg) scale("+sc.toFixed(3)+")";
    els[i].style.opacity=op.toFixed(3);els[i].style.zIndex=String(100-Math.round(a*10));
    els[i].style.setProperty("--dim",Math.min(a,1).toFixed(3));
    els[i].style.pointerEvents=op<.05?"none":"";
    var on=a<.5;els[i].classList.toggle("on",on);els[i].setAttribute("aria-hidden",on?"false":"true");
    var b=els[i].querySelector(".cfgo");if(b)b.tabIndex=on?0:-1;
  }
}
function cfIndex(){var n=cfSlides().length;return ((Math.round(CF.pos)%n)+n)%n}
function cfApply(){
  cfLayout();
  var bar=$("#cfbar");if(bar){bar.classList.remove("run");void bar.offsetWidth;bar.classList.add("run")}
  cfSchedule();
}
function cfSchedule(){
  clearTimeout(CF.timer);var cf=$("#cf");if(!cf)return;
  var paused=RM||CF.hover||!!CF.drag||document.hidden;cf.classList.toggle("paused",paused);
  if(!paused)CF.timer=setTimeout(function(){CF.pos=Math.round(CF.pos)+1;cfApply()},5600);
}
function cfGo(d){CF.pos=Math.round(CF.pos)+d;cfApply()}
function cfInit(){
  var cf=$("#cf");if(!cf||cf.getAttribute("data-on"))return;cf.setAttribute("data-on","1");
  cfApply();
  cf.addEventListener("mouseenter",function(){CF.hover=true;cfSchedule()});
  cf.addEventListener("mouseleave",function(){CF.hover=false;cfSchedule()});
  cf.addEventListener("keydown",function(e){if(e.key==="ArrowLeft"){cfGo(-1);e.preventDefault()}if(e.key==="ArrowRight"){cfGo(1);e.preventDefault()}});
  var st=$("#cfstage");
  st.addEventListener("pointerdown",function(e){if(e.button!==0)return;CF.drag={x:e.clientX,p:CF.pos,moved:false,t:e.target};st.classList.add("dragging");cfSchedule()});
}
window.addEventListener("pointermove",function(e){
  if(CF.drag){var dx=e.clientX-CF.drag.x;if(Math.abs(dx)>6)CF.drag.moved=true;if(CF.drag.moved){CF.pos=CF.drag.p-dx/CF.step;cfLayout()}}
  var c=e.target.closest&&e.target.closest(".scard,.rcard,.dcard,.doc,.tlc,.ecard,.cat,.ocard,.pcard");
  if(c){var r=c.getBoundingClientRect();c.style.setProperty("--mx",(e.clientX-r.left)+"px");c.style.setProperty("--my",(e.clientY-r.top)+"px")}
  magnet(e);
  FX.tx=e.clientX/window.innerWidth;FX.ty=e.clientY/window.innerHeight;
},{passive:true});
window.addEventListener("pointerup",function(e){
  if(!CF.drag)return;var d=CF.drag;CF.drag=null;var st=$("#cfstage");if(st)st.classList.remove("dragging");
  if(!d.moved){var sl=d.t.closest&&d.t.closest(".cfs");
    if(sl&&!d.t.closest("button")){var i=+sl.getAttribute("data-i"),n=cfSlides().length,cur=cfIndex(),o=i-cur;if(o>n/2)o-=n;if(o<-n/2)o+=n;
      if(o===0){go("soc",{id:HIGHLIGHTS[i].soc});return}CF.pos=Math.round(CF.pos)+o}}
  else CF.pos=Math.round(CF.pos);
  cfApply();
});
document.addEventListener("visibilitychange",cfSchedule);
window.addEventListener("resize",function(){cfLayout();fxSize()});

/* ---------- magnetic buttons ---------- */
var magEl=null;
function magnet(e){
  if(!FINE||RM)return;var m=e.target.closest&&e.target.closest(".mag");
  if(magEl&&magEl!==m){magEl.style.transform="";magEl=null}
  if(m){var r=m.getBoundingClientRect(),x=e.clientX-(r.left+r.width/2),y=e.clientY-(r.top+r.height/2);m.style.transform="translate("+(x*.22).toFixed(1)+"px,"+(y*.3).toFixed(1)+"px)";magEl=m}
}

function jump(y){window.scrollTo(0,y)}

function onScroll(){
  var y=window.scrollY;
  $("#site").classList.toggle("scrolled",y>12);
  var ht=$("#htop");if(ht&&!RM){var p=Math.min(1,y/700);ht.style.transform="translate3d(0,"+(y*.28).toFixed(1)+"px,0)";ht.style.opacity=(1-p*1.1).toFixed(3)}
}
window.addEventListener("scroll",onScroll,{passive:true});

/* ---------- WebGL flowing gradient behind the hero ---------- */
var FX={c:null,gl:null,raf:0,u:{},t0:0,mx:.5,my:.5,tx:.5,ty:.5};
var FRAG="precision mediump float;uniform vec2 r;uniform float t;uniform vec2 m;"
 +"float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}"
 +"float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}"
 +"float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p*=2.02;a*=.5;}return v;}"
 +"void main(){vec2 uv=gl_FragCoord.xy/r;vec2 p=uv*vec2(r.x/r.y,1.)*1.7;float tt=t*.045;"
 +"vec2 q=vec2(fbm(p+tt),fbm(p+vec2(5.2,1.3)-tt));"
 +"vec2 w=vec2(fbm(p+3.*q+vec2(1.7,9.2)+tt*1.4+m*.6),fbm(p+3.*q+vec2(8.3,2.8)-tt));"
 +"float f=fbm(p+3.2*w);"
 +"vec3 c=mix(vec3(.055,.02,.14),vec3(.16,.07,.38),clamp(f*1.5,0.,1.));"
 +"c=mix(c,vec3(.40,.22,.82),clamp(length(q)*.95-.32,0.,1.)*.8);"
 +"c=mix(c,vec3(.72,.62,.96),clamp(w.x*w.x*1.3-.3,0.,1.)*.32);"
 +"c+=vec3(1.,.66,0.)*pow(clamp(f-.6,0.,1.),2.)*.5;"
 +"float d=length((uv-vec2(.5,.62))*vec2(1.2,1.));c*=1.-.55*smoothstep(.25,1.05,d);"
 +"gl_FragColor=vec4(c,1.);}";
function fxSize(){if(!FX.gl)return;var s=Math.min(window.devicePixelRatio||1,2)*.5;FX.c.width=Math.round(FX.c.clientWidth*s);FX.c.height=Math.round(FX.c.clientHeight*s);FX.gl.viewport(0,0,FX.c.width,FX.c.height)}
function fxInit(){
  var c=$("#fx");if(!c||c===FX.c)return;
  cancelAnimationFrame(FX.raf);FX.c=c;FX.gl=null;
  var gl=c.getContext("webgl",{antialias:false,alpha:false,powerPreference:"low-power"});if(!gl)return;
  function sh(type,src){var s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return gl.getShaderParameter(s,gl.COMPILE_STATUS)?s:null}
  var vs=sh(gl.VERTEX_SHADER,"attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}"),fs=sh(gl.FRAGMENT_SHADER,FRAG);if(!vs||!fs)return;
  var pr=gl.createProgram();gl.attachShader(pr,vs);gl.attachShader(pr,fs);gl.linkProgram(pr);if(!gl.getProgramParameter(pr,gl.LINK_STATUS))return;
  gl.useProgram(pr);var b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  var loc=gl.getAttribLocation(pr,"a");gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  FX.gl=gl;FX.u={r:gl.getUniformLocation(pr,"r"),t:gl.getUniformLocation(pr,"t"),m:gl.getUniformLocation(pr,"m")};FX.t0=performance.now();
  fxSize();c.classList.add("live");
  (function frame(now){
    if(!FX.c||!document.body.contains(FX.c))return;
    if(!document.hidden&&window.scrollY<window.innerHeight*1.3){
      FX.mx+=(FX.tx-FX.mx)*.03;FX.my+=(FX.ty-FX.my)*.03;
      gl.uniform2f(FX.u.r,c.width,c.height);gl.uniform1f(FX.u.t,RM?12:(now-FX.t0)/1000+12);gl.uniform2f(FX.u.m,FX.mx-.5,.5-FX.my);
      gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
    }
    if(!RM)FX.raf=requestAnimationFrame(frame);
  })(performance.now());
}

/* ---------- input ---------- */
document.addEventListener("input",function(e){
  var t=e.target;
  if(t.id==="q"){S.q=t.value;$("#sgrid").innerHTML=socGrid();$("#scount").innerHTML=socCount();return}
  if(t.id==="gq"){S.gq=t.value;$("#gqr").innerHTML=searchResults();return}
});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&S.sheet){S.sheet=false;render()}});
document.addEventListener("submit",function(e){
  if(e.target.id!=="hfind")return;e.preventDefault();
  S.q=($("#hq").value||"").trim();S.cat="All";S.rec=false;go("socs");
});
document.addEventListener("click",function(e){
  var t=e.target.closest("[data-go],[data-soc],[data-ev],[data-cat],[data-catgo],[data-rec],[data-tab],[data-toast],[data-close],[data-cf],[data-row],#searchBtn,#menuBtn,#themeBtn,.overlay");
  if(!t)return;
  var a=function(n){return t.getAttribute(n)};
  if(t.classList.contains("overlay")){if(e.target===t||e.target.classList.contains("glow")){S.sheet=false;render()}return}
  if(a("data-close")){S.sheet=false;render();return}
  if(a("data-cf")){cfGo(a("data-cf")==="next"?1:-1);return}
  if(a("data-row")){var tr=$("#ptrack");if(tr)tr.scrollBy({left:(+a("data-row"))*Math.round(tr.clientWidth*.8),behavior:RM?"auto":"smooth"});return}
  if(t.id==="menuBtn"){S.sheet=S.sheet==="menu"?false:"menu";render();return}
  if(t.id==="searchBtn"){S.sheet=S.sheet==="search"?false:"search";render();return}
  if(t.id==="themeBtn"){setTheme(document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark");return}
  if(a("data-toast")){toast(a("data-toast"));return}
  if(a("data-cat")){S.cat=a("data-cat");render();return}
  if(a("data-catgo")){S.cat=a("data-catgo");S.rec=false;S.q="";go("socs");return}
  if(a("data-rec")){S.rec=!S.rec;render();return}
  if(a("data-tab")){S.evTab=a("data-tab");render();return}
  if(a("data-soc")){go("soc",{id:a("data-soc")});return}
  if(a("data-ev")){go("event",{id:a("data-ev")});return}
  if(a("data-go")){go(a("data-go"));return}
});
function setTheme(m){document.documentElement.setAttribute("data-theme",m);
  var b=$("#themeBtn"),l=m==="dark"?"Switch to light mode":"Switch to dark mode";b.setAttribute("aria-label",l);b.setAttribute("title",l);
  try{localStorage.setItem("cca-theme",m)}catch(e){}}
(function(){var m="light";try{m=localStorage.getItem("cca-theme")||"light"}catch(e){}setTheme(m)})();

/* ---------- loader: the crest rises with progress, then the curtain lifts and the hero zooms in ---------- */
function ready(){
  READY=true;document.body.classList.add("ready");
  var els=document.querySelectorAll("#page .rv");for(var i=0;i<els.length;i++)els[i].style.transitionDelay="";
  enhance(true);cfSchedule();
}
function boot(){
  render();
  var L=$("#loader");
  if(!L){ready();return}
  var srcs=HIGHLIGHTS.slice(0,3).map(function(h){return h.src}).concat(["img/lums-white.png"]),done=0,t0=performance.now(),shown=0;
  srcs.forEach(function(s){var im=new Image();im.onload=im.onerror=function(){done++};im.src=s});
  var minT=RM?200:1700,maxT=5000;
  (function tick(now){
    var el=Math.max(0,now-t0),target=el>maxT?1:Math.min(done/srcs.length,el/minT);
    shown+=(target*100-shown)*(RM?1:.09);if(target>=1&&shown>99.4)shown=100;
    L.style.setProperty("--p",(shown/100).toFixed(3));
    if(shown<100){requestAnimationFrame(tick);return}
    L.classList.add("out");
    setTimeout(ready,RM?0:520);
    setTimeout(function(){if(L.parentNode)L.parentNode.removeChild(L)},RM?400:1700);
  })(t0);
}
boot();
})();
