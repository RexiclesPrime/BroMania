import { FLIGHT_LINKS, LINKS } from "@/data/trip";

export const EXTRAFY_Q = {
  brand: "ExtraFly",
  rbd: "Q",
  route: "IAD–IST / OTP–IST–IAD · US piece-concept",
  hold: {
    label: "Checked",
    pieces: 1,
    kg: 23,
    lb: 50,
    linearCm: 158,
    linearIn: 62,
    size: "158 cm linear",
    note: "One bag. Over 23 kg is a fee; over 32 kg they will not take it as a single piece. 158 cm (L+W+H) is the free-size cap.",
  },
  cabin: {
    label: "Cabin bag",
    pieces: 1,
    kg: 8,
    lb: 17.6,
    size: "55 × 40 × 23 cm",
    sizeIn: "21.7 × 15.7 × 9.1 in",
    note: "Istanbul weighs this. IAD is looser. Pack 7 kg and stop.",
  },
  personal: {
    label: "Personal item",
    pieces: 1,
    kg: 4,
    lb: 8.8,
    size: "40 × 30 × 15 cm",
    sizeIn: "16 × 12 × 6 in",
    note: "Under the seat. Sling or laptop sleeve, not a second backpack.",
  },
  rules: [
    "Buy ExtraFly. That is the row that includes a checked suitcase. EcoFly often has no suitcase. Do not buy EcoFly.",
    "Q is just the cheap price, not a different plane. If the ExtraFly row says Q, that is fine.",
    "After you pay, open the ticket. It should say one checked bag, 23 kg. Screenshot that.",
    "Pay for seats so the five of you sit together.",
    "Changes cost money. Refunds on this fare are ugly. Screenshot the rules before you click pay.",
    "Food is included on the long flight. Do not buy a snack box.",
    "Liquids in the cabin: 100 ml bottles in one zip bag. Phone battery packs stay in the cabin, never the hold.",
    "Check the bag allowance again in Manage Booking after you have a confirmation number.",
  ],
  links: {
    fareRules: "https://www.turkishairlines.com/en-int/any-questions/fare-rules/",
    checked: "https://www.turkishairlines.com/en-int/any-questions/checked-baggage/",
    calculator: "https://www.turkishairlines.com/additionalservices/extra-baggage-calculator",
    book: FLIGHT_LINKS.turkish,
  },
};

export type BookingTask = {
  id: string;
  step: number;
  phase: "Air" | "Beds" | "Crossing" | "Ground" | "Paper";
  title: string;
  when: string;
  where: string;
  how: string;
  swarm: string;
  url: string;
  urlLabel: string;
  altUrl?: string;
  altLabel?: string;
  crew: number;
  pp: number;
  range: string;
  basis: string;
  optional?: boolean;
};

