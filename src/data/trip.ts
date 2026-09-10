export type WindowId = "sep" | "oct";
export type RoutingId = "sofia" | "fly" | "bus";

export const CREW_SIZE = 5;
export const BUDGET_PP = 3000;
export const TRIP_NAME = "Bromania";
export const TRIP_FULL = "Project Bromania MMXXVII";
export const TRIP_TAGLINE = "Dulles. Istanbul. A countryside sleeper. Transylvania.";

export const WINDOWS = {
  sep: {
    id: "sep" as const,
    label: "15–25 Sep 2027",
    flyOut: "2027-09-14",
    arrive: "2027-09-15",
    home: "2027-09-25",
    recommended: true,
    weather: "Highs 72–78°F Istanbul, 60–70°F Brasov. First autumn color.",
    why: "Art biennial opens 18 Sep. The mountain road to Poenari is still open. Cool enough to walk.",
    risks: "Shoulder-season crowds at Bran on weekends. Slightly warmer for the 1,480 steps.",
  },
  oct: {
    id: "oct" as const,
    label: "5–15 Oct 2027",
    flyOut: "2027-10-04",
    arrive: "2027-10-05",
    home: "2027-10-15",
    recommended: false,
    weather: "Highs 64–70°F Istanbul, 50–60°F Brasov. Peak foliage.",
    why: "Better fall color in the mountains. Colder on the steps. We are not going in October.",
    risks: "2026-pattern seasonal Istanbul–Bucharest couchette ended ~10 Oct. Transfăgărășan can close after first snow. Colder on the Poenari steps.",
  },
} as const;

export const ROUTING = {
  sofia: {
    id: "sofia" as const,
    label: "Night train via Sofia",
    short: "The rail story",
    honor: true,
    recommended: false,
    summary:
      "Night train Istanbul to Sofia (it still runs every day), then a van into Romania. This is the countryside sleeper you asked for.",
    costPp: 95,
    romaniaDays: 5,
    drops: "You lose one Transylvania day compared with flying. Bran, Poenari, and the salt mine still fit.",
  },
  fly: {
    id: "fly" as const,
    label: "Fly IST → OTP",
    short: "Protect Romania",
    honor: false,
    recommended: true,
    summary:
      "90-minute flight Istanbul to Bucharest. Extra day in the mountains. You lose the night-train story. Take the boat on the Bosphorus so the water is still in the trip.",
    costPp: 120,
    romaniaDays: 6,
    drops: "You skip the night train. Take the Bosphorus boat so the water is still in the trip.",
  },
  bus: {
    id: "bus" as const,
    label: "Overnight coach",
    short: "Cheap and ugly",
    honor: false,
    recommended: false,
    summary:
      "Overnight bus, about $25. Ugly. Only if the train is cancelled and the flight is expensive.",
    costPp: 35,
    romaniaDays: 5.5,
    drops: "Sleep. Five guys in their forties on a coach is a mutiny.",
  },
} as const;

export const CALLS = [
  { id: "window", label: "Dates", value: "15–25 Sep 2027", note: "That is the week. October is off." },
  { id: "crossing", label: "How we get to Romania", value: "Night train to Sofia, then a van", note: "Saturday 18 Sep, 8pm from Halkalı. Three small sleeper rooms." },
  { id: "fare", label: "Flights", value: "Turkish ExtraFly", note: "One booking, five names, one suitcase each. Do not buy EcoFly." },
  { id: "castle", label: "The castle", value: "Poenari, the day after Bran", note: "1,480 steps. Vlad actually used this one. Bran is the photo." },
  { id: "booker", label: "Who books", value: "One admin, one card", note: "Everyone else: passport, bag, show up." },
] as const;

export const ROLES = [
  {
    id: "admin",
    title: "The admin (one guy, one card)",
    duties: [
      "Buys the flights, two apartments, the night train, both vans, and the tickets that sell out.",
      "Puts every confirmation PDF in the group chat.",
      "Does not pay for ten days of dinners. That is Splitwise.",
    ],
  },
  {
    id: "crew",
    title: "Everyone else",
    duties: [
      "Passport valid through March 2028. One suitcase. Show up when the day says.",
      "Pay your share of meals and drinks as you go.",
      "Do not book a second hotel, a second taxi, or a Dracula dinner show.",
    ],
  },
] as const;

