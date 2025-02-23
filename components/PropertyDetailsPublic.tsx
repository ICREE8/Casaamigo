'use client';
import Link from 'next/link';

interface PropertyDetailsProps {
  name: string;
  value: number;
  shares: string;
  img: string;
}

const PropertyDetailsPublic: React.FC<PropertyDetailsProps> = ({ name, value, shares, img }) => {
  return (
    <div className="bg-navy text-white p-6 rounded-lg max-w-2xl mx-auto w-full font-sans">
      <img src={img} alt={name} className="w-full h-64 object-cover rounded-lg mb-4 opacity-90 border-2 border-warmGray" />
      <h2 className="text-2xl font-bold mb-2 font-display">{name}</h2>
      <p className="text-warmGray">Total Value: <span className="text-teal">${value.toLocaleString()}</span></p>
      <p className="text-warmGray">Shares Available: <span className="text-warmGray">{shares}</span></p>
      <Link href="/">
        <button className="mt-4 bg-teal text-white px-6 py-2 rounded w-full sm:w-auto">Back to Properties</button>
      </Link>
    </div>
  );
};
export default PropertyDetailsPublic;