export const BOOKINGS: BookingTask[] = [
  {
    id: "air",
    step: 1,
    phase: "Air",
    title: "Turkish ExtraFly, one booking for five",
    when: "Now. Buy 2027 flights this year. September 2026 is not too early.",
    where: "turkishairlines.com. Look at Google Flights first if you want. Pay on Turkish so the miles and the bag stay clean.",
    how: "Multi-city, five adults, one booking: Dulles → Istanbul 14 Sep 2027 (TK8 at 9:40pm if it still exists), Bucharest → Dulles 25 Sep 2027. Names exactly as passports. Choose ExtraFly so you get a suitcase. Do not choose EcoFly. Do not buy five separate tickets.",
    swarm: "Flight Scout can watch the price. You click buy.",
    url: FLIGHT_LINKS.turkish,
    urlLabel: "Turkish Airlines",
    altUrl: FLIGHT_LINKS.googleSep,
    altLabel: "Google Flights, this window",
    crew: 6000,
    pp: 1200,
    range: "$1,050–1,350 a head",
    basis: "What ExtraFly Dulles–Istanbul / Bucharest–Dulles cost in 2026, roughly. September is more than October. EcoFly looks cheaper and often has no suitcase — skip it.",
  },
  {
    id: "ist-apt",
    step: 2,
    phase: "Beds",
    title: "Istanbul apartment, 15–18 Sep",
    when: "This week, refundable only. Free-cancel until summer.",
    where: "Airbnb first for an entire place. Booking.com as the backup search. Galata / Karaköy / Bankalar. Five guests, three beds, a table.",
    how: "Entire home, not a hotel-with-five-singles. Living room is the point. Check-in 15 Sep after 15:00, out 18 Sep morning (sleeper is that night — leave bags or take them to Halkalı). Screenshot the cancellation deadline.",
    swarm: "Hotel Scout lists refundable options. You hold the card.",
    url: "https://www.airbnb.com/s/Galata--Istanbul/homes?checkin=2027-09-15&checkout=2027-09-18&adults=5",
    urlLabel: "Airbnb Galata, 5 adults",
    altUrl:
      "https://www.booking.com/searchresults.html?ss=Galata%2C+Istanbul&group_adults=5&no_rooms=3&checkin=2027-09-15&checkout=2027-09-18",
    altLabel: "Booking.com, same dates",
    crew: 840,
    pp: 168,
    range: "$720–1,200 crew",
    basis: "About $280 a night × 3 for a whole 3-bed Galata place. Vault Karaköy as three hotel rooms is closer to $1,260. Refundable first.",
  },
  {
    id: "ro-apt",
    step: 3,
    phase: "Beds",
    title: "Brașov apartment, 19–24 Sep",
    when: "Same week as Istanbul. Refundable.",
    where: "Airbnb or Booking, Șcheii Brașovului or inside the walls. Five guests, three beds, a terrace if you can.",
    how: "Check-in 19 Sep (you arrive from Sofia in a van). Out 24 Sep if you take the Bucharest night, or 25 Sep if you drive to OTP at dawn. Casa Wagner on the square is the hotel fallback — three rooms, not five.",
    swarm: "Hotel Scout. You book.",
    url: "https://www.airbnb.com/s/Brasov/homes?checkin=2027-09-19&checkout=2027-09-24&adults=5",
    urlLabel: "Airbnb Brașov, 5 adults",
    altUrl:
      "https://www.booking.com/searchresults.html?ss=Brasov&group_adults=5&no_rooms=3&checkin=2027-09-19&checkout=2027-09-24",
    altLabel: "Booking.com Brașov",
    crew: 800,
    pp: 160,
    range: "$650–1,100 crew",
    basis: "About $160 a night × 5 in Șcheii. Casa Wagner on the square, three rooms, is ~$1,050 for the same stay.",
  },
  {
    id: "otp-night",
    step: 4,
    phase: "Beds",
    title: "Last night, Bucharest (optional)",
    when: "After the Brașov place is locked. Can wait until spring.",
    where: "Booking.com, Lipscani / Old Town, 24–25 Sep, five men, two rooms plus a twin or one apartment.",
    how: "Only if you do not want a 04:30 drive from Brașov to OTP. One night. Do not do this the night you arrive shattered from Sofia.",
    swarm: "Hotel Scout can add a Lipscani line. You decide after the van plan is real.",
    url: "https://www.booking.com/searchresults.html?ss=Bucharest+Old+Town&group_adults=5&checkin=2027-09-24&checkout=2027-09-25",
    urlLabel: "Booking.com Lipscani",
    crew: 240,
    pp: 48,
    range: "$180–350 crew",
    basis: "One night, two doubles + a twin or a small apartment. Skip it if you would rather a 04:30 drive from Brașov.",
    optional: true,
  },
  {
    id: "sleeper",
    step: 5,
    phase: "Crossing",
    title: "Istanbul–Sofia Express, three 2-berths",
    when: "Open TCDD about eight weeks out. Not now. Not 2026-pattern Bucharest tickets.",
    where: "TCDD e-bilet. Halkalı → Sofia, 18 Sep 2027, 20:00 if the timetable holds. TVS2000 sleeper, 2-berth compartments only.",
    how: "Three compartments (2+2+1). Do not book 4-berth couchettes — the crew does not fit. Passports on the ticket. Screenshot the berth numbers. Seat61 for how the night actually works. The Bosporus Express to Bucharest is not the 2027 plan.",
    swarm: "Rail Sentinel watches whether a Bucharest diversion appears. You still buy Sofia on TCDD.",
    url: LINKS.tcdd,
    urlLabel: "TCDD e-bilet",
    altUrl: LINKS.seat61,
    altLabel: "Seat61, Turkey",
    crew: 260,
    pp: 52,
    range: "$230–320 crew",
    basis: "TCDD 2026 tariff: €44 a head in a 2-berth, €75 for a single. Three compartments (2+2+1) is ~€250. Couchettes are cheaper and wrong.",
  },
  {
    id: "sofia-van",
    step: 6,
    phase: "Crossing",
    title: "Sofia → Brașov 8-seater",
    when: "After sleeper tickets exist. A month out is enough.",
    where: "GetTransfer or Daytrip for a private van. Not a taxi. Not a Dacia Jogger. Not FlixBus unless the van dies.",
    how: "Sunday 19 Sep, pickup Sofia Central in the morning when the sleeper arrives. Drop Șcheii / Piața Sfatului. Five men plus five 23 kg bags needs a Transporter / V-class / similar. Confirm the driver takes highway via Bucharest or the mountain road and how many hours they are quoting.",
    swarm: "Van Desk can price it. You pay.",
    url: "https://www.gettransfer.com/",
    urlLabel: "GetTransfer",
    altUrl: "https://www.daytrip.com/",
    altLabel: "Daytrip",
    crew: 650,
    pp: 130,
    range: "$500–800 crew",
    basis: "One 8-seater, Sofia Central → Brașov, five bags. Sofia–Bucharest vans already print €270–560; you keep going into the mountains. Not per seat — per vehicle.",
  },
  {
    id: "ro-van",
    step: 7,
    phase: "Ground",
    title: "Romania week van, automatic 8-seater",
    when: "Spring 2027, full insurance, two named drivers.",
    where: "DiscoverCars or Rentalcars, pickup Brașov or Bucharest, drop OTP on the 25th if you skip the Lipscani night.",
    how: "VW Transporter, Ford Transit, or Mercedes Vito. Automatic. Five big Americans plus bags do not fit a Jogger. Two drivers on the contract. Credit card in the renter's name. Poenari is a full-day gorge drive — do not cheap out on tires and brakes.",
    swarm: "Van Desk. You are the renter of record.",
    url: "https://www.discovercars.com/",
    urlLabel: "DiscoverCars",
    altUrl: "https://www.rentalcars.com/",
    altLabel: "Rentalcars",
    crew: 800,
    pp: 160,
    range: "$650–1,000 crew",
    basis: "Automatic Transporter / Vito, ~$90–130 a day × 6, plus fuel and CDW. A Jogger looks like $40 a day and does not hold the crew.",
  },
  {
    id: "tickets",
    step: 8,
    phase: "Ground",
    title: "Tickets you buy before you go",
    when: "Two to four weeks before the trip. Poenari and the salt mine you pay at the door.",
    where: "Official sites only. See Tickets below. Fake cistern websites exist. Do not use them.",
    how: "One card, five names, PDFs in the group chat. Buy: Turkish bath, Hagia Sophia, cistern, Bran, Peleș. Pay cash at Poenari and the salt mine the day you go.",
    swarm: "You buy the timed ones. The list below is the walkthrough.",
    url: "https://www.kilicalipasahamami.com/",
    urlLabel: "Kılıç Ali Paşa",
    altUrl: "https://www.bran-castle.com/",
    altLabel: "Bran Castle",
    crew: 1180,
    pp: 236,
    range: "$1,000–1,350 crew",
    basis: "Turkish bath about $110 each, Hagia Sophia $27, cistern $48, Bran $25, Peleș $26. That is about $1,180 for five. Poenari and the salt mine are cash on the day — small, not in this number.",
  },
  {
    id: "insurance",
    step: 9,
    phase: "Paper",
    title: "Travel insurance, five names",
    when: "The day the air is ticketed.",
    where: "Allianz or the card's trip-cancel if it actually covers multi-city. One policy, five travelers, 14–25 Sep 2027.",
    how: "Medical plus trip interruption. Romania driving days included. Send the PDF to the crew.",
    swarm: "Inbox Clerk logs the policy number. You buy it.",
    url: "https://www.allianztravelinsurance.com/",
    urlLabel: "Allianz trip insurance",
    crew: 500,
    pp: 100,
    range: "$350–750 crew",
    basis: "Ten days, five men in their forties, medical plus trip interruption. Card coverage only if it actually names a multi-city ticket. Confirm before you skip this.",
  },
  {
    id: "sims",
    step: 10,
    phase: "Paper",
    title: "eSIMs and the split app",
    when: "The week before wheels up.",
    where: "Airalo / Google Fi / a Turkish eSIM at IST if nobody set one up. Splitwise or a shared note for the five-way.",
    how: "One man is not the bank for ten days without a ledger. ATMs for TRY and RON. No airport exchange.",
    swarm: "Quartermaster keeps the $3,000 ledger. You start the split.",
    url: "https://www.airalo.com/",
    urlLabel: "Airalo",
    crew: 150,
    pp: 30,
    range: "$0–200 crew",
    basis: "Airalo ~$25–35 a head for the two countries. $0 if someone is already on Google Fi. Splitwise is free. ATMs are not a booking.",
  },
];

