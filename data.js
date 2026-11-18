/* CCA website — content and sample data.
   Safe to edit: societies, events, venues, request types, bookings.
   Everything here is plain data. No logic lives in this file. */

var VENUES=[
 {id:"aud",name:"Main Auditorium",cap:450,notes:"Full AV, stage, green room"},
 {id:"sse",name:"SSE Auditorium",cap:280,notes:"Tiered seating, projector"},
 {id:"sdsb",name:"SDSB Auditorium",cap:220,notes:"Mics and projector"},
 {id:"ab101",name:"Academic Block, Room 101",cap:60,notes:"Flat room, movable chairs"},
 {id:"pdc",name:"PDC Hall",cap:120,notes:"Workshops and sessions"},
 {id:"khoka",name:"Khoka Area",cap:300,notes:"Open air, sound permit needed"},
 {id:"lawn",name:"Main Lawn",cap:600,notes:"Open air, generator required"},
 {id:"sports",name:"Sports Complex Ground",cap:400,notes:"Outdoor, daylight preferred"}
];
var CATS=["Academic","Arts & Culture","Debate & MUN","Service","Sports","Tech","Media"];
var SOCIETIES=[
 {id:"lds",name:"LUMS Debating Society",short:"LDS",cat:"Debate & MUN",tag:"Debates, public speaking and tournaments",recruiting:true,deadline:"28 February 2027",pic:2,
  about:"We bring together students who care about ideas, argument and public speaking. Members compete nationally and host debates for the LUMS community.",
  council:[["Areeb Khan","President"],["Noor Ali","Vice President"],["Hiba Ahmed","General Secretary"],["Omar Saeed","Treasurer"]],
  email:"debating@lums.edu.pk",insta:"@lumsdebates",updated:"8 February 2027"},
 {id:"lumun",name:"LUMUN Society",short:"LUMUN",cat:"Debate & MUN",tag:"Pakistan's largest Model United Nations",recruiting:true,deadline:"20 February 2027",pic:3,
  about:"LUMUN runs the country's largest Model United Nations conference and trains delegates through the year.",
  council:[["Fatima Raza","Secretary General"],["Daniyal Asif","Director General"],["Mehreen Shah","USG Operations"],["Ali Haider","Treasurer"]],
  email:"lumun@lums.edu.pk",insta:"@lumun",updated:"2 February 2027"},
 {id:"les",name:"LUMS Entrepreneurial Society",short:"LES",cat:"Academic",tag:"Startups, YLES and founder workshops",recruiting:true,deadline:"25 February 2027",pic:4,
  about:"LES runs YLES, the Young Leaders and Entrepreneurs Summit, plus pitch nights and workshops for student founders.",
  council:[["Zoya Iqbal","President"],["Hamza Tariq","Vice President"],["Sana Mir","Director Operations"],["Bilal Ahmed","Treasurer"]],
  email:"les@lums.edu.pk",insta:"@lumsles",updated:"11 February 2027"},
 {id:"tes",name:"The Economics Society",short:"TES",cat:"Academic",tag:"Economics, policy and LUMICS",recruiting:true,deadline:"24 February 2027",pic:5,
  about:"TES runs LUMICS, reading groups and policy discussions, and brings economists to campus through the year.",
  council:[["Ayesha Nadeem","President"],["Muhammad Mustafa","Director HR"],["Taha Siddiqui","Director Events"],["Rida Khan","Treasurer"]],
  email:"tes@lums.edu.pk",insta:"@tes.lums",updated:"9 February 2027"},
 {id:"spades",name:"SPADES",short:"SPADES",cat:"Tech",tag:"Science, technology and innovation",recruiting:true,deadline:"28 February 2027",pic:1,
  about:"SPADES runs hackathons, build nights and science outreach for students across schools.",
  council:[["Khadija Khalid","President"],["Usman Javed","Vice President"],["Laiba Amir","Director Tech"],["Ahmed Raza","Treasurer"]],
  email:"spades@lums.edu.pk",insta:"@spades.lums",updated:"5 February 2027"},
 {id:"lcss",name:"LUMS Community Service Society",short:"LCSS",cat:"Service",tag:"Volunteering, drives and outreach",recruiting:true,deadline:"18 February 2027",pic:0,
  about:"LCSS runs volunteering drives, school partnerships and community projects in and around Lahore.",
  council:[["Maryam Shafiq","President"],["Hassan Ali","Vice President"],["Zara Butt","Director Projects"],["Faizan Khan","Treasurer"]],
  email:"lcss@lums.edu.pk",insta:"@lcss.lums",updated:"13 February 2027"},
 {id:"lps",name:"LUMS Photography Society",short:"LPS",cat:"Arts & Culture",tag:"Photo walks, workshops and exhibitions",recruiting:false,deadline:"",pic:2,
  about:"LPS runs photo walks, darkroom and editing workshops, and an annual exhibition.",
  council:[["Imran Yousaf","President"],["Alina Raza","Vice President"],["Sameer Khan","Director Exhibits"],["Mahnoor Ali","Treasurer"]],
  email:"photography@lums.edu.pk",insta:"@lumsphoto",updated:"29 January 2027"},
 {id:"lcs",name:"LUMS Culture Society",short:"LCS",cat:"Arts & Culture",tag:"Celebrating culture through art and events",recruiting:true,deadline:"22 February 2027",pic:3,
  about:"LCS puts on cultural nights, music and food festivals, and celebrates the regions students come from.",
  council:[["Maha Aurangzeb","President"],["Shanzay Malik","Vice President"],["Arslan Qadir","Director Events"],["Hania Tariq","Treasurer"]],
  email:"culture@lums.edu.pk",insta:"@lumsculture",updated:"10 February 2027"},
 {id:"rizq",name:"RIZQ LUMS",short:"RIZQ",cat:"Service",tag:"Fighting food waste and hunger",recruiting:true,deadline:"26 February 2027",pic:4,
  about:"The LUMS chapter of RIZQ collects surplus food and runs hunger-relief drives with partner kitchens.",
  council:[["Ibrahim Saleem","President"],["Nimra Ashraf","Vice President"],["Talha Nawaz","Director Ops"],["Eman Zafar","Treasurer"]],
  email:"rizq@lums.edu.pk",insta:"@rizq.lums",updated:"6 February 2027"},
 {id:"las",name:"LUMS Adventure Society",short:"LAS",cat:"Sports",tag:"Treks, climbs and expeditions",recruiting:true,deadline:"27 February 2027",pic:1,
  about:"LAS takes students to the northern areas for treks and climbs, and runs training sessions on campus.",
  council:[["Ryef Taimur","President"],["Hamza Kashif","Vice President"],["Sana Zahid","Director Treks"],["Owais Malik","Treasurer"]],
  email:"adventure@lums.edu.pk",insta:"@lumsadventure",updated:"12 February 2027"},
 {id:"lmas",name:"LUMS Media Arts Society",short:"LMAS",cat:"Media",tag:"Film, design and student media",recruiting:false,deadline:"",pic:5,
  about:"LMAS makes short films, runs design jams and covers campus events in photo and video.",
  council:[["Danish Iqbal","President"],["Areesha Noor","Vice President"],["Saad Mahmood","Director Film"],["Komal Riaz","Treasurer"]],
  email:"media@lums.edu.pk",insta:"@lumsmedia",updated:"3 February 2027"},
 {id:"lls",name:"LUMS Literary Society",short:"LLS",cat:"Arts & Culture",tag:"Writing, open mics and the annual journal",recruiting:true,deadline:"21 February 2027",pic:2,
  about:"LLS runs open mics, writing circles and publishes the student literary journal each spring.",
  council:[["Sara Qureshi","President"],["Abdullah Riaz","Vice President"],["Mishal Ahsan","Editor"],["Zain Abbas","Treasurer"]],
  email:"literary@lums.edu.pk",insta:"@lumslit",updated:"4 February 2027"}
];
var NEWS=[
 {d:"2027-02-12",title:"Spring recruitment opens for 30+ societies"},
 {d:"2027-02-06",title:"LUMUN 2027 confirms record international delegation"},
 {d:"2027-01-29",title:"New venue booking process: one request, one reference"},
 {d:"2027-01-21",title:"CCA Excellence Awards: nominations now open"}
];
var GALLERY=[
 {pic:0,cap:"Society fair on the Main Lawn"},{pic:2,cap:"Debate Open House"},{pic:3,cap:"Film & Conversation"},
 {pic:4,cap:"YLES founder workshop"},{pic:5,cap:"LUMICS opening ceremony"},{pic:1,cap:"SPADES tech expo"}
];
var EVENTS=[
 {id:"e1",soc:"lds",title:"Debate Open House",d:"2027-02-18",t:"6:00–8:00 PM",venue:"Academic Block, Room 101",cat:"Debate & MUN",open:"Open to all",pic:2,
  blurb:"Curious about debating? An informal evening of short debates, practical tips and conversation with the current council. No experience needed."},
 {id:"e2",soc:"lcs",title:"Film & Conversation",d:"2027-02-20",t:"5:30–8:00 PM",venue:"SSE Auditorium",cat:"Arts & Culture",open:"Open to all",pic:3,
  blurb:"A screening of a Pakistani short film, followed by a conversation with its director."},
 {id:"e3",soc:"lcss",title:"Community Clean-up",d:"2027-02-22",t:"10:00 AM–1:00 PM",venue:"Main Lawn",cat:"Service",open:"Sign-up required",pic:0,
  blurb:"A morning clean-up drive on campus and the surrounding streets. Gloves and bags provided."},
 {id:"e4",soc:"les",title:"Founders' Pitch Night",d:"2027-02-25",t:"6:30–9:00 PM",venue:"SDSB Auditorium",cat:"Academic",open:"Open to all",pic:4,
  blurb:"Eight student teams pitch to a panel of founders and investors. Audience vote decides the people's choice award."},
 {id:"e5",soc:"spades",title:"Build Night: Hardware",d:"2027-02-26",t:"7:00–11:00 PM",venue:"PDC Hall",cat:"Tech",open:"Sign-up required",pic:1,
  blurb:"Bring a project or join one. Components, soldering stations and mentors on hand."},
 {id:"e6",soc:"lumun",title:"LUMUN 2027 Delegate Training",d:"2027-03-02",t:"5:00–7:00 PM",venue:"Academic Block, Room 101",cat:"Debate & MUN",open:"Members only",pic:5,
  blurb:"Rules of procedure, position papers and a mock committee session for first-time delegates."}
];
var PAST=[
 {id:"p1",soc:"lumun",title:"LUMUN 2026",d:"2026-01-15",venue:"Campus-wide"},
 {id:"p2",soc:"tes",title:"LUMICS V",d:"2026-11-08",venue:"Main Auditorium"},
 {id:"p3",soc:"rizq",title:"Winter Food Drive",d:"2026-12-12",venue:"Khoka Area"}
];
var BOOKINGS=[
 {venue:"aud",d:"2027-02-18",from:"17:00",to:"21:00",by:"LUMUN Society",what:"LUMUN 2027 opening ceremony"},
 {venue:"aud",d:"2027-02-24",from:"14:00",to:"18:00",by:"The Economics Society",what:"LUMICS speaker session"},
 {venue:"sse",d:"2027-02-20",from:"17:30",to:"20:00",by:"LUMS Culture Society",what:"Film & Conversation"},
 {venue:"sdsb",d:"2027-02-25",from:"18:30",to:"21:00",by:"LUMS Entrepreneurial Society",what:"Founders' Pitch Night"},
 {venue:"pdc",d:"2027-02-26",from:"19:00",to:"23:00",by:"SPADES",what:"Build Night"}
];
var REQ_TYPES=[
 {id:"venue",name:"Auditorium or venue booking",blurb:"Book the Main Auditorium, a hall, a room or an open-air space.",icon:"building",sla:"3 working days"},
 {id:"pr",name:"PR request",blurb:"Get an event onto CCA's channels: Instagram, campus screens, the student mailer.",icon:"mega",sla:"2 working days"},
 {id:"event",name:"Event proposal",blurb:"Propose an event for approval. Once approved it appears on the website.",icon:"cal",sla:"5 working days"},
 {id:"logistics",name:"Equipment and logistics",blurb:"Chairs, tables, sound, projector, standees and setup support.",icon:"box",sla:"3 working days"},
 {id:"noc",name:"Sponsorship or NOC",blurb:"Clearance to approach a sponsor, and the no-objection certificate.",icon:"doc",sla:"5 working days"},
 {id:"profile",name:"Society profile update",blurb:"Change your council, how to join, description or socials on the website.",icon:"user",sla:"2 working days"}
];
var STATUS={submitted:{label:"Submitted",cls:"grey"},review:{label:"In review",cls:""},changes:{label:"Changes requested",cls:"warn"},
 approved:{label:"Approved",cls:"ok"},declined:{label:"Declined",cls:"bad"},done:{label:"Completed",cls:"ok"}};
