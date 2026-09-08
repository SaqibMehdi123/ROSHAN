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

  /* ---------------- Phase 2: W1 L4–L6 + W2 L1–L10 ---------------- */
  {
    lessonId: "w1l4",
    title: { ur: "بجلی کی پاور — آن کرو!", en: "Power On! (correct start-up order)" },
    prepChecklist: [
      "PC pehle se ON rakho — lesson me sirf ORDER seekhna hai, asli switch nahi dabwana",
      "Wall switch/extension board ki tasveer ya asli board dikhao",
      "Har jodi ka PC ROSHAN w1l4 tak khula ho",
    ],
    readAloudScript: [
      { say: "Bijli ki battery khatam ho gayi! Wo keh raha hai: mujhe SAHI tareeqe se jagao." },
      { say: "3 qadam: pehle deewar ka switch, phir PC ka button, phir sabr se intezar." },
      { say: "Monitor roshan ho jaye to Bijli ko Salaam bolo — 'Assalam-o-Alaikum Bijli!'" },
      { say: "Ab khelo: steps sahi tarteeb se tap karo. Ghalat ho to bug mila hai — dobara try!" },
    ],
    demo: [
      "APNE PC par ek bar asli tarteeb dikhao (agar safe ho): switch → button → intezar → salaam.",
      "Ginti ke sath bolo: 'ek — switch, do — button, teen — intezar, char — salaam!' Bachay haath se ginti karein.",
    ],
    commonMistakes: [
      { mistake: "Bacha button pehle daba deta hai, switch bhool jata hai.", fix: "Kahaani yaad karao: 'Bijli ke ghar ka darwaza deewar ka switch hai — pehle darwaza!'" },
      { mistake: "Intezar karna boring lagta hai, bacha turant click karta hai.", fix: "Intezar ka khel: 'Bijli jaag raha hai — 1,2,3 soy tarey!' — ginti se sabr sikhao." },
    ],
    answers: [
      "Sahi tarteeb: deewar ka switch → PC button → intezar → salaam (monitorbtn).",
    ],
    unplugged: "Bachay se 4 steps ki tasveer-cards banwao (switch/button/ghari/salaam) aur zameen par tarteeb me bichhwa kar 'power-on path' banao. Har bacha path par chal kar steps bole.",
  },
  {
    lessonId: "w1l5",
    title: { ur: "الوداع بجلی", en: "Goodnight Bijli (proper shutdown)" },
    prepChecklist: [
      "Shutdown ka asli demo APNE PC par karo (bachay sirf dekhenge)",
      "Yaad rakhein: ye lesson walon ke PC par bachay shutdown NAHI karenge — sirf order seekhenge",
    ],
    readAloudScript: [
      { say: "Shaqt ho gayi. Bijli sone ja raha hai — lekin sahi tareeqe se!" },
      { say: "Pehle apna kaam band karo, phir Start → Shut Down, phir intezar, aakhir me deewar ka switch off." },
      { say: "Seedha switch off karna Bijli ka dimagh dukha sakta hai — isliye hum tarteeb nahi bhoolte!" },
    ],
    demo: [
      "Apne PC par: kaam band karo → Start → Shut Down → 'shutting down' dikhao → phir switch off (demo only).",
      "Uloov ka usool bolo: 'Bijli ko hamesha acchi neend do — alvida kehna care hai!'",
    ],
    commonMistakes: [
      { mistake: "Bachay seedha switch off karne ki zid karte hain.", fix: "Bijli ki tarah karo: 'agar tum so-te waqt pehle aankh band, phir takiya…' — tarteeb ka mazak banao." },
      { mistake: "'Shutting down' ke waqt bacha PC button dabata hai.", fix: "Batao: 'ab Bijli khud so raha hai — haath door rakho, dekhtay raho.'" },
    ],
    answers: [
      "Sahi tarteeb: kaam band (close-work) → Shut Down → intezar → deewar switch off.",
    ],
    unplugged: "'Goodnight Bijli' ritual: class kehti hai 'Alvida Bijli' — 4 steps ki jhoolta poster banwao jise roz aakhri period me ek bacha palte.",
  },
  {
    lessonId: "w1l6",
    title: { ur: "دوستی کا جشن", en: "Friendship Party (World 1 quiz + badge)" },
    prepChecklist: [
      "World 1 ke pehle 5 lessons sab bachon ne mukammal kiye hon",
      "Party mood: 5-min ki tayari — taaliyan, 'Bijli' ka naam ki wall banner",
      "Badge printables (album page) print kar ke paas rakho",
    ],
    readAloudScript: [
      { say: "Aaj Bijli ki friendship party hai! 6 sawal — aur aapka pehla badge milta hai!" },
      { say: "Yaad karo: monitor chehra, CPU dimagh, keyboard kaan, mouse madadgaar." },
      { say: "Ghalat jawab? Koi baat nahi — bug mila, fix karo, dobara try!" },
    ],
    demo: [
      "Ek sawal aap khud karo: sochne ka waqt do ('aankh band, yaad karo…'), phir jawab.",
      "Har sahi jawab par taali — celebration se badge ki value banti hai.",
    ],
    commonMistakes: [
      { mistake: "Bacha jaldi me random option tap karta hai.", fix: "Rule: 'pehle aankh se, phir ungli se' — dobara sunne ka button bhi dikhao." },
      { mistake: "Badge milne ke baad bacha ruk jata hai.", fix: "Aage ka laddoo dikhao: 'Mouse Meadow khul gaya — Teer tumhara intezar kar raha hai!'" },
    ],
    answers: [
      "Q1 monitor · Q2 CPU · Q3 keyboard · Q4 mouse · Q5 haath dhona · Q6 deewar ka switch.",
    ],
    unplugged: "Quiz stall: 6 sawal card par likho, bachay teams me jawab dein — jeetne wali team 'Dosti Ka Safar' badge ki paper crown pehne.",
  },
  {
    lessonId: "w2l1",
    title: { ur: "جادویی تیر", en: "The Magic Arrow (meet the cursor)" },
    prepChecklist: [
      "Mouse check karo — sab kaam kar rahe hon; touch screen ho to bhi lesson chalega",
      "Bachon ko batao: aaj mouse ki pehli mulaqat hai!",
    ],
    readAloudScript: [
      { say: "Bijli ka pet arrow 'Teer' mouse ka jadoo hai — jo screen par aapke haath ke sath chalta hai!" },
      { say: "Mouse ko aahista hilao — dekho Teer kaise urta hai. Har glowing spot par le jao!" },
      { say: "Tablet par? Ghabrao mat — spot ko tap karo, Teer wahan jayega." },
    ],
    demo: [
      "Apne mouse ko dheere hilao aur Teer ka peechha karte dikhao — 'dekho, ye mera haath hai!'",
      "Ek bacha aaye, 10 second ke liye mouse pakde — duniya ka sabse pyara Teer pilot!",
    ],
    commonMistakes: [
      { mistake: "Bacha mouse utha leta hai (hila kar chhod deta hai).", fix: "Mouse ko table par 'gadda' bolo — wo wahan hi rehta hai, sirf slide hota hai." },
      { mistake: "Mouse ulti taraf jata hai (dono haath se pakda).", fix: "Ek haath ka usool: 'apni favourite haath se pakdo, doosra haath peeche!'" },
    ],
    answers: ["5 glowing spots — sab Teer se roshan karna hai."],
    unplugged: "Chalk se floor par 'spots' banao, bacha 'Teer' bane (haath arrow ki shakal me) aur spots par ja kar khada ho — jaise cursor chalta hai!",
  },
  {
    lessonId: "w2l2",
    title: { ur: "اشارہ کرو", en: "Point! (listen then point)" },
    prepChecklist: ["Sound check — Bijli ke naam bolna zaroori hai", "Bachon ke kaan ke paas 'suno' ka ishara dikhao"],
    readAloudScript: [
      { say: "Bijli ek cheez ka naam bolegi — aap Teer ko usi cheez par le jao!" },
      { say: "Pehle kaan se suno, phir aankh se dhoondo, phir click karo." },
    ],
    demo: [
      "Ek round aap karo: naam suno → dhoondo → point karo → 'shabash!'",
      "Ghalat par bhi khush raho: 'bug mila! dobara sunte hain.'",
    ],
    commonMistakes: [
      { mistake: "Bacha sunay baghair random tap karta hai.", fix: "'Pehle kaan, phir ungli' — naam dobara sunne ka button daba kar dilwayo." },
      { mistake: "Chhoti cheez miss ho jati hai (mango).", fix: "Dekhne ka tareeqa: 'left se right, upar se neeche' — tasveer ko scan karna sikhao." },
    ],
    answers: ["4 rounds: titli (butterfly), phool (flower), aam (mango), kuan (well)."],
    unplugged: "Classroom me chhupi cheez ka naam bolo, bachay dhoond kar point karein — 'Kaan → Aankh → Ungli' wala usool har round repeat karo.",
  },
  {
    lessonId: "w2l3",
    title: { ur: "ایک کلک", en: "One Click (single click)" },
    prepChecklist: ["Mouse ka left button check karo", "Bachon se kahaan: 'aaj hum sab bubble pop karenge!'"],
    readAloudScript: [
      { say: "Machhliyan bhooki hain! Khana bubbles ke andar hai." },
      { say: "Har bubble par SIRF EK click — ek dabaav, ek dafa. Pop!" },
      { say: "Mendak bubble nahi hai — usay chherna nahi!" },
    ],
    demo: [
      "Slow-motion click dikhao: point karo → dabaao → chhodo → 'pop!'",
      "Ginti karwao: ek click = ginti me '1'. Do dabaav? Wo do click hai — abhi nahi!",
    ],
    commonMistakes: [
      { mistake: "Bacha button daba kar rakhta hai (long press).", fix: "'Click ka matlab: dabaao aur fauran chhodo — jaise gubbare phorna!'" },
      { mistake: "Pehle click kar deta hai, baad me dekhta hai.", fix: "Nara: 'Pehle aankh, phir ungli!' — har click se pehle point karna zaroori." },
    ],
    answers: ["6 bubbles pop karna; mendak galat hai (bug)."],
    unplugged: "Blow bubbles ya bubbles ki tasveerein wall par — bachay 'click' ka ishara karte hain (ungli daba kar kholna) aur POP kehte hain.",
  },
  {
    lessonId: "w2l4",
    title: { ur: "تتلیاں پکڑو", en: "Catch Butterflies (click a moving target)" },
    prepChecklist: ["Ye thoda mushkil hai — bachon ko pehle se batao: 'aaj expert level!'", "Zaroorat par 2 bache ek sath — ek point kare, ek click"],
    readAloudScript: [
      { say: "Titliyan ur rahi hain! Inhe click karo — lekin phoolon ko nahi!" },
      { say: "Pehle Teer ko titli ke sath rakho, phir click. Jaldi nahi — sahi waqt par!" },
    ],
    demo: [
      "Titli ka peechha karte dikhao — Teer titli ke bilkul sath, phir click!",
      "Mushkil ho to bolo: 'pehle 1 titli — baqi agli baar!' — progress hi kaafi hai.",
    ],
    commonMistakes: [
      { mistake: "Bacha titli ke peeche-peeche 4-5 baar click karta hai.", fix: "Bolo: 'ek titli, ek click — jaise ek dost, ek haath milana!'" },
      { mistake: "Phool par click kar deta hai.", fix: "Farq batao: 'titli urti hai, phool zameen par soya hai!'" },
    ],
    answers: ["4 urti titliyan click karna; 2 phool galat (bug)."],
    unplugged: "Ek bacha 'titli' bane (aahista daud-te phire), doosra 'Teer' — haath se chhoo kar 'click!' kahe. Phool = khada bacha jo nahi hilta.",
  },
  {
    lessonId: "w2l5",
    title: { ur: "دو کلک", en: "Two Clicks (double click)" },
    prepChecklist: ["Ye aaj ka sabse mushkil skill hai — sabr ka waqt hai", "Mouse check: double-click PC par kaam karta ho"],
    readAloudScript: [
      { say: "Ande double click se khulte hain: click… click! Ek hi jagah, tez tez!" },
      { say: "Agar pehla click akela chala jaye — koi baat nahi, phir se: click… click!" },
      { say: "Ye skill mehnat se aati hai — Bijli bhi pehle se nahi janta tha!" },
    ],
    demo: [
      "Apne mouse par asli double-click dikhao — desktop icon kholo (agar safe ho).",
      "Rhythm sikhao: 'tik-tik!' bolo aur saath click karo — awaaz se rhythm aati hai.",
    ],
    commonMistakes: [
      { mistake: "Do click alag-alag jagah par.", fix: "'Ek ghar ke andar dono click!' — spot par ring banao ungli se." },
      { mistake: "Do click bahut dair se (slow).", fix: "'Tez tez — jaise chillana: TIK-TIK!' — awaaz saath me nikalwao." },
    ],
    answers: ["4 ande double-click se kholne hain. Ghalat timing = koi bug nahi, sirf coaching."],
    unplugged: "Clap rhythm: 'tik-tik' ki double clap sikhao — double click wahi rhythm hai. Phir table par ungli se tik-tik dabaayein.",
  },
  {
    lessonId: "w2l6",
    title: { ur: "ڈبل کلک ماسٹر", en: "Double Click Master (fluency)" },
    prepChecklist: ["w2l5 sab ne kiya ho", "Stone ka surprise batao mat — mazaak rahe!"],
    readAloudScript: [
      { say: "Aaj hum double click ke MASTER banenge — kaliyan khilengi!" },
      { say: "click… click — aur phool khil gaya! Pathar par nahi — sirf kaliyan!" },
    ],
    demo: [
      "Ek kali khud kholo, phir stone par click kar ke bug ka mazaak: 'Ooops! Pathar nahi khulta!'",
    ],
    commonMistakes: [
      { mistake: "Ab bhi timing kamzor.", fix: "Har bacha apni rhythm bole: 'tik-tik!' — dheere bhi chalega, sahi jagah zaroori hai." },
      { mistake: "Stone par bhi double click ki koshish.", fix: "Ye sach me bug hai — khushi se bolo: 'bug mila! Kaliyan dhoondo!'" },
    ],
    answers: ["5 kaliyan double-click se khilengi; 1 pathar bug hai."],
    unplugged: "Paper buds banao — bachay 'double clap' se khulte hain (teacher ke 'tik-tik' par kali khul jati hai), stone ka card bhi ghoomao.",
  },
  {
    lessonId: "w2l7",
    title: { ur: "کھینچو!", en: "Drag! (drag & drop)" },
    prepChecklist: ["Mouse pad theek jagah ho", "Bachon ko batao: 'aaj mouse se uthana seekhenge!'"],
    readAloudScript: [
      { say: "Gol Matol ka tokra khali hai! Phal pakdo, kheencho, tokre par chhodo!" },
      { say: "Teen qadam: DABAO (pakdo), KHEENCHO (le jao), CHHODO (tokre par)." },
      { say: "Raaste me chhoda? Phal gir jayega — dobara pakdo, koi masla nahi!" },
    ],
    demo: [
      "Slow-motion drag: phal par dabaav → mouse slide → tokre par chhodo → 'plop!'",
      "Tap-fallback bhi dikhao: tablet/TouchScreen par tap kar ke phir target tap.",
    ],
    commonMistakes: [
      { mistake: "Drag ke doran button chhod deta hai.", fix: "'Pakad mazboot! Jaise ammi ka haath bazaar me!' — chhodo sirf tokre par." },
      { mistake: "Tokre se door chhod deta hai.", fix: "'Pehle tokre ke bilkul upar Teer lao, phir chhodo' — dabbe ki dashed line dikhao." },
    ],
    answers: ["4 phal (aam, kela, angoor, tarbooz) tokre me drag karne hain."],
    unplugged: "Paper fruits + tokri: bachay haath se 'drag' ka natak — uthao, hawa me le jao, tokri me daalo, teen qadam zor se bolo.",
  },
  {
    lessonId: "w2l8",
    title: { ur: "پھول کو پانی", en: "Water the Flowers (drag precision)" },
    prepChecklist: ["w2l7 me drag aa gaya ho", "Aaj cheezein chhoti hain — dhairya ki tayari!"],
    readAloudScript: [
      { say: "Phool pyase hain! Pani ke qatre chhote hote hain — aahista kheencho!" },
      { say: "Har phool ko sirf EK qatra chahiye. Teen phool, teen qatre!" },
    ],
    demo: [
      "Chhota qatra pakad kar slow drag dikhao — 'jahaz nahi, titli ban kar ur!'",
      "Bhari phool par drop karne ki ghalati bhi dikhao (bug) — hanste hue dobara try.",
    ],
    commonMistakes: [
      { mistake: "Qatra haath se nikal jata hai (beech me chhod dete hain).", fix: "'Qatra pyara hai — haath na chhodo jab tak phool na mile!'" },
      { mistake: "Ek hi phool par 2 qatre daal dete hain.", fix: "'Har phool ka apna ghoont! Doosra phool dhoondo.'" },
    ],
    answers: ["3 qatre, 3 phool — koi bhi qatra kisi bhi phool par."],
    unplugged: "Asli paani ka qatra (piple ka) ya paper drop: bachay pipette/paper se flower card par 'drop' karte hain — precision ka unplugged version!",
  },
  {
    lessonId: "w2l9",
    title: { ur: "رنگ برنگی دنیا", en: "A Colorful World (click-to-color)" },
    prepChecklist: ["Rangon ke naam Urdu me dohraao: neela, sabz, peela, bhora, gulabi", "Ye click-precision + rangon ki pehchaan dono sikhata hai"],
    readAloudScript: [
      { say: "Ye gaon be-rang hai! Pehle rang ka dabba chuno, phir jagah par click karo." },
      { say: "Aasman neela, sooraj peela, patti sabz — har jagah ka apna rang!" },
    ],
    demo: [
      "Pehle pot chuno (wo chamkega), phir sahi jagah click — rang bhar jayega!",
      "Ghalat rang par bhi positive raho: 'bug! Sooraj ko kaunsa rang chahiye? Peela!'",
    ],
    commonMistakes: [
      { mistake: "Pot chunay baghair direct jagah click karta hai.", fix: "Nara: 'Pehle dabba, phir jagah!' — pot chamak ka ishara dikhao." },
      { mistake: "Aasman ko sabz rang de deta hai (creative!).", fix: "Pehle tareef karo — 'rang pasand aya!' — phir duniya ka usool bolo: aasman neela hota hai." },
    ],
    answers: ["7 zones: aasman neela · zameen sabz · sooraj peela · darakht sabz · tana bhora · deewar bhora · darwaza gulabi."],
    unplugged: "Asli painting: village ka line-art print karwao, bachay crayon se wahi rang bharte hain — screen aur paper ek sath!",
  },
  {
    lessonId: "w2l10",
    title: { ur: "ماؤس ماسٹر کورس", en: "Mouse Master Course (World 2 quiz + badge)" },
    prepChecklist: ["World 2 ke pehle 9 lessons mukammal hon", "Mouse Master badge printables haazir rakho"],
    readAloudScript: [
      { say: "Aaj aap MOUSE MASTER ban sakte ho! 5 sawal — Teer ka sara jadoo yaad karo!" },
      { say: "Teer (cursor), ek click, double click, drag — ye char dosto ne aaj aapko sikhaya!" },
    ],
    demo: [
      "Har sawal se pehle chhota recap: 'cursor kya hai? Haath ka dost!'",
      "Badge milne par sab taaliyan — ye mouse ki graduation hai!",
    ],
    commonMistakes: [
      { mistake: "Quiz me jaldi-jaldi tap.", fix: "'Pehle socho, phir chhoo' — galat jawab par dobara explain sunwao." },
      { mistake: "Badge ke baad energy down.", fix: "K3 Keyboard Kingdom ka darwaza dikhao: 'aage aur bade jadoo hain!'" },
    ],
    answers: ["Q1 Teer (cursor) · Q2 ek click · Q3 tez tez do click · Q4 pakro-kheencho-chhodo · Q5 ek jagah tez tez do click."],
    unplugged: "Mouse Master ceremony: char skills ke 4 stations (point/click/double-click/drag) floor par — bachay har station ka action kar ke badge paate hain.",
  },

  /* ---------------- Phase 3: W3 Keyboard Kingdom (L1–L12) ---------------- */
  {
    lessonId: "w3l1",
    title: { ur: "سیدھا بیٹھو — بجلی کی کمر!", en: "Sit Tall! (posture)" },
    prepChecklist: [
      "Kursiyan height ke hisaab se lagao — bachon ke paon zameen tak pounchein",
      "Monitor ki height check karo: bachon ki aankh screen ke upar se 1-2 inch neeche",
      "Aaina (mirror) ya phone camera laao — 'mirror check' ke liye",
    ],
    readAloudScript: [
      { say: "Chotu kitna jhuk gaya! Bijli ka bhi back pain hai — computer doston ke liye posture zaroori hai." },
      { say: "Char qaiday yaad karo: seedhi kamar, dono haath ready, paon zameen par, screen se ek haath ka fasla." },
      { say: "Sab mirror check karo — kaun sa mussafir (superhero) seedha baithta hai? Wo hi computer ka hero hai!" },
    ],
    demo: [
      "Khud dono tarah baith kar dikhao: pehle jhuk kar (bachay hansenge), phir seedha — farq mehsoos karwao.",
      "Ek bacha aage aaye, class usay 'posture points' de: kamar? haath? paon? fasla?",
    ],
    commonMistakes: [
      { mistake: "Bacha screen ke bilkul qareeb sir rakh leta hai.", fix: "Elbow ka rule: kohni se screen tak naapo — 'ek haath ka fasla' dikhao." },
      { mistake: "Kursi par paon latka kar baithte hain.", fix: "Kam kursi/basta (cushion) under rakhwao taake paon zameen par pounchein." },
    ],
    answers: ["Sirf posture-good wali tasveer sahi hai (kamar seedhi, paon zameen par, haath ready).", "Slouch = jhuki kamar, feetup = paon hawa me, tooclose = screen se qareeb."],
    unplugged: "Posture yaad-gar: bachay seedhe ho kar 'I am a knight!' pose banate hain — 10 second hold. Phir jhuk kar (galat) pose — farq bataate hain.",
  },
  {
    lessonId: "w3l2",
    title: { ur: "گھر کی قطار — ہوم راؤ", en: "Home Row (fingers' homes)" },
    prepChecklist: [
      "Asli keyboard par F aur J ke bump bachon se chhuawao (aankhen band kar ke!)",
      "8 letter cards (A S D F J K L ;) floor ke home row me bichao — unplugged prep",
      "w3l2 tak ROSHAN khula ho",
    ],
    readAloudScript: [
      { say: "Purple castle me har key ek ghar hai. Beech wali qataar = HOME ROW — sabse special!" },
      { say: "Left hand ke ghar: A S D F. Right hand ke: J K L ;" },
      { say: "F aur J par chhote gumbad hain — aankhen band kar ke bhi ghar mil jata hai!" },
    ],
    demo: [
      "Asli keyboard par bachon ki har ungli uske ghar par rakho — pinky A par, thumb space ke paas halke.",
      "Aankhen band challenge: 'F ka gumbad dhoondo!' — jo pehle mile, wo 'Home Row hero'.",
    ],
    commonMistakes: [
      { mistake: "Semicolon (;) ko bachay yaad nahi rakhte ya confuse hote hain.", fix: "Batao: 'ye right hand ka chhota kamra hai L ke baad' — card se dikhao, dobara game me aayega." },
      { mistake: "Dono haath ek taraf.", fix: "Jodi (pair) me khelo: ek bacha left hand dikhaye, doosra right — jhool ke rule." },
    ],
    answers: ["Homes: A S D F (left) · J K L ; (right).", "Bumps sirf F aur J par hote hain."],
    unplugged: "Painter tape se floor par 8 kamron ki home row banao. Har bacha apni ungliyon ko 'gharon' me rakhta hai — 'ghar aao!' ke pukarne par wapis.",
  },
  {
    lessonId: "w3l3",
    title: { ur: "A B C — امروود، بال، چائے", en: "A B C — first letter keys" },
    prepChecklist: [
      "Tablets/PC par w3l3 khula ho — on-screen keyboard dikhao",
      "Amrood (guava), ball aur chai ki asli tasveer/toy rakho",
    ],
    readAloudScript: [
      { say: "Aaj se hum castle ke darwaze kholenge! Har letter ek key hai." },
      { say: "Jis cheez ka naam jis letter se shuru ho — wahi key dabao!" },
      { say: "Tablet walo: screen ke neeche bare keys hain — unhe bhi dabao, wo asli keyboard jaisa hi hai!" },
    ],
    demo: [
      "Ek bacha aake screen par amrood dekh kar A dabaye — amrood ka pop dekho, sab taali bajao.",
      "Physical keyboard walo ke liye: naram dabao — 'butterfly touch' yaad dilao.",
    ],
    commonMistakes: [
      { mistake: "Bachay keyboard par zor se maarte hain.", fix: "W1L3 ka rule dohrao: narm chhoo — keys ke gharon ke darwaze hain, todna nahi!" },
      { mistake: "Harf sun kar nahi, guess kar ke dabate hain.", fix: "'Pehle aankh, phir ungli': pehle picture ka naam bolo (a-m-rood!), phir dabao." },
    ],
    answers: ["Targets: amrood→A, ball→B, chai→C (do baar mix, total 6 rounds)."],
    unplugged: "ABC darwaza game: 3 cardboard darwaze (A/B/C) — teacher picture dikhaye, bachay sahi darwaze par knock karte hain.",
  },
  {
    lessonId: "w3l4",
    title: { ur: "D E F — ڈھول کا دھماکہ", en: "D E F — falling letters" },
    prepChecklist: [
      "w3l4 catch-falling game khula ho; dhol ki awaz ya asli dhol/dabba",
      "Bachon ko pehle se batado: letter neeche pohanch jaye to ghabrana nahi — wapis udayga",
    ],
    readAloudScript: [
      { say: "Dhol baj raha hai — dhum dhum! Letters neeche aa rahe hain!" },
      { say: "Letter ko pakadne ke do tareeqay: uski key dabao, YA letter par haath (tap) dalo." },
      { say: "Ye race nahi hai — letter dheere aata hai, hamare paas kaafi waqt hai!" },
    ],
    demo: [
      "Khud ek letter pakdo (key press kar ke) aur dikhao: letter pop hua, Bijli ki tokri me gaya.",
      "Ek letter ko jaan boojh kar neeche jaane do — dikhao ke wo wapis udrta hai: 'dekha? koi kho nahi!'",
    ],
    commonMistakes: [
      { mistake: "Bachay jaldi panic kar ke har key daba dete hain.", fix: "Nara: 'Pehle naam, phir key!' — letter dekho, uska dost (dhol/egg/fish) bolo, phir dabao." },
      { mistake: "Letter nikal jaye to udaas hona.", fix: "Batao — 'ye bhai wapis aa raha hai! Ek aur chance' — zero failure ka mazaak." },
    ],
    answers: ["Letters: D (dhol), E (egg), F (fish) — 6 catches total."],
    unplugged: "Dhum-dhum letters: cardstock letters D/E/F ko dhire-dhire neeche girao (string se), bachay sahi naam bol kar pakadte hain.",
  },
  {
    lessonId: "w3l5",
    title: { ur: "G H I — غبارہ، ہاتھی، آئس کریم", en: "G H I — new keys" },
    prepChecklist: ["w3l5 khula ho", "Pichli lesson ke D E F ka 30-second recap banao"],
    readAloudScript: [
      { say: "Teen naye ghar: G (gubbara), H (haathi), I (ice cream)!" },
      { say: "Pehle socho: picture kaunsa dost hai? Phir uski key dabao!" },
    ],
    demo: [
      "Haathi ka action karwao (soond banao) — har letter ka chhota action memory strong karta hai.",
    ],
    commonMistakes: [
      { mistake: "G aur H mix ho jate hain.", fix: "G = gubbara (goool!) — round; H = haathi — bara. Picture se pehla sound bolo." },
      { mistake: "I chhoti lagti hai, bachay L samajhte hain.", fix: "I ka naara: 'I ek akela bandar hai jo khada hai!' — on-screen key se compare karwao." },
    ],
    answers: ["Targets: gubbara→G, haathi→H, icecream→I (2 baar mix, total 6)."],
    unplugged: "GHI action cards: gubbara blow karo, haathi soond, ice cream lick — har action par letter zor se bolo.",
  },
  {
    lessonId: "w3l6",
    title: { ur: "J K L — بجلی کے دوست", en: "J K L — Bijli's friends" },
    prepChecklist: ["w3l6 khula ho", "Kite (patang) ya laddu ka prop rakho — motivation!"],
    readAloudScript: [
      { say: "J par jahaaz, K par patang, L par laddu — Bijli ke dost aaj girte hain, hum pakdenge!" },
      { say: "D bhi yaad hai? Dhol wala D dobara aayega — review!" },
    ],
    demo: [
      "Right hand ki ungliyan J K L par rakho — wahi home row! J ka gumbad mehsoos karwao.",
    ],
    commonMistakes: [
      { mistake: "Bachay left hand se J K L dabate hain.", fix: "Gently: 'right hand ke dost' — asli keyboard par right hand rakho." },
      { mistake: "Old D bhool jate hain.", fix: "Dhol ki awaz nikaalo — 'dhum!' D aayega. Revision pressure-free." },
    ],
    answers: ["Pool: J (jahaz), K (kite), L (laddu), D (dhol review) — 6 catches."],
    unplugged: "Patang letters: floor par kite-shape cards J/K/L/D — har bacha patang 'urata' hai (card utha kar) aur letter bolta hai.",
  },
  {
    lessonId: "w3l7",
    title: { ur: "M N O — آم، ناریل، سنترہ", en: "M N O — fruit keys" },
    prepChecklist: ["w3l7 khula ho", "Aadha alphabet complete hone wala hai — taaliyan ready!"],
    readAloudScript: [
      { say: "M = mango (Bijli ka favourite!), N = nariyal, O = orange." },
      { say: "Aaj ke baad aadha alphabet hamara! A se O tak!" },
    ],
    demo: [
      "Mango ka action: 'muaah!' khaane ka. Har fruit ka sound = memory hook.",
    ],
    commonMistakes: [
      { mistake: "N aur M keys ke qareeb hone se mix.", fix: "On-screen keyboard par dikhao: M right hand ke neeche, N uske baghal. 'M = mango = mujhe pasand!'" },
      { mistake: "O ko zero (0) samajhna.", fix: "Batao: O letter hai (upar ABCD wali line me), 0 number hai (upar wali number line me)." },
    ],
    answers: ["Targets: mango→M, naariyal→N, orange→O (2 baar mix, total 6)."],
    unplugged: "Fruit mandi: 3 dukaanein M/N/O — bachay fruit cards sahi dukaan par le jaate hain, har baar letter bolte hain.",
  },
  {
    lessonId: "w3l8",
    title: { ur: "P Q R S — صابن کے بلبلے", en: "P Q R S — letter bubbles" },
    prepChecklist: ["w3l8 bubble game khula ho", "Sab ko batayein: aaj DO tareeqay hain — key dabao YA bubble par tap!"],
    readAloudScript: [
      { say: "Soap bubbles par letters likhe hain! Key dabao YA bubble phodo — dono chalenge!" },
      { say: "P poster, Q qalam, R rickshaw, S suraj." },
    ],
    demo: [
      "Ek bubble tap kar ke pop dikhao, phir wahi letter keyboard se daba kar dikhao — 'dekha? dono jadoo!'",
    ],
    commonMistakes: [
      { mistake: "Bachay bubbles ka peecha karte hain (cursor chase).", fix: "Bubbles dheere drift karte hain — 'pehle intezar, phir pop' — patience skill." },
      { mistake: "Q ko O samajhte hain.", fix: "Q ki poonch dikhao: 'O ne poonch nikali to Q ban gaya!'" },
    ],
    answers: ["Targets: P (poster), Q (qalam), R (rickshaw), S (sun), Q dobara — 5 rounds."],
    unplugged: "Bubble pop: kamre me 4 balloon letters (P/Q/R/S) likhe — teacher letter ka dost bole, bachay sahi balloon phodte hain (zor se pop = khushi!)",
  },
  {
    lessonId: "w3l9",
    title: { ur: "T سے Z + SPACE کا جادو", en: "T to Z + SPACE magic" },
    prepChecklist: ["w3l9 khula ho — SPACE key on-screen highlighted", "Words aaj pehli baar banenge — excitement!"],
    readAloudScript: [
      { say: "Aakhri letters: T U V W X Y Z — aur aaj pehli baar HUM APNE LAFZ LIKHENGE!" },
      { say: "SPACE = do lafzon ke beech ka jadooi qaleen — MERA DOST me dekho!" },
    ],
    demo: [
      "Board par likho: MERADOST (chipka hua) — phir SPACE qaleen bicha do: MERA DOST. Farq clear!",
    ],
    commonMistakes: [
      { mistake: "Bachay space dabaana bhool jaate hain.", fix: "Jahan slot khaali ho wahan qaleen (carpet) ki tasveer socho — slot purple dikhe to SPACE dabaana hai." },
      { mistake: "V, X sirf screen par dekh kar press nahi karte (targets me nahi).", fix: "Batao: 'V van, X xylophone' — aaj screen par dekha, agle world me milenge!" },
    ],
    answers: ["Singles: T, U, Z. Words: BAT, TOP, MERA DOST (space between MERA aur DOST)."],
    unplugged: "Word tiles: B-A-T / T-O-P cards banakar bachay milaa kar lafz banate hain; do lafzon ke beech khaali 'SPACE' card rakhte hain.",
  },
  {
    lessonId: "w3l10",
    title: { ur: "ENTER اور BACKSPACE", en: "Enter and Backspace (fix-it)" },
    prepChecklist: ["w3l10 khula ho", "Bachon ko yaad dilao: galti = bug, bug fix karna mazedaar hai!"],
    readAloudScript: [
      { say: "Chotu ne BAT likha par beech me Q aa gayi! Kya karein?" },
      { say: "BACKSPACE = jadooi mitti — ghalat harf mita do. Sahi likho. ENTER = 'ho gaya!'" },
    ],
    demo: [
      "Ek target live fix karo: Q wala slot orange dikh raha — ERASE dabao (whoosh!), sahi letter, phir ENTER.",
    ],
    commonMistakes: [
      { mistake: "Bachay ENTER jaldi daba dete hain (pehle word complete kiye baghair).", fix: "Friendly reminder aata hai (koi bug nahi) — batao: 'pehle saare khaane bharo, phir darwaza kholo!'" },
      { mistake: "Sahi letter ko erase karna chahte hain.", fix: "Magic eraser sirf GHALAT harf utaata hai — bachay ko safe feeling: kuch kharab nahi ho sakta." },
    ],
    answers: ["BQT→BAT (erase Q, type A) · TYP→TOP (erase Y, type O) · WQTCH→WATCH (erase Q, type A)."],
    unplugged: "Fix-it cards: ghalat lafz likhe cards (BQT) — bachay marker se ghalat harf kaato/mitao aur sahi chipkao. 'Ho gaya!' par taali.",
  },
  {
    lessonId: "w3l11",
    title: { ur: "گنتی کے نمبر — آم گنو!", en: "Number keys — count the mangoes" },
    prepChecklist: ["w3l11 khula ho", "10 small objects (beans/bottlecaps) — counting practice"],
    readAloudScript: [
      { say: "Numbers keyboard ke UPAR rehte hain: 1 2 3 4 5 6 7 8 9 0!" },
      { say: "Aam gino — jitne aam, wahi number key! Aur agar Bijli sab kha jaye? ZERO!" },
    ],
    demo: [
      "Beans se counting karwao: 3 beans — teen! — phir screen par 3 mangoes aur key 3.",
    ],
    commonMistakes: [
      { mistake: "Ginti me chhoot (skip) hoti hai.", fix: "Angli se point kar ke dheere gino — screen par har aam ko touch-point socho." },
      { mistake: "0 ko 'das' bolte hain.", fix: "0 = sifar = kuch nahi! Khaali tokri ki tasveer dimaag me rakho." },
    ],
    answers: ["Rounds: 3, 0 (sab kha gaye), 5, 7, 1, 4."],
    unplugged: "Aam mandi: 10 kaghaz ke aam — ek bacha ginney wala, baaki sab number card utha kar dikhate hain. Zero round me sab kha jaate hain (naatak!).",
  },
  {
    lessonId: "w3l12",
    title: { ur: "میرا نام — کی بورڈ نائٹ بنو!", en: "My Name — Keyboard Knight ceremony" },
    prepChecklist: [
      "Har bachay ka profile naam Latin me ho (WelcomeGate me Latin likhwao)",
      "Knight ceremony: keyboard-knight badge printable + talwar pose!",
      "Agar naam type karne me mushkil ho — ROSHAN likhne me madad, phir dobara naam",
    ],
    readAloudScript: [
      { say: "Aakhri imtihaan: APNA NAAM likho! Har harf ek ghar — tumhara naam harfon ka shehar hai." },
      { say: "Phir ROSHAN aur poora jumla: MAIN ROSHAN HOON — kyunki tum roshni phailate ho!" },
      { say: "Knight banne par talwaar uthao (ungli) aur bolo: 'I am a Keyboard Knight!'" },
    ],
    demo: [
      "Apna (teacher ka) naam pehle type karo — harf harf ginte hue. Phir bachay ki baari.",
    ],
    commonMistakes: [
      { mistake: "Bachay apne naam ki spelling bhool jaate hain.", fix: "Slates/notebook par naam likhwa ke samne rakho — copy kar ke type karna bhi seekhna hai." },
      { mistake: "Lambe naam me ruk jate hain.", fix: "Hint glow khud aata hai (2 stall ke baad) — 'glowing ghar dikh raha? wahi dabaao!'" },
    ],
    answers: ["3 targets: apna naam (profile se) · ROSHAN · MAIN ROSHAN HOON. ENTER se confirm."],
    unplugged: "Knight ceremony: cardboard talwar par bachay apna naam likhte hain — 'knights' kneel, teacher knight banati hai. Naam wali talwar ghar le jaayein!",
  },
];
