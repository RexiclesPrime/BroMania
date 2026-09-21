#!/usr/bin/env python3
"""Build the Bromania crew briefing as a 16:9 PPTX (opens in Google Slides)."""

from __future__ import annotations

from pathlib import Path

from lxml import etree
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.oxml.ns import qn
from pptx.util import Inches, Pt

ROOT = Path("/workspace")
IMG = ROOT / "public" / "images"
OUT = ROOT / "public" / "brief" / "Bromania-MMXXVII.pptx"
ART = ROOT / "artifacts" / "Bromania-MMXXVII.pptx"

W = Inches(13.333)
H = Inches(7.5)

INK = RGBColor(0x0C, 0x0B, 0x0A)
SURFACE = RGBColor(0x14, 0x12, 0x10)
ELEVATED = RGBColor(0x1C, 0x19, 0x16)
FG = RGBColor(0xF3, 0xEE, 0xE6)
MUTED = RGBColor(0x9A, 0x92, 0x88)
ACCENT = RGBColor(0xB2, 0x3A, 0x3A)
PINE = RGBColor(0x3D, 0x5C, 0x4E)
PARCHMENT = RGBColor(0xE4, 0xD4, 0xB0)
BORDER = RGBColor(0x3A, 0x34, 0x2E)

DISPLAY = "Georgia"
SANS = "Calibri"


def emu(inches: float) -> int:
    return int(Inches(inches))


def set_run(run, text, size, color, bold=False, font=SANS):
    run.text = text
    run.font.size = Pt(size)
    run.font.color.rgb = color
    run.font.bold = bold
    run.font.name = font


def add_text_box(slide, l, t, w, h, text, size, color, font=SANS, bold=False, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP):
    box = slide.shapes.add_textbox(emu(l), emu(t), emu(w), emu(h))
    tf = box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.alignment = align
    run = p.runs[0] if p.runs else p.add_run()
    set_run(run, text, size, color, bold, font)
    return box


def fill_rect(slide, l, t, w, h, color):
    sh = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, emu(l), emu(t), emu(w), emu(h))
    sh.fill.solid()
    sh.fill.fore_color.rgb = color
    sh.line.fill.background()
    return sh


def set_alpha(shape, alpha: float):
    """alpha 0–1, 0 = transparent."""
    spPr = shape._element.spPr
    solid = spPr.find(qn("a:solidFill"))
    if solid is None:
        return
    srgb = solid.find(qn("a:srgbClr"))
    if srgb is None:
        return
    el = etree.SubElement(srgb, qn("a:alpha"))
    el.set("val", str(int(alpha * 100000)))


def kicker(slide, text, l=0.7, t=0.45):
    add_text_box(slide, l, t, 12, 0.35, text.upper(), 12, MUTED, SANS, True)


def heading(slide, text, l=0.7, t=0.8, w=12, size=36):
    add_text_box(slide, l, t, w, 1.3, text, size, FG, DISPLAY, False)


def bg(slide, color=INK):
    fill_rect(slide, 0, 0, 13.333, 7.5, color)


def photo(slide, path, l, t, w, h):
    slide.shapes.add_picture(str(path), emu(l), emu(t), emu(w), emu(h))


def card(slide, l, t, w, h):
    sh = fill_rect(slide, l, t, w, h, ELEVATED)
    sh.line.color.rgb = BORDER
    sh.line.width = Pt(1)
    return sh


def blank(prs):
    return prs.slides.add_slide(prs.slide_layouts[6])


def title_slide(prs):
    s = blank(prs)
    bg(s)
    photo(s, IMG / "poenari.jpg", 0, 0, 13.333, 7.5)
    veil = fill_rect(s, 0, 0, 13.333, 7.5, INK)
    set_alpha(veil, 0.55)
    add_text_box(s, 0.8, 3.2, 11.5, 0.35, "CREW BRIEFING  ·  FIVE MEN", 13, PARCHMENT, SANS, True)
    add_text_box(s, 0.8, 3.55, 11.5, 1.6, "Project Bromania MMXXVII", 44, FG, DISPLAY)
    add_text_box(
        s, 0.8, 5.3, 11, 0.6,
        "Dulles. Istanbul. A countryside sleeper. Transylvania.",
        20, FG, SANS,
    )
    add_text_box(s, 0.8, 6.15, 11, 0.5, "15–25 September 2027", 24, PARCHMENT, DISPLAY)


