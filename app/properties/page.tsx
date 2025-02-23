import Header from '../../components/Header';
import Link from 'next/link';

const properties = [
  { id: '123-solar', name: '123 Solar St, Austin, USA', lat: 30.2672, lng: -97.7431, value: 50000, shares: '2/4' },
  { id: '456-caribe', name: '456 Caribe St, SantaMarta, COLOMBIA', lat: 11.2404, lng: -74.2110, value: 100000, shares: '1/5' },
];

export default function Properties() {
  return (
    <div className="min-h-screen bg-white text-navy font-body">
      <Header />
      <div className="container mx-auto p-5 pt-20">
        <h1 className="text-3xl font-display font-bold text-center mb-6">Available Properties</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {properties.map(prop => (
            <Link key={prop.id} href={`/property/${prop.id}`}>
              <div className="bg-navy text-white p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform">
                <h2 className="text-xl font-display font-bold">{prop.name}</h2>
                <p className="text-warmGray">Value: ${prop.value.toLocaleString()}</p>
                <p className="text-warmGray">Shares: {prop.shares}</p>
              </div>
            </Link>
          ))}
        </div>
        <p className="text-center mt-6 text-warmGray">Map coming soon—explore Caribbean properties interactively!</p>
      </div>
    </div>
  );
}