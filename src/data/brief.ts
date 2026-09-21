export type BriefPoint = { lead: string; body: string };

export type BriefSlide =
  | {
      id: string;
      layout: "title";
      kicker: string;
      title: string;
      subtitle: string;
      footer: string;
      image: string;
    }
  | {
      id: string;
      layout: "points";
      kicker: string;
      title: string;
      points: BriefPoint[];
    }
  | {
      id: string;
      layout: "jobs";
      kicker: string;
      title: string;
      roles: { title: string; duties: string[] }[];
    }
  | {
      id: string;
      layout: "week";
      kicker: string;
      title: string;
      days: { when: string; what: string }[];
    }
  | {
      id: string;
      layout: "photo";
      kicker: string;
      title: string;
      body: string;
      points: string[];
      image: string;
    }
  | {
      id: string;
      layout: "split";
      kicker: string;
      title: string;
      left: { title: string; body: string; points: string[] };
      right: { title: string; body: string; points: string[] };
    }
  | {
      id: string;
      layout: "money";
      kicker: string;
      title: string;
      hero: { crew: string; pp: string; cap: string };
      lines: { label: string; value: string }[];
      note: string;
    }
  | {
      id: string;
      layout: "rules";
      kicker: string;
      title: string;
      items: string[];
    }
  | {
      id: string;
      layout: "close";
      kicker: string;
      title: string;
      lines: string[];
      image: string;
    };

export const BRIEF_FILE = "/brief/Bromania-MMXXVII.pptx";

