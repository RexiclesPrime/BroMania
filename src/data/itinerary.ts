import { addDays } from "@/lib/utils";
import { ROUTING, WINDOWS, type RoutingId, type WindowId } from "./trip";

export type Opportunity = {
  time: string;
  title: string;
  why: string;
  how: string;
};

export type TripDay = {
  iso: string;
  city: string;
  region: string;
  chapter: string;
  title: string;
  lodging: string;
  image?: string;
  pitch: string;
  vibe: string;
  today: string;
  job: string;
  blocks: Opportunity[];
};

type Template = Omit<TripDay, "iso"> & { offset: number };

const ISTANBUL_CORE: Template[] = [
  {
    offset: 0,
    city: "Dulles",
    region: "Virginia",
    chapter: "Airborne",
    title: "Leave IAD after dark",
    lodging: "TK8, 21:40",
    vibe: "The boring part, done once",
    today: "Meet at Dulles in the evening. Fly to Istanbul overnight. Sleep on the plane.",
    job: "Admin buys one ticket for all five of you. Everyone: passport, one suitcase, long trousers. Eat at the airport — dinner in Istanbul will be late.",
    pitch:
      "Every trip like this starts in a fluorescent terminal, not a fortress. Five names on one ticket, bags together, a meal at the airport because Istanbul dinner will be late. Tonight is for sleeping on the plane. The rakı starts on the ground.",
    blocks: [
      {
        time: "18:30",
        title: "Turkish check-in, Terminal 1",
        why: "One ticket, five men, no one left at security with a separate confirmation number. That is how a crew actually leaves a country.",
        how: "Turkish Airlines, flight TK8. One booking for all five. Bags together. Eat here.",
      },
      {
        time: "21:40",
        title: "Wheels up",
        why: "Ten hours of nothing is a feature. You land Wednesday afternoon with a whole first night still in front of you.",
        how: "Sleep. Water. Do not start the trip on the plane.",
      },
    ],
  },
  {
    offset: 1,
    city: "Istanbul",
    region: "Karaköy",
    chapter: "Istanbul",
    title: "Land, water, first table",
    lodging: "Galata / Karaköy",
    image: "/images/karakoy.jpg",
    vibe: "Jet lag vs. the Horn",
    today: "Land in Istanbul in the afternoon. One van to the apartment. Walk the neighborhood. Dinner. No museums tonight.",
    job: "Admin: apartment and airport van already booked. Everyone: do not take five separate taxis.",
    pitch:
      "First night is not for monuments. It is for the neighborhood you will actually live in: the water, a roof, a table that does not close at nine, and five chairs that belong to you. Sultanahmet after dark is a postcard with the lights off. Karaköy is still a city.",
    blocks: [
      {
        time: "14:50",
        title: "IST, then the van",
        why: "A boys trip that starts with five separate taxi negotiations is already behind. One van, one drop, one apartment.",
        how: "One pre-booked van, or the Havaist bus. 60–90 minutes. Buy a phone SIM at the airport only if nobody set one up.",
      },
      {
        time: "17:00",
        title: "Walk Galata",
        why: "This is the street you will come home to for three nights — tower, lanes, the Horn at the bottom of the hill. You are not sightseeing yet. You are locating the bar.",
        how: "Tower street and Karaköy lanes. Skip the tower queue unless it is short. The view is better from a roof with a drink.",
      },
      {
        time: "19:00",
        title: "Roof, then a real meyhane",
        why: "Istanbul's drinking culture is meze and rakı at a table you do not leave for three hours — not a rooftop tourist grill with a DJ. This is the first night the five of you are actually on the trip.",
        how: "Bank Roof or Georges for the view. Then Asmalımescit or Karaköy Lokantası. White cheese, grilled liver, no belly-dance package. Curfew 23:30. Jet lag is undefeated.",
      },
    ],
  },
  {
    offset: 2,
    city: "Istanbul",
    region: "Sultanahmet",
    chapter: "Istanbul",
    title: "The old city, once",
    lodging: "Galata / Karaköy",
    image: "/images/istanbul-hagia.jpg",
    vibe: "Empire before lunch",
    today: "Hagia Sophia when it opens. Then the underground cistern. One more museum only if you still have legs. Long trousers all day.",
    job: "Admin: buy Hagia Sophia and cistern tickets before this morning. Everyone: shoulders covered, downstairs by 8am.",
    pitch:
      "You get one day in the old city. Do it at opening, in long trousers, and then leave. The mistake is stacking three mosques, the Grand Bazaar, and Topkapı until everyone hates Istanbul. The move is Hagia Sophia, the Cistern, one more thing, and a sunset that is not from a tour bus.",
    blocks: [
      {
        time: "08:30",
        title: "Hagia Sophia",
        why: "Fifteen hundred years of church, mosque, museum, mosque. You walk into the volume of it — the dome, the light, the fact that this building outlasted the empires that built it. That is the one monument that earns a boys-trip morning.",
        how: "Be there when it opens. Long trousers, shoulders covered. Official gallery ticket is €25 — the museum pass does not work here. Blue Mosque courtyard if it is open. Do not add a third mosque.",
      },
      {
        time: "11:00",
        title: "Basilica Cistern",
        why: "Underground Istanbul. Columns in black water, Medusa heads used as column bases, the cinematic one from every film that needed a secret city. It is twenty minutes of actually-cool.",
        how: "Buy on yerebatan.com or Passo, or at the window that morning. Never a website named basilica-cistern.com. Skip the audio guide. Walk it.",
      },
      {
        time: "13:00",
        title: "Topkapı or the Archaeological Museum",
        why: "Topkapı if anyone wants weapons, relics, and the imperial treasury. The Archaeological Museum if you would rather see the actual objects without the palace crush. Pick one. The Grand Bazaar is a 45-minute pass, then you leave — Spice Bazaar is the better shop.",
        how: "One palace or museum. Grand Bazaar as a shortcut, not a destination.",
      },
      {
        time: "17:30",
        title: "Süleymaniye at sunset",
        why: "The Golden Horn from a working mosque courtyard, not a paid terrace. Locals, students, the city actually happening. Dinner back on the nightlife side of the water.",
        how: "Walk or tram. Do not eat in Sultanahmet unless legs are done.",
      },
    ],
  },
  {
    offset: 3,
    city: "Istanbul",
    region: "Bosphorus",
    chapter: "Istanbul",
    title: "Hammam and the strait",
    lodging: "Galata / Karaköy",
    image: "/images/galata.jpg",
    vibe: "Steam, then two continents",
    today: "Boat on the Bosphorus in the morning. Turkish bath at 4:30pm — not 9am. Dinner. Pack for the train tomorrow.",
    job: "Admin: book the bath for five men after 4:30pm. Everyone: spare underwear for the bath.",
    pitch:
      "This is the Istanbul day that is not a museum. A 16th-century bath, then the water the whole trip is named after. The Bosporus Express cannot run to Bucharest in 2027. The Bosporus itself is still here. You take a boat. That is how you keep the promise.",
    blocks: [
      {
        time: "10:00",
        title: "Two hours on the Bosporus",
        why: "Europe on one bank, Asia on the other, palaces, fortresses, the current pulling you north. This is the water the night train was supposed to leave from. A private boat from Karaköy, or the public ferry to Anadolu Kavağı if you want to do it the old way. Either is the point. Skipping it because the train died is missing the trip.",
        how: "Public ferry from Karaköy, or a private boat for two hours. Bring a jacket. No dinner-cruise with a DJ. The bath is tonight at 4:30pm.",
      },
      {
        time: "16:30",
        title: "Kılıç Ali Paşa Hamam",
        why: "Sinan built this bath in 1580 for a pirate admiral. Marble, steam, a very serious man with a mitt. Five of you in a 16th-century room getting reset after the strait — that is a dude-trip ritual, not a spa day.",
        how: "Men only from 4:30pm to 11:30pm. Do not book 9am — that is women’s hours. Book five together on kilicalipasahamami.com. Walk from the apartment. Tip in Turkish lira.",
      },
      {
        time: "20:00",
        title: "Last Karaköy table",
        why: "Steam, then a table you do not leave. Tomorrow is the sleeper. Tonight is still Istanbul.",
        how: "A real meyhane in Karaköy. Pack the apartment after dinner. Buy train food tomorrow morning, not at 11pm.",
      },
    ],
  },
];