export const RAIL_ALERT = {
  title: "The night train to Bucharest is closed in 2027",
  body: "The rail bridge between Bulgaria and Romania (Giurgiu–Ruse) is shut for construction from 5 April to 13 December 2027. That is the only normal train into Bucharest. Do not buy an Istanbul-to-Bucharest sleeper off a 2026 timetable and hope it still exists.",
  action: "Real plan: night train Istanbul → Sofia (that one still runs every day), then a van into Romania. Backup if the train sells out: fly Istanbul → Bucharest.",
};


export const FLIGHTS = [
  {
    id: "tk8",
    direction: "out" as const,
    airline: "Turkish Airlines",
    code: "TK8",
    from: "IAD",
    to: "IST",
    dep: "21:40",
    arr: "14:50 +1",
    duration: "10h 10m",
    aircraft: "787-9 / 777-300ER",
    note: "Best departure. Land Wednesday afternoon, hotel by 17:00, first rakı that night. 2026 schedule — confirm 2027.",
    recommended: true,
  },
  {
    id: "tk188",
    direction: "out" as const,
    airline: "Turkish Airlines",
    code: "TK188",
    from: "IAD",
    to: "IST",
    dep: "13:15",
    arr: "06:00 +1",
    duration: "9h 45m",
    aircraft: "787-9",
    note: "If the crew refuses a Monday/Tuesday night airport. You burn the calendar start date in the air and hit IST at dawn.",
    recommended: false,
  },
  {
    id: "return-tk",
    direction: "home" as const,
    airline: "Turkish Airlines",
    code: "OTP–IST–IAD",
    from: "OTP",
    to: "IAD",
    dep: "morning bank",
    arr: "same afternoon/evening",
    duration: "~14–16h",
    aircraft: "Narrow-body + 787/777",
    note: "Book as one Turkish ticket: Dulles to Istanbul, Bucharest to Dulles. Same bag rules. Do not buy five separate tickets.",
    recommended: true,
  },
];

export const FLIGHT_LINKS = {
  googleSep:
    "https://www.google.com/travel/flights?q=Flights%20from%20IAD%20to%20IST%20on%202027-09-14%20and%20from%20OTP%20to%20IAD%20on%202027-09-25",
  googleOct:
    "https://www.google.com/travel/flights?q=Flights%20from%20IAD%20to%20IST%20on%202027-10-04%20and%20from%20OTP%20to%20IAD%20on%202027-10-15",
  turkish: "https://www.turkishairlines.com/",
  kayakSep: "https://www.kayak.com/flights/IAD-IST/2027-09-14/OTP-IAD/2027-09-25?sort=bestflight_a",
};

export const ISTANBUL_STAY = {
  nights: 3,
  neighborhood: "Karaköy / Galata",
  why: "Five men in their forties do not want to be marooned in Sultanahmet after 21:00. Karaköy puts you on the water, a 12-minute walk from Galata Tower, a tram hop to the old city, and inside the actual nightlife. Book an entire apartment if you can — a living room is worth more than a minibar.",
  durationAdvice:
    "Three nights is the floor. Two nights is a jet-lagged Hagia Sophia selfie and a bad kebab. Four nights is lovely if you fly to Bucharest and steal the extra night from the train. Do not give Istanbul fewer than 72 hours on the ground.",
};