export function requiredBookings() {
  return BOOKINGS.filter((b) => !b.optional);
}

export function bookingsCrewTotal(list: BookingTask[] = requiredBookings()) {
  return list.reduce((sum, b) => sum + b.crew, 0);
}

export type DoorMode = "buy" | "walk" | "optional";

export type Door = {
  id: string;
  mode: DoorMode;
  city: "Istanbul" | "Romania";
  day: string;
  title: string;
  analog: string;
  crew: number;
  pp: number;
  when: string;
  where: string;
  how: string;
  watch: string;
  url: string;
  urlLabel: string;
  altUrl?: string;
  altLabel?: string;
};

export const DOORS: Door[] = [
  {
    id: "door-hammam",
    mode: "buy",
    city: "Istanbul",
    day: "Fri 17 Sep",
    title: "Kılıç Ali Paşa Hamam, five-pack",
    analog: "~4,300 TL / $100–110 a head",
    crew: 550,
    pp: 110,
    when: "Two to four weeks out. Men-only hours are 16:30–23:30. Last reservation 22:00.",
    where: "kilicalipasahamami.com only. Tophane / Karaköy, a walk from the apartment. Not a hotel spa package.",
    how: "Book five men on one reservation for Friday after 16:30. Do not book 09:00 — that is women’s hours. Spare underwear. Tip 10–20% in TRY cash. The oil massage is a separate reservation; skip it unless someone asks.",
    watch: "Do not book 9am. That is women’s hours. Boat in the morning, bath after 4:30pm, dinner after.",
    url: "https://www.kilicalipasahamami.com/en",
    urlLabel: "Kılıç Ali Paşa",
  },
  {
    id: "door-hagia",
    mode: "buy",
    city: "Istanbul",
    day: "Thu 16 Sep",
    title: "Hagia Sophia, upper gallery",
    analog: "€25 / ~$27 a head",
    crew: 135,
    pp: 27,
    when: "A few days out, or the booth that morning. Be at the gallery gate at opening.",
    where: "Official state ticket is muze.gen.tr. Booth is across from the Sultan Ahmed III Fountain, not the mosque prayer door. ayasofyacamii.gov.tr is info, not the cart.",
    how: "Five foreign-visitor gallery tickets. Museum Pass does not cover this. Ground floor is for worship — you are in the upper gallery. Long trousers, shoulders covered. Friday 12:00–14:30 is closed to tourists; you are there Thursday, so that trap is not yours.",
    watch: "€25 is the gallery, not a skip-the-line miracle. Security is the line you cannot buy past. Opening still beats any reseller.",
    url: "https://muze.gen.tr/",
    urlLabel: "muze.gen.tr",
    altUrl: "https://ayasofyacamii.gov.tr/",
    altLabel: "Hagia Sophia info",
  },
  {
    id: "door-cistern",
    mode: "buy",
    city: "Istanbul",
    day: "Thu 16 Sep",
    title: "Basilica Cistern, daytime",
    analog: "1,950 TL / ~$45–50 a head",
    crew: 240,
    pp: 48,
    when: "The night before if Passo still lists Yerebatan. Otherwise the box office that morning, after Hagia Sophia.",
    where: "Official info is yerebatan.com. Online sales, when they exist, go through Passo. Box office takes card / İstanbulkart — not a random .com.",
    how: "Five daytime tickets (09:00–18:30). Skip the audio. Skip Night Shift at 19:30 — that is a different evening. If Passo does not show the cistern, buy at the window. Do not pay a reseller a 20% tax for an English button.",
    watch: "If the URL is not yerebatan.com or passo.com.tr, close it. basilica-cistern.com and cousins are not the cistern. Museum Pass is not valid here either.",
    url: "https://yerebatan.com/en",
    urlLabel: "yerebatan.com",
    altUrl: "https://www.passo.com.tr/",
    altLabel: "Passo",
  },
  {
    id: "door-bran",
    mode: "buy",
    city: "Romania",
    day: "Mon 20 Sep",
    title: "Bran Castle, standard tour",
    analog: "120 lei / ~$25 a head",
    crew: 125,
    pp: 25,
    when: "A week out if Monday still opens late. Otherwise 08:45 at the car park is enough.",
    where: "bran-castle.com only. Standard tour, not the torture-room combo, not a Halloween package, not a cape dinner.",
    how: "Five adult standard tickets. 20 Sep 2027 is a Monday — Bran has often opened at noon on Mondays (Tue–Sun at 09:00). Confirm hours on the official page before you pay. If noon, do Râșnov first and Bran after lunch.",
    watch: "Skip Royal Tour Plus Fast Pass and anything with a Time Tunnel. You want the silhouette, 90 minutes, then the better ruin up the road.",
    url: "https://www.bran-castle.com/",
    urlLabel: "Bran Castle",
  },
  {
    id: "door-peles",
    mode: "buy",
    city: "Romania",
    day: "Wed 22 Sep",
    title: "Peleș Castle, timed interior",
    analog: "~100–120 lei / $22–26 a head",
    crew: 130,
    pp: 26,
    when: "A few days out. Timed slots, first-come inside the slot, not refundable.",
    where: "bilete.peles.ro only, or the SelfPay machines on site. peles.ro is the museum; it does not sell the ticket.",
    how: "Five adult tickets, Wednesday afternoon slot — 14:00, 14:30, or 15:00. Closed Monday and Tuesday, so Wednesday is the first open day of the week. Last entry 16:00. Grand / full tour if it is offered; skip Pelișor.",
    watch: "Do not take the 09:15 first slot. You will still be in Slănic. Book the salt mine as a morning walk-up, Peleș as the afternoon door on the DN1 corridor home.",
    url: "https://bilete.peles.ro/",
    urlLabel: "bilete.peles.ro",
    altUrl: "https://peles.ro/en/program-si-taxe/",
    altLabel: "Hours and rules",
  },
  {
    id: "door-poenari",
    mode: "walk",
    city: "Romania",
    day: "Tue 21 Sep",
    title: "Poenari, booth at the steps",
    analog: "30 lei / ~$7–8 a head",
    crew: 40,
    pp: 8,
    when: "Walk-up the morning you climb. Do not buy a Brasov tour.",
    where: "Ticket booth at the base of the 1,480 steps, Căpățâneni / Arefu. Cash RON as backup. Argeș Tourist Pass exists; you do not need it for one citadel.",
    how: "Five adult tickets at the window. 2026 analog hours were daily 10:00–18:00, last climb 17:00 — confirm in spring 2027. Park, pay, climb. Water in the van. Boots on.",
    watch: "This is the real Vlad citadel. There is no tram and no skip-the-line. If a site tries to sell you Poenari as a timed e-ticket from Bucharest, close it.",
    url: LINKS.poenari,
    urlLabel: "Poenari on the map",
  },
  {
    id: "door-slanic",
    mode: "walk",
    city: "Romania",
    day: "Wed 22 Sep",
    title: "Salina Unirea, ticket window",
    analog: "60 lei / ~$14 a head",
    crew: 70,
    pp: 14,
    when: "Walk-up Wednesday morning. Easy2visit / Eventim exist if you want a QR; the window is enough for five.",
    where: "salrom.ro for hours. Window at Slănic Prahova. Sweater — Unirea is 13–16°C, 208 m down.",
    how: "Five adult tickets. Last underground bus is mid-afternoon (15:30 analog). Be out in time for the Peleș slot. Closed Mondays; shoulder September has also closed Tuesdays — Wednesday 22 Sep is the clean day.",
    watch: "Turda is the prettier theme-park mine and it is five hours away. Do not reroute. 90 minutes underground is enough.",
    url: "https://salrom.ro/salina-slanic-prahova/",
    urlLabel: "Salrom, Unirea",
  },
  {
    id: "door-rasnov",
    mode: "walk",
    city: "Romania",
    day: "Mon 20 Sep",
    title: "Râșnov Fortress",
    analog: "~10–40 lei / $8 a head",
    crew: 40,
    pp: 8,
    when: "Walk-up the same morning as Bran. If Bran opens at noon, do this first.",
    where: "Booth at the garden / fortress. The inclined lift is a separate ticket if anyone’s legs are loud — otherwise walk the hill.",
    how: "Five tickets at the gate. Interior has been under rehab in 2026; 2027 may still be garden-plus-walls. Confirm the morning of. This is the better ruin. Bran is the postcard.",
    watch: "Do not pre-buy a Brasov combo tour that locks you to a guide and a gift shop.",
    url: "https://www.google.com/maps/search/Rasnov+Fortress",
    urlLabel: "Râșnov on the map",
  },
  {
    id: "door-bosphorus",
    mode: "walk",
    city: "Istanbul",
    day: "Fri 17 Sep",
    title: "Bosphorus, public ferry",
    analog: "~$5–15 a head",
    crew: 40,
    pp: 8,
    when: "Walk-up Friday morning, before the hammam.",
    where: "Şehir Hatları from Karaköy / Eminönü. İstanbulkart or a paper ticket at the pier. Not a dining-cruise package.",
    how: "Public ferry up the strait — Anadolu Kavağı if you want the long one, or a shorter hop. Private 2-hour charter from Karaköy is the upgrade, not the default. Bring a layer.",
    watch: "The night train is dead to Bucharest. The water is not. Skipping the boat because the sleeper changed is missing the trip.",
    url: "https://www.sehirhatlari.istanbul/",
    urlLabel: "Şehir Hatları",
  },
  {
    id: "door-topkapi",
    mode: "optional",
    city: "Istanbul",
    day: "Thu 16 Sep",
    title: "Topkapı or the Archaeological Museum",
    analog: "~$25–45 a head if you go",
    crew: 175,
    pp: 35,
    when: "Only if legs are left after the cistern. Pick one. Not both.",
    where: "muze.gen.tr / millisaraylar for Topkapı. The Archaeological Museum is next door and calmer.",
    how: "One palace or one museum. Grand Bazaar is a 45-minute pass, not a destination. Spice Bazaar is the better shop — and Saturday’s picnic source.",
    watch: "Stacking Hagia Sophia, cistern, Topkapı, and the bazaar is how five men hate Istanbul. The move is two doors and a sunset that is not a tour bus.",
    url: "https://muze.gen.tr/",
    urlLabel: "muze.gen.tr",
  },
  {
    id: "door-boat",
    mode: "optional",
    city: "Istanbul",
    day: "Fri 17 Sep",
    title: "Private Bosphorus charter, 2 hours",
    analog: "$400–700 crew if you want it",
    crew: 550,
    pp: 110,
    when: "A week out, only if the public ferry feels thin.",
    where: "Karaköy piers. GetYourGuide / a skipper the Hotel Scout already likes. Not a dinner cruise with a DJ.",
    how: "One boat, five men, two hours. Public ferry remains the default — this is the upgrade.",
    watch: "Do not buy this and the dining-cruise package. One is a boat. The other is a trap.",
    url: "https://www.google.com/search?q=Karakoy+private+Bosphorus+boat+2+hour+charter",
    urlLabel: "Karaköy charter search",
  },
];

