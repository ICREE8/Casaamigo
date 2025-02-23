import Header from '../components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-navy font-body">
      <Header />
      <div className="relative h-[40vh] sm:h-[60vh] bg-navy flex items-center justify-center text-center">
        <div>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4">Caribbean Investments</h1>
          <p className="text-warmGray text-lg sm:text-xl max-w-2xl mx-auto">Own a slice of paradise with Casaamigo—fractional real estate, powered by innovation.</p>
        </div>
      </div>
      <div className="container mx-auto p-5 text-center">
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/login">
            <button className="bg-teal text-white px-6 py-3 rounded text-lg font-display w-full sm:w-auto">Login</button>
          </Link>
          <Link href="/properties">
            <button className="bg-ochre text-white px-6 py-3 rounded text-lg font-display w-full sm:w-auto">Check Properties</button>
          </Link>
        </div>
      </div>
    </div>
  );
}