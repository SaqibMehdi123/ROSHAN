/**
 * TEACHER HUB — second product (spec §7). Phase 1 scope:
 * Dashboard (per-student progress + stuck alerts) · CSV export · Lesson plans (W1 L1–L3)
 * · Printables (lab-rules poster, parent letter) · shells for Academy/Reading Room (Phase 2).
 * All data is read from the SAME device's local storage (privacy-first, no server).
 */
"use client";

import { useMemo, useState } from "react";
import { useApp, checkTeacherPin } from "@/lib/store";
import { PLANS } from "@/content/teacher/plans";
import { getLesson, WORLDS } from "@/lib/content";
import { Art } from "@/components/art/Props";

type Tab = "dashboard" | "plans" | "printables" | "academy" | "reading" | "parents" | "planner";

export function TeacherHub() {
  const { go } = useApp();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [openPlan, setOpenPlan] = useState<string | null>(null);

  const tabs: { id: Tab; label: string }[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "plans", label: "Lesson Plans" },
    { id: "printables", label: "Offline Kit" },
    { id: "parents", label: "Parent Notes" },
    { id: "academy", label: "Teacher Academy" },
    { id: "reading", label: "Reading Room" },
    { id: "planner", label: "Session Planner" },
  ];

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-8" dir="ltr">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-roshan-ink">ROSHAN Teacher Hub</h1>
          <p className="text-sm text-roshan-ink-soft">
            Progress lives on THIS device (child privacy). Phase 2 adds lab-wide sync.
          </p>
        </div>
        <button onClick={() => go("map")} className="rounded-lg border-2 border-roshan-card-border px-4 py-2 text-sm font-semibold text-roshan-ink hover:bg-white">
          ← Exit to child app
        </button>
      </header>

      <nav className="mb-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); setOpenPlan(null); }}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${tab === t.id ? "bg-roshan-teal text-white" : "border-2 border-roshan-card-border bg-white text-roshan-ink hover:border-roshan-teal"}`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {tab === "dashboard" && <Dashboard />}
      {tab === "plans" &&
        (openPlan ? (
          <PlanView planId={openPlan} onBack={() => setOpenPlan(null)} />
        ) : (
          <PlanList onOpen={setOpenPlan} />
        ))}
      {tab === "printables" && <Printables />}
      {tab === "parents" && <ParentNotes />}
      {(tab === "academy" || tab === "reading" || tab === "planner") && <Phase2Stub tab={tab} />}
    </main>
  );
}