def points_slide(prs, k, title, points):
    s = blank(prs)
    bg(s)
    kicker(s, k)
    heading(s, title)
    cols = 2 if len(points) > 3 else 1
    n = len(points)
    gap = 0.22
    if cols == 1:
        y = 2.3
        for lead, body in points:
            card(s, 0.7, y, 11.9, 1.05)
            add_text_box(s, 0.95, y + 0.12, 11.4, 0.35, lead, 20, FG, DISPLAY)
            add_text_box(s, 0.95, y + 0.5, 11.4, 0.45, body, 14, MUTED, SANS)
            y += 1.05 + gap
    else:
        for i, (lead, body) in enumerate(points):
            col = i % 2
            row = i // 2
            rows = (n + 1) // 2
            cw, ch = 5.85, min(1.7, (4.6 - gap * (rows - 1)) / rows)
            x = 0.7 + col * (cw + 0.25)
            y = 2.25 + row * (ch + gap)
            card(s, x, y, cw, ch)
            add_text_box(s, x + 0.25, y + 0.18, cw - 0.45, 0.4, lead, 20, FG, DISPLAY)
            add_text_box(s, x + 0.25, y + 0.62, cw - 0.45, ch - 0.75, body, 14, MUTED, SANS)
    return s


def jobs_slide(prs, k, title, roles):
    s = blank(prs)
    bg(s)
    kicker(s, k)
    heading(s, title)
    for i, role in enumerate(roles):
        x = 0.7 + i * 6.15
        card(s, x, 2.3, 5.9, 4.5)
        add_text_box(s, x + 0.3, 2.5, 5.3, 0.9, role[0], 22, FG, DISPLAY)
        y = 3.5
        for duty in role[1]:
            fill_rect(s, x + 0.3, y + 0.08, 0.06, 0.7, PINE)
            add_text_box(s, x + 0.5, y, 5.1, 0.95, duty, 15, MUTED, SANS)
            y += 1.0
    return s


def week_slide(prs):
    s = blank(prs)
    bg(s)
    kicker(s, "The week")
    heading(s, "Read this once")
    days = [
        ("Tue 14", "Dulles, 9:40pm. Sleep on the plane."),
        ("Wed 15", "Land Istanbul. One van. Walk. Dinner. No museums."),
        ("Thu 16", "Hagia Sophia at opening. Cistern. Long trousers all day."),
        ("Fri 17", "Boat in the morning. Turkish bath at 4:30pm — not 9am."),
        ("Sat 18", "Buy train food. Leave at 4pm. Night train at 8pm."),
        ("Sun 19", "Wake in Sofia. Coffee. Van to Romania. Do not tour Sofia."),
        ("Mon 20", "Bran (the photo). Râșnov. Brașov town. No cape dinner."),
        ("Tue 21", "Poenari. Out at 7am. 1,480 steps. Home before dark."),
        ("Wed 22", "Salt mine in the morning. Palace on the way home."),
        ("Thu 23", "Last coffee in Brașov. South to Bucharest."),
        ("Fri 24", "Old Town dinner. Flight is tomorrow morning."),
        ("Sat 25", "OTP. Same Turkish ticket home."),
    ]
    for i, (when, what) in enumerate(days):
        col = i % 2
        row = i // 2
        x = 0.7 + col * 6.2
        y = 2.2 + row * 0.8
        card(s, x, y, 5.95, 0.7)
        add_text_box(s, x + 0.15, y + 0.16, 1.15, 0.4, when.upper(), 11, ACCENT, SANS, True)
        add_text_box(s, x + 1.35, y + 0.16, 4.4, 0.42, what, 14, FG, SANS)
    return s


def photo_slide(prs, k, title, body, points, image):
    s = blank(prs)
    bg(s)
    photo(s, IMG / image, 7.15, 0, 6.2, 7.5)
    kicker(s, k, 0.55, 0.4)
    add_text_box(s, 0.55, 0.75, 6.3, 1.6, title, 28, FG, DISPLAY)
    add_text_box(s, 0.55, 2.45, 6.3, 1.4, body, 15, MUTED, SANS)
    y = 4.05
    for p in points:
        fill_rect(s, 0.55, y, 0.07, 0.7, ACCENT)
        add_text_box(s, 0.8, y - 0.05, 6.05, 0.85, p, 14, FG, SANS)
        y += 0.95
    return s


