'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';

interface PropertyDetailsProps {
  name: string;
  value: number;
  shares: string;
  img: string;
  sharePrice: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  city: string;
  country: string;
  bedrooms: number;
  bathrooms: number;
  pool: boolean;
  id: string;
}

const PropertyDetailsPublic: React.FC<PropertyDetailsProps> = ({ name, value, shares, img, sharePrice, monthlyIncome, monthlyExpenses, city, country, bedrooms, bathrooms, pool, id }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [address, setAddress] = useState<string | null>(null);
  const [localShares, setLocalShares] = useState(shares);
  const router = useRouter();
  const galleryImages = [
    img,
    'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
  ];

  useEffect(() => {
    const checkWallet = async () => {
      if (!window.ethereum) {
        console.log('No MetaMask detected');
        return;
      }
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          console.log('Property Page Address:', accounts[0]);
          setAddress(accounts[0]);
        }
      } catch (error) {
        console.error('Wallet check failed:', error);
      }
    };
    checkWallet();
  }, []);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  const buyWithCrypto = async () => {
    if (!window.ethereum) {
      alert('Please connect an ETH wallet in the login page!');
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const message = `I want to buy a share of ${name} with ETH (test mode)`;
      const signature = await signer.signMessage(message);
      alert(`Share purchase signed with Crypto! Signature: ${signature}`);
      const [owned, total] = localShares.split('/').map(Number);
      setLocalShares(`${owned + 1}/${total}`);
      router.push(`/property/owner/${id}`);
    } catch (error) {
      console.error('Sign failed:', error);
      alert('Failed to sign—check MetaMask!');
    }
  };

  const buyWithFiat = () => {
    if (!window.ethereum) {
      alert('Please connect an ETH wallet in the login page!');
      return;
    }
    alert('Fiat purchase initiated (mock)—redirecting to Owner Dashboard!');
    const [owned, total] = localShares.split('/').map(Number);
    setLocalShares(`${owned + 1}/${total}`);
    router.push(`/property/owner/${id}`);
  };

  return (
    <div className="bg-white text-navy p-6 rounded-lg max-w-2xl mx-auto w-full font-sans border border-gray-200">
      <div className="relative">
        <img 
          src={galleryImages[currentImageIndex]} 
          alt={name} 
          className="w-full h-64 object-cover rounded-lg mb-4 border-2 border-ochre"
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
      <h2 className="text-2xl font-bold mb-2 font-display text-navy">{name}</h2>
      <p className="text-ochre text-base mb-2">{city}, {country}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-body">
        <div className="flex flex-col">
          <p className="text-gray-600 text-lg">🛏️ Bedrooms: <span className="text-teal text-lg">{bedrooms}</span></p>
          <p className="text-gray-600 text-lg">🛁 Bathrooms: <span className="text-teal text-lg">{bathrooms}</span></p>
          <p className="text-gray-600 text-lg">🏊 Pool: <span className="text-teal text-lg">{pool ? 'Yes' : 'No'}</span></p>
          <p className="text-gray-600 text-lg">Monthly Income: <span className="text-teal text-lg">${monthlyIncome.toLocaleString()}</span></p>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-600 text-lg">Home Value: <span className="text-navy text-lg font-bold">${value.toLocaleString()}</span></p>
          <p className="text-gray-600 text-lg">Share Price: <span className="text-ochre text-lg">${sharePrice.toLocaleString()}</span></p>
          <p className="text-gray-600 text-lg">Monthly Expenses: <span className="text-navy text-lg">${monthlyExpenses.toLocaleString()}</span></p>
          <p className="text-gray-600 text-lg">Net Monthly: <span className="text-ochre text-lg">${(monthlyIncome - monthlyExpenses).toLocaleString()}</span></p>
          <p className="text-gray-600 text-lg">Shares Available: <span className="text-navy text-lg">{localShares}</span></p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {address ? (
          <>
            <button onClick={buyWithFiat} className="bg-teal text-white px-6 py-2 rounded font-bold w-full sm:w-auto font-display hover:bg-ochre">Buy with Fiat</button>
            <button onClick={buyWithCrypto} className="bg-ochre text-white px-6 py-2 rounded font-bold w-full sm:w-auto font-display hover:bg-teal">Buy with Crypto</button>
          </>
        ) : (
          <Link href="/login">
            <button className="bg-teal text-white px-6 py-2 rounded w-full sm:w-auto font-display hover:bg-ochre">Login to Invest</button>
          </Link>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <button className="bg-ochre text-white px-6 py-2 rounded w-full sm:w-auto font-display hover:bg-teal">Return Home</button>
        </Link>
        <Link href="/properties">
          <button className="bg-teal text-white px-6 py-2 rounded w-full sm:w-auto font-display hover:bg-ochre">Back to Properties</button>
        </Link>
      </div>
    </div>
  );
};
export default PropertyDetailsPublic;