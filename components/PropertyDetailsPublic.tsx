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
    <div className="card max-w-2xl mx-auto">
      <div className="relative">
        <img 
          src={galleryImages[currentImageIndex]} 
          alt={name} 
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <button 
          onClick={prevImage} 
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[var(--airbnb-red)] text-[var(--airbnb-white)] p-2 rounded-full hover:bg-[#E00B41]"
        >
          ←
        </button>
        <button 
          onClick={nextImage} 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[var(--airbnb-red)] text-[var(--airbnb-white)] p-2 rounded-full hover:bg-[#E00B41]"
        >
          →
        </button>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{name}</h2>
        <p className="text-muted text-base mb-4">{city}, {country}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-muted">🛏️ Bedrooms: <span className="font-medium">{bedrooms}</span></p>
            <p className="text-muted">🛁 Bathrooms: <span className="font-medium">{bathrooms}</span></p>
            <p className="text-muted">🏊 Pool: <span className="font-medium">{pool ? 'Yes' : 'No'}</span></p>
            <p className="text-muted">Monthly Income: <span className="font-medium">${monthlyIncome.toLocaleString()}</span></p>
          </div>
          <div>
            <p className="text-muted">Home Value: <span className="font-bold">${value.toLocaleString()}</span></p>
            <p className="text-muted">Share Price: <span className="font-medium">${sharePrice.toLocaleString()}</span></p>
            <p className="text-muted">Monthly Expenses: <span className="font-medium">${monthlyExpenses.toLocaleString()}</span></p>
            <p className="text-muted">Net Monthly: <span className="font-medium">${(monthlyIncome - monthlyExpenses).toLocaleString()}</span></p>
            <p className="text-muted">Shares Available: <span className="font-medium">{localShares}</span></p>
          </div>
        </div>
        <div className="flex gap-4">
          {address ? (
            <>
              <button onClick={buyWithFiat} className="btn-secondary flex-1">Buy with Fiat</button>
              <button onClick={buyWithCrypto} className="btn-primary flex-1">Buy with Crypto</button>
            </>
          ) : (
            <Link href="/login" className="w-full">
              <button className="btn-primary w-full">Login to Invest</button>
            </Link>
          )}
        </div>
        <div className="flex gap-4 mt-4">
          <Link href="/" className="flex-1">
            <button className="btn-secondary w-full">Return Home</button>
          </Link>
          <Link href="/properties" className="flex-1">
            <button className="btn-secondary w-full">Back to Properties</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default PropertyDetailsPublic;