function sofiaLink(startOffset: number): Template[] {
  return [
    {
      offset: startOffset,
      city: "Halkalı → Sofia",
      region: "Thrace / the valley",
      chapter: "The crossing",
      title: "The countryside sleeper",
      lodging: "Three 2-berth TVS2000s",
      image: "/images/sleeper.jpg",
      vibe: "The story you asked for",
      today: "Easy morning. Buy food for the train. Leave the apartment at 4pm. Night train at 8pm. There is no restaurant on board.",
      job: "Admin: train tickets already bought. Everyone: help buy the picnic, passport in your pocket, do not be late for 4pm.",
      pitch:
        "This is the night the trip is named after. The Bosporus Express cannot run its usual road to Bucharest in 2027 — Friendship Bridge is closed April to December — but the Istanbul–Sofia Express still leaves Halkalı at 20:00, every day of the year. Thrace in the dark. A border stamp around 04:00. You wake up in the Bulgarian valley: villages, Plovdiv, autumn fields. Five men in lockable compartments, a picnic, no dining car. That is a countryside sleeper. It is not a luxury train. It is the real one.",
      blocks: [
        {
          time: "10:00",
          title: "Biennial, or a last Karaköy morning",
          why: "Saturday 18 Sep is the Biennial's public opening — actual contemporary art in a city that is not only mosques. One pavilion is enough. If the crew would rather eat, Karaköy still has a table.",
          how: "One pavilion, not a museum marathon. Then buy the train food. Bags out of the apartment at 4pm.",
        },
        {
          time: "16:00",
          title: "Marmaray to Halkalı",
          why: "Halkalı is not Sirkeci. The romance station is gone. The working station is 45–70 minutes west, and missing it is how you lose the night.",
          how: "Leave the apartment by 4pm. Food already bought in Karaköy or the Spice Bazaar. The train has no restaurant. The station at Halkalı is not a grocery store.",
        },
        {
          time: "20:00",
          title: "Istanbul–Sofia Express",
          why: "Three 2-berth sleepers for five large Americans: two sharing, two sharing, one sole-use. Lockable doors, a sink, a mini-fridge, lower berths for the heaviest. This is the closest living cousin of the train you wanted, and it actually exists in 2027.",
          how: "Bought on TCDD about eight weeks before (July 2027). Names as on passports. About €48 each. Heavier guys get the lower beds.",
        },
        {
          time: "04:00",
          title: "The border",
          why: "You may be asked off at Edirne, not Kapıkule. Passports in one envelope per compartment. One man half-awake. The 4am stamp is part of the story, not a hassle to optimize away.",
          how: "Passports ready. Valuables stay on you. Then sleep until morning.",
        },
      ],
    },
    {
      offset: startOffset + 1,
      city: "Sofia → Wallachia",
      region: "Overland",
      chapter: "The crossing",
      title: "Into Romania",
      lodging: "Brașov if you make it; Lipscani if you don't",
      vibe: "The tax of the train",
      today: "Wake up in Sofia. Coffee. Do not tour Sofia. Van to Romania. Sleep in Brașov if you arrive before dark. Bucharest if you don't.",
      job: "Admin: van is booked from Sofia station. Everyone: stay with the group. Do not wander off to see a church.",
      pitch:
        "You land in Sofia around noon with a whole afternoon to spend on purpose. Do not 'do Sofia.' Coffee, banitsa, then a van through the countryside to Bucharest. Five hours, you control the stops, same spirit as the train. If you roll in after 19:00, sleep in Lipscani and drive north in the morning. The mountain days start when you are in Brașov, not when you are heroic on DN1 in the dark.",
      blocks: [
        {
          time: "11:00",
          title: "Sofia station",
          why: "A capital you are passing through, not collecting. The win is being on time for the van, not a church.",
          how: "Coffee and pastry near the station. Stretch. Do not check bags into a locker for a 'quick look.'",
        },
        {
          time: "13:00",
          title: "Van, Sofia to Bucharest",
          why: "The Friendship Bridge is closed all of 2027, so the train cannot finish the job. A pre-booked van for five is the honest sequel: countryside, border, Wallachia, you decide when to stop.",
          how: "Pre-booked van for five, about five hours. A bus is the backup. Fly only if everyone refuses more sitting.",
        },
        {
          time: "evening",
          title: "North to Brașov — or stop",
          why: "Brașov is base camp. Getting there shattered helps nobody. A Lipscani night is not a failure. It is arriving like adults.",
          how: "If you hit Bucharest by 5pm, keep going to Brașov (2.5–3 hours). After 7pm, hotel in Old Town, drive north at 8am.",
        },
      ],
    },
  ];
}

