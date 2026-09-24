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
    <header className="flex justify-between items-center bg-white border-b border-slate-200 px-24 py-4">
      <div className="flex items-center gap-12">
        <Link href={`/${lang}`} className="flex items-center gap-3">

          <span className="text-2xl font-bold text-slate-900">Planes Parcial</span>
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
