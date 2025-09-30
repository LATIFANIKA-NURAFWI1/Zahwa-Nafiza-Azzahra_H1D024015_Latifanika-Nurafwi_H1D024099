export const metadata = {
  title: 'NafasBaru',
  description: 'Challenge interaktif untuk berhenti merokok: finansial, kesehatan, edukasi.'
};

import './globals.css';
import './style.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="font-sans text-gray-800">
        <Header />
        <main className="container-max py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
