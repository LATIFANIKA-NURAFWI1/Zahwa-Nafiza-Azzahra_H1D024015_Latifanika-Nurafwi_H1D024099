export default function Footer() {
  return (
    <footer className="mt-10 border-t bg-cream">
      <div className="container-max py-8 text-sm text-gray-600 grid gap-4 md:grid-cols-3">
        <div>
          <div className="text-primary-dark font-semibold mb-2">NafasBaru</div>
          <p>Mendukung kamu berhenti merokok melalui challenge yang sederhana, edukatif, dan bermakna.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Kontak</div>
          <p>Email: support@nafasbaru.app</p>
          <p>Instagram: @nafasbaru</p>
          <p className="mt-2 text-xs text-gray-500">Disclaimer: Informasi di situs ini bersifat edukasi dan bukan pengganti nasihat medis profesional.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Sumber</div>
          <ul className="list-disc ml-5 space-y-1">
            <li><a className="text-primary-dark hover:underline" href="https://www.who.int/" target="_blank">WHO</a></li>
            <li><a className="text-primary-dark hover:underline" href="https://www.kemkes.go.id/" target="_blank">Kemenkes</a></li>
            <li><a className="text-primary-dark hover:underline" href="https://www.cdc.gov/tobacco/" target="_blank">CDC Tobacco</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 py-4">© {new Date().getFullYear()} NafasBaru</div>
    </footer>
  );
}