def split_slide(prs):
    s = blank(prs)
    bg(s)
    kicker(s, "Two castles · they are not the same")
    heading(s, "Postcard, then the story")
    left = (
        "Monday · Bran",
        "The silhouette everyone already has in their head. Weak link to Vlad. You still go, because the photo is the photo.",
        [
            "90 minutes, then leave.",
            "Monday may open at noon — if so, Râșnov first.",
            "Râșnov is the better ruin, ten minutes up the road.",
            "No Dracula dinner show.",
        ],
    )
    right = (
        "Tuesday · Poenari",
        "Vlad Țepeș rebuilt this citadel in the 1450s. He did not live at Bran. He used this cliff.",
        [
            "1,480 concrete steps. No tram.",
            "Leave Brașov at 7am. Back before dark.",
            "About 30 lei, cash, at the booth.",
            "Do not add the high mountain road.",
        ],
    )
    for i, col in enumerate((left, right)):
        x = 0.7 + i * 6.2
        card(s, x, 2.25, 5.95, 4.55)
        add_text_box(s, x + 0.3, 2.45, 5.35, 0.55, col[0], 22, FG, DISPLAY)
        add_text_box(s, x + 0.3, 3.1, 5.35, 1.15, col[1], 14, MUTED, SANS)
        y = 4.35
        for p in col[2]:
            add_text_box(s, x + 0.3, y, 5.35, 0.45, "·  " + p, 14, FG, SANS)
            y += 0.5
    return s


def money_slide(prs):
    s = blank(prs)
    bg(s)
    kicker(s, "Money")
    heading(s, "What it actually costs")
    stats = [
        ("ON THE CARD, FIVE OF YOU", "$11,180"),
        ("A HEAD, ON THE CARD", "$2,236"),
        ("PLAN TO BRING", "$3,000"),
    ]
    for i, (lab, val) in enumerate(stats):
        x = 0.7 + i * 4.15
        add_text_box(s, x, 2.2, 3.9, 0.3, lab, 11, MUTED, SANS, True)
        add_text_box(s, x, 2.5, 3.9, 0.7, val, 32, FG, DISPLAY)
    lines = [
        ("Flights, ExtraFly", "$1,200"),
        ("Two apartments", "$328"),
        ("Train + two vans", "$342"),
        ("Tickets you buy ahead", "$236"),
        ("Insurance + eSIM", "$130"),
        ("Food and drink", "~$750"),
    ]
    for i, (lab, val) in enumerate(lines):
        col = i % 2
        row = i // 2
        x = 0.7 + col * 6.2
        y = 3.45 + row * 0.75
        card(s, x, y, 5.95, 0.65)
        add_text_box(s, x + 0.25, y + 0.14, 3.6, 0.4, lab, 14, MUTED, SANS)
        add_text_box(s, x + 3.7, y + 0.1, 2.0, 0.45, val, 18, FG, DISPLAY, False, PP_ALIGN.RIGHT)
    add_text_box(
        s, 0.7, 5.85, 12, 1.2,
        "The $2,236 is the card total — flights, beds, train, vans, tickets, insurance. "
        "Food is extra, paid on Splitwise. Prices are 2026 guesses for 2027, not a quote. "
        "Walk-up cash (Poenari, the mine) is small and not in the card number.",
        13, MUTED, SANS,
    )
    return s


def rules_slide(prs):
    s = blank(prs)
    bg(s)
    kicker(s, "House rules")
    heading(s, "Do not be the guy")
    items = [
        "Do not be late for 4pm Saturday.",
        "Do not book the bath at 9am.",
        "Do not buy EcoFly.",
        "Do not race the 1,480 steps.",
        "Do not add the high mountain road the day of Poenari.",
        "Do not book a second hotel or a Dracula show.",
        "Show up. That is the whole job.",
    ]
    y = 2.25
    for n, item in enumerate(items, 1):
        card(s, 0.7, y, 11.9, 0.62)
        add_text_box(s, 0.9, y + 0.12, 0.6, 0.4, f"{n:02d}", 14, ACCENT, SANS, True)
        add_text_box(s, 1.55, y + 0.12, 10.7, 0.4, item, 16, FG, SANS)
        y += 0.7
    return s


def close_slide(prs):
    s = blank(prs)
    bg(s)
    photo(s, IMG / "bran-cliff.jpg", 0, 0, 13.333, 7.5)
    veil = fill_rect(s, 0, 0, 13.333, 7.5, INK)
    set_alpha(veil, 0.58)
    add_text_box(s, 0.8, 3.0, 11.7, 0.35, "PROJECT BROMANIA MMXXVII", 13, PARCHMENT, SANS, True)
    add_text_box(
        s, 0.8, 3.45, 11.7, 1.8,
        "The postcard is Bran. The story is Poenari. The night is the train.",
        32, FG, DISPLAY,
    )
    add_text_box(s, 0.8, 5.6, 11, 0.5, "Questions. Then we book.", 20, PARCHMENT, SANS)