export const DOOR_MODES: { id: DoorMode; title: string; blurb: string }[] = [
  {
    id: "buy",
    title: "Buy online before you go",
    blurb: "These five. One card, five names, PDFs in the group chat.",
  },
  {
    id: "walk",
    title: "Pay at the door",
    blurb: "Cash lei in Romania. Card in Istanbul. Do not buy these from a tour website.",
  },
  {
    id: "optional",
    title: "Only if you want it",
    blurb: "Not required. Pick one extra museum, or skip it. The private boat is a treat, not the plan.",
  },
];

export function doorsByMode(mode: DoorMode) {
  return DOORS.filter((d) => d.mode === mode);
}

export function doorsCrewTotal(list: Door[]) {
  return list.reduce((sum, d) => sum + d.crew, 0);
}

export type PicnicKind = "buy" | "skip";

export type PicnicItem = {
  id: string;
  kind: PicnicKind;
  label: string;
  why: string;
};

export const PICNIC = {
  analogCrew: 70,
  analogPp: 14,
  range: "$50–90 crew",
  leaveBy: "16:00",
  train: "20:00 Halkalı",
  transfer: "Marmaray, 45–70 min",
  complimentary: "The train gives you water, juice, chocolate, and pretzels. Someone might sell tea. That is not dinner.",
  fridge: "Each sleeper room has a little fridge. Put the cheese and the bottle in it.",
};

