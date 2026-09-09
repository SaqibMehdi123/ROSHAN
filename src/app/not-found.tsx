import Link from "next/link";

/** Unknown routes simply take children back home. */
export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-5 px-6 text-center">
      <div className="anim-bob text-7xl">🧭</div>
      <h1 className="urdu-tight text-3xl font-bold">یہ راستہ نقشے پر نہیں ہے!</h1>
      <p className="ltr-term text-sm text-roshan-ink-soft" dir="ltr">
        This path is not on the map — let&apos;s go home.
      </p>
      <Link href="/" className="btn-kid btn-go">
        <span className="urdu-tight text-xl font-bold">نقشے پر واپس</span>
      </Link>
    </main>
  );
}
