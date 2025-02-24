'use client';
import { useContext } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import PropertyDetailsPublic from '../../../components/PropertyDetailsPublic';
import { ThemeContext } from '../../../context/ThemeContext';

const properties = {
  '123-solar': {
    id: '123-solar',
    name: '123 Solar St',
    city: 'Austin',
    country: 'USA',
    value: 50000,
    sharePrice: 12500,
    shares: '2/4',
    img: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg',
    monthlyIncome: 1200,
    monthlyExpenses: 400,
    bedrooms: 3,
    bathrooms: 2,
    pool: true,
  },
  '456-santa': {
    id: '456-santa',
    name: '456 Solar St',
    city: 'Santa Marta',
    country: 'Colombia',
    value: 100000,
    sharePrice: 20000,
    shares: '1/5',
    img: 'https://images.pexels.com/photos/1559699/pexels-photo-1559699.jpeg',
    monthlyIncome: 2500,
    monthlyExpenses: 800,
    bedrooms: 4,
    bathrooms: 3,
    pool: false,
  },
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