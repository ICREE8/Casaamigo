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
        } else {
          console.log('No accounts connected');
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
      <div className="min-h-screen bg-white text-navy font-body flex items-center justify-center p-5">
        <div className="bg-white text-navy p-6 rounded-lg max-w-md w-full font-sans text-center border border-gray-200">
          <h1 className="text-3xl font-display font-bold mb-4">Please Connect Wallet</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Link href="/login">
            <button className="bg-teal text-white px-6 py-2 rounded w-full font-display hover:bg-ochre">Go to Login</button>
          </Link>
        </div>
      </div>
    );
  }

  const ownedProperties = properties.filter(prop => 
    address.toLowerCase() === '0x8bdb4d532736ff2092b6b1789354f515ec0ac650'.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-white text-navy font-body">
      <Header />
      <div className="container mx-auto p-5 pt-20">
        <h1 className="text-3xl font-display font-bold text-center mb-6">Your Properties</h1>
        <p className="text-center text-gray-600 mb-4">Connected: {address.slice(0, 6)}...{address.slice(-4)}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {ownedProperties.length > 0 ? (
            ownedProperties.map(prop => (
              <Link key={prop.id} href={`/property/owner/${prop.id}`}>
                <div className="bg-white text-navy p-4 rounded-lg flex flex-col h-full cursor-pointer hover:shadow-lg transition-shadow border border-gray-200">
                  <img src={prop.img} alt={prop.name} className="w-full h-48 object-cover rounded-lg mb-4 border-2 border-ochre" />
                  <div className="flex-1">
                    <h2 className="text-xl font-display font-bold mb-2 flex justify-between items-center">
                      <span>{prop.name}</span>
                      <span className="text-navy text-lg font-bold">${prop.value.toLocaleString()}</span>
                    </h2>
                    <p className="text-ochre text-base mb-2">{prop.city}, {prop.country}</p>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex flex-col">
                        <p className="text-gray-600 text-base">Share Price: <span className="text-ochre text-lg">${prop.sharePrice.toLocaleString()}</span></p>
                        <p className="text-gray-600 text-base">Shares: <span className="text-teal">{prop.shares}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-600">No properties owned yet. Start investing!</p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={disconnectWallet} className="bg-teal text-white px-4 py-1 rounded text-sm font-display hover:bg-ochre w-full sm:w-auto">Disconnect Wallet</button>
          <Link href="/">
            <button className="bg-ochre text-white px-4 py-1 rounded text-sm font-display hover:bg-teal w-full sm:w-auto">Return Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}