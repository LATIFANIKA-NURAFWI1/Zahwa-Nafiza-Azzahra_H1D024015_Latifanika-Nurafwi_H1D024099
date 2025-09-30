"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { href: '/', label: 'Beranda' },
  { href: '/features', label: 'Fitur' },
  { href: '/challenge', label: 'Challenge' },
  { href: '/news', label: 'Berita' },
  { href: '/contact', label: 'Kontak' },
  { href: '/auth', label: 'Masuk' },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-50 border-b">
      <div className="container-max flex items-center justify-between py-3 relative header-inner">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-primary-light grid place-items-center text-white font-bold">N</div>
          <span className="text-xl font-semibold text-primary-dark">NafasBaru</span>
        </Link>

        {/* Mobile hamburger (CSS-only) */}
        <input id="nav-toggle" type="checkbox" className="nav-toggle sr-only" aria-label="Toggle navigation" />
        <label htmlFor="nav-toggle" className="hamburger md:hidden" aria-controls="primary-navigation" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </label>

        <nav id="primary-navigation" className="nav-menu hidden md:flex items-center gap-4 text-sm">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`px-3 py-2 rounded-md hover:bg-gray-100 ${pathname===n.href? 'text-energy font-semibold' : 'text-gray-700'}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

