"use client";

/**
 * Global error boundary — kid-friendly, zero-failure language even for crashes.
 * Bijli apologizes gently and offers a fresh start. Progress is in localStorage
 * and survives a reload.
 */
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-5 px-6 text-center">
      <div className="anim-bob text-7xl">⚡</div>
      <h1 className="urdu-tight text-3xl font-bold">اوپس! بجلی کا بلب گل گیا۔</h1>
      <p className="urdu-tight text-xl text-roshan-ink-soft">
        کوئی بات نہیں! تمہاری سارى کامیابیاں محفوظ ہیں۔
      </p>
      <p className="ltr-term text-sm text-roshan-ink-soft" dir="ltr">
        Oops! Bijli's bulb flickered. Your progress is safe — try again.
      </p>
      <button className="btn-kid btn-go" onClick={reset}>
        <span className="urdu-tight text-xl font-bold">دوبارہ چلو!</span>
      </button>
    </main>
  );
}