function flyLink(startOffset: number): Template[] {
  return [
    {
      offset: startOffset,
      city: "Istanbul → Bucharest",
      region: "Air",
      chapter: "The crossing",
      title: "Short hop, long Romania",
      lodging: "Brașov",
      vibe: "Protect the mountain days",
      today: "Fly Istanbul to Bucharest in the morning. Drive to Brașov. You get an extra day in the mountains.",
      job: "Admin: flight and van already booked. Everyone: same bags. No extra sightseeing in Istanbul this morning.",
      pitch:
        "Ninety minutes instead of a night and a day. You lose the sleeper story and you gain a spare Transylvania day. The Bosporus still happens — as yesterday's boat. This is the spare chute if TCDD is sold out or the van looks ugly in September.",
      blocks: [
        {
          time: "morning",
          title: "IST → OTP",
          why: "The unromantic way to keep Poenari, Bran, and the mine from getting crushed by a late van.",
          how: "Pegasus, Tarom, or Turkish. About 80 minutes. Bags go through.",
        },
        {
          time: "afternoon",
          title: "8-seater, drive north",
          why: "The Prahova corridor is the classic approach to Transylvania — Sinaia, the massif, then Brașov. Peleș on the way if you land early: a royal fever dream of wood and armor, ridiculous in the best way.",
          how: "Pre-booked van that actually holds five big men and bags — not a tiny Dacia. Peleș Castle only if you have two hours. Beer on the square in Brașov.",
        },
      ],
    },
  ];
}

