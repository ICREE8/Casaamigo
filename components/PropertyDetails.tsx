'use client';
import Link from 'next/link';
import { useState } from 'react';

interface PropertyDetailsProps {
  name: string;
  value: number;
  sharePrice: number;
  shares: string;
  img: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  city: string;
  country: string;
  bedrooms: number;
  bathrooms: number;
  pool: boolean;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ name, value, sharePrice, shares, img, monthlyIncome, monthlyExpenses, city, country, bedrooms, bathrooms, pool }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const galleryImages = [
    img,
    'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
  ];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  return (
    <div className="bg-navy text-white p-6 rounded-lg max-w-2xl mx-auto w-full font-sans">
      <div className="relative">
        <img 
          src={galleryImages[currentImageIndex]} 
          alt={name} 
          className="w-full h-64 object-cover rounded-lg mb-4 opacity-90 border-2 border-warmGray"
        />
        <button 
          onClick={prevImage} 
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-teal text-white p-2 rounded-full hover:bg-ochre"
        >
          ←
        </button>
        <button 
          onClick={nextImage} 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal text-white p-2 rounded-full hover:bg-ochre"
        >
          →
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-2 font-display">{name}</h2>
      <p className="text-warmGray text-base mb-2">{city}, {country}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-body">
        <div className="flex flex-col">
          <p className="text-warmGray text-lg">Bedrooms: <span className="text-teal text-lg">{bedrooms}</span></p>
          <p className="text-warmGray text-lg">Bathrooms: <span className="text-teal text-lg">{bathrooms}</span></p>
          <p className="text-warmGray text-lg">Pool: <span className="text-teal text-lg">{pool ? 'Yes' : 'No'}</span></p>
          <p className="text-warmGray text-lg">Monthly Income: <span className="text-teal text-lg">${monthlyIncome.toLocaleString()}</span></p>
          <p className="text-warmGray text-lg">Your Shares: <span className="text-teal text-lg">{shares.split('/')[0]}/{shares.split('/')[1]} ({(parseInt(shares.split('/')[0]) / parseInt(shares.split('/')[1]) * 100).toFixed(0)}%)</span></p>
        </div>
        <div className="flex flex-col">
          <p className="text-warmGray text-lg">Home Value: <span className="text-white text-lg font-bold">${value.toLocaleString()}</span></p>
          <p className="text-warmGray text-lg">Share Price: <span className="text-ochre text-lg">${sharePrice.toLocaleString()}</span></p>
          <p className="text-warmGray text-lg">Monthly Expenses: <span className="text-white text-lg">${monthlyExpenses.toLocaleString()}</span></p>
          <p className="text-warmGray text-lg">Net Monthly: <span className="text-ochre text-lg">${(monthlyIncome - monthlyExpenses).toLocaleString()}</span></p>
          <p className="text-warmGray text-lg">Shares Available: <span className="text-white text-lg">{shares}</span></p>
          <p className="text-warmGray text-lg">Est. ROI: <span className="text-teal text-lg">{(((monthlyIncome - monthlyExpenses) * 12) / value * 100).toFixed(1)}%</span></p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-body">
        <p className="text-warmGray text-lg">Rented: <span className="text-teal text-lg">Yes, since Jan 2025</span></p>
        <p className="text-warmGray text-lg">Maintenance: <span className="text-charcoal text-lg">Roof repair, $200, du