def main():
    prs = Presentation()
    prs.slide_width = W
    prs.slide_height = H

    title_slide(prs)

    points_slide(prs, "The deal", "What this is", [
        ("Five of us.", "Early forties. Fit. Eleven days, not a long weekend."),
        ("Leave Dulles Tuesday night.", "Turkish TK8 at 9:40pm, 14 Sep, if the 2027 timetable still has it."),
        ("Three nights in Karaköy.", "Then a night train. Then Brașov as base. Home from Bucharest on the 25th."),
        ("About $3,000 each.", "One guy holds the card for the big stuff. Dinners are Splitwise."),
    ])

    points_slide(prs, "Already decided", "These five things are locked", [
        ("Dates.", "15–25 Sep 2027. October is off."),
        ("The crossing.", "Night train Istanbul to Sofia, then a van into Romania."),
        ("Flights.", "Turkish ExtraFly. One booking, five names, one suitcase each. Not EcoFly."),
        ("The castle.", "Poenari the day after Bran. 1,480 steps. Vlad actually used this one."),
        ("Who books.", "One admin, one card. Everyone else: passport, bag, show up."),
    ])

    jobs_slide(prs, "Two jobs", "If you only remember one slide", [
        ("The admin (one guy, one card)", [
            "Buys flights, two apartments, the night train, both vans, and the tickets that sell out.",
            "Drops every PDF in the group chat.",
            "Does not pay for ten days of dinners.",
        ]),
        ("Everyone else", [
            "Passport valid through March 2028. One suitcase. Show up when the day says.",
            "Pay meals and drinks as you go. Splitwise.",
            "Do not book a second hotel, a second taxi, or a Dracula dinner show.",
        ]),
    ])

    week_slide(prs)

    photo_slide(
        prs, "Istanbul · three nights", "Karaköy, not Sultanahmet",
        "We live on the nightlife side of the water. A whole apartment if we can get one. First night is not for monuments.",
        [
            "Wednesday: land, one van, walk Galata, a real meyhane. Curfew 11:30. Jet lag wins.",
            "Thursday: the old city once, at opening, then we leave.",
            "Friday: the strait, then steam. Pack for the train.",
        ],
        "karakoy.jpg",
    )

    photo_slide(
        prs, "Thursday 16 Sep", "One day in the empire",
        "Hagia Sophia when it opens. Then the underground cistern. One more museum only if you still have legs.",
        [
            "Long trousers, shoulders covered. Downstairs by 8am.",
            "Gallery ticket is about €25. The museum pass does not work here.",
            "Cistern: yerebatan.com or the window. Never a site named basilica-cistern.com.",
        ],
        "istanbul-hagia.jpg",
    )

    photo_slide(
        prs, "Friday 17 Sep · the one people get wrong", "Boat in the morning. Bath at 4:30.",
        "Men-only hours at Kılıç Ali Paşa are 4:30pm to 11:30pm. Nine in the morning is women’s hours. Do not book 9am.",
        [
            "10:00 — two hours on the Bosphorus. Public ferry or a private boat. No dinner-cruise with a DJ.",
            "16:30 — 16th-century bath, five of you, a very serious man with a mitt. Spare underwear.",
            "20:00 — last Karaköy table. Picnic is tomorrow morning, not tonight.",
        ],
        "galata.jpg",
    )

    points_slide(prs, "The crossing", "The night train to Bucharest is closed", [
        ("The bridge is shut.", "Giurgiu–Ruse is closed 5 April to 13 December 2027. That is the only normal train into Bucharest."),
        ("Do not buy a 2026 timetable.", "An Istanbul–Bucharest sleeper you saw last year will not exist that week."),
        ("Real plan.", "Istanbul–Sofia Express, 8pm from Halkalı. Then a van into Romania."),
        ("Backup.", "If the train is sold out: fly Istanbul to Bucharest. Still a trip. Worse story."),
    ])

    photo_slide(
        prs, "Saturday 18 Sep", "The countryside sleeper",
        "Three small lockable rooms. Two sharing, two sharing, one alone. There is no restaurant on this train. Complimentary snacks are a pretzel and a chocolate.",
        [
            "Buy food Saturday morning in Karaköy. Cheese, bread, fruit, one bottle. Fridge in the berth.",
            "Leave the apartment at 4pm. Halkalı is 45–70 minutes west. The station is not a grocery store.",
            "Train at 8pm. Passports in your pocket. Heavier guys get the lower beds.",
        ],
        "sleeper.jpg",
    )

    split_slide(prs)

    photo_slide(
        prs, "Why we came to Romania", "You earn this one",
        "Broken wall, wind, a drop into the Argeș gorge. Forty-five minutes up. At the top: a courtyard the Impaler actually held. Five men in their forties, autumn, nobody selling capes. That is the dude-trip photograph.",
        [
            "Boots. Water. No racing.",
            "The ruin is small. The cliff is the point.",
            "Vidraru Dam for lunch. Same road home.",
        ],
        "poenari.jpg",
    )

    photo_slide(
        prs, "Wednesday 22 Sep", "Under the mountain, then a palace",
        "A stadium hollowed out of salt, 208 meters down, air at 13°C. Then, on the corridor home, a royal fever dream of carved wood and armor.",
        [
            "Sweater. Tickets at the mine window, about 60 lei. 90 minutes is enough.",
            "Peleș is timed. Book an afternoon slot. Closed Monday and Tuesday.",
            "Skip the little castle next door.",
        ],
        "salt-mine.jpg",
    )

    money_slide(prs)

    points_slide(prs, "Bags", "One suitcase. That is the fare.", [
        ("Buy ExtraFly.", "That is the row that includes a checked suitcase. EcoFly often has none. Q is just the cheap price, not a different plane."),
        ("Checked: 23 kg.", "One bag. Over 23 kg is a fee. Over 32 kg they will not take it."),
        ("Cabin: 8 kg.", "55 × 40 × 23 cm. Istanbul weighs this. Pack 7 kg and stop."),
        ("Wear the boots onto TK8.", "Long trousers on the plane — mosque morning is the next day."),
    ])

    jobs_slide(prs, "Before we go", "Your job from today", [
        ("Everyone", [
            "Passport valid through March 2028.",
            "One suitcase that fits ExtraFly. Boots already walked-in.",
            "Splitwise on your phone. Enroll in STEP. Do not book a hotel, a taxi, or a cape dinner.",
        ]),
        ("The admin", [
            "Flights this year. Apartments this week, refundable.",
            "Night train about eight weeks out (July 2027). Vans after that.",
            "Bath, Hagia Sophia, cistern, Bran, Peleș — two to four weeks before we fly.",
        ]),
    ])

    points_slide(prs, "Security", "Kidnap and ransom: the honest call", [
        ("You do not need a K&R policy.", "Classic kidnap-for-ransom is executives in Mexico or Nigeria, or the Syria border. You are five guys in Karaköy and Brașov. Neither country has a State Department kidnapping flag."),
        ("Türkiye is Level 2. Romania is Level 1.", "Istanbul: terrorism and arbitrary detention, not ransom. Do not photograph police. Romania is normal-precautions country. Brașov is quiet."),
        ("The fake version is the one that gets tourists.", "Unmarked taxi, fake police, a nightclub that will not let you leave. Stay together after dark. One van. Nobody walks home alone."),
        ("What actually hurts people on a trip like this.", "The van on the gorge road. A snatched phone. A padded bar bill. Buy medical and evacuation insurance. Rank worry in that order."),
    ])

    rules_slide(prs)
    close_slide(prs)

    notes = [
        "Open with the week and the two jobs. Do not start on prices.",
        "Stress: one card, everyone else shows up.",
        "Locked calls. October is off.",
        "Admin vs crew. Repeat this.",
        "Walk the week. Pause on Friday 4:30pm and Saturday 4pm.",
        "Karaköy is the neighborhood. First night is not museums.",
        "Hagia Sophia at opening. Fake cistern sites exist.",
        "Scream 4:30pm. 9am is women.",
        "Friendship Bridge closed all of 2027.",
        "No dining car. Leave at 4pm.",
        "Bran is the photo. Poenari is the story.",
        "1,480 steps. Out at 7am.",
        "Sweater in the mine. Peleș afternoon.",
        "$2,236 on the card. $3,000 all-in. Food is Splitwise.",
        "ExtraFly = suitcase. EcoFly often has none.",
        "Passport March 2028. Do not book a second hotel.",
        "K&R: do not buy the policy. Stay together. The van is the real risk.",
        "The seven don'ts.",
        "Stop talking. Take questions.",
    ]
    for slide, note in zip(prs.slides, notes):
        slide.notes_slide.notes_text_frame.text = note

    OUT.parent.mkdir(parents=True, exist_ok=True)
    ART.parent.mkdir(parents=True, exist_ok=True)
    prs.save(OUT)
    prs.save(ART)
    print(f"slides={len(prs.slides)} wrote={OUT} {ART}")


if __name__ == "__main__":
    main()
