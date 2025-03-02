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
    <div className="card">
      <div className="relative">
        <img 
          src={galleryImages[currentImageIndex]} 
          alt={name} 
          className="w-full h-64 object-cover rounded-lg mb-4 border-2 border-[var(--accent-color)]"
        />
        <button 
          onClick={prevImage} 
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[var(--secondary-color)] text-white p-2 rounded-full hover:bg-[var(--dark-accent)]"
        >
          ←
        </button>
        <button 
          onClick={nextImage} 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[var(--secondary-color)] text-white p-2 rounded-full hover:bg-[var(--dark-accent)]"
        >
          →
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <p className="text-accent text-base mb-2">{city}, {country}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <p>🛏️ Bedrooms: <span className="text-[var(--primary-color)] text-lg">{bedrooms}</span></p>
          <p>🛁 Bathrooms: <span className="text-[var(--primary-color)] text-lg">{bathrooms}</span></p>
          <p>🏊 Pool: <span className="text-[var(--primary-color)] text-lg">{pool ? 'Yes' : 'No'}</span></p>
          <p>Monthly Income: <span className="text-[var(--primary-color)] text-lg">${monthlyIncome.toLocaleString()}</span></p>
        </div>
        <div className="flex flex-col">
          <p>Home Value: <span className="text-[var(--text-color)] text-lg font-bold">${value.toLocaleString()}</span></p>
          <p>Share Price: <span className="text-accent text-lg">${sharePrice.toLocaleString()}</span></p>
          <p>Monthly Expenses: <span className="text-[var(--text-color)] text-lg">${monthlyExpenses.toLocaleString()}</span></p>
          <p>Net Monthly: <span className="text-accent text-lg">${(monthlyIncome - monthlyExpenses).toLocaleString()}</span></p>
          <p>Shares Available: <span className="text-[var(--text-color)] text-lg">{localShares}</span></p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {address ? (
          <>
            <button onClick={buyWithFiat} className="btn-secondary w-full sm:w-auto">Buy with Fiat</button>
            <button onClick={buyWithCrypto} className="btn-primary w-full sm:w-auto">Buy with Crypto</button>
          </>
        ) : (
          <Link href="/login">
            <button className="btn-secondary w-full sm:w-auto">Login to Invest</button>
          </Link>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <button className="btn-primary w-full sm:w-auto">Return Home</button>
        </Link>
        <Link href="/properties">
          <button className="btn-secondary w-full sm:w-auto">Back to Properties</button>
        </Link>
      </div>
    </div>
  );
};
export default PropertyDetailsPublic;