var seq=412;
var REQUESTS=[
 {ref:"CCA-EVT-0407",type:"event",soc:"lds",title:"Debate Open House",status:"approved",created:"2027-02-04",
  fields:{Date:"18 February 2027",Time:"6:00–8:00 PM",Venue:"Academic Block, Room 101",Attendance:"60","Open to":"All students"},
  body:"Informal evening of short debates and conversation with the council, aimed at first-years.",
  trail:[["Submitted by Hiba Ahmed","4 Feb, 11:04"],["Opened by Ayesha Arshad (CCA)","4 Feb, 15:20"],["Approved by Ayesha Arshad (CCA)","5 Feb, 10:12"],["Published to the website","5 Feb, 10:12"]],published:true},
 {ref:"CCA-AUD-0409",type:"venue",soc:"tes",title:"LUMICS speaker session",status:"approved",created:"2027-02-06",
  fields:{Venue:"Main Auditorium",Date:"24 February 2027",From:"2:00 PM",To:"6:00 PM",Attendance:"380",Setup:"AV, 3 mics, stage"},
  body:"Keynote and panel for LUMICS. Needs the stage set for five speakers.",
  trail:[["Submitted by Muhammad Mustafa","6 Feb, 09:31"],["Approved by Ayesha Arshad (CCA)","7 Feb, 12:02"]]},
 {ref:"CCA-PR-0410",type:"pr",soc:"lcss",title:"Community Clean-up promotion",status:"review",created:"2027-02-09",
  fields:{Channels:"CCA Instagram, Student mailer","Publish on":"15 February 2027","Event date":"22 February 2027"},
  body:"Poster attached. Caption focuses on the sign-up link and the 10 AM start.",
  trail:[["Submitted by Zara Butt","9 Feb, 16:48"],["Opened by Ayesha Arshad (CCA)","10 Feb, 09:15"]]},
 {ref:"CCA-NOC-0411",type:"noc",soc:"les",title:"Title sponsor clearance for YLES",status:"changes",created:"2027-02-10",
  fields:{Company:"Meezan Bank",Package:"Title sponsor",Amount:"PKR 1,200,000",Contact:"Zoya Iqbal"},
  body:"Request clearance to approach Meezan Bank as title sponsor for YLES 2027.",
  trail:[["Submitted by Zoya Iqbal","10 Feb, 13:22"],["Changes requested by Ayesha Arshad (CCA)","11 Feb, 10:40"]],
  note:"Please attach the draft sponsorship deck and confirm whether the company has an existing LUMS agreement."}
];
var EMAILS=[
 {to:"cca@lums.edu.pk",cc:"debating@lums.edu.pk",subj:"[CCA-EVT-0407] Approved — Debate Open House",when:"5 Feb, 10:12 AM",body:"The event proposal has been approved and published to cca.lums.edu.pk."},
 {to:"tes@lums.edu.pk",cc:"cca@lums.edu.pk",subj:"[CCA-AUD-0409] Approved — Main Auditorium, 24 Feb",when:"7 Feb, 12:02 PM",body:"Main Auditorium is confirmed for 2:00–6:00 PM on 24 February 2027."},
 {to:"les@lums.edu.pk",cc:"cca@lums.edu.pk",subj:"[CCA-NOC-0411] Changes requested",when:"11 Feb, 10:40 AM",body:"Please attach the draft sponsorship deck and confirm any existing LUMS agreement."}
];
