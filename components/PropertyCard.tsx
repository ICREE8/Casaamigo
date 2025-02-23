'use client';
import Link from 'next/link';

interface PropertyCardProps {
  id: string;
  name: string;
  value: number;
  sharePrice: number;
  shares: string;
  img: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ id, name, value, sharePrice, shares, img }) => {
  return (
    <Link href={`/property/${id}`}>
      <div className="bg-navy text-white rounded-lg w-full max-w-md cursor-pointer hover:scale-105 transition-transform mx-auto">
        <div className="relative">
          <img src={img} alt={name} className="w-full h-32 sm:h-48 object-cover rounded-t-lg opacity-90 border-2 border-warmGray" />
          <div className="absolute bottom-0 left-0 bg-charcoal text-white p-1 text-sm">Property</div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">{name}</h3>
          <p className="text-warmGray text-sm">Value: ${value.toLocaleString()}</p>
          <p className="text-warmGray text-sm">Share: ${sharePrice.toLocaleString()}</p>
        </div>
      </div>
    </Link>
  );
};
export default PropertyCard;