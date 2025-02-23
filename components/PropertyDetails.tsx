'use client';
interface PropertyDetailsProps {
  name: string;
  value: number;
  sharePrice: number;
  shares: string;
  img: string;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ name, value, sharePrice, shares, img }) => {
  return (
    <div className="bg-navy text-white p-6 rounded-lg max-w-2xl mx-auto">
      <img src={img} alt={name} className="w-full h-64 object-cover rounded-lg mb-4 opacity-90 border-2 border-warmGray" />
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <p className="text-warmGray">Total Value: ${value.toLocaleString()}</p>
      <p className="text-warmGray">Share Price: ${sharePrice.toLocaleString()}</p>
      <p className="text-warmGray">Shares Available: {shares}</p>
      <div className="flex gap-4 mt-4">
        <button className="bg-teal text-white px-6 py-2 rounded">Pay with USD</button>
        <button className="bg-teal text-white px-6 py-2 rounded">Connect Wallet</button>
        <button className="bg-ochre text-navy px-6 py-2 rounded font-bold">Invest</button>
      </div>
    </div>
  );
};
export default PropertyDetails;