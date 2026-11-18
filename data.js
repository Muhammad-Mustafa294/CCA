/* CCA website — content and sample data.
   Safe to edit: societies, events, venues, request types, bookings.
   Everything here is plain data. No logic lives in this file. */

/* Bookable rooms: HSS (Mushtaq Ahmad Gurmani School of Humanities and Social Sciences) A1 to A15.
   Capacities are placeholders until CCA confirms the real seat counts. */
var VENUES=[
 {id:"A1",name:"HSS A1",cap:250,notes:"Tiered, projector, mics"},{id:"A2",name:"HSS A2",cap:200,notes:"Tiered, projector, mics"},
 {id:"A3",name:"HSS A3",cap:160,notes:"Tiered, projector"},{id:"A4",name:"HSS A4",cap:120,notes:"Projector, mics"},
 {id:"A5",name:"HSS A5",cap:120,notes:"Projector, mics"},{id:"A6",name:"HSS A6",cap:90,notes:"Projector"},
 {id:"A7",name:"HSS A7",cap:80,notes:"Projector"},{id:"A8",name:"HSS A8",cap:80,notes:"Projector"},
 {id:"A9",name:"HSS A9",cap:60,notes:"Flat room, movable chairs"},{id:"A10",name:"HSS A10",cap:60,notes:"Flat room, movable chairs"},
 {id:"A11",name:"HSS A11",cap:50,notes:"Seminar room"},{id:"A12",name:"HSS A12",cap:45,notes:"Seminar room"},
 {id:"A13",name:"HSS A13",cap:40,notes:"Seminar room"},{id:"A14",name:"HSS A14",cap:35,notes:"Seminar room"},
 {id:"A15",name:"HSS A15",cap:30,notes:"Seminar room"}
];
var CATS=["Academic","Arts & Culture","Debate & MUN","Service","Sports","Tech","Media"];
var SOCIETIES=[
 {id:"lds",name:"Debates and Recitation at LUMS",short:"DRUMS",cat:"Debate & MUN",tag:"Debating, recitation and public speaking",recruiting:true,deadline:"28 February 2027",logo:"img/soc/dr_0.png",photo:"",
  about:"DRUMS brings together students who care about ideas, argument and the spoken word. Members compete in debating and recitation tournaments and host debates for the LUMS community.",
  council:[["Areeb Khan","President"],["Noor Ali","Vice President"],["Hiba Ahmed","General Secretary"],["Omar Saeed","Treasurer"]],
  email:"drums@lums.edu.pk",insta:"@drums.lums",updated:"8 February 2027"},
 {id:"lumun",name:"LUMUN Society",short:"LUMUN",cat:"Debate & MUN",tag:"Pakistan's largest Model United Nations",recruiting:true,deadline:"20 February 2027",logo:"img/soc/lum.png",photo:"",
  about:"LUMUN runs the country's largest Model United Nations conference and trains delegates through the year.",
  council:[["Fatima Raza","Secretary General"],["Daniyal Asif","Director General"],["Mehreen Shah","USG Operations"],["Ali Haider","Treasurer"]],
  email:"lumun@lums.edu.pk",insta:"@lumun",updated:"2 February 2027"},
 {id:"les",name:"LUMS Entrepreneurial Society",short:"LES",cat:"Academic",tag:"Startups, YLES and founder workshops",recruiting:true,deadline:"25 February 2027",logo:"img/soc/lums-enterpneur-society-logo.jpg",photo:"",
  about:"LES runs YLES, the Young Leaders and Entrepreneurs Summit, plus pitch nights and workshops for student founders.",
  council:[["Zoya Iqbal","President"],["Hamza Tariq","Vice President"],["Sana Mir","Director Operations"],["Bilal Ahmed","Treasurer"]],
  email:"les@lums.edu.pk",insta:"@lumsles",updated:"11 February 2027"},
 {id:"tes",name:"The Economics Society",short:"TES",cat:"Academic",tag:"Economics, policy and LUMICS",recruiting:true,deadline:"24 February 2027",logo:"img/soc/ec.png",photo:"",
  about:"TES runs LUMICS, reading groups and policy discussions, and brings economists to campus through the year.",
  council:[["Ayesha Nadeem","President"],["Muhammad Mustafa","Director HR"],["Taha Siddiqui","Director Events"],["Rida Khan","Treasurer"]],
  email:"tes@lums.edu.pk",insta:"@tes.lums",updated:"9 February 2027"},
 {id:"spades",name:"SPADES",short:"SPADES",cat:"Tech",tag:"Science, technology and innovation",recruiting:true,deadline:"28 February 2027",logo:"img/soc/spd.jpg",photo:"",
  about:"SPADES runs hackathons, build nights and science outreach for students across schools.",
  council:[["Khadija Khalid","President"],["Usman Javed","Vice President"],["Laiba Amir","Director Tech"],["Ahmed Raza","Treasurer"]],
  email:"spades@lums.edu.pk",insta:"@spades.lums",updated:"5 February 2027"},
 {id:"lcss",name:"LUMS Community Service Society",short:"LCSS",cat:"Service",tag:"Volunteering, drives and outreach",recruiting:true,deadline:"18 February 2027",logo:"img/soc/cc.png",photo:"img/banner/lcss.jpg",
  about:"LCSS runs volunteering drives, school partnerships and community projects in and around Lahore.",
  council:[["Maryam Shafiq","President"],["Hassan Ali","Vice President"],["Zara Butt","Director Projects"],["Faizan Khan","Treasurer"]],
  email:"lcss@lums.edu.pk",insta:"@lcss.lums",updated:"13 February 2027"},
 {id:"lps",name:"LUMS Photographic Society",short:"LPS",cat:"Arts & Culture",tag:"Photo walks, workshops and LAPS",recruiting:false,deadline:"",logo:"img/soc/lpc.png",photo:"",
  about:"LPS runs photo walks and editing workshops, and organises LAPS, its annual photography exhibition and competition.",
  council:[["Imran Yousaf","President"],["Alina Raza","Vice President"],["Sameer Khan","Director Exhibits"],["Mahnoor Ali","Treasurer"]],
  email:"photography@lums.edu.pk",insta:"@lumsphoto",updated:"29 January 2027"},
 {id:"lcs",name:"LUMS Culture Society",short:"LCS",cat:"Arts & Culture",tag:"Celebrating culture through art and events",recruiting:true,deadline:"22 February 2027",logo:"img/soc/cul.png",photo:"",
  about:"LCS puts on cultural nights, music and food festivals, and celebrates the regions students come from.",
  council:[["Maha Aurangzeb","President"],["Shanzay Malik","Vice President"],["Arslan Qadir","Director Events"],["Hania Tariq","Treasurer"]],
  email:"culture@lums.edu.pk",insta:"@lumsculture",updated:"10 February 2027"},
 {id:"rizq",name:"RIZQ LUMS",short:"RIZQ",cat:"Service",tag:"Fighting food waste and hunger",recruiting:true,deadline:"26 February 2027",logo:"img/soc/riz.jpg",photo:"",
  about:"The LUMS chapter of RIZQ collects surplus food and runs hunger-relief drives with partner kitchens.",
  council:[["Ibrahim Saleem","President"],["Nimra Ashraf","Vice President"],["Talha Nawaz","Director Ops"],["Eman Zafar","Treasurer"]],
  email:"rizq@lums.edu.pk",insta:"@rizq.lums",updated:"6 February 2027"},
 {id:"las",name:"LUMS Adventure Society",short:"LAS",cat:"Sports",tag:"Treks, climbs and expeditions",recruiting:true,deadline:"27 February 2027",photo:"img/banner/las.jpg",
  about:"LAS takes students to the northern areas for treks and climbs, and runs training sessions on campus.",
  council:[["Ryef Taimur","President"],["Hamza Kashif","Vice President"],["Sana Zahid","Director Treks"],["Owais Malik","Treasurer"]],
  email:"adventure@lums.edu.pk",insta:"@lumsadventure",updated:"12 February 2027"},
 {id:"lmas",name:"LUMS Media Arts Society",short:"LMAS",cat:"Media",tag:"Film, design and student media",recruiting:false,deadline:"",logo:"img/soc/lma.png",photo:"",
  about:"LMAS makes short films, runs design jams and covers campus events in photo and video.",
  council:[["Danish Iqbal","President"],["Areesha Noor","Vice President"],["Saad Mahmood","Director Film"],["Komal Riaz","Treasurer"]],
  email:"media@lums.edu.pk",insta:"@lumsmedia",updated:"3 February 2027"},
 {id:"dramaline",name:"LUMS Dramaline",short:"Dramaline",cat:"Arts & Culture",tag:"Theatre productions and drama",recruiting:true,deadline:"21 February 2027",logo:"img/soc/drl.jpg",photo:"",
  about:"Dramaline stages student theatre productions each year and runs acting and backstage workshops for members.",
  council:[],
  email:"dramaline@lums.edu.pk",insta:"@dramaline.lums",updated:"1 February 2027"},
 {id:"equestrian",name:"LUMS Equestrian Club",short:"Equestrian",cat:"Sports",tag:"Riding, polo and Arena Polo",recruiting:false,deadline:"",logo:"img/soc/eqs.png",photo:"img/photo/equestrian.jpg",
  about:"The Equestrian Club gets students riding and playing polo, and hosts the Arena Polo event on campus.",
  council:[],
  email:"equestrian@lums.edu.pk",insta:"@equestrian.lums",updated:"2 February 2027"},
 {id:"radio",name:"Radio LUMS",short:"Radio LUMS",cat:"Media",tag:"Campus radio, shows and podcasts",recruiting:true,deadline:"23 February 2027",logo:"img/soc/rdo_0.png",photo:"img/banner/rdo.jpg",
  about:"Radio LUMS produces student radio shows and podcasts, and covers campus life on air.",
  council:[],
  email:"radio@lums.edu.pk",insta:"@radio.lums",updated:"3 February 2027"},
 {id:"lees",name:"LUMS Education and Engagement Society",short:"LEES",cat:"Service",tag:"Education outreach and EduTalks",recruiting:true,deadline:"24 February 2027",logo:"img/soc/les_0.png",photo:"img/photo/lees.jpg",
  about:"LEES works on education outreach and hosts talks on teaching and learning, including the SOE EduTalk series.",
  council:[],
  email:"lees@lums.edu.pk",insta:"@lees.lums",updated:"4 February 2027"},
 {id:"riayat",name:"Riayat LUMS Chapter",short:"Riayat",cat:"Service",tag:"Community projects and Project Urban Inclusive",recruiting:true,deadline:"25 February 2027",logo:"img/soc/ry.png",photo:"img/photo/riayat.jpg",
  about:"The LUMS chapter of Riayat runs community projects with partner schools, including Project Urban Inclusive.",
  council:[],
  email:"riayat@lums.edu.pk",insta:"@riayat.lums",updated:"5 February 2027"},
 {id:"lawpol",name:"LUMS Law & Politics Society",short:"Law & Politics",cat:"Academic",tag:"Law, politics and public policy",recruiting:false,deadline:"",logo:"img/soc/lw.png",photo:"img/banner/lp.jpg",
  about:"The Law & Politics Society hosts talks, moots and discussions on law, governance and public policy.",
  council:[],
  email:"lawpol@lums.edu.pk",insta:"@lawpol.lums",updated:"6 February 2027"},
 {id:"lwic",name:"LUMS Women in Computing",short:"LWiC",cat:"Tech",tag:"A community for women in tech",recruiting:true,deadline:"27 February 2027",logo:"img/soc/lwc.png",photo:"",
  about:"LWiC builds a community for women in computing through workshops, mentoring and industry sessions.",
  council:[],
  email:"lwic@lums.edu.pk",insta:"@lwic.lums",updated:"7 February 2027"},
 {id:"music",name:"LUMS Music Society",short:"Music",cat:"Arts & Culture",tag:"Jam sessions, concerts and music nights",recruiting:true,deadline:"28 February 2027",logo:"img/soc/mus.png",photo:"",
  about:"The Music Society, active since 1999, runs jam sessions, open mics and concerts across the year.",
  council:[],
  email:"music@lums.edu.pk",insta:"@music.lums",updated:"8 February 2027"},
 {id:"chess",name:"LUMS Chess Club",short:"Chess",cat:"Sports",tag:"Casual play, training and tournaments",recruiting:false,deadline:"",logo:"img/soc/chs.png",photo:"",
  about:"The Chess Club meets for casual games and training, and sends teams to inter-university tournaments.",
  council:[],
  email:"chess@lums.edu.pk",insta:"@chess.lums",updated:"9 February 2027"}
];
var NEWS=[
 {d:"2027-02-12",title:"Spring recruitment opens for 30+ societies"},
 {d:"2027-02-06",title:"LUMUN 2027 confirms record international delegation"},
 {d:"2027-01-29",title:"New venue booking process: one request, one reference"},
 {d:"2027-01-21",title:"CCA Excellence Awards: nominations now open"}
];
/* Photos and logos are from cca.lums.edu.pk; each one is credited to the society it belongs to. */
var GALLERY=[
 {src:"img/banner/lcss.jpg",soc:"lcss",cap:"LUMS Community Service Society"},
 {src:"img/photo/equestrian.jpg",soc:"equestrian",cap:"Equestrian Club \u00b7 Arena Polo"},
 {src:"img/photo/riayat.jpg",soc:"riayat",cap:"Riayat \u00b7 Project Urban Inclusive"},
 {src:"img/photo/lees.jpg",soc:"lees",cap:"LEES \u00b7 SOE EduTalk"},
 {src:"img/banner/lp.jpg",soc:"lawpol",cap:"Law & Politics Society"},
 {src:"img/banner/las.jpg",soc:"las",cap:"LUMS Adventure Society"}
];
var EVENTS=[
 {id:"e1",soc:"lds",title:"Debate Open House",d:"2027-02-18",t:"6:00–8:00 PM",venue:"Academic Block, Room 101",cat:"Debate & MUN",open:"Open to all",
  blurb:"Curious about debating? An informal evening of short debates, practical tips and conversation with the current council. No experience needed."},
 {id:"e2",soc:"lcs",title:"Film & Conversation",d:"2027-02-20",t:"5:30–8:00 PM",venue:"SSE Auditorium",cat:"Arts & Culture",open:"Open to all",
  blurb:"A screening of a Pakistani short film, followed by a conversation with its director."},
 {id:"e3",soc:"lcss",title:"Community Clean-up",d:"2027-02-22",t:"10:00 AM–1:00 PM",venue:"Main Lawn",cat:"Service",open:"Sign-up required",
  blurb:"A morning clean-up drive on campus and the surrounding streets. Gloves and bags provided."},
 {id:"e4",soc:"les",title:"Founders' Pitch Night",d:"2027-02-25",t:"6:30–9:00 PM",venue:"SDSB Auditorium",cat:"Academic",open:"Open to all",
  blurb:"Eight student teams pitch to a panel of founders and investors. Audience vote decides the people's choice award."},
 {id:"e5",soc:"spades",title:"Build Night: Hardware",d:"2027-02-26",t:"7:00–11:00 PM",venue:"PDC Hall",cat:"Tech",open:"Sign-up required",
  blurb:"Bring a project or join one. Components, soldering stations and mentors on hand."},
 {id:"e6",soc:"lumun",title:"LUMUN 2027 Delegate Training",d:"2027-03-02",t:"5:00–7:00 PM",venue:"Academic Block, Room 101",cat:"Debate & MUN",open:"Members only",
  blurb:"Rules of procedure, position papers and a mock committee session for first-time delegates."}
];
var PAST=[
 {id:"p1",soc:"lumun",title:"LUMUN 2026",d:"2026-01-15",venue:"Campus-wide"},
 {id:"p2",soc:"tes",title:"LUMICS V",d:"2026-11-08",venue:"Main Auditorium"},
 {id:"p3",soc:"rizq",title:"Winter Food Drive",d:"2026-12-12",venue:"Khoka Area"}
];
var BOOKINGS=[
 {venue:"A1",d:"2027-02-18",from:"17:00",to:"21:00",by:"LUMUN Society",what:"LUMUN 2027 opening ceremony"},
 {venue:"A2",d:"2027-02-18",from:"18:00",to:"20:00",by:"The Economics Society",what:"Policy roundtable"},
 {venue:"A6",d:"2027-02-18",from:"16:00",to:"19:00",by:"LUMS Dramaline",what:"Rehearsal"},
 {venue:"A1",d:"2027-02-24",from:"14:00",to:"18:00",by:"The Economics Society",what:"LUMICS speaker session"},
 {venue:"A3",d:"2027-02-20",from:"17:30",to:"20:00",by:"LUMS Culture Society",what:"Film & Conversation"},
 {venue:"A4",d:"2027-02-25",from:"18:30",to:"21:00",by:"LUMS Entrepreneurial Society",what:"Founders' Pitch Night"},
 {venue:"A5",d:"2027-02-26",from:"19:00",to:"23:00",by:"SPADES",what:"Build Night"}
];
var REQ_TYPES=[
 {id:"venue",name:"Venue booking",blurb:"Book an HSS room, A1 to A15. Enter your date and headcount first; only rooms that are free and big enough can be picked.",icon:"building",sla:"1 working day"},
 {id:"pr",name:"PR request",blurb:"Get an event onto CCA's channels: Instagram, campus screens, the student mailer.",icon:"mega",sla:"1 working day"},
 {id:"event",name:"Event proposal",blurb:"Propose an event for approval. Once approved it appears on the website.",icon:"cal",sla:"1 working day"},
 {id:"logistics",name:"Equipment and logistics",blurb:"Chairs, tables, sound, projector, standees and setup support.",icon:"box",sla:"1 working day"},
 {id:"noc",name:"Sponsorship or NOC",blurb:"Clearance to approach a sponsor, and the no-objection certificate.",icon:"doc",sla:"1 working day"},
 {id:"profile",name:"Society profile update",blurb:"Change how to join, your description or socials on the website.",icon:"user",sla:"1 working day"},
 {id:"other",name:"Other request",blurb:"Anything that doesn't fit above. Tell us what you need and CCA routes it to the right person.",icon:"dots",sla:"1 working day"}
];
var STATUS={submitted:{label:"Submitted",cls:"grey"},review:{label:"In review",cls:""},changes:{label:"Changes requested",cls:"warn"},
 approved:{label:"Approved",cls:"ok"},declined:{label:"Declined",cls:"bad"},done:{label:"Completed",cls:"ok"}};