export const ISTANBUL_HOTELS = [
  {
    id: "apt",
    name: "Entire Galata / Karaköy apartment",
    area: "Galata · Bankalar · Serdar-ı Ekrem",
    fit: "First choice",
    nightly: 280,
    rooms: "3 bedrooms, one living room",
    why: "The boys-trip play. Common table for rakı, no 11pm lobby stare, split is ~$56 a head. Search Booking + Airbnb for 5 guests, 3 beds, 15–18 Sep.",
    url: "https://www.booking.com/searchresults.html?ss=Galata%2C+Istanbul&group_adults=5&no_rooms=3&checkin=2027-09-15&checkout=2027-09-18",
  },
  {
    id: "vault",
    name: "Vault Karaköy, The House Hotel",
    area: "Bankalar Caddesi",
    fit: "Design hotel",
    nightly: 420,
    rooms: "2 doubles + 1 twin (~$84 pp)",
    why: "Restored bank, rooftop with the tower, quiet enough to sleep. Three rooms for five is the honest hotel math.",
    url: "https://www.google.com/travel/hotels/Vault%20Karakoy%20The%20House%20Hotel",
  },
  {
    id: "ten",
    name: "10 Karaköy Istanbul",
    area: "Karaköy waterfront",
    fit: "Rooftop + tram",
    nightly: 390,
    rooms: "2 doubles + 1 twin",
    why: "Tram at the door, Bosphorus from the roof, easy bag drop after IST. Slightly more hotel-hotel than Vault.",
    url: "https://www.google.com/travel/hotels/10%20Karakoy%20Istanbul",
  },
  {
    id: "georges",
    name: "Georges Hotel Galata",
    area: "Serdar-ı Ekrem",
    fit: "Boutique splurge",
    nightly: 480,
    rooms: "2–3 rooms, rooftop French kitchen",
    why: "Best roof on the street. Only if the apartment search fails and you want a last-night-in-town feeling every night.",
    url: "https://www.google.com/travel/hotels/Georges%20Hotel%20Galata",
  },
];

export const ISTANBUL_EVENTS = [
  {
    name: "19th Istanbul Biennial",
    when: "18 Sep – 14 Nov 2027 (professional preview 14–17 Sep)",
    why: "Opens the Saturday you are in town on the September window. Curated by Liu Ding and Carol Yinghua Lu. This is the single best cultural reason to pick September over October.",
    url: "https://bienal.iksv.org/en",
  },
  {
    name: "Home football",
    when: "Check TFF fixture list in Aug 2027",
    why: "Galatasaray, Fenerbahçe or Beşiktaş at home is the correct Friday night if the calendar lands. Avoid tourist dervish dinner theater.",
    url: "https://www.tff.org/",
  },
  {
    name: "Kılıç Ali Paşa Hamam",
    when: "Men-only 16:30–23:30. Book the five-pack. Morning is women.",
    why: "16th-century Sinan bath in Karaköy. The reset after two days of walking. Book the men’s session as a five-pack.",
    url: "https://www.kilicalipasahamami.com/",
  },
];

