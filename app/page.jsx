import SunsetList from './components/SunsetList';

export const metadata = {
  title: 'Sunset Tracker - Find the next sunsets in real time',
  description: 'Descubra onde o sol está se pondo agora no mundo',
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <SunsetList />
      </main>
    </div>
  );
}