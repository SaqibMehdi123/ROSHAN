/**
 * TEACHER HUB — full implementations for Academy, Reading Room and Session Planner.
 * All offline, localStorage-persisted, print-friendly (spec §7 — teacher-facing tools).
 */
"use client";

import { useEffect, useState } from "react";
import { getLesson, lessonsOfWorld, WORLDS } from "@/lib/content";
import { Art } from "@/components/art/Props";

/* ============================== TEACHER ACADEMY ============================== */

interface AcademyUnit {
  id: string;
  title: string;
  ur: string;
  minutes: number;
  why: string;
  tips: string[];
}

const ACADEMY: AcademyUnit[] = [
  {
    id: "ac-first-week",
    title: "Your own first week with a computer",
    ur: "آپ کا پہلا ہفتہ",
    minutes: 20,
    why: "Children copy what you do. You do not need to be an expert — you need to be one comfortable step ahead. This unit is your own gentle start, adult-paced.",
    tips: [
      "Day 1–2: hold the mouse lightly, move the arrow in circles, then practise single click on a folder icon. Slow is fine.",
      "Day 3: double-click (two quick taps — say 'tick-tock' with your tongue to keep the rhythm).",
      "Day 4: drag and drop — press and HOLD, move, then release on top of the target.",
      "Day 5: type your own name in the child app's World 3. Feel how forgiving it is: wrong keys are 'bugs to fix', never failures.",
      "Day 6: open World 1 lessons yourself and finish two of them. You will see every trick a child might try.",
      "Day 7: teach one lesson back to a colleague. Teaching it once is worth five readings.",
    ],
  },
  {
    id: "ac-how-roshan-teaches",
    title: "How ROSHAN teaches",
    ur: "روشن کیسے سکھاتا ہے",
    minutes: 10,
    why: "When you understand the method, you can trust the app and spend your energy exactly where a human teacher matters.",
    tips: [
      "Every lesson runs STORY → SHOW → DO → CHEER: hear a story, watch a demo, play one game, celebrate a recap. It always ends in success.",
      "Voice-first: everything is spoken in Urdu. A child who cannot read yet can finish every lesson — do not force reading.",
      "Zero failure: mistakes are called 'bugs'. Say 'bug mila — ab fix karo!' exactly like Bijli does. Never say ghalat or nakam.",
      "Bilingual pairs: technical words appear as 'Mouse · ماؤس'. Read the English word aloud once — hearing it in both languages is the point.",
      "Autosave every 30 seconds: if the power dies, the child resumes the same step. Never restart a lesson 'from the beginning' as punishment.",
    ],
  },
  {
    id: "ac-facilitation",
    title: "Facilitation skills",
    ur: "فیسلیٹیشن مہارتیں",
    minutes: 15,
    why: "Your job during lab time is coach, not lecturer. These four habits change outcomes more than any setting in the app.",
    tips: [
      "Pair mode: two children, one PC, 10-minute SWAP timer. Name the roles: 'driver' (hands) and 'navigator' (eyes and voice). Swap ON TIME — the timer is your friend, not a disruption.",
      "Praise the repair, not the child: 'you found the bug AND fixed it' beats 'shabash, you are clever'. This builds the habit that makes computers learnable.",
      "No-lecture rule: answer questions with a question first — 'kya socha?' — then walk through ONE step together and step back.",
      "Rotating helper: each session, one confident child wears the 'helper' star and helps peers. Teaching locks their own learning in.",
    ],
  },
  {
    id: "ac-lab-management",
    title: "Managing a small lab with limited electricity",
    ur: "مختصر لیب کا انتظام",
    minutes: 15,
    why: "Most village labs have old PCs, load-shedding and one shared room. A few routines keep the class calm and the machines alive.",
    tips: [
      "Agree a visible schedule on the wall: which class, which days, which PCs. Certainty prevents arguments.",
      "Power cuts: treat them as unplugged days. Every ROSHAN lesson has an unplugged twin in its Lesson Plan (Lesson Plans tab).",
      "Old PCs: keep fans clean, no food in the lab, and shut down properly (World 1 Lesson 5 teaches the order — let children do it).",
      "One PC, many children: with pair mode, a lab of 5 PCs serves 10 children per 30-minute slot without anyone waiting idle.",
    ],
  },
];