/* ------------------------------ DASHBOARD ------------------------------ */
function Dashboard() {
  const profiles = useApp((s) => s.profiles);
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const hasPin = typeof window !== "undefined" && !!localStorage.getItem("roshan.v1.teacher");
  // settings screen already verified the PIN this session → skip the second gate
  const alreadyUnlocked =
    typeof window !== "undefined" && sessionStorage.getItem("roshan.teacher-unlocked") === "1";
  const open = unlocked || alreadyUnlocked;

  if (!open) {
    return (
      <div className="mx-auto max-w-sm rounded-2xl border-2 border-roshan-card-border bg-white p-6">
        <p className="mb-1 text-lg font-bold">Teacher sign-in</p>
        <p className="mb-4 text-sm text-roshan-ink-soft">
          {hasPin ? "Enter your PIN." : "First time: create a PIN (4+ digits)."}
        </p>
        <input
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="mb-3 w-full rounded-lg border-2 border-roshan-card-border px-4 py-3 text-xl"
          placeholder="PIN"
          inputMode="numeric"
        />
        <button
          className="w-full rounded-xl bg-roshan-teal py-3 font-bold text-white hover:brightness-105"
          onClick={() => {
            if (!hasPin && pin.length >= 4) {
              import("@/lib/store").then(({ setTeacherPin }) => {
                setTeacherPin(pin);
                try { sessionStorage.setItem("roshan.teacher-unlocked", "1"); } catch {}
                setUnlocked(true);
              });
            } else if (hasPin && checkTeacherPin(pin)) {
              try { sessionStorage.setItem("roshan.teacher-unlocked", "1"); } catch {}
              setUnlocked(true);
            }
          }}
        >
          {hasPin ? "Sign in" : "Create PIN & sign in"}
        </button>
      </div>
    );
  }

  // stuck-alert computation (plain data derivation — no hooks needed)
  const alerts = profiles.flatMap((p) =>
    Object.entries(p.progress)
      .filter(([, pr]) => !pr.completed && pr.attempts >= 3)
      .map(([lessonId, pr]) => {
        const l = getLesson(lessonId);
        return {
          name: p.name,
          lessonId,
          attempts: pr.attempts,
          suggestion: l
            ? `Sit beside ${p.name} for one guided DO round of "${l.title.en}". Praise every attempt: "bug mila, ab fix karo!" Then let them teach the skill back to their partner.`
            : "Do one guided practice round together.",
        };
      })
  );

  const exportCsv = () => {
    const rows = [
      ["name", "world", "lessons_completed", "stars_total", "bugs_fixed", "minutes_on_task", "last_active", "pair_with", "helper_mode"],
      ...profiles.map((p) => [
        p.name,
        String(p.current?.world ?? 1),
        String(Object.values(p.progress).filter((x) => x.completed).length),
        String(Object.values(p.stars).reduce((a, b) => a + b, 0)),
        String(p.bugsFixed),
        String(Math.round(p.minutesOnTask)),
        p.streak.lastActiveDay ?? "never",
        p.pairMode ? p.buddyName ?? "yes" : "no",
        p.helperMode ? "yes" : "no",
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `roshan-progress-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* class summary */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Students on this device" value={String(profiles.length)} />
        <Stat label="Lessons completed" value={String(profiles.reduce((a, p) => a + Object.values(p.progress).filter((x) => x.completed).length, 0))} />
        <Stat label="Bugs fixed (mistakes normalized!)" value={String(profiles.reduce((a, p) => a + p.bugsFixed, 0))} />
        <Stat label="Minutes on task" value={String(Math.round(profiles.reduce((a, p) => a + p.minutesOnTask, 0)))} />
      </div>

      {/* alerts */}
      {alerts.length > 0 && (
        <div className="mb-6 rounded-2xl border-2 border-roshan-orange bg-orange-50 p-4">
          <p className="mb-2 font-bold text-roshan-orange-deep">Alerts &amp; suggested interventions</p>
          {alerts.map((a, i) => (
            <div key={i} className="mb-2 rounded-xl bg-white p-3 text-sm">
              <b>{a.name}</b> has been stuck on <b>{getLesson(a.lessonId)?.title.en ?? a.lessonId}</b> for {a.attempts} sessions.
              <div className="mt-1 text-roshan-ink-soft">{a.suggestion}</div>
            </div>
          ))}
        </div>
      )}

      {/* per-student table */}
      <div className="overflow-x-auto rounded-2xl border-2 border-roshan-card-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#F6EBD8] text-xs uppercase text-roshan-ink-soft">
            <tr>
              <th className="p-3">Student</th>
              <th className="p-3">World</th>
              <th className="p-3">Lessons</th>
              <th className="p-3">Stars</th>
              <th className="p-3">Bugs fixed</th>
              <th className="p-3">Minutes</th>
              <th className="p-3">Last active</th>
            </tr>
          </thead>
          <tbody>
            {profiles.length === 0 && (
              <tr>
                <td className="p-4 text-roshan-ink-soft" colSpan={7}>
                  No child profiles on this device yet. Let a child create a profile in the child app first.
                </td>
              </tr>
            )}
            {profiles.map((p) => (
              <tr key={p.id} className="border-t border-roshan-card-border">
                <td className="p-3 font-semibold">{p.name}{p.helperMode ? " ⭐" : ""}</td>
                <td className="p-3">W{p.current?.world ?? 1}</td>
                <td className="p-3">{Object.values(p.progress).filter((x) => x.completed).length}</td>
                <td className="p-3">{Object.values(p.stars).reduce((a, b) => a + b, 0)}</td>
                <td className="p-3">{p.bugsFixed}</td>
                <td className="p-3">{Math.round(p.minutesOnTask)}</td>
                <td className="p-3">{p.streak.lastActiveDay ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={exportCsv} className="mt-4 rounded-xl bg-roshan-orange px-5 py-3 font-bold text-white hover:brightness-105">
        Export progress CSV
      </button>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border-2 border-roshan-card-border bg-white p-4">
      <div className="text-3xl font-bold text-roshan-teal">{value}</div>
      <div className="text-xs text-roshan-ink-soft">{label}</div>
    </div>
  );
}

/* ------------------------------ LESSON PLANS ------------------------------ */
function PlanList({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {PLANS.map((p) => (
        <button key={p.lessonId} onClick={() => onOpen(p.lessonId)} className="rounded-2xl border-2 border-roshan-card-border bg-white p-5 text-left hover:border-roshan-teal">
          <div className="text-xs font-bold uppercase text-roshan-teal">{p.lessonId}</div>
          <div className="mt-1 text-lg font-bold">{p.title.en}</div>
          <div className="urdu text-right text-sm" dir="rtl">{p.title.ur}</div>
          <div className="mt-3 text-sm text-roshan-ink-soft">
            {p.prepChecklist.length}-step prep · read-aloud script · {p.commonMistakes.length} mistake fixes · unplugged version
          </div>
        </button>
      ))}
      <div className="rounded-2xl border-2 border-dashed border-roshan-card-border p-5 text-sm text-roshan-ink-soft">
        Plans for every lesson of all 8 worlds ship with each world build (see docs/04-curriculum.md).
      </div>
    </div>
  );
}

function PlanView({ planId, onBack }: { planId: string; onBack: () => void }) {
  const plan = PLANS.find((p) => p.lessonId === planId);
  if (!plan) return null;
  return (
    <article className="rounded-2xl border-2 border-roshan-card-border bg-white p-6">
      <button onClick={onBack} className="mb-4 text-sm font-semibold text-roshan-teal underline">← all plans</button>
      <h2 className="text-2xl font-bold">{plan.title.en}</h2>
      <p className="urdu mb-4 text-right text-xl" dir="rtl">{plan.title.ur}</p>

      <Section title="5-minute prep checklist">
        <ul className="list-disc space-y-1 pl-5">
          {plan.prepChecklist.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </Section>

      <Section title="Read-aloud script (say exactly this — pause after each line and let ROSHAN's voice repeat it)">
        <ol className="list-decimal space-y-1 pl-5">
          {plan.readAloudScript.map((s, i) => <li key={i}>{s.say}</li>)}
        </ol>
      </Section>

      <Section title="What to demo on the big screen">
        <ul className="list-disc space-y-1 pl-5">
          {plan.demo.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </Section>

      <Section title="Common kid mistakes → how to fix">
        <table className="w-full text-left text-sm">
          <thead><tr className="text-xs uppercase text-roshan-ink-soft"><th className="p-2">Mistake</th><th className="p-2">Fix</th></tr></thead>
          <tbody>
            {plan.commonMistakes.map((m, i) => (
              <tr key={i} className="border-t border-roshan-card-border">
                <td className="p-2">{m.mistake}</td>
                <td className="p-2">{m.fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Exercise answers">
        <ul className="list-disc space-y-1 pl-5">
          {plan.answers.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </Section>

      <Section title="No-electricity day (unplugged)">
        <p>{plan.unplugged}</p>
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5">
      <h3 className="mb-2 font-bold text-roshan-teal">{title}</h3>
      {children}
    </section>
  );
}

/* ------------------------------ PRINTABLES ------------------------------ */
function Printables() {
  const [printing, setPrinting] = useState<"poster" | null>(null);
  return (
    <div>
      <p className="mb-4 text-sm text-roshan-ink-soft">
        Print-friendly offline kit. Phase 1 ships: Lab Rules poster + Parent letter (W1) sample.
        Flashcards &amp; unplugged Logic Jungle ship with their world builds.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-roshan-card-border bg-white p-5">
          <h3 className="font-bold">Lab Rules wall poster (Urdu)</h3>
          <p className="urdu mt-1 text-right text-sm" dir="rtl">لیب کے ۴ اصول — دیوار پر لگائیں</p>
          <div className="mt-3 flex gap-2">
            <button className="rounded-lg bg-roshan-teal px-4 py-2 text-sm font-bold text-white" onClick={() => { setPrinting("poster"); setTimeout(() => window.print(), 300); }}>
              Print
            </button>
          </div>
          <LabPosterPreview />
        </div>
        <div className="rounded-2xl border-2 border-roshan-card-border bg-white p-5">
          <h3 className="font-bold">Parent letter — after World 1</h3>
          <p className="urdu mt-1 text-right text-sm" dir="rtl">والدین کے نام خط — دنیا ۱ کے بعد</p>
          <p className="mt-3 text-sm text-roshan-ink-soft">Open the Parent Notes tab to print the letter.</p>
        </div>
      </div>
      {printing === "poster" && (
        <div className="print-page fixed inset-0 z-50 bg-white p-10">
          <PrintableLabRules />
        </div>
      )}
    </div>
  );
}

function LabPosterPreview() {
  return <div className="mt-3 rounded-lg border border-roshan-card-border p-4 text-sm"><PrintableLabRules compact /></div>;
}

function PrintableLabRules({ compact = false }: { compact?: boolean }) {
  const rules: { ur: string; en: string }[] = [
    { ur: "۱۔ صاف ہاتھوں سے کمپیوٹر چھوؤ۔", en: "Clean hands before touching." },
    { ur: "۲۔ نرمی سے چھوؤ — دھکا نہیں!", en: "Touch gently — never bang." },
    { ur: "۳۔ کھانا پینا لیب سے دور!", en: "No food or drink in the lab." },
    { ur: "۴۔ پہلے اُستاد سے پوچھو۔", en: "Ask the teacher first!" },
  ];
  return (
    <div className="mx-auto max-w-md text-center" dir="rtl">
      <h2 className={`urdu font-bold ${compact ? "text-xl" : "text-4xl"}`}>کمپیوٹر لیب کے اصول</h2>
      <div className={`mt-4 space-y-3 ${compact ? "" : "text-2xl"}`}>
        {rules.map((r) => (
          <div key={r.en} className="rounded-xl border-3 border-roshan-orange bg-[#FFF8EC] p-3">
            <p className="urdu font-bold">{r.ur}</p>
            <p className="text-xs text-roshan-ink-soft" dir="ltr">{r.en}</p>
          </div>
        ))}
      </div>
      <div className={`mt-4 flex items-center justify-center gap-3 ${compact ? "scale-50" : ""}`}>
        <Art id="medal-box" size={compact ? 60 : 90} />
        <span className="urdu text-lg">— روشن روشن گاؤں</span>
      </div>
    </div>
  );
}

/* ------------------------------ PARENT NOTES ------------------------------ */
function ParentNotes() {
  const w1 = WORLDS[0];
  return (
    <div className="rounded-2xl border-2 border-roshan-card-border bg-white p-6">
      <h3 className="text-lg font-bold">Letter home — after World 1 ({w1.name.en})</h3>
      <button
        className="mt-2 mb-4 rounded-lg bg-roshan-teal px-4 py-2 text-sm font-bold text-white"
        onClick={() => window.print()}
      >
        Print (Urdu letter)
      </button>
      <div className="print-page mx-auto max-w-xl rounded-xl border-3 border-roshan-orange bg-[#FFF8EC] p-6" dir="rtl">
        <p className="urdu text-2xl font-bold text-center">پیارے والدین، السلام علیکم!</p>
        <p className="urdu mt-4 text-lg leading-[2.2]">
          آپ کے بچے نے کمپیوٹر کی پہلی دنیا مکمل کی ہے! اس ہفتے انھوں نے سیکھا:
          کمپیوٹر کیا ہے (فون اور کیلکولیٹر بھی کمپیوٹر ہیں)، کمپیوٹر کے چار جُز —
          مانیٹر، سی پی یو، کی بورڈ اور ماؤس — اور لیب کے اصول: صاف ہاتھ، نرم چھوائی،
          کھانا دور، اور پہلے اُستاد سے پوچھنا۔
        </p>
        <p className="urdu mt-3 text-lg leading-[2.2]">
          گھر پر محفوظ مشق: بچے سے کہیں کہ گھر کی ۳ چیزیں بتائے جو کمپیوٹر کی طرح
          "مدد" کرتی ہیں (موبائل، ریموٹ، گھڑی)۔ اسکرین کا وقت دن میں ۲۰ منٹ سے زیادہ نہ ہو،
          اور ہر ۲۰ منٹ بعد آنکھوں کو ۲۰ سیکنڈ کے لیے دور کی چیز پر ٹِک کریں۔
        </p>
        <p className="urdu mt-3 text-lg leading-[2.2]">شکریہ — روشن ٹیم اور اُستاد اُلوو (ہو ہو!)</p>
      </div>
    </div>
  );
}

function Phase2Stub({ tab }: { tab: string }) {
  const titles: Record<string, { en: string; ur: string; desc: string }> = {
    academy: {
      en: "Teacher Academy",
      ur: "اُستاد اکیڈمی",
      desc: "Short beginner course for teachers themselves (your first week with a computer) + facilitation skills: running pair mode, praising mistakes as debugging, no-lecture teaching. Ships as narrated Urdu slides in Phase 2.",
    },
    reading: {
      en: "Reading Room",
      ur: "مطالعہ کمرہ",
      desc: "Simply-written guides: how young children learn logic, healthy screen time, good questions to ask while kids work, managing a small lab with limited electricity. Ships in Phase 2.",
    },
    planner: {
      en: "Session Planner",
      ur: "سیشن پلانر",
      desc: "40-minute template: 5 min story → 10 min demo on big screen → 20 min hands-on in pairs → 5 min recap by Ustaad Ulloo. Drag lesson chips onto a week grid in Phase 2.",
    },
  };
  const t = titles[tab];
  return (
    <div className="rounded-2xl border-2 border-dashed border-roshan-card-border bg-white p-6">
      <h3 className="text-lg font-bold">{t.en} — <span className="urdu">{t.ur}</span></h3>
      <p className="mt-2 text-sm text-roshan-ink-soft">{t.desc}</p>
    </div>
  );
}
