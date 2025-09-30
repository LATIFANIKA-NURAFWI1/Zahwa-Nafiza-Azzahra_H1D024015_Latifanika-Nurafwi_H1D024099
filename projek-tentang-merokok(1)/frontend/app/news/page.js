const NEWS = [
  { title: 'WHO: Tobacco', url: 'https://www.who.int/health-topics/tobacco', source: 'WHO' },
  { title: 'Kemenkes: Bahaya Merokok', url: 'https://www.kemkes.go.id/', source: 'Kemenkes' },
  { title: 'CDC: Smoking & Tobacco Use', url: 'https://www.cdc.gov/tobacco/', source: 'CDC' },
  { title: 'The Lancet - Tobacco Control', url: 'https://www.thelancet.com/journals/lancet/special-issues/tobacco-control', source: 'The Lancet' }
];

export default function NewsPage() {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-primary-dark">Berita & Edukasi</h1>
      <p className="text-gray-600 mt-1">Sumber terpercaya tentang kesehatan dan bahaya merokok.</p>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {NEWS.map((n) => (
          <a key={n.url} href={n.url} target="_blank" className="card p-5 hover:shadow-md transition">
            <div className="text-energy font-semibold">{n.title}</div>
            <div className="text-sm text-gray-500">{n.source}</div>
            <div className="text-sm text-primary-dark mt-2">Baca Selengkapnya →</div>
          </a>
        ))}
      </div>
    </div>
  );
}