export const ISTANBUL_DAYS = [
  {
    title: "Arrive, water, first table",
    image: "/images/karakoy.jpg",
    pitch:
      "First night is not for monuments. It is for the neighborhood you will live in: the water, a roof, and a table that does not close at nine. Sultanahmet after dark is a postcard with the lights off. Karaköy is still a city.",
    beats: [
      {
        title: "One van, not five taxis",
        why: "A boys trip that starts with five separate taxi negotiations is already behind. You land as a crew or you land as tourists.",
        how: "Havaist or a pre-booked van to Karaköy, 60–90 min. eSIMs at the airport if nobody set one up.",
      },
      {
        title: "Walk Galata",
        why: "This is the street you come home to for three nights — tower, lanes, the Horn at the bottom of the hill. You are locating the bar, not collecting a selfie.",
        how: "Tower street and Karaköy lanes. Skip the tower queue unless it is short. The view is better from a roof with a drink.",
      },
      {
        title: "Roof, then a real meyhane",
        why: "Istanbul's drinking culture is meze and rakı at a table you do not leave for three hours — not a rooftop tourist grill with a DJ. This is the first night the five of you are actually on the trip.",
        how: "Bank Roof or Georges for the view. Then Asmalımescit or Karaköy Lokantası. White cheese, grilled liver, no belly-dance package. Curfew 23:30. Jet lag is undefeated.",
      },
    ],
  },
  {
    title: "The old city, once",
    image: "/images/istanbul-hagia.jpg",
    pitch:
      "You get one day in the old city. Do it at opening, in long trousers, and then leave. The mistake is stacking three mosques, the Grand Bazaar, and Topkapı until everyone hates Istanbul.",
    beats: [
      {
        title: "Hagia Sophia at opening",
        why: "Fifteen hundred years of church, mosque, museum, mosque. You walk into the volume of it — the dome, the light, the fact that this building outlasted the empires that built it. That is the one monument that earns a boys-trip morning.",
        how: "Be there at opening. Long trousers, shoulders covered. Official gallery ticket €25 — Museum Pass does not cover it. Blue Mosque courtyard if it is open. Do not stack a third mosque.",
      },
      {
        title: "Basilica Cistern",
        why: "Underground Istanbul. Columns in black water, Medusa heads used as column bases, the cinematic one from every film that needed a secret city. Twenty minutes of actually-cool.",
        how: "yerebatan.com / Passo, or the box office that morning. Never a basilica-cistern.com clone. Skip the audio. Walk it.",
      },
      {
        title: "One palace, then leave",
        why: "Topkapı if anyone wants weapons and the imperial treasury. The Archaeological Museum if you would rather see the objects without the crush. The Grand Bazaar is a shortcut, not a destination.",
        how: "Pick one. Grand Bazaar 45 minutes, then Spice Bazaar if anyone is shopping. Süleymaniye at sunset for the Horn, dinner back on the nightlife side.",
      },
    ],
  },
  {
    title: "Hammam and the strait",
    image: "/images/galata.jpg",
    pitch:
      "The Istanbul day that is not a museum. The water the whole trip is named after, then a 16th-century bath. The Bosporus Express cannot run to Bucharest in 2027. The Bosporus itself is still here.",
    beats: [
      {
        title: "Two hours on the Bosporus",
        why: "Europe on one bank, Asia on the other, palaces, fortresses, the current pulling you north. This is the water the night train was supposed to leave from. Skipping it because the train died is missing the trip.",
        how: "Public Şehir Hatları from Karaköy, or a private 2-hour charter. Bring a layer. No dining-cruise package. Hammam is tonight — men’s hours start 16:30.",
      },
      {
        title: "Kılıç Ali Paşa Hamam",
        why: "Sinan built this bath in 1580 for a pirate admiral. Marble, steam, a very serious man with a mitt. Five of you in a 16th-century room getting reset after the strait — that is a dude-trip ritual, not a spa day.",
        how: "Men-only 16:30–23:30. Do not book 09:00 — that is women’s hours. Five-pack on kilicalipasahamami.com. Walk from the apartment.",
      },
      {
        title: "Last Karaköy table",
        why: "Steam, then a table you do not leave. Tomorrow is the sleeper. Tonight is still Istanbul.",
        how: "Meyhane in Karaköy or Asmalımescit. Picnic is a Saturday morning shop. Biennial opens Saturday — one pavilion, then Marmaray.",
      },
    ],
  },
];

