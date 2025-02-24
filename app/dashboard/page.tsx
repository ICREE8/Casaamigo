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
          console.log('Dashboard Wallet Address:', accounts[0]);
          setAddress(accounts[0]);
        }
      } catch (error) {
        console.error('Wallet check failed:', error);
      }
    };
    checkWallet();
  }, []);

  if (!address) {
    return (
      <div className="min-h-screen bg-white text-navy font-body flex items-center justify-center p-5">
        <div className="bg-navy text-white p-6 rounded-lg max-w-md w-full font-sans text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Please Connect Wallet</h1>
          <Link href="/login">
            <button className="bg-teal text-white px-6 py-2 rounded w-full">Go to Login</button>
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
        <Link href="/" className="block text-center mb-4">
          <button className="bg-ochre text-white px-6 py-2 rounded w-full sm:w-auto">Return Home</button>
        </Link>
        <button onClick={() => setAddress(null)} className="bg-teal text-white px-6 py-2 rounded w-full sm:w-auto mb-4 mx-auto block">Disconnect Wallet</button>
        <h1 className="text-3xl font-display font-bold text-center mb-6">Your Properties</h1>
        <p className="text-center text-warmGray mb-4">Connected: {address.slice(0, 6)}...{address.slice(-4)}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ownedProperties.length > 0 ? (
            ownedProperties.map(prop => (
              <Link key={prop.id} href={`/property/owner/${prop.id}`}>
                <div className="bg-navy text-white p-4 rounded-lg flex flex-col h-full cursor-pointer hover:shadow-lg transition-shadow">
                  <img src={prop.img} alt={prop.name} className="w-full h-48 object-cover rounded-lg mb-4 opacity-90 border-2 border-warmGray" />
                  <div className="flex-1">
                    <h2 className="text-xl font-display font-bold mb-2 flex justify-between items-center">
                      <span>{prop.name}</span>
                      <span className="text-white text-lg font-bold">${prop.value.toLocaleString()}</span>
                    </h2>
                    <p className="text-ochre text-base mb-2">{prop.city}, {prop.country}</p>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex flex-col">
                        <p className="text-warmGray text-base">Share Price: <span className="text-ochre text-lg">${prop.sharePrice.toLocaleString()}</span></p>
                        <p className="text-warmGray text-base">Shares: <span className="text-teal">{prop.shares}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-warmGray">No properties owned yet. Start investing!</p>
          )}
        </div>
      </div>
    </div>
  );
}