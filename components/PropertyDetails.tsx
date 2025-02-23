'use client';
import Link from 'next/link';

interface PropertyDetailsProps {
  name: string;
  value: number;
  sharePrice: number;
  shares: string;
  img: string;
  monthlyIncome: number;
  monthlyExpenses: number;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ name, value, sharePrice, shares, img, monthlyIncome, monthlyExpenses }) => {
  return (
    <div className="bg-navy text-white p-6 rounded-lg max-w-2xl mx-auto w-full font-sans">
      <img src={img} alt={name} className="w-full h-64 object-cover rounded-lg mb-4 opacity-90 border-2 border-warmGray" />
      <h2 className="text-2xl font-bold mb-2 font-display">{name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-body">
        <div>
          <p className="text-warmGray">Total Value: <span className="text-teal">${value.toLocaleString()}</span></p>
          <p className="text-warmGray">Share Price: <span className="text-teal">${sharePrice.toLocaleString()}</span></p>
          <p className="text-warmGray">Shares Available: <span className="text-warmGray">{shares}</span></p>
          <p className="text-warmGray">Your Shares: <span className="text-warmGray">{shares.split('/')[0]}/{shares.split('/')[1]} ({(parseInt(shares.split('/')[0]) / parseInt(shares.split('/')[1]) * 100).toFixed(0)}%)</span></p>
        </div>
        <div>
          <p className="text-warmGray">Monthly Income: <span className="text-teal">${monthlyIncome.toLocaleString()}</span></p>
          <p className="text-warmGray">Monthly Expenses: <span className="text-charcoal">${monthlyExpenses.toLocaleString()}</span></p>
          <p className="text-warmGray">Net Monthly: <span className="text-teal">${(monthlyIncome - monthlyExpenses).toLocaleString()}</span></p>
          <p className="text-warmGray">Est. ROI: <span className="text-teal">{(((monthlyIncome - monthlyExpenses) * 12) / value * 100).toFixed(1)}%</span></p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-body">
        <p className="text-warmGray">Rented: <span className="text-teal">Yes, since Jan 2025</span></p>
        <p className="text-warmGray">Maintenance: <span className="text-charcoal">Roof repair, $200, due Mar 2025</span></p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <button className="bg-teal text-white px-6 py-2 rounded w-full sm:w-auto">Pay with USD</button>
        <button className="bg-teal text-white px-6 py-2 rounded w-full sm:w-auto">Connect Wallet</button>
        <button className="bg-ochre text-navy px-6 py-2 rounded font-bold w-full sm:w-auto font-display">Invest</button>
      </div>
      <Link href="/">
        <button className="mt-4 bg-teal text-white px-6 py-2 rounded w-full sm:w-auto">Back to Properties</button>
      </Link>
    </div>
  );
};
export default PropertyDetails;