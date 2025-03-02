'use client';
import Header from '../../../../components/Header';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useParams } from 'next/navigation';

const properties = [
  {
    id: '123-solar',
    name: '123 Solar St',
    city: 'Austin',
    country: 'USA',
    value: 50000,
    sharePrice: 12500,
    shares: '2/4',
    img: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg',
    bedrooms: 3,
    bathrooms: 2,
    pool: true,
    monthlyIncome: 1200,
    monthlyExpenses: 400,
    owners: ['vitalik.eth', 'elonmusk.eth', '0x8bDb4D532736ff2092B6b1789354f515ec0Ac650'],
    propertyTaxes: 1500,
    zipcode: '78701',
    squareMeters: 150,
    yearBuilt: 2015,
    listingDate: '2025-01-15',
    lastRenovation: '2023-06-10',
  },
  {
    id: '456-santa',
    name: '456 Solar St',
    city: 'Santa Marta',
    country: 'Colombia',
    value: 100000,
    sharePrice: 20000,
    shares: '1/5',
    img: 'https://images.pexels.com/photos/1559699/pexels-photo-1559699.jpeg',
    bedrooms: 4,
    bathrooms: 3,
    pool: false,
    monthlyIncome: 2500,
    monthlyExpenses: 800,
    owners: ['satoshi.eth', '0x8bDb4D532736ff2092B6b1789354f515ec0Ac650'],
    propertyTaxes: 2000,
    zipcode: '470001',
    squareMeters: 200,
    yearBuilt: 2018,
    listingDate: '2025-02-01',
    lastRenovation: '2024-01-20',
  },
];

export default function OwnerPropertyDashboard() {
  const { id } = useParams();
  const [address, setAddress] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [proposal, setProposal] = useState('');
  const property = properties.find(prop => prop.id === id);

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
          console.log('Owner Dashboard Wallet Address:', accounts[0]);
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
      <div className="min-h-screen flex items-center justify-center p-5">
        <div className="bg-[var(--background-color)] text-[var(--text-color)] p-6 rounded-lg max-w-md w-full text-center border border-[var(--dark-accent)]">
          <h1 className="text-3xl font-bold mb-4">Please Connect Wallet</h1>
          <Link href="/login">
            <button className="btn-secondary w-full">Go to Login</button>
          </Link>
        </div>
      </div>
    );
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % property.img.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + property.img.length) % property.img.length);

  const mockProposals = [
    { id: 1, text: 'Add a Rooftop Deck', votes: { 'vitalik.eth': 'Yes', 'elonmusk.eth': 'No', [address]: null } },
    { id: 2, text: 'Upgrade Kitchen Appliances', votes: { 'vitalik.eth': 'Yes', 'elonmusk.eth': 'Yes', [address]: null } },
  ];

  const submitProposal = () => {
    if (proposal.trim()) {
      alert(`Proposal Submitted: "${proposal}" - Voting mock pending!`);
      setProposal('');
    } else {
      alert('Please enter a proposal!');
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto p-5 pt-20">
        <div className="card">
          <div className="relative">
            <img 
              src={property.img} 
              alt={property.name} 
              className="w-full h-64 object-cover rounded-lg mb-4 border-2 border-[var(--accent-color)]"
            />
          </div>
          <h2 className="text-2xl font-bold mb-2">{property.name}</h2>
          <p className="text-accent text-base mb-2">{property.city}, {property.country}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <p>🛏️ Bedrooms: <span className="text-[var(--primary-color)] text-lg">{property.bedrooms}</span></p>
              <p>🛁 Bathrooms: <span className="text-[var(--primary-color)] text-lg">{property.bathrooms}</span></p>
              <p>🏊 Pool: <span className="text-[var(--primary-color)] text-lg">{property.pool ? 'Yes' : 'No'}</span></p>
              <p>Monthly Income: <span className="text-[var(--primary-color)] text-lg">${property.monthlyIncome.toLocaleString()}</span></p>
              <p>Square Meters: <span className="text-[var(--primary-color)] text-lg">{property.squareMeters} m²</span></p>
              <p>Year Built: <span className="text-[var(--primary-color)] text-lg">{property.yearBuilt}</span></p>
            </div>
            <div className="flex flex-col">
              <p>Home Value: <span className="text-[var(--text-color)] text-lg font-bold">${property.value.toLocaleString()}</span></p>
              <p>Share Price: <span className="text-accent text-lg">${property.sharePrice.toLocaleString()}</span></p>
              <p>Monthly Expenses: <span className="text-[var(--text-color)] text-lg">${property.monthlyExpenses.toLocaleString()}</span></p>
              <p>Net Monthly: <span className="text-accent text-lg">${(property.monthlyIncome - property.monthlyExpenses).toLocaleString()}</span></p>
              <p>Property Taxes: <span className="text-[var(--primary-color)] text-lg">${property.propertyTaxes.toLocaleString()} /yr</span></p>
              <p>Zipcode: <span className="text-[var(--primary-color)] text-lg">{property.zipcode}</span></p>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">👥 Owners</h3>
            <ul className="list-disc pl-5">
              {property.owners.map((owner, index) => (
                <li key={index} className="text-[var(--primary-color)]">{owner}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Additional Details</h3>
            <p>Listing Date: <span className="text-[var(--primary-color)]">{property.listingDate}</span></p>
            <p>Last Renovation: <span className="text-[var(--primary-color)]">{property.lastRenovation}</span></p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Proposed Updates</h3>
            {mockProposals.length > 0 ? (
              <ul className="list-disc pl-5">
                {mockProposals.map(proposal => (
                  <li key={proposal.id}>
                    {proposal.text} - Votes: 
                    <span className="text-[var(--primary-color)]"> Vitalik: {proposal.votes['vitalik.eth']}, Elon: {proposal.votes['elonmusk.eth'] || 'N/A'}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No proposals yet.</p>
            )}
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Propose an Update or Remodel</h3>
            <p className="mb-2">Have an idea to improve {property.name}? Suggest it below to vote with other owners!</p>
            <textarea
              className="w-full p-2 border border-[var(--secondary-color)] rounded-lg text-[var(--text-color)] bg-[var(--background-color)] focus:outline-none focus:border-[var(--accent-color)]"
              rows={4}
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              placeholder="E.g., Add a rooftop deck, upgrade kitchen appliances..."
            />
            <button onClick={submitProposal} className="mt-2 btn-primary w-full sm:w-auto">Submit for Voting</button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard">
              <button className="btn-secondary w-full sm:w-auto">Back to Dashboard</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}