function busLink(startOffset: number): Template[] {
  return [
    {
      offset: startOffset,
      city: "Istanbul → Bucharest",
      region: "Coach",
      chapter: "The crossing",
      title: "The unromantic crossing",
      lodging: "Moving",
      vibe: "Only if the train dies",
      today: "Overnight bus to Bucharest. Only if the train is cancelled.",
      job: "Admin books it. Everyone: earplugs. This is the ugly backup, not the plan.",
      pitch:
        "Eleven hours, Esenler to Militari, from about $25. It keeps the overnight idea and throws away the romance. Hold this behind glass in case rail is cancelled and IST–OTP spikes.",
      blocks: [
        {
          time: "18:00",
          title: "Esenler or Alibeyköy",
          why: "It is a bus. The only virtue is that it exists every night.",
          how: "FlixBus or similar. Most recline you can find. Earplugs.",
        },
        {
          time: "05:00+1",
          title: "Bucharest, then north",
          why: "You will feel this. Coffee, then the van to Brașov. Do not schedule a fortress.",
          how: "Get off, coffee, prepaid van to Brașov. Do not schedule a castle today.",
        },
      ],
    },
  ];
}

function romaniaDays(startOffset: number, routing: RoutingId): Template[] {
  const extra = routing === "fly";
  const days: Template[] = [
    {
      offset: startOffset,
      city: "Brașov",
      region: "Transylvania",
      chapter: "Transylvania",
      title: "Bran for the silhouette, Brașov for the town",
      lodging: "Brașov old town",
      image: "/images/bran-castle.jpg",
      vibe: "The postcard, on purpose",
      today: "Bran Castle (the postcard), then Râșnov (the better ruin), then Brașov town. It is a Monday — the castle may not open until noon.",
      job: "Admin: Bran tickets, or cash at the gate. Driver: out on time. Everyone: no Dracula dinner show.",
      pitch:
        "Bran is the castle everyone already has in their head — the turrets, the cliff, the Dracula merch. The historical link to Vlad Țepeș is thin. You still go, because the silhouette is the silhouette, and doing it at 8:45 means you get the building without the mall. Then Râșnov, which is the better ruin: a peasant fortress on a ridge, a view, almost no kitsch. Afternoon is Brașov itself — a Saxon square you can actually drink in, which is why this town is base camp and not a day trip from Bucharest.",
      blocks: [
        {
          time: "08:00",
          title: "Bran Castle",
          why: "This is the Hollywood castle. Queen Marie's interiors, a courtyard, the shot. You give it 90 minutes because it is the image the trip will be asked about, and then you leave before the coaches turn it into a queue. It is not Vlad's house. Tomorrow is.",
          how: "Monday 20 Sep. Bran has often opened at noon on Mondays, 9am the rest of the week. Check bran-castle.com. If noon, do Râșnov first. 90 minutes inside. Râșnov is ten minutes up the road.",
        },
        {
          time: "14:00",
          title: "Brașov old town",
          why: "A real medieval square that still functions as a town: Black Church, rope-walk streets, Tampa mountain over the roofs. This is where you will eat for four nights. Walk it so the square is yours, not a backdrop.",
          how: "Black Church, the lanes, cable car up Tampa if you want the view. Early dinner. Tomorrow starts at 7am.",
        },
        {
          time: "20:00",
          title: "Square table",
          why: "Transylvanian food — ciorbă, smoked meats, pickles, palinca — not a Dracula dinner show. The show is five chairs on Piața Sfatului.",
          how: "Skip anything with a cape on the menu.",
        },
      ],
    },
    {
      offset: startOffset + 1,
      city: "Arefu",
      region: "Argeș gorge",
      chapter: "Transylvania",
      title: "Poenari — the real citadel",
      lodging: "Brașov",
      image: "/images/poenari.jpg",
      vibe: "You earn this one",
      today: "Leave at 7am. Three-hour drive. Climb 1,480 steps to Vlad's actual fortress. Drive home before dark.",
      job: "Admin: small cash in lei at the steps. Everyone: boots, water, no racing. Do not add the high mountain road — you would get back at midnight.",
      pitch:
        "Poenari is not a castle tour. It is a cliff. In the 1450s Vlad Țepeș — the Wallachian voivode Bram Stoker later borrowed, the man who impaled Ottoman prisoners on the road to Târgoviște — rebuilt this citadel as a mountain stronghold against the empire to the south. He did not live at Bran. He used Poenari. The Ottomans wrecked it. What is left is broken wall, wind, and a drop into the Argeș gorge. You climb 1,480 concrete steps cut into the rock. Forty-five minutes up. No gift-shop gauntlet first. At the top: a ruin five men in their forties just walked up to, on a cliff the Impaler actually held. That is the dude-trip photograph. Bran was the postcard. This is the story.",
      blocks: [
        {
          time: "07:00",
          title: "The drive",
          why: "Three hours of Wallachian road — hills, villages, then the gorge. The low road keeps you on time. The Transfăgărășan roof from Sibiu is a different day and a different trip. Do not stack them.",
          how: "The eight-seater van. Low road toward Câmpulung / Curtea de Argeș / Arefu. About three hours. Water in the van. Out of Brașov at 7:00, not 7:40.",
        },
        {
          time: "10:00",
          title: "1,480 steps to Vlad's house",
          why: "This is the whole point of Romania on this trip. A working military citadel on a needle of rock. You feel the height. You see why it was useful. You stand in a courtyard that was a fortress, not a museum reconstruction. Folklore says a woman of Vlad's court leapt from these walls rather than be taken — that is a story. The citadel is not. Five moderately fit guys walking up it in September is the adventure. There is no ride, no tram, no skip-the-line. The steps are the ticket.",
          how: "Park at the bottom. Pay at the booth — about 30 lei, cash lei as backup. 45–60 minutes up, 45 on the walls, same way down. Water. Boots, not gym shoes. The ruin is small. The cliff is the point.",
        },
        {
          time: "12:30",
          title: "Vidraru Dam",
          why: "Twenty minutes up the gorge: a 1960s arch dam, a lake, the road clinging to the rock. After a medieval ruin it is a jolt — concrete, scale, the 20th century answering the 15th. Lunch in Arefu, same road home, Brașov before dark.",
          how: "Walk the dam if the weather is clean. Do not add the Transfăgărășan crossing. You would get back at midnight.",
        },
      ],
    },
    {
      offset: startOffset + 2,
      city: "Slănic",
      region: "Prahova",
      chapter: "Transylvania",
      title: "Under the mountain, then a palace",
      lodging: "Brașov",
      image: "/images/salt-mine.jpg",
      vibe: "Bond set, then a fever dream",
      today: "Salt mine in the morning — bring a sweater. Palace on the way home in the afternoon.",
      job: "Admin: Peleș tickets already bought for the afternoon, not 9am. Everyone: sweater. Cash at the mine window.",
      pitch:
        "Unirea at Slănic Prahova is a stadium hollowed out of salt, 208 meters down, air at 13–16°C. A ferris wheel, a football pitch, the walls glittering. It looks like a set. Then, on the corridor home, Peleș Castle in Sinaia: a 19th-century royal pile of carved wood, armor, and leftover empire, the opposite of Poenari's ruin and equally unhinged. Two kinds of extra on one day.",
      blocks: [
        {
          time: "09:30",
          title: "Salina Unirea",
          why: "You are standing in a room the size of an arena that used to be a mountain. People came down here as a cure. You come down because it is one of the strangest interiors in the country, and because Turda — the prettier theme-park mine — is five hours away and would kill this itinerary. Slănic fits. It is also cold, which after Poenari's steps is a gift.",
          how: "Sweater. Buy tickets at the window, about 60 lei. 90 minutes underground is enough. Closed Mondays. Wednesday 22 Sep is a good day. Last bus up is mid-afternoon — leave time for the palace.",
        },
        {
          time: "14:00",
          title: "Peleș Castle, Sinaia",
          why: "King Carol I built a German-fantasy palace in the Carpathians and filled it like a man who had just discovered catalogs. Armor halls, carved ceilings, a last-century flex. After a salt cathedral and a cliff ruin, this is the third castle of the week and the only one that looks like money. Worth 75 minutes. Not worth a separate day.",
          how: "Buy on bilete.peles.ro, afternoon slot (2pm–3pm). Closed Monday and Tuesday. Last entry 4pm. Skip the little castle next door.",
        },
      ],
    },
  ];

  let next = startOffset + 3;
  if (extra) {
    days.push({
      offset: next,
      city: "Brașov",
      region: "Buffer",
      chapter: "Transylvania",
      title: "A free mountain day",
      lodging: "Brașov",
      vibe: "Weather valve",
      today: "Nothing is booked. Walk a ridge or sit on the square. Decide at breakfast.",
      job: "Nobody books a tourist show. Check the weather. Be back for dinner.",
      pitch:
        "Flying IST–OTP is what buys this. Do not pre-fill it with a tourist show. Hold it for a slipped fortress, a ridge walk, or a square day where nobody sets an alarm. The best use of a spare day on a boys trip is often not using it.",
      blocks: [
        {
          time: "open",
          title: "Piatra Craiului, or nothing",
          why: "A proper Carpathian ridge within range of Brașov — or a slow morning, a second pass at the square, a long lunch. Both are legitimate. A Dracula show is not.",
          how: "Check weather at breakfast. If you hike, pick a marked trail and a turnaround time. If you stay, do nothing heroic.",
        },
      ],
    });
    next += 1;
  }

  days.push(
    {
      offset: next,
      city: "Brașov",
      region: "Buffer",
      chapter: "Transylvania",
      title: "Spare morning, then south",
      lodging: "En route",
      vibe: "Leave while it is still good",
      today: "Last coffee in Brașov. Drive or train to Bucharest. No more castles.",
      job: "Admin: van return or train tickets. Everyone: packed and out.",
      pitch:
        "Checkout, a last coffee on the square, then the van or CFR south. Do not add a fortress. The citadel is already in the bag. The job today is to arrive in Bucharest as people who can still sit at a table.",
      blocks: [
        {
          time: "morning",
          title: "Last Brașov hours",
          why: "A town you now know the shape of. That is rarer than another castle.",
          how: "Slow morning on the square. Then drive or train to Bucharest. Fill the van with gas before you return it.",
        },
      ],
    },
    {
      offset: next + 1,
      city: "Bucharest",
      region: "Lipscani",
      chapter: "The capital",
      title: "Last night in the capital",
      lodging: "Old Town, OTP-bound",
      vibe: "The send-off",
      today: "Bucharest Old Town. One dinner. The flight is tomorrow morning.",
      job: "Admin: hotel, unless you would rather a 4:30am drive from Brașov. Everyone: no fortress, no late club unless you vote.",
      pitch:
        "Brașov nightlife is charming and small. Bucharest is a capital with a late pulse. One night in Lipscani, one table, one round of țuică, a hotel that is not a 4am airport run from Transylvania. The flight is tomorrow. Do not schedule a fortress.",
      blocks: [
        {
          time: "afternoon",
          title: "Into the capital",
          why: "You are done with the mountains. The van goes back. The last night should be walkable to dinner, not a 7am drive from Brașov.",
          how: "Drive or train. Return the van with a full tank. Hotel in Old Town.",
        },
        {
          time: "19:00",
          title: "The send-off table",
          why: "Caru' cu Bere is the beer-hall postcard — worth it if you want the room. A modern grill is the better meal. Either way: five chairs, one round of țuică, the trip is over tomorrow and you know it.",
          how: "Book the table. Flight is in the morning. No second nightclub unless the crew votes.",
        },
      ],
    },
    {
      offset: next + 2,
      city: "Homebound",
      region: "OTP → IAD",
      chapter: "Airborne",
      title: "Westbound",
      lodging: "The aircraft",
      vibe: "Walking wounded",
      today: "Airport. Fly home through Istanbul. Same ticket as the way out.",
      job: "Admin: all five of you on one booking. Everyone: one suitcase, be early.",
      pitch:
        "Turkish via Istanbul, or whoever printed the cheaper multi-city. Seven hours back toward Eastern Time. The trip is the week you just did, not this airport.",
      blocks: [
        {
          time: "morning",
          title: "OTP",
          why: "One booking, five men, bags in. Land Dulles the same afternoon or evening.",
          how: "Turkish via Istanbul, or whoever is on the ticket. Do not cut the Istanbul connection fine.",
        },
      ],
    },
  );

  return days;
}

export function buildItinerary(windowId: WindowId, routing: RoutingId): TripDay[] {
  const flyOut = WINDOWS[windowId].flyOut;
  const templates: Template[] = [...ISTANBUL_CORE];
  if (routing === "sofia") templates.push(...sofiaLink(4), ...romaniaDays(6, routing));
  else if (routing === "bus") templates.push(...busLink(4), ...romaniaDays(5, routing));
  else templates.push(...flyLink(4), ...romaniaDays(5, routing));

  return templates.map((t) => ({
    iso: addDays(flyOut, t.offset),
    city: t.city,
    region: t.region,
    chapter: t.chapter,
    title: t.title,
    lodging: t.lodging,
    image: t.image,
    pitch: t.pitch,
    vibe: t.vibe,
    today: t.today,
    job: t.job,
    blocks: t.blocks,
  }));
}

export function routingCopy(routing: RoutingId) {
  return ROUTING[routing];
}

