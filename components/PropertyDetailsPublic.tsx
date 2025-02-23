'use client';
import Link from 'next/link';

interface PropertyDetailsProps {
  name: string;
  value: number;
  shares: string;
  img: string;
  sharePrice: number;
}

const PropertyDetailsPublic: React.FC<PropertyDetailsProps> = ({ name, value, shares, img, sharePrice }) => {
  return (
    <div className="bg-navy text-white p-6 rounded-lg max-w-2xl mx-auto w-full font-sans">
      <img src={img} alt={name} className="w-full h-64 object-cover rounded-lg mb-4 opacity-90 border-2 border-warmGray" />
      <h2 className="text-2xl font-bold mb-2 font-display">{name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-body">
        <div>
          <p className="text-warmGray text-lg">Total Value: <span className="text-teal text-2xl font-bold">${value.toLocaleString()}</span></p>
        </div>
        <div>
          <p className="text-warmGray text-lg">Share Price: <span className="text-teal text-2xl font-bold">${sharePrice.toLocaleString()}</span></p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-body">
        <div>
          <p className="text-warmGray">Shares Available: <span className="text-teal">{shares}</span></p>
        </div>
        <div></div> {/* Empty right column */}
      </div>
      <Link href="/">
        <button className="mt-4 bg-teal text-white px-6 py-2 rounded w-full sm:w-auto">Back to Properties</button>
      </Link>
    </div>
  );
};
export default PropertyDetailsPublic;