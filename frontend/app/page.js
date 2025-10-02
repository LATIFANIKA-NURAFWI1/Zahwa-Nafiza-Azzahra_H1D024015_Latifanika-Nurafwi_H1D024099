import Link from 'next/link';

export default function Page() {
  return (
    <div className="fade-in">
      <section className="text-center py-14 md:py-20">
        <h1 className="text-4xl md:text-6xl font-extrabold text-primary-dark leading-tight">
          Selamat Datang di NafasBaru
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Challenge interaktif untuk berhenti merokok dengan dukungan finansial, kesehatan, dan edukasi. Mulai langkah kecilmu hari ini.
        </p>
        <div className="mt-8">
          <Link href="/challenge" className="btn-primary">Mulai Challenge Sekarang</Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6 mt-10">
        {[
          { title: 'Challenge Tracker', desc: 'Pilih durasi 1-30 hari, pantau progres harian, raih badge.' },
          { title: 'Money Tracking', desc: 'Hitung otomatis uang yang dihemat sejak berhenti merokok.' },
          { title: 'Health Tracking', desc: 'Lihat timeline pemulihan kesehatan dan tips hidup sehat.' },
        ].map((f) => (
          <div key={f.title} className="card p-6">
            <div className="text-energy font-semibold">{f.title}</div>
            <p className="text-gray-600 mt-2">{f.desc}</p>
          </div>
        ))}
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold text-primary-dark">Berita & Edukasi</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-4">
          {[
            { title: 'WHO: Tobacco', url: 'https://www.who.int/health-topics/tobacco' },
            { title: 'Kemenkes: Bahaya Merokok', url: 'https://www.kemkes.go.id/' },
            { title: 'CDC: Smoking & Tobacco Use', url: 'https://www.cdc.gov/tobacco/' },
          ].map((n) => (
            <a key={n.url} href={n.url} target="_blank" className="card p-5 hover:shadow-md transition">
              <div className="font-semibold">{n.title}</div>
              <div className="text-sm text-gray-500 mt-1">Baca Selengkapnya →</div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