export function TeacherAcademy() {
  const [done, setDone] = useState<string[]>([]);
  const [open, setOpen] = useState<string | null>(ACADEMY[0].id);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        setDone(JSON.parse(localStorage.getItem("roshan.academy-done") ?? "[]"));
      } catch {}
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const toggleUnit = (id: string) => {
    const next = done.includes(id) ? done.filter((x) => x !== id) : [...done, id];
    setDone(next);
    try {
      localStorage.setItem("roshan.academy-done", JSON.stringify(next));
    } catch {}
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between rounded-2xl border-2 border-roshan-card-border bg-white p-4">
        <p className="text-sm text-roshan-ink-soft">
          A short self-paced course for the teacher. Finish units in any order; progress is saved on this device.
        </p>
        <div className="shrink-0 pl-4 text-right">
          <div className="text-2xl font-bold text-roshan-teal">
            {done.length}/{ACADEMY.length}
          </div>
          <div className="text-xs text-roshan-ink-soft">units done</div>
        </div>
      </div>

      <div className="space-y-3">
        {ACADEMY.map((u) => {
          const isOpen = open === u.id;
          const isDone = done.includes(u.id);
          return (
            <div key={u.id} className="rounded-2xl border-2 border-roshan-card-border bg-white">
              <button
                onClick={() => setOpen(isOpen ? null : u.id)}
                className="flex w-full items-center justify-between gap-3 p-4 text-left"
              >
                <div>
                  <p className="font-bold text-roshan-ink">
                    {u.title}{" "}
                    {isDone && <span className="ml-1 text-sm font-semibold text-roshan-teal">✓ done</span>}
                  </p>
                  <p className="urdu text-right text-sm text-roshan-ink-soft" dir="rtl">{u.ur}</p>
                </div>
                <span className="shrink-0 rounded-full border-2 border-roshan-card-border px-3 py-1 text-xs font-semibold text-roshan-ink-soft">
                  {u.minutes} min
                </span>
              </button>
              {isOpen && (
                <div className="border-t-2 border-dashed border-roshan-card-border p-4">
                  <p className="mb-3 text-sm text-roshan-ink-soft">{u.why}</p>
                  <ul className="list-disc space-y-2 pl-5 text-sm">
                    {u.tips.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => toggleUnit(u.id)}
                    className={`mt-4 rounded-xl px-4 py-2 text-sm font-bold text-white ${isDone ? "bg-roshan-ink-soft" : "bg-roshan-teal hover:brightness-105"}`}
                  >
                    {isDone ? "Mark as not done" : "Mark unit as done"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================== READING ROOM ============================== */

interface Guide {
  id: string;
  title: string;
  ur: string;
  paras: string[];
}

const GUIDES: Guide[] = [
  {
    id: "rr-logic",
    title: "How young children learn logic",
    ur: "بچے منطق کیسے سیکھتے ہیں",
    paras: [
      "Children aged six to eleven think from concrete to abstract. A 'pattern' is real to them when it is sun–star–sun–star on a tree in a story; it becomes abstract only after many such meetings. This is why World 7 teaches loops and if-then with pictures and stories before any symbol appears on a screen.",
      "Repetition with variation beats drill. The same pattern idea returns in World 7, again inside paint tools in World 5, and again as block loops in World 8 — each time wearing new clothes. When a child seems to 'forget', they are usually consolidating; a quick replay of a favourite lesson does more than a new lecture.",
      "Errors are information. In ROSHAN a wrong tap is announced as 'a bug — let's fix it' and the engine offers a hint. You can copy that move with any exercise, on or off the computer: ask 'what did this bug teach us?' and the emotional weight of being wrong disappears.",
      "Talk is thinking. Pair mode exists not only to share machines but because children explain their reasoning to their partner — and hearing their own words is how they discover what they actually think. Protect the SWAP timer; the conversation is the lesson.",
    ],
  },
  {
    id: "rr-screentime",
    title: "Healthy screen time for children",
    ur: "اسکرین ٹائم کا خیال",
    paras: [
      "Short and joyful beats long and tired. For this age, 20–30 minutes of focused lab time is plenty for one sitting; ROSHAN lessons are built as 5–7 minute units so a child always finishes on a success, never mid-way through fatigue.",
      "Teach the 20-20-20 habit early: every 20 minutes, look at something 20 feet away for 20 seconds. The Parent Notes letter already asks families to continue this at home — children can be its ambassadors.",
      "Posture is a lesson, not a scolding. World 3 opens with straight back, both hands, feet on the floor. Praise the posture you want to see and it becomes self-maintaining; nagging the slouch only teaches children to hide it.",
      "Sounds off sometimes. If the lab grows noisy, play one session with the story voice only and subtitles visible — reading along quietly is a different, useful skill. Then return to voice-first for normal days.",
    ],
  },
  {
    id: "rr-questions",
    title: "Good questions to ask while children work",
    ur: "بچوں سے پوچھنے والے اچھے سوال",
    paras: [
      "The goal of a question is to restart a child's own thinking, not to test it. The most useful questions are small and open: 'What is Bijli asking you to do?' 'Which one looks right to you — why?' 'What happened last time when you tried that?'",
      "Before you show: 'kya socha?' (What did you think?). Give a slow five count of silence. Most 'I don't know' answers dissolve at count three when no adult has rushed in to fill them.",
      "After a success, go one step deeper: 'How did you know that was the computer?' A child who can say the reason out loud has the concept; a child who only tapped lucky does not — and both are fine, because the game will bring the idea back.",
      "When two children argue about the answer, do not judge — stage it: 'Experiment! Try both, show me which bug appears.' Being a scientist feels better than being corrected.",
    ],
  },
  {
    id: "rr-small-lab",
    title: "Managing a small lab, limited power",
    ur: "چھوٹی لیب، محدود بجلی",
    paras: [
      "Map your resources honestly: how many working PCs, how many minutes of guaranteed electricity, how many children per week. From those numbers build a rotation where no child waits more than a few days between turns — waiting kills momentum faster than broken machines.",
      "Pair mode doubles your machines. Ten children on five PCs, two sittings of 30 minutes each, covers a full class in one morning. The SWAP timer keeps turns fair without you policing the clock.",
      "Plan for the dark day. Load-shedding is not an emergency if unplugged activities are normal: every ROSHAN lesson plan includes a no-electricity version, and 'unplugged day' can even be announced in advance as a special event.",
      "Care is curriculum. Let children themselves clean hands, wipe screens, and perform the proper shutdown from World 1 Lesson 5. Machines that children maintain last longer — and 'mine to look after' is a powerful feeling in a village school.",
    ],
  },
];

const GLOSSARY: { en: string; ur: string; say: string }[] = [
  { en: "Computer", ur: "کمپیوٹر", say: "kum-PYOO-tar" },
  { en: "Mouse", ur: "ماؤس", say: "MAWSS" },
  { en: "Keyboard", ur: "کی بورڈ", say: "KEE-board" },
  { en: "Monitor / screen", ur: "مانیٹر / اسکرین", say: "muh-NEE-tar" },
  { en: "CPU (the brain box)", ur: "سی پی یو — سوچنے والا دماغ", say: "see-pee-YOO" },
  { en: "File", ur: "فائل", say: "FILE" },
  { en: "Folder", ur: "فولڈر", say: "FOHL-dar" },
  { en: "Save", ur: "سیو — محفوظ کرنا", say: "SAYV" },
  { en: "Click / double-click", ur: "کلک / ڈبل کلک", say: "KLIK / DUB-ul KLIK" },
  { en: "Bug (a small mistake)", ur: "بگ — چھوٹی بھول", say: "BUG" },
  { en: "Loop (repeating)", ur: "لوپ — دہرانا", say: "LOOP" },
  { en: "Internet", ur: "انٹرنیٹ", say: "in-tar-NET" },
];

export function ReadingRoom() {
  const [open, setOpen] = useState<string | null>(GUIDES[0].id);
  return (
    <div className="space-y-4">
      {GUIDES.map((g) => {
        const isOpen = open === g.id;
        return (
          <div key={g.id} className="rounded-2xl border-2 border-roshan-card-border bg-white">
            <button onClick={() => setOpen(isOpen ? null : g.id)} className="flex w-full items-center justify-between p-4 text-left">
              <p className="font-bold">{g.title}</p>
              <p className="urdu text-sm text-roshan-ink-soft" dir="rtl">{g.ur}</p>
            </button>
            {isOpen && (
              <div className="space-y-3 border-t-2 border-dashed border-roshan-card-border p-5 text-sm leading-relaxed">
                {g.paras.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div className="rounded-2xl border-2 border-roshan-card-border bg-white p-5">
        <h3 className="font-bold">Say-it-together glossary — <span className="urdu" dir="rtl">مل کر بولیں</span></h3>
        <p className="mt-1 text-sm text-roshan-ink-soft">
          Ten words that unlock every lesson. Say each pair aloud with your class: English first, Urdu second.
        </p>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {GLOSSARY.map((g) => (
            <div key={g.en} className="flex items-center justify-between rounded-xl border border-roshan-card-border px-3 py-2 text-sm">
              <span className="font-semibold">{g.en}</span>
              <span className="text-roshan-ink-soft">{g.say}</span>
              <span className="urdu" dir="rtl">{g.ur}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================== SESSION PLANNER ============================== */

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const SLOTS_PER_DAY = 2; // two lab sittings per day
const TEMPLATE = [
  { min: "0–5", part: "Story", note: "class listens together on one PC / big screen" },
  { min: "5–15", part: "Show", note: "demo the same lesson on the big screen, children predict next steps" },
  { min: "15–35", part: "Do (pairs)", note: "pair mode hands-on, 10-min SWAP timer on" },
  { min: "35–40", part: "Cheer", note: "recap by Ustaad Ulloo + one child teaches the skill back" },
];

type Plan = Record<string, string>; // "mon-0" -> lessonId

export function SessionPlanner() {
  const [plan, setPlan] = useState<Plan>({});
  const [picking, setPicking] = useState<string | null>(null);
  const [worldId, setWorldId] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        setPlan(JSON.parse(localStorage.getItem("roshan.week-plan") ?? "{}"));
      } catch {}
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const save = (p: Plan) => {
    setPlan(p);
    try {
      localStorage.setItem("roshan.week-plan", JSON.stringify(p));
    } catch {}
  };

  const lessons = lessonsOfWorld(worldId);
  const slotKey = (d: string, s: number) => `${d.toLowerCase()}-${s}`;

  return (
    <div>
      <p className="mb-4 text-sm text-roshan-ink-soft">
        Build the week: pick a lesson chip, then tap a lab period to place it. Each sitting follows the
        40-minute template below. Your plan is saved on this device and can be printed for the wall.
      </p>

      {/* world chip picker */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <select
          value={worldId}
          onChange={(e) => setWorldId(Number(e.target.value))}
          className="rounded-lg border-2 border-roshan-card-border bg-white px-3 py-2 text-sm font-semibold"
        >
          {WORLDS.map((w) => (
            <option key={w.id} value={w.id}>
              W{w.id} — {w.name.en}
            </option>
          ))}
        </select>
        <span className="text-xs text-roshan-ink-soft">→ click a lesson to pick it up, then click a period:</span>
        {picking && (
          <span className="rounded-full bg-roshan-orange px-3 py-1 text-xs font-bold text-white">
            holding: {getLesson(picking)?.title.en ?? picking}
          </span>
        )}
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {lessons.map((l) => (
          <button
            key={l.id}
            onClick={() => setPicking(l.id)}
            className={`rounded-full border-2 px-3 py-1.5 text-xs font-semibold transition-colors ${
              picking === l.id
                ? "border-roshan-orange bg-roshan-orange text-white"
                : "border-roshan-card-border bg-white text-roshan-ink hover:border-roshan-teal"
            }`}
          >
            {l.order}. {l.title.en}
          </button>
        ))}
      </div>

      {/* week grid */}
      <div className="overflow-x-auto rounded-2xl border-2 border-roshan-card-border bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-[#F6EBD8] text-xs uppercase text-roshan-ink-soft">
            <tr>
              <th className="p-2">Period</th>
              {DAYS.map((d) => (
                <th key={d} className="p-2">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[0, 1].map((s) => (
              <tr key={s} className="border-t border-roshan-card-border">
                <td className="p-2 text-xs font-semibold text-roshan-ink-soft">
                  {s === 0 ? "Sitting 1" : "Sitting 2"}
                </td>
                {DAYS.map((d) => {
                  const key = slotKey(d, s);
                  const lid = plan[key];
                  const l = lid ? getLesson(lid) : null;
                  return (
                    <td key={d} className="p-1.5">
                      <button
                        onClick={() => {
                          if (picking) {
                            save({ ...plan, [key]: picking });
                            setPicking(null);
                          } else if (lid) {
                            const next = { ...plan };
                            delete next[key];
                            save(next);
                          }
                        }}
                        className={`min-h-14 w-full rounded-lg border-2 px-2 py-1 text-xs ${
                          l
                            ? "border-roshan-teal bg-teal-50 font-semibold text-roshan-ink"
                            : "border-dashed border-roshan-card-border text-roshan-ink-soft"
                        }`}
                      >
                        {l ? (
                          <>
                            <div className="truncate">W{l.world} · {l.title.en}</div>
                            <div className="urdu text-right text-[10px]" dir="rtl">{l.title.ur}</div>
                          </>
                        ) : (
                          "+ place lesson"
                        )}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => window.print()}
          className="rounded-xl bg-roshan-teal px-4 py-2 text-sm font-bold text-white hover:brightness-105"
        >
          Print week plan
        </button>
        <button
          onClick={() => save({})}
          className="rounded-xl border-2 border-roshan-card-border px-4 py-2 text-sm font-semibold text-roshan-ink"
        >
          Clear week
        </button>
      </div>

      {/* 40-minute template */}
      <div className="mt-6 rounded-2xl border-2 border-roshan-card-border bg-white p-5">
        <h3 className="font-bold">The 40-minute sitting — <span className="urdu" dir="rtl">چالیس منٹ کا بیٹھک</span></h3>
        <table className="mt-3 w-full text-left text-sm">
          <thead className="text-xs uppercase text-roshan-ink-soft">
            <tr><th className="p-2">Minutes</th><th className="p-2">Part</th><th className="p-2">What happens</th></tr>
          </thead>
          <tbody>
            {TEMPLATE.map((t) => (
              <tr key={t.min} className="border-t border-roshan-card-border">
                <td className="p-2 font-bold text-roshan-teal">{t.min}</td>
                <td className="p-2 font-semibold">{t.part}</td>
                <td className="p-2">{t.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 flex items-center gap-3 text-sm text-roshan-ink-soft">
          <Art id="gem" size={28} />
          Tip: place the world&apos;s FINALE lesson in the last sitting of the week — badge day is a powerful Friday feeling.
        </div>
      </div>
    </div>
  );
}
