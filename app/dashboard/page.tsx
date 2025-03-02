'use client';
import Header from '../../components/Header';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const properties = [
  { id: '123-solar', name: '123 Solar St', city: 'Austin', country: 'USA', value: 50000, sharePrice: 12500, shares: '2/4', img: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg' },
  { id: '456-santa', name: '456 Solar St', city: 'Santa Marta', country: 'Colombia', value: 100000, sharePrice: 20000, shares: '1/5', img: 'https://images.pexels.com/photos/1559699/pexels-photo-1559699.jpeg' },
];

export default function Dashboard() {
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkWallet = async () => {
      if (!window.ethereum) {
        setError('No MetaMask detected—please install!');
        return;
      }
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          console.log('Dashboard Wallet Address:', accounts[0]);
          setAddress(accounts[0]);
        }
      } catch (error) {
        console.error('Wallet check failed:', error);
        setError('Failed to load wallet—check MetaMask!');
      }
    };
    checkWallet();
  }, []);

  const disconnectWallet = () => {
    setAddress(null);
    setError(null);
  };

  if (!address) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5">
        <div className="bg-[var(--airbnb-white)] text-[var(--airbnb-charcoal)] p-6 rounded-lg max-w-md w-full text-center border border-[var(--airbnb-grey)]">
          <h1 className="text-2xl font-bold mb-4">Please Connect Wallet</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Link href="/login">
            <button className="btn-primary w-full">Go to Login</button>
          </Link>
        </div>
      </div>
    );
  }

  const ownedProperties = properties.filter(prop => 
    address.toLowerCase() === '0x8bdb4d532736ff2092b6b1789354f515ec0ac650'.toLowerCase()
  );

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto p-5 pt-20">
        <h1 className="text-2xl font-bold text-center mb-6">Your Properties</h1>
        <p className="text-center text-muted mb-4">Connected: {address.slice(0, 6)}...{address.slice(-4)}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {ownedProperties.length > 0 ? (
            ownedProperties.map(prop => (
              <Link key={prop.id} href={`/property/owner/${prop.id}`}>
                <div className="card flex flex-col h-full cursor-pointer">
                  <img src={prop.img} alt={prop.name} className="w-full h-48 object-cover rounded-t-lg" />
                  <div className="p-4 flex-1">
                    <h2 className="text-lg font-bold mb-1">{prop.name}</h2>
                    <p className="text-muted text-sm mb-1">{prop.city}, {prop.country}</p>
                    <p className="text-muted text-sm">Share Price: ${prop.sharePrice.toLocaleString()}</p>
                    <p className="text-muted text-sm">Shares: {prop.shares}</p>
                    <p className="font-bold mt-2">${prop.value.toLocaleString()}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-muted">No properties owned yet. Start investing!</p>
          )}
        </div>
        <div className="flex justify-center gap-4">
          <button onClick={disconnectWallet} className="btn-secondary text-sm">Disconnect Wallet</button>
          <Link href="/">
            <button className="btn-primary text-sm">Return Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}