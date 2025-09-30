export default function ContactPage() {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-primary-dark">Kontak</h1>
      <p className="text-gray-600 mt-1">Hubungi kami dan ikuti sosial media.</p>
      <div className="card p-6 mt-6">
        <p>Email: <a className="text-primary-dark" href="mailto:support@nafasbaru.app">support@nafasbaru.app</a></p>
        <p>Instagram: <a className="text-primary-dark" href="https://instagram.com/nafasbaru" target="_blank">@nafasbaru</a></p>
        <p className="text-xs text-gray-500 mt-4">Disclaimer: Informasi di situs ini bersifat edukasi dan bukan pengganti nasihat medis profesional.</p>
      </div>
    </div>
  );
}