export const PICNIC_ITEMS: PicnicItem[] = [
  {
    id: "picnic-water",
    kind: "buy",
    label: "Extra water for five",
    why: "The complimentary bottle is one each. Buy a couple of 1.5 L in Karaköy. Border night is long.",
  },
  {
    id: "picnic-simit",
    kind: "buy",
    label: "Simit and pide",
    why: "Street cart or a Karaköy bakery Saturday morning. This is dinner and the valley breakfast. Get extra.",
  },
  {
    id: "picnic-meze",
    kind: "buy",
    label: "White cheese, olives, sucuk, nuts",
    why: "Spice Bazaar or a Karaköy deli. This is the meze. Do not make it a supermarket meal-deal from Halkalı.",
  },
  {
    id: "picnic-fruit",
    kind: "buy",
    label: "Fruit that survives a berth",
    why: "Grapes, apples, dried apricots. Nothing that weeps onto a passport.",
  },
  {
    id: "picnic-bottle",
    kind: "buy",
    label: "One bottle for the fridge",
    why: "Rakı or a wine. One. Not five. Glass stays in the cabin bag / daypack, then the compartment fridge. Hold glass is how bags get wet.",
  },
  {
    id: "picnic-kit",
    kind: "buy",
    label: "Knife, cups, wipes from the apartment",
    why: "Do not buy a picnic kit at the station. Steal a knife and five glasses from the Galata place and put them back in spirit.",
  },
  {
    id: "picnic-halkali",
    kind: "skip",
    label: "Do not shop at Halkalı",
    why: "The working station is 45–70 minutes west of Karaköy and it is not a grocery. Lonely Planet already flagged no real catering there. If you arrive hungry, you stay hungry.",
  },
  {
    id: "picnic-car",
    kind: "skip",
    label: "Do not count on a dining car",
    why: "Istanbul–Sofia Express has no restaurant car. Couchettes and sleepers only. The complimentary snacks are a chocolate and a pretzel. Bring the picnic.",
  },
  {
    id: "picnic-five-bottles",
    kind: "skip",
    label: "Do not buy five bottles",
    why: "One bottle in the fridge is a night train. Five is a spill and a customs conversation. Sofia has beer in the morning.",
  },
];

