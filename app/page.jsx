import Head from 'next/head';
import SunsetList from './components/SunsetList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-100 to-blue-100">
      <Head>
        <title>Sunset Locator - Find the next sunsets in real time</title>
        <meta name="description" content="Descubra onde o sol está se pondo agora no mundo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex-grow">
        <SunsetList />
      </main>

      <Footer />
    </div>
  );
}
