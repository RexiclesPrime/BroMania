export const SWARM = [
  {
    id: "flight-scout",
    name: "Flight Scout",
    cadence: "Weekly, Sunday 18:00 ET, plus any fare drop",
    job: "Watch IAD→IST and OTP→IAD (multi-city) for both windows. Alert if a five-passenger Turkish itinerary prints under $1,100 pp or a nonstop under $1,250.",
    tools: "Google Flights track-price emails, Kayak Explore, a Sheet tab named Fares.",
    prompt:
      "You are Flight Scout for Project Bromania MMXXVII. Five men, economy, bags included. Search Google Flights multi-city: IAD to IST on 14 Sep 2027, OTP to IAD on 25 Sep 2027. Also run 15 Sep / 25 Sep and the October window 4–15 Oct. Prefer Turkish nonstop outbound. Record price, stops, and a booking link in the Fares tab. Email the crew only if the fare is a new low or under $1,100 pp.",
  },
  {
    id: "rail-sentinel",
    name: "Rail Sentinel",
    cadence: "Monthly until Feb 2027, then weekly",
    job: "The important one. Monitor whether any Istanbul–Bucharest passenger train is diverted around the Giurgiu–Ruse closure (5 Apr–13 Dec 2027). Also keep the year-round Halkalı–Sofia sleeper timetable.",
    tools: "CFR Călători international booking, TCDD e-bilet, Seat61 Turkey page, Google News query.",
    prompt:
      "You are Rail Sentinel. Search CFR Călători, TCDD, Seat61, and Romanian/Bulgarian transport news for any 2027 Istanbul–Bucharest or Istanbul–Sofia passenger timetable, especially diversions via Vidin–Calafat or Negru Vodă–Kardam during the Giurgiu Nord–Ruse closure. Summarize in three bullets. If a bookable 2027 couchette appears, email immediately with the booking URL.",
  },
  {
    id: "hotel-scout",
    name: "Hotel Scout",
    cadence: "Twice a month",
    job: "Hold two Istanbul options (Galata apartment + Vault Karaköy) and two Brașov options (Casa Wagner + a whole house). Flag cancellable rates.",
    tools: "Google Hotels, Booking.com, a Sheet tab named Beds.",
    prompt:
      "You are Hotel Scout for five adults, 15–18 Sep 2027 Istanbul (Karaköy/Galata) and 19–24 Sep Brașov. Prefer an entire 3-bedroom apartment, fallback 2 doubles + 1 twin. Record nightly rate, cancellation deadline, and a link. Do not book. Surface only refundable rates unless the crew votes otherwise.",
  },
  {
    id: "van-desk",
    name: "Van Desk",
    cadence: "Once the sleeper is ticketed, then monthly",
    job: "Price an 8-seater Sofia→Brașov for Sunday 19 Sep, and the Brașov week van (Transporter / Vito, automatic, two drivers). Flag anything that is a Jogger.",
    tools: "GetTransfer, Daytrip, DiscoverCars, a Sheet tab named Vans.",
    prompt:
      "You are Van Desk for Project Bromania MMXXVII. Five men, five 23 kg bags. Quote a private 8-seater Sofia Central to Brașov old town for Sunday 19 Sep 2027 after the Istanbul–Sofia sleeper arrives, and a 5–6 day automatic van based in Brașov dropping OTP on 25 Sep. VW Transporter, Ford Transit, or Mercedes Vito only. Record price, cancellation, and a booking link. Do not recommend a Dacia Jogger.",
  },
  {
    id: "castle-desk",
    name: "Castle Desk",
    cadence: "90 days out",
    job: "Poenari is locked for Tue 21 Sep 2027. Confirm 2027 visitor hours after the restoration, Bran timed tickets, Slănic Monday-closed reminder (Wed 22 is safe), Peleș as the extra on the mine day.",
    tools: "Official sites, Google Maps hours, a Calendar day-block.",
    prompt:
      "Confirm 2027 visitor hours and ticket URLs for Poenari Fortress (locked, Tue 21 Sep), Bran Castle (Mon 20 Sep), Salina Slănic Prahova (Wed 22 Sep — closed Mondays), and Peleș Castle. Note any restoration closures at Poenari. Write a one-page field order for the Romania days.",
  },
  {
    id: "inbox-clerk",
    name: "Inbox Clerk",
    cadence: "On every labeled email",
    job: "Gmail filter: label Bromania-MMXXVII. Parse confirmations (PNR, hotels, van, sleeper berths) into the Sheet and the shared Calendar.",
    tools: "Gmail label + filter, Apps Script, Google Calendar 'Bromania 2027'.",
    prompt:
      "When a message labeled Bromania-MMXXVII arrives, extract confirmation number, vendor, dates, amount, and cancellation policy. Append a row to the Bookings tab. Create or update a Calendar event on Bromania 2027. Never send mail except a one-line Slack/email to the banker: 'logged TK PNR ABC123'.",
  },
  {
    id: "quartermaster",
    name: "Quartermaster",
    cadence: "Weekly",
    job: "Keep the $3,000-per-head ledger honest. Five columns, nine line items, a remaining-to-spend number.",
    tools: "Google Sheet 'Bromania MMXXVII — Ledger'.",
    prompt:
      "Update the ledger from new bookings. Flag if any head is projected over $3,000. Suggest the cut (always food last, flights never).",
  },
  {
    id: "briefing-officer",
    name: "Briefing Officer",
    cadence: "Sunday 18:00 ET",
    job: "One email a week to the five: what changed, what is still open, what to vote on. No more than 12 lines.",
    tools: "Gmail, the Sheet, this app's decision state.",
    prompt:
      "Write a 12-line Sunday briefing for Project Bromania MMXXVII. Sections: Fares, Beds, Rail 2027, Poenari, Votes needed. No fluff. End with a single recommended action for the week.",
  },
];