export const PICNIC_KINDS: { id: PicnicKind; title: string }[] = [
  { id: "buy", title: "Buy Saturday morning, before 4pm" },
  { id: "skip", title: "Do not do this" },
];


export type PackBag = "wear" | "personal" | "cabin" | "hold" | "leave";

export type PackItem = {
  id: string;
  bag: PackBag;
  label: string;
  why: string;
};

export const PACK_BAGS: { id: PackBag; title: string; limit: string }[] = [
  { id: "wear", title: "On the body", limit: "Does not count" },
  { id: "personal", title: "Personal item", limit: "4 kg · 40 × 30 × 15 cm" },
  { id: "cabin", title: "Cabin bag", limit: "8 kg · 55 × 40 × 23 cm" },
  { id: "hold", title: "Checked bag", limit: "23 kg · 158 cm linear" },
  { id: "leave", title: "Leave at home", limit: "Not on this fare" },
];

export const PACKING: PackItem[] = [
  {
    id: "passport",
    bag: "wear",
    label: "Passport, valid through March 2028",
    why: "Six months past the trip. US passports are visa-free in both countries for this length of stay. On the body, not in the hold.",
  },
  {
    id: "boots",
    bag: "wear",
    label: "Broken-in boots, worn onto TK8",
    why: "1,480 concrete steps at Poenari. Wearing them saves the 8 kg cabin and the 23 kg hold. If they are not already walked-in, buy them this winter.",
  },
  {
    id: "trousers-plane",
    bag: "wear",
    label: "Long dark trousers on the plane",
    why: "Mosque morning is the next day. Landing in shorts is a wasted cabin slot on a spare pair.",
  },
  {
    id: "jacket",
    bag: "wear",
    label: "The heavy jacket, worn not packed",
    why: "Carpathian evenings. A coat in the hold is how you blow 23 kg.",
  },
  {
    id: "phone-wallet",
    bag: "wear",
    label: "Phone, wallet, TK app boarding passes",
    why: "Download the Turkish Airlines app. Offline passes for five men at IAD.",
  },
  {
    id: "sling",
    bag: "personal",
    label: "Slim sling or laptop sleeve",
    why: "Must be 40 × 30 × 15 cm. A second backpack becomes a third bag and they will gate-check it.",
  },
  {
    id: "meds",
    bag: "personal",
    label: "Meds, blister kit, tape",
    why: "Cabin only. Blister kit is for the steps, not a maybe.",
  },
  {
    id: "anc",
    bag: "personal",
    label: "Noise-cancelling headphones",
    why: "Ten hours eastbound. Keep them out of the 8 kg bag.",
  },
  {
    id: "cables",
    bag: "personal",
    label: "Phone charger and a short cable",
    why: "The brick can live in the cabin bag. The cable lives with the phone.",
  },
  {
    id: "cabin-bag",
    bag: "cabin",
    label: "One 55 × 40 × 23 backpack, packed to 7 kg",
    why: "Weigh it at home. IST weighs it again. Leave a kilo of air.",
  },
  {
    id: "delay-kit",
    bag: "cabin",
    label: "One shirt, one underwear, one socks",
    why: "If the 23 kg bag misses the IST connection home, you can still be a person.",
  },
  {
    id: "liquids",
    bag: "cabin",
    label: "Toiletries, 100 ml, one 1 L zip bag",
    why: "Toothpaste, deodorant, sunscreen. Full-size bottles belong in the hold or in the trash.",
  },
  {
    id: "powerbank",
    bag: "cabin",
    label: "Power bank and spare lithium",
    why: "Cabin only. Hold is a fire rule, not a preference.",
  },
  {
    id: "adapter",
    bag: "cabin",
    label: "Type F adapter (TR and RO)",
    why: "Both countries. One adapter per man, not one for the crew.",
  },
  {
    id: "shell",
    bag: "cabin",
    label: "Packable rain shell",
    why: "Carpathian afternoons. Light enough to live in the 8 kg bag so it is on you at the citadel.",
  },
  {
    id: "hold-bag",
    bag: "hold",
    label: "One checked bag, under 23 kg, under 158 cm",
    why: "Weigh it. If it is 24 kg, take a sweater out. Do not bring a second suitcase on ExtraFly Q.",
  },
  {
    id: "shirts",
    bag: "hold",
    label: "Four shirts, one collared",
    why: "Ten days, one sink wash in Brașov. The collared shirt is the meyhane and the roof.",
  },
  {
    id: "pants",
    bag: "hold",
    label: "One extra trousers, mosque-ready",
    why: "You are wearing the other pair. That is two. Do not pack four jeans.",
  },
  {
    id: "sweater",
    bag: "hold",
    label: "Light sweater for Slănic",
    why: "Unirea is 13–16°C, 208 m down. The salt mine is the cold day, not Poenari.",
  },
  {
    id: "underwear",
    bag: "hold",
    label: "Underwear and socks for ten days",
    why: "Or seven plus a wash. Either way it is cheap weight. Do not steal this slot for a second pair of boots.",
  },
  {
    id: "evening-shoes",
    bag: "hold",
    label: "One light evening shoe, if it fits",
    why: "Optional. Boots stay on for the citadel. A packable sneaker is the only second pair. If the bag is already 21 kg, skip it.",
  },
  {
    id: "daypack",
    bag: "hold",
    label: "Stuffable daypack",
    why: "For water and a layer on Poenari. Compress it. The cabin bag can be this if you packed a backpack.",
  },
  {
    id: "no-second-bag",
    bag: "leave",
    label: "Second checked bag",
    why: "Not on ExtraFly Q unless the coupon prints 2PC and you like fees. It will not.",
  },
  {
    id: "no-ecofly",
    bag: "leave",
    label: "EcoFly thinking",
    why: "No free hold bag on many US EcoFly coupons. ExtraFly is the fare. Q is the bucket.",
  },
  {
    id: "no-liquids",
    bag: "leave",
    label: "Full-size liquids, rakı, palinca",
    why: "Buy bottles on the way home if you must. Cabin liquids are 100 ml. Hold glass is how bags get wet.",
  },
  {
    id: "no-poles",
    bag: "leave",
    label: "Trekking poles, drone, extra boots",
    why: "The steps are a staircase. Poles are fuss. A drone is paperwork. Extra boots are the bag overweight.",
  },
];
