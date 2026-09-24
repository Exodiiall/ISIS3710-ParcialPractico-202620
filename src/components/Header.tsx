"use client";

import { messages } from "@/i18n/messages";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

// ssr: false para que se cargue solo en el navegador, donde existe el localStorage
const UserMenu = dynamic(() => import("./UserMenu"), { ssr: false });

export default function Header() {
  const pathname = usePathname();
  const lang =
    pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
  const t = messages[lang].header;

  return (
    <header className="flex flex-wrap justify-between items-center gap-4 bg-white border-b border-slate-200 px-4 py-4 sm:px-8 lg:px-24">
      <div className="flex flex-wrap items-center gap-4 sm:gap-12">
        <Link href={`/${lang}`} className="flex items-center gap-3">

          <span className="text-xl sm:text-2xl font-bold text-slate-900">Planes Parcial</span>
        </Link>

        <Link href={`/${lang}/plans`} className="text-lg font-semibold text-blue-700">
          {t.explore}
        </Link>
      </div>

      {/* key={pathname} hace que el menú se vuelva a cargar al cambiar de página,
          así se entera si el usuario acaba de iniciar sesión */}
      <UserMenu key={pathname} />
    </header>
  );
}