export const APPS_SCRIPT = `/**
 * Project Bromania MMXXVII — Google bot swarm (Apps Script)
 * Bind this to the ledger spreadsheet. Set a weekly time trigger.
 * Fill the CONFIG emails before running.
 */
const CONFIG = {
  crew: ["BANKER@example.com"],
  label: "Bromania-MMXXVII",
  calendar: "Bromania 2027",
  budgetPp: 3000,
  windows: [
    { name: "Sep", out: "2027-09-14", home: "2027-09-25" },
    { name: "Oct", out: "2027-10-04", home: "2027-10-15" },
  ],
};

function weeklyBriefing() {
  const ss = SpreadsheetApp.getActive();
  const fares = ss.getSheetByName("Fares");
  const beds = ss.getSheetByName("Beds");
  const rail = ss.getSheetByName("Rail");
  const lines = [
    "BROMANIA MMXXVII — Sunday brief",
    "",
    "Fares: " + lastRow(fares),
    "Beds: " + lastRow(beds),
    "Rail 2027: " + lastRow(rail),
    "",
    "Locked: 15–25 Sep. ExtraFly Q. Poenari is Tuesday.",
    "Do not buy a Bucharest couchette until Rail Sentinel clears Giurgiu.",
  ];
  MailApp.sendEmail(CONFIG.crew.join(","), "Bromania Sunday brief", lines.join("\\n"));
}

function lastRow(sheet) {
  if (!sheet || sheet.getLastRow() < 2) return "no data yet";
  return sheet.getRange(sheet.getLastRow(), 1, 1, Math.min(4, sheet.getLastColumn())).getDisplayValues()[0].join(" · ");
}

function onNightTrainLabel() {
  const threads = GmailApp.search("label:" + CONFIG.label + " newer_than:7d");
  const sheet = SpreadsheetApp.getActive().getSheetByName("Bookings");
  threads.forEach((t) => {
    const m = t.getMessages().pop();
    sheet.appendRow([new Date(), m.getFrom(), m.getSubject(), m.getDate()]);
  });
}

function setup() {
  ScriptApp.newTrigger("weeklyBriefing").timeBased().onWeekDay(ScriptApp.WeekDay.SUNDAY).atHour(18).inTimezone("America/New_York").create();
}
`;
