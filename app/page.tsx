import Header from '../components/Header';
import Globe from '../components/Globe';
import PropertyCard from '../components/PropertyCard';

const properties = [
  { id: '123-solar', name: '123 Solar St, Austin, USA', value: 50000, sharePrice: 12500, shares: '2/4', img: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg' },
  { id: '456-caribe', name: '456 Caribe St, SantaMarta, COLOMBIA', value: 100000, sharePrice: 20000, shares: '1/5', img: 'https://images.pexels.com/photos/1559699/pexels-photo-1559699.jpeg' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-navy">
      <Header />
      <div className="relative h-[40vh] sm:h-[60vh]">
        <Globe />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl sm:text-5xl font-bold shadow-lg text-center">Caribbean Investments</h1>
      </div>
      <div className="container mx-auto p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {properties.map(prop => <PropertyCard key={prop.id} {...prop} />)}
      </div>
    </div>
  );
}