export const SLIDES: BriefSlide[] = [
  {
    id: "title",
    layout: "title",
    kicker: "Crew briefing · five men",
    title: "Project Bromania MMXXVII",
    subtitle: "Dulles. Istanbul. A countryside sleeper. Transylvania.",
    footer: "15–25 September 2027",
    image: "/images/poenari.jpg",
  },
  {
    id: "deal",
    layout: "points",
    kicker: "The deal",
    title: "What this is",
    points: [
      { lead: "Five of us.", body: "Early forties. Fit. Eleven days, not a long weekend." },
      { lead: "Leave Dulles Tuesday night.", body: "Turkish TK8 at 9:40pm, 14 Sep, if the 2027 timetable still has it." },
      { lead: "Three nights in Karaköy.", body: "Then a night train. Then Brașov as base. Home from Bucharest on the 25th." },
      { lead: "About $3,000 each.", body: "One guy holds the card for the big stuff. Dinners are Splitwise." },
    ],
  },
  {
    id: "locked",
    layout: "points",
    kicker: "Already decided",
    title: "These five things are locked",
    points: [
      { lead: "Dates.", body: "15–25 Sep 2027. October is off." },
      { lead: "The crossing.", body: "Night train Istanbul to Sofia, then a van into Romania." },
      { lead: "Flights.", body: "Turkish ExtraFly. One booking, five names, one suitcase each. Not EcoFly." },
      { lead: "The castle.", body: "Poenari the day after Bran. 1,480 steps. Vlad actually used this one." },
      { lead: "Who books.", body: "One admin, one card. Everyone else: passport, bag, show up." },
    ],
  },
  {
    id: "jobs",
    layout: "jobs",
    kicker: "Two jobs",
    title: "If you only remember one slide",
    roles: [
      {
        title: "The admin (one guy, one card)",
        duties: [
          "Buys flights, two apartments, the night train, both vans, and the tickets that sell out.",
          "Drops every PDF in the group chat.",
          "Does not pay for ten days of dinners.",
        ],
      },
      {
        title: "Everyone else",
        duties: [
          "Passport valid through March 2028. One suitcase. Show up when the day says.",
          "Pay meals and drinks as you go. Splitwise.",
          "Do not book a second hotel, a second taxi, or a Dracula dinner show.",
        ],
      },
    ],
  },
  {
    id: "week",
    layout: "week",
    kicker: "The week",
    title: "Read this once",
    days: [
      { when: "Tue 14", what: "Dulles, 9:40pm. Sleep on the plane." },
      { when: "Wed 15", what: "Land Istanbul. One van. Walk. Dinner. No museums." },
      { when: "Thu 16", what: "Hagia Sophia at opening. Cistern. Long trousers all day." },
      { when: "Fri 17", what: "Boat in the morning. Turkish bath at 4:30pm — not 9am." },
      { when: "Sat 18", what: "Buy train food. Leave at 4pm. Night train at 8pm." },
      { when: "Sun 19", what: "Wake in Sofia. Coffee. Van to Romania. Do not tour Sofia." },
      { when: "Mon 20", what: "Bran (the photo). Râșnov. Brașov town. No cape dinner." },
      { when: "Tue 21", what: "Poenari. Out at 7am. 1,480 steps. Home before dark." },
      { when: "Wed 22", what: "Salt mine in the morning. Palace on the way home." },
      { when: "Thu 23", what: "Last coffee in Brașov. South to Bucharest." },
      { when: "Fri 24", what: "Old Town dinner. Flight is tomorrow morning." },
      { when: "Sat 25", what: "OTP. Same Turkish ticket home." },
    ],
  },
  {
    id: "istanbul",
    layout: "photo",
    kicker: "Istanbul · three nights",
    title: "Karaköy, not Sultanahmet",
    body: "We live on the nightlife side of the water. A whole apartment if we can get one. First night is not for monuments.",
    points: [
      "Wednesday: land, one van, walk Galata, a real meyhane. Curfew 11:30. Jet lag wins.",
      "Thursday: the old city once, at opening, then we leave.",
      "Friday: the strait, then steam. Pack for the train.",
    ],
    image: "/images/karakoy.jpg",
  },
  {
    id: "old-city",
    layout: "photo",
    kicker: "Thursday 16 Sep",
    title: "One day in the empire",
    body: "Hagia Sophia when it opens. Then the underground cistern. One more museum only if you still have legs.",
    points: [
      "Long trousers, shoulders covered. Downstairs by 8am.",
      "Gallery ticket is about €25. The museum pass does not work here.",
      "Cistern: yerebatan.com or the window. Never a site named basilica-cistern.com.",
    ],
    image: "/images/istanbul-hagia.jpg",
  },
  {
    id: "hammam",
    layout: "photo",
    kicker: "Friday 17 Sep · the one people get wrong",
    title: "Boat in the morning. Bath at 4:30.",
    body: "Men-only hours at Kılıç Ali Paşa are 4:30pm to 11:30pm. Nine in the morning is women’s hours. Do not book 9am.",
    points: [
      "10:00 — two hours on the Bosphorus. Public ferry or a private boat. No dinner-cruise with a DJ.",
      "16:30 — 16th-century bath, five of you, a very serious man with a mitt. Spare underwear.",
      "20:00 — last Karaköy table. Picnic is tomorrow morning, not tonight.",
    ],
    image: "/images/galata.jpg",
  },
  {
    id: "rail",
    layout: "points",
    kicker: "The crossing",
    title: "The night train to Bucharest is closed",
    points: [
      { lead: "The bridge is shut.", body: "Giurgiu–Ruse is closed 5 April to 13 December 2027. That is the only normal train into Bucharest." },
      { lead: "Do not buy a 2026 timetable.", body: "An Istanbul–Bucharest sleeper you saw last year will not exist that week." },
      { lead: "Real plan.", body: "Istanbul–Sofia Express, 8pm from Halkalı. Then a van into Romania." },
      { lead: "Backup.", body: "If the train is sold out: fly Istanbul to Bucharest. Still a trip. Worse story." },
    ],
  },
  {
    id: "sleeper",
    layout: "photo",
    kicker: "Saturday 18 Sep",
    title: "The countryside sleeper",
    body: "Three small lockable rooms. Two sharing, two sharing, one alone. There is no restaurant on this train. Complimentary snacks are a pretzel and a chocolate.",
    points: [
      "Buy food Saturday morning in Karaköy. Cheese, bread, fruit, one bottle. Fridge in the berth.",
      "Leave the apartment at 4pm. Halkalı is 45–70 minutes west. The station is not a grocery store.",
      "Train at 8pm. Passports in your pocket. Heavier guys get the lower beds.",
    ],
    image: "/images/sleeper.jpg",
  },
  {
    id: "castles",
    layout: "split",
    kicker: "Two castles · they are not the same",
    title: "Postcard, then the story",
    left: {
      title: "Monday · Bran",
      body: "The silhouette everyone already has in their head. Weak link to Vlad. You still go, because the photo is the photo.",
      points: [
        "90 minutes, then leave.",
        "Monday may open at noon — if so, Râșnov first.",
        "Râșnov is the better ruin, ten minutes up the road.",
        "No Dracula dinner show.",
      ],
    },
    right: {
      title: "Tuesday · Poenari",
      body: "Vlad Țepeș rebuilt this citadel in the 1450s. He did not live at Bran. He used this cliff.",
      points: [
        "1,480 concrete steps. No tram.",
        "Leave Brașov at 7am. Back before dark.",
        "About 30 lei, cash, at the booth.",
        "Do not add the high mountain road.",
      ],
    },
  },
  {
    id: "poenari",
    layout: "photo",
    kicker: "Why we came to Romania",
    title: "You earn this one",
    body: "Broken wall, wind, a drop into the Argeș gorge. Forty-five minutes up. At the top: a courtyard the Impaler actually held. Five men in their forties, autumn, nobody selling capes. That is the dude-trip photograph.",
    points: [
      "Boots. Water. No racing.",
      "The ruin is small. The cliff is the point.",
      "Vidraru Dam for lunch. Same road home.",
    ],
    image: "/images/poenari.jpg",
  },
  {
    id: "salt",
    layout: "photo",
    kicker: "Wednesday 22 Sep",
    title: "Under the mountain, then a palace",
    body: "A stadium hollowed out of salt, 208 meters down, air at 13°C. Then, on the corridor home, a royal fever dream of carved wood and armor.",
    points: [
      "Sweater. Tickets at the mine window, about 60 lei. 90 minutes is enough.",
      "Peleș is timed. Book an afternoon slot. Closed Monday and Tuesday.",
      "Skip the little castle next door.",
    ],
    image: "/images/salt-mine.jpg",
  },
  {
    id: "money",
    layout: "money",
    kicker: "Money",
    title: "What it actually costs",
    hero: { crew: "$11,180", pp: "$2,236", cap: "$3,000" },
    lines: [
      { label: "Flights, ExtraFly", value: "$1,200" },
      { label: "Two apartments", value: "$328" },
      { label: "Train + two vans", value: "$342" },
      { label: "Tickets you buy ahead", value: "$236" },
      { label: "Insurance + eSIM", value: "$130" },
      { label: "Food and drink", value: "~$750" },
    ],
    note: "The $2,236 is the card total — flights, beds, train, vans, tickets, insurance. Food is extra, paid on Splitwise. Prices are 2026 guesses for 2027, not a quote. Walk-up cash (Poenari, the mine) is small and not in the card number.",
  },
  {
    id: "bags",
    layout: "points",
    kicker: "Bags",
    title: "One suitcase. That is the fare.",
    points: [
      { lead: "Buy ExtraFly.", body: "That is the row that includes a checked suitcase. EcoFly often has none. Q is just the cheap price, not a different plane." },
      { lead: "Checked: 23 kg.", body: "One bag. Over 23 kg is a fee. Over 32 kg they will not take it." },
      { lead: "Cabin: 8 kg.", body: "55 × 40 × 23 cm. Istanbul weighs this. Pack 7 kg and stop." },
      { lead: "Wear the boots onto TK8.", body: "Long trousers on the plane — mosque morning is the next day." },
    ],
  },
  {
    id: "jobs-now",
    layout: "jobs",
    kicker: "Before we go",
    title: "Your job from today",
    roles: [
      {
        title: "Everyone",
        duties: [
          "Passport valid through March 2028.",
          "One suitcase that fits ExtraFly. Boots already walked-in.",
          "Splitwise on your phone. Enroll in STEP. Do not book a hotel, a taxi, or a cape dinner.",
        ],
      },
      {
        title: "The admin",
        duties: [
          "Flights this year. Apartments this week, refundable.",
          "Night train about eight weeks out (July 2027). Vans after that.",
          "Bath, Hagia Sophia, cistern, Bran, Peleș — two to four weeks before we fly.",
        ],
      },
    ],
  },
  {
    id: "security",
    layout: "points",
    kicker: "Security",
    title: "Kidnap and ransom: the honest call",
    points: [
      { lead: "You do not need a K&R policy.", body: "Classic kidnap-for-ransom is executives in Mexico or Nigeria, or the Syria border. You are five guys in Karaköy and Brașov. Neither country has a State Department kidnapping flag." },
      { lead: "Türkiye is Level 2. Romania is Level 1.", body: "Istanbul: terrorism and arbitrary detention, not ransom. Do not photograph police. Romania is normal-precautions country. Brașov is quiet." },
      { lead: "The fake version is the one that gets tourists.", body: "Unmarked taxi, fake police, a nightclub that will not let you leave. Stay together after dark. One van. Nobody walks home alone." },
      { lead: "What actually hurts people on a trip like this.", body: "The van on the gorge road. A snatched phone. A padded bar bill. Buy medical and evacuation insurance. Rank worry in that order." },
    ],
  },
  {
    id: "rules",
    layout: "rules",
    kicker: "House rules",
    title: "Do not be the guy",
    items: [
      "Do not be late for 4pm Saturday.",
      "Do not book the bath at 9am.",
      "Do not buy EcoFly.",
      "Do not race the 1,480 steps.",
      "Do not add the high mountain road the day of Poenari.",
      "Do not book a second hotel or a Dracula show.",
      "Show up. That is the whole job.",
    ],
  },
  {
    id: "close",
    layout: "close",
    kicker: "Project Bromania MMXXVII",
    title: "The postcard is Bran. The story is Poenari. The night is the train.",
    lines: ["Questions.", "Then we book."],
    image: "/images/bran-cliff.jpg",
  },
];