export const ROMANIA_PILLARS = [
  {
    id: "bran",
    name: "Bran Castle",
    image: "/images/bran-castle.jpg",
    status: "live" as const,
    truth: "The postcard. Weak historical link to Vlad. Still worth 90 minutes because the silhouette is the silhouette, and you are 30 minutes from Brasov.",
    why: "This is the castle everyone already has in their head — turrets, cliff, the Dracula shot. You still go, because the silhouette is the silhouette. Then Râșnov, which is the better ruin. Bran is the photograph. Poenari, the next day, is the story.",
    how: "Open at 9 most days. 20 Sep is a Monday — Bran has often opened at noon Mondays. Confirm on bran-castle.com. If noon, Râșnov first. Combine with Râșnov Fortress (better ruin, better view, half the kitsch) the same morning.",
    time: "Half day from Brasov",
    cost: 15,
    url: "https://www.bran-castle.com/",
  },
  {
    id: "poenari",
    name: "Poenari Fortress",
    image: "/images/poenari.jpg",
    status: "locked" as const,
    truth: "The real Vlad Țepeș citadel. 1,480 concrete steps, cliff, ruins, Argeș gorge. This is the boys-trip castle. Bran is the souvenir. Locked for Tuesday 21 Sep.",
    why: "Vlad Țepeș rebuilt this citadel in the 1450s as a mountain stronghold against the Ottomans. He did not live at Bran. He used Poenari. The Ottomans wrecked it. What is left is broken wall, wind, and a drop into the Argeș gorge. You climb 1,480 concrete steps cut into the rock — no tram, no skip-the-line, no gift-shop gauntlet first. Forty-five minutes up. At the top: a courtyard the Impaler actually held. Five healthy men in their forties walking a cliff to that, in autumn, with nobody selling capes. That is the dude-trip photograph. Bran was the postcard. This is the story.",
    how: "Leave Brașov 07:00. Drive the low road: DN73 toward Câmpulung / Curtea de Argeș / Arefu, ~3 hours. Do not go over the Transfăgărășan roof from Sibiu — that is a different day. Park at the base. 45–60 min up, 45 min on the walls, same way down. Water, boots, no racing. The ruin is small — the setting is the monument. Vidraru Dam is twenty minutes up the gorge for lunch. Same road home. Brașov before dark.",
    time: "Full day · locked",
    cost: 8,
    url: "https://www.google.com/maps/search/Poenari+Fortress",
  },
  {
    id: "salt",
    name: "Slănic Prahova salt mine",
    image: "/images/salt-mine.jpg",
    status: "live" as const,
    truth: "Unirea chamber is the size of a stadium, 208 m underground, 13–16°C. Salina Turda is prettier as a theme park — and five hours from Brasov. The sleeper calendar still fits this after Poenari.",
    why: "A mountain hollowed into an arena: ferris wheel, football pitch, walls of salt. It looks like a Bond set. Turda is the famous one and it is five hours away. Slănic is the mine that actually fits a Brașov week — and after Poenari's steps, 13°C air is a gift.",
    how: "Wednesday 22 Sep. Closed Mondays; shoulder September has also closed Tuesdays. Sweater required. 90 minutes underground is enough. Pair with Peleș Castle in Sinaia on the same corridor home — book Peleș as an afternoon slot.",
    time: "Half to three-quarter day",
    cost: 12,
    url: "https://www.google.com/maps/search/Salina+Slanic+Prahova",
  },
];

export const ROMANIA_HOTELS = [
  {
    id: "wagner",
    name: "Casa Wagner",
    area: "Piața Sfatului, Brașov",
    nights: "4–5 as the base",
    nightly: 210,
    why: "On the square. Walk to dinner. Three rooms. The correct Brasov address for a crew that wants a medieval town, not a resort.",
    url: "https://www.google.com/travel/hotels/Casa%20Wagner%20Brasov",
  },
  {
    id: "bella",
    name: "Bella Muzica",
    area: "Brașov old town",
    nights: "4–5",
    nightly: 190,
    why: "Cellar restaurant that actually feeds you. Slightly less pretty, slightly more useful.",
    url: "https://www.google.com/travel/hotels/Bella%20Muzica%20Brasov",
  },
  {
    id: "house",
    name: "Whole house, Șcheii Brașovului",
    area: "Below Tampa, 12 min walk to the square",
    nights: "4–5",
    nightly: 160,
    why: "Same apartment logic as Istanbul. Palinca on the terrace. Best per-head number.",
    url: "https://www.booking.com/searchresults.html?ss=Brasov&group_adults=5&no_rooms=3&checkin=2027-09-19&checkout=2027-09-24",
  },
  {
    id: "lipscani",
    name: "Last night, Bucharest Old Town",
    area: "Lipscani",
    nights: "1, the night before the flight",
    nightly: 240,
    why: "Brașov nightlife is charming and small. If the crew wants a proper send-off, drive to Bucharest on the last afternoon, eat at Caru' cu Bere or a modern grill, sleep near OTP. Do not do this the night you arrive shattered from a train.",
    url: "https://www.google.com/travel/hotels/Bucharest%20Old%20Town",
  },
];

