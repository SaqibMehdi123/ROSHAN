/**
 * Teacher lesson plans (spec §7) — Phase 1 ships plans for W1 L1–L3.
 * Each plan: 5-min prep checklist, read-aloud script, demo steps, common kid
 * mistakes + fixes, exercise answers, and a NO-ELECTRICITY alternative.
 */
import type { Bilingual } from "@/lib/schema";

export interface TeacherPlan {
  lessonId: string;
  title: Bilingual;
  prepChecklist: string[];
  readAloudScript: { say: string }[]; // simple Urdu-friendly English (+ Urdu where helpful)
  demo: string[];
  commonMistakes: { mistake: string; fix: string }[];
  answers: string[];
  unplugged: string;
}

export const PLANS: TeacherPlan[] = [
  {
    lessonId: "w1l1",
    title: { ur: "اسٹور روم کا جادویی صندوق", en: "The Magic Box (What is a computer?)" },
    prepChecklist: [
      "PC/tablet charging ya plug kar do (kam az kam 30 min pehle)",
      "ROSHAN kholo aur check karo ke lesson w1l1 khulta hai",
      "Bachon ki kursiyan jodi (pair) me lagao — 2 bache 1 PC",
      "Wifi band kar ke test karo — ROSHAN offline chalna chahiye",
    ],
    readAloudScript: [
      { say: "Aaj hum ek naye dost se milenge. Wo hamare school ke storeroom me so raha tha!" },
      { say: "Bijli ek computer hai. Computer hamari madad karta hai — sochne aur seekhne me." },
      { say: "Bachao, screen par jo computer hai us par click karo. Ghalti ho to ghabrao mat — bug mila hai, hum fix karenge!" },
      { say: "Sab ne 4 computer dhoond liye? Shabash! Phone, calculator, ATM aur laptop — sab computer hain." },
    ],
    demo: [
      "Pehle khud story ka ek scene chalao aur mouse se 'Next' dikhao (dabana nahi, saaf click).",
      "Ek bache se aake uski jagah pehle 'computer' dhoondne do — baqi dekhen aur hans kar encourage karein.",
    ],
    commonMistakes: [
      { mistake: "Bacha har cheez par jaldi-jaldi click karta hai.", fix: "Ruk kar dekhne ka khel banayo: 'Pehle aankh se, phir ungli se' bolo." },
      { mistake: "Goat par click kar ke udaas ho jata hai.", fix: "Batao: 'Bug mila! Bug fixer bano' — galti ka عزم positive hai." },
      { mistake: "Dono bache ek sath click karte hain.", fix: "Pair rule yaad karao: pehle navigator haath uthata hai, phir driver click karta hai." },
    ],
    answers: [
      "Correct computers: phone, calculator, ATM, laptop.",
      "Goat, cricket bat, mango tree, well are NOT computers.",
    ],
    unplugged: "Bijli ki tasveer bana kar class me 'computer dhoondo' khel: kamre me 4 cheezein rakho jo computer ki tarah 'madad' karti hain (calculator, phone, ghari, remote). Bachay bataate hain kaun madadgaar machine hai.",
  },
  {
    lessonId: "w1l2",
    title: { ur: "بجلی کے جُز", en: "Bijli's Parts (Monitor, CPU, Keyboard, Mouse)" },
    prepChecklist: [
      "PC par monitor/CPU/keyboard/mouse bachon ko dikhao (asli cheezein!)",
      "Har jodi ke PC par ROSHAN w1l2 kholo",
      "Mouse ke right-click se bachao (sirf left/dabao) — abhi ke liye",
    ],
    readAloudScript: [
      { say: "Gol Matol ne Bijli par chhalang maar di! Ab Bijli ke parts alag ho gaye." },
      { say: "Monitor Bijli ka chehra hai — jo humein sab kuch dikhata hai. Screen ko chhao (narmi se!)." },
      { say: "CPU Bijli ka dimagh hai. Keyboard uske kaan hain. Mouse uska pet madadgaar hai." },
      { say: "Ab har part uthao aur sahi jagah par lagao. Ghalat jagah par laga? Koi baat nahi — bug fix karo!" },
    ],
    demo: [
      "Asli PC par har part ko haath se point karo, phir screen wale part se match karao.",
      "Ek bacha 'monitor' chun kar monitor ki taraf ishara kare — sab talia bajayen.",
    ],
    commonMistakes: [
      { mistake: "Mouse aur monitor mix ho jate hain.", fix: "Naam ki talmeeh: 'Mouse chhota hai, haath me aata hai; Monitor deewar jaisa bara hai.'" },
      { mistake: "Bache drag karne ki koshish karte hain.", fix: "Sikhaao: pehle part par click, phir slot par click (tap-tap placement)." },
    ],
    answers: [
      "Monitor → chehra (face) · CPU → dimagh (brain) · Keyboard → kaan (ears) · Mouse → madadgaar (helper).",
    ],
    unplugged: "Cardboard ke parts banao (monitor/CPU/keyboard/mouse) aur ek dost ko 'Bijli' bana kar tape se parts chipkao. Har part ka naam zor se bolo.",
  },
  {
    lessonId: "w1l3",
    title: { ur: "لیب کے آداب", en: "Lab Manners (Lab Rules)" },
    prepChecklist: [
      "Lab ke darwaze par 4 rules ki poster lagao (Printables me ready hai)",
      "Bachon ke haath saaf karwao lesson se pehle",
      "Paani ki bottle lab se door rakwao",
    ],
    readAloudScript: [
      { say: "Gol Matol lab me ghus gaya — gande pao, juice, aur bina poochhe buttons! Kya ye theek hai?" },
      { say: "4 rules yaad rakho: saaf haath, narm chhoona, khana door, pehle ustad se poocho." },
      { say: "Ab cards kholo aur batao — Theek ya Bug? Jo bhi ho, hum bug fix kar lenge!" },
    ],
    demo: [
      "Narm chhoona demo karo: apne haath se butterfly-touch dikhao, phir dhamake-wala touch (mat karo!) — bachay hansenge aur yaad rakhenge.",
      "Poochne ka abhyaas: ek bacha aake poochhe 'kya main mouse chhoo sakta hoon?' — jawab me 'jee haan, shabash, aap ne poochha!'",
    ],
    commonMistakes: [
      { mistake: "Bachay keyboard par zor se maar-te hain.", fix: "Ginta banao: 'ek… do…' halka dabaao. Mouse ki 'neend' na kharib ho!" },
      { mistake: "Rules ratta maar ke bhool jate hain.", fix: "Har rule ka action banao (haath dhoona, hawa jaisa chhoona…) — action se yaad hota hai." },
    ],
    answers: [
      "Theek: c1 (clean hands), c3 (gentle mouse), c6 (asked first), c8 (soft pressing).",
      "Bug: c2 (juice), c4 (muddy hands), c5 (no asking), c7 (banging).",
    ],
    unplugged: "Rules ka naatak: bache groups me 1 rule ka action bana kar dikhayen, baqi guess karein. Poster bhi bachon se banwao.",
  },
];
