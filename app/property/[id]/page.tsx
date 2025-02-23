'use client';
import { useContext } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import PropertyDetailsPublic from '../../../components/PropertyDetailsPublic';
import { ThemeContext } from '../../../context/ThemeContext';

const properties = {
  '123-solar': { name: '123 Solar St', city: 'Santa Marta', country: 'Colombia', value: 50000, sharePrice: 12500, shares: '2/4', img: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg', monthlyIncome: 1200, monthlyExpenses: 400, bedrooms: 3, bathrooms: 2, pool: true },
  '456-caribe': { name: '456 Caribe St', city: 'Medellin', country: 'Colombia', value: 100000, sharePrice: 20000, shares: '1/5', img: 'https://images.pexels.com/photos/1559699/pexels-photo-1559699.jpeg', monthlyIncome: 2500, monthlyExpenses: 800, bedrooms: 4, bathrooms: 3, pool: false },
  '789-margarita': { name: '789 Playa El Agua', city: 'Isla de Margarita', country: 'Venezuela', value: 75000, sharePrice: 15000, shares: '3/5', img: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg', monthlyIncome: 1800, monthlyExpenses: 600, bedrooms: 2, bathrooms: 2, pool: true },
  '101-tucacas': { name: '101 Coral Reef', city: 'Tucacas', country: 'Venezuela', value: 60000, sharePrice: 12000, shares: '1/4', img: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg', monthlyIncome: 1500, monthlyExpenses: 500, bedrooms: 3, bathrooms: 1, pool: false },
  '112-merida': { name: '112 Sierra Vista', city: 'Merida', country: 'Venezuela', value: 80000, sharePrice: 16000, shares: '2/5', img: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg', monthlyIncome: 2000, monthlyExpenses: 700, bedrooms: 4, bathrooms: 3, pool: true },
  '131-cuyagua': { name: '131 Surf Haven', city: 'Cuyagua', country: 'Venezuela', value: 65000, sharePrice: 13000, shares: '3/4', img: 'https://images.pexels.com/photos/1559699/pexels-photo-1559699.jpeg', monthlyIncome: 1600, monthlyExpenses: 550, bedrooms: 2, bathrooms: 2, pool: false },
};

export default function PropertyPage() {
  const { id } = useParams() || {};
  const { theme } = useContext(ThemeContext);
  const property = id && properties[id as keyof typeof properties];

  if (!property) return <div>Loading...</div>;

  return (
    <div className={`${theme === 'light' ? 'bg-white text-navy' : 'bg-navy text-white'} min-h-screen font-body`}>
      <Header />
      <div className="container mx-auto p-5 pt-20">
        <PropertyDetailsPublic {...property} />
      </div>
    </div>
  );
}