var seq=412;
var REQUESTS=[
 {ref:"CCA-EVT-0407",type:"event",soc:"lds",title:"Debate Open House",status:"approved",created:"2027-02-04",
  fields:{Date:"18 February 2027",Time:"6:00–8:00 PM",Venue:"HSS A9",Attendance:"60","Open to":"All students"},
  body:"Informal evening of short debates and conversation with the council, aimed at first-years.",
  trail:[["Submitted by Hiba Ahmed","4 Feb, 11:04"],["Opened by Ayesha Arshad (CCA)","4 Feb, 15:20"],["Approved by Ayesha Arshad (CCA)","5 Feb, 10:12"],["Published to the website","5 Feb, 10:12"]],published:true},
 {ref:"CCA-AUD-0409",type:"venue",soc:"tes",title:"LUMICS speaker session",status:"approved",created:"2027-02-06",
  fields:{Venue:"HSS A1",Date:"Wednesday, 24 February",Time:"14:00\u201318:00",Attendance:"220",Setup:"AV and projector, Microphones"},slot:{v:"A1",d:"2027-02-24",from:"14:00",to:"18:00",att:220},
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
 {to:"cca@lums.edu.pk",cc:"drums@lums.edu.pk",subj:"[CCA-EVT-0407] Approved — Debate Open House",when:"5 Feb, 10:12 AM",body:"The event proposal has been approved and published to cca.lums.edu.pk."},
 {to:"tes@lums.edu.pk",cc:"cca@lums.edu.pk",subj:"[CCA-AUD-0409] Approved — Main Auditorium, 24 Feb",when:"7 Feb, 12:02 PM",body:"Main Auditorium is confirmed for 2:00–6:00 PM on 24 February 2027."},
 {to:"les@lums.edu.pk",cc:"cca@lums.edu.pk",subj:"[CCA-NOC-0411] Changes requested",when:"11 Feb, 10:40 AM",body:"Please attach the draft sponsorship deck and confirm any existing LUMS agreement."}
];
