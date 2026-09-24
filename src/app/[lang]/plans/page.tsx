import { messages } from "@/i18n/messages";
import { notFound } from "next/navigation";
import Link from "next/link";
export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (lang !== "es" && lang !== "en") {
    notFound();
  }

  const t = messages[lang].home;

  return (
    <main className="flex-1 flex flex-col items-center justify-center bg-slate-50 px-4 py-12 text-center">
      <nav aria-label={lang === "es" ? "Idioma" : "Language"} className="mb-6 flex gap-3">
        <Link
          href="/es"
          className="rounded-lg border border-blue-700 bg-white px-4 py-2 font-semibold text-blue-700"
        >
        Español
        </Link>
        <Link
          href="/en"
          className="rounded-lg border border-blue-700 bg-white px-4 py-2 font-semibold text-blue-700"
        >
        English
        </Link>
      </nav>
      <span className="bg-blue-100 text-blue-700 text-xs font-bold rounded-full px-4 py-1">
        <span className="w-2 h-2 bg-orange-400 rounded-full inline-block mr-1"></span>
        {t.badge}
      </span>

      <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 mt-8">
        {t.title}
      </h1>

      <p className="text-lg text-slate-600 max-w-md mt-2">
        {t.description}
      </p>

      <form
        action={`/${lang}/plans`}
        className="flex items-center bg-white rounded-full shadow-lg p-2 mt-10 w-full max-w-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 ml-3 text-blue-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          type="text"
          name="search"
          aria-label={lang === "es" ? "Buscar planes" : "Search plans"}
          placeholder={t.placeholder}
          className="min-w-0 flex-1 px-3"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold rounded-full px-6 py-2"
        >
          {t.explore}
        </button>
      </form>

      <p className="text-sm text-slate-600 mt-10">
        <span className="text-green-700">✓</span> {t.noReservations}
      </p>
    </main>
  );
}
