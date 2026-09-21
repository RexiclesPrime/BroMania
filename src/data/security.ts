export const SECURITY_AS_OF = "September 2026";

export const KN_VERDICT = {
  level: "Negligible",
  title: "You do not need kidnap-and-ransom insurance",
  body: "Classic K&R is armed men, a hide site, a six-figure demand, weeks of negotiation. That happens to executives and aid workers in Mexico, Nigeria, the Sahel, parts of the Philippines, and along Turkey’s border with Syria and Iraq. You are five guys in Karaköy and Brașov. That is not the map. Do not buy a standalone K&R policy. It is the wrong product for this trip.",
};

export const ADVISORIES = [
  {
    id: "tr",
    place: "Türkiye",
    where: "Istanbul, Halkalı, the train",
    level: "Level 2",
    label: "Exercise increased caution",
    why: "Terrorism, armed conflict in the southeast, and arbitrary detentions. Istanbul is not the southeast.",
    url: "https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories/turkey-travel-advisory.html",
  },
  {
    id: "ro",
    place: "Romania",
    where: "Brașov, Poenari, Bucharest",
    level: "Level 1",
    label: "Exercise normal precautions",
    why: "Same bucket as Portugal or Japan. Petty theft and bad driving, not a war zone.",
    url: "https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories/romania-travel-advisory.html",
  },
  {
    id: "bg",
    place: "Bulgaria",
    where: "Sofia station, a few hours",
    level: "Level 1",
    label: "Exercise normal precautions",
    why: "You are not touring Sofia. Coffee, van, leave.",
    url: "https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories/bulgaria-travel-advisory.html",
  },
] as const;

export const KN_POINTS = [
  {
    lead: "State Department: no “K” flag.",
    body: "Neither Türkiye nor Romania has a kidnapping indicator on the travel advisory. If they thought tourist ransom was a real risk, it would be on the page.",
  },
  {
    lead: "Istanbul: rare. The border is not.",
    body: "Kidnapping of Western tourists in the city is rare. The threat is higher within about 10 km of Syria and Iraq. That is more than 800 km from Karaköy. We are not going there. Do not add Gaziantep, Şanlıurfa, or anything “near the border” as a joke extra.",
  },
  {
    lead: "The detention that actually hits Americans is not ransom.",
    body: "Turkish authorities have held Americans, including on thin “terror” claims, and have used exit bans. A K&R policy does not get you out of a Turkish jail. Do not photograph police. Do not join a protest. Do not argue politics on the street or on your phone in public.",
  },
  {
    lead: "Romania: not a kidnapping country.",
    body: "OSAC (June 2026) says kidnappings are uncommon. The cases they track are mostly parental child abduction, which is not this trip. Brașov and the mountain towns are quiet. Lipscani at 2am is a bar problem, not a cartel problem.",
  },
  {
    lead: "What drunk guys call “we got kidnapped.”",
    body: "Fake police who want to see your wallet. An unmarked taxi that “knows a better hotel” and stops at ATMs. A nightclub that will not let you leave until the bill is $800. Those are scams. Stay together. One van. Licensed taxis only. Nobody follows a stranger to a second bar.",
  },
] as const;

export const RANKED_RISKS = [
  {
    rank: "1",
    title: "The van, the gorge, the road",
    body: "The most likely way someone gets hurt is a car. Poenari is a three-hour drive each way on a mountain road. Romania has horse carts, unlit stretches, and drivers who pass on faith. Two named drivers. Nobody drinks and drives. Seatbelts. Home before dark on Tuesday.",
  },
  {
    rank: "2",
    title: "Hands, not guns — Istanbul",
    body: "Pickpockets on the T1 tram, around Hagia Sophia, the Grand Bazaar, Taksim. Fake plainclothes “police” running a drug-search routine. Phones snatched. Keep the passport on your body. Phone in a front pocket. One man is not the ATM mule.",
  },
  {
    rank: "3",
    title: "The bill and the drink",
    body: "Karaköy and Lipscani both have rooms that pad the check and get ugly about it. Do not leave a glass. Do not go to a second club with someone you just met. If a place feels like a trap, it is. Walk.",
  },
  {
    rank: "4",
    title: "Terrorism in a crowded city",
    body: "Türkiye is Level 2 for a reason. Attacks have hit tourist areas with little warning. Probability on any given day in Sultanahmet is still low. You do not skip Hagia Sophia. You do not linger at police lines, and if something happens you get off the street and into a shop or the apartment.",
  },
  {
    rank: "5",
    title: "Arbitrary detention in Türkiye",
    body: "Lower odds than a stolen phone, uglier if it happens. Keep the STEP enrollment current so someone official knows you exist. One man does not disappear into a side street argument with a cop.",
  },
  {
    rank: "6",
    title: "Classic kidnap and ransom",
    body: "Last on this list on purpose. Not zero in the abstract. Not a planning problem for five tourists on this route. Do not spend money or fear on it. Spend it on the van, the insurance, and not being the guy who gets in a car alone.",
  },
] as const;

export const SECURITY_JOBS = [
  {
    title: "Everyone, before you fly",
    duties: [
      "Enroll in STEP so the embassy has your name: step.state.gov.",
      "Photo of the passport page in the group chat. Real passport on your body, not in the hold.",
      "Save the numbers below in your phone, offline.",
    ],
  },
  {
    title: "On the ground",
    duties: [
      "After dark, move as a crew. One man walking home from a meyhane is how stupid stories start.",
      "Airport and city: one van. Licensed taxi or BiTaksi if you must. No unmarked cars. No “my friend has a car.”",
      "Do not photograph police, soldiers, or protests. Do not talk politics with strangers.",
      "Sofia: stay with the group at the station. You are not sightseeing.",
    ],
  },
] as const;

export const PHONES = [
  { where: "Anywhere on this trip", what: "Police / ambulance / fire", n: "112" },
  { where: "Istanbul", what: "U.S. Consulate General", n: "+90 212 335 9000" },
  { where: "Romania", what: "U.S. Embassy Bucharest (press 3)", n: "+40 21 200 3300" },
  { where: "Romania, after hours", what: "U.S. citizen emergency", n: "+40 21 270 6000" },
] as const;

export const INSURANCE_CALL =
  "Buy ordinary travel insurance: medical, evacuation, trip interruption, and Romania driving days. If the policy throws in a tiny K&R rider for nothing, take it. Do not shop for a standalone kidnap-and-ransom policy. That is a corporate product for people working in Lagos or Ciudad Juárez.";

export const SECURITY_LINKS = {
  step: "https://step.state.gov/",
  turkey: ADVISORIES[0].url,
  romania: ADVISORIES[1].url,
  istanbulConsulate: "https://tr.usembassy.gov/embassy-consulates/istanbul/",
  bucharestEmbassy: "https://ro.usembassy.gov/",
} as const;
