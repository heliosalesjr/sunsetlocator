import Head from 'next/head';
import SunsetList from './components/SunsetList';


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Sunset Tracker - Find the next sunsets in real time</title>
        <meta name="description" content="Descubra onde o sol está se pondo agora no mundo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      

      <main className="flex-grow">
        <SunsetList />
      </main>

     
    </div>
  );
}