export const TRANSPORT_RO = [
  {
    name: "8-seater from OTP or Brașov",
    cost: 90,
    unit: "per day + fuel",
    why: "Five big Americans plus bags do not fit a Dacia Jogger. Book a VW Transporter, Ford Transit, or similar. Bran, Poenari, and Slănic are not on one train line. One designated driver per day, rotate, automatic if anyone is rusty.",
  },
  {
    name: "CFR Brașov–București Nord",
    cost: 15,
    unit: "per seat, 2.5–3h",
    why: "If you skip the car. Fast and cheap between the two cities. Useless for the castle/mine triangle.",
  },
  {
    name: "Private driver, 5 pax",
    cost: 180,
    unit: "per day",
    why: "If nobody wants to drive after palinca. Still cheaper than five taxis. Book through the hotel or a Brasov agency. Strong option for the Poenari day so nobody navigates the gorge tired.",
  },
];

export const BUDGET_LINES = [
  { id: "flights", label: "Flights IAD–IST / OTP–IAD", sep: 1200, oct: 1100, note: "Turkish multi-city, economy. Book 8–11 months out. 2026 analog ~$900–1,200 nonstop." },
  { id: "ist-hotel", label: "Istanbul lodging, 3 nights", sep: 280, oct: 250, note: "Apartment split, or 3 hotel rooms." },
  { id: "ro-hotel", label: "Romania lodging, 5–6 nights", sep: 240, oct: 220, note: "Brașov base + optional Bucharest night." },
  { id: "link", label: "Istanbul → Romania link", sep: 95, oct: 95, note: "Sofia sleeper, IST–OTP, or coach — toggle in the HQ." },
  { id: "car", label: "Romania van + fuel", sep: 160, oct: 160, note: "8-seater, not a Jogger. Split five ways." },
  { id: "tickets", label: "Castles, mine, hammam, cistern, boat", sep: 120, oct: 120, note: "All the paid doors." },
  { id: "food", label: "Food and drink", sep: 750, oct: 750, note: "The other big number. Meyhane, palinca, one steak night." },
  { id: "buffer", label: "Buffer / taxis / sim / tips", sep: 120, oct: 120, note: "Keep this. Do not spend it in the Grand Bazaar." },
] as const;

export const QUESTIONS = [
  { id: "routing", label: "Confirm Sofia sleeper + van, or still tempted to fly IST–OTP?", hint: "Sleeper is the brief. Fly is the spare chute. Both now fit Bran + Poenari + Slănic." },
  { id: "rooms", label: "Apartment or three hotel rooms?", hint: "Apartment wins for five men. Living room matters." },
  { id: "driver", label: "Who will drive in Romania?", hint: "Need at least two names. Automatic 8-seater." },
  { id: "nights", label: "Nightlife: meyhane and one club, or quiet roofs?", hint: "Sets Istanbul neighborhood and last-night Bucharest." },
  { id: "diet", label: "Any non-negotiable diet / allergy?", hint: "Turkey and Romania are friendly to omnivores; less so to strict vegan without planning." },
];

export const LINKS = {
  cfr: "https://bileteinternationale.cfrcalatori.ro/",
  tcdd: "https://ebilet.tcddtasimacilik.gov.tr/",
  seat61: "https://www.seat61.com/Turkey.htm",
  bran: "https://www.bran-castle.com/",
  poenari: "https://www.google.com/maps/search/Poenari+Fortress",
  biennial: "https://bienal.iksv.org/en",
};

export function budgetTotal(windowId: WindowId, routing: RoutingId) {
  const key = windowId === "sep" ? "sep" : "oct";
  const link = ROUTING[routing].costPp;
  return BUDGET_LINES.reduce((sum, line) => {
    if (line.id === "link") return sum + link;
    return sum + line[key];
  }, 0);
}
