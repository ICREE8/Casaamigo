'use client';
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
    <div className="bg-navy text-white p-6 rounded-lg max-w-2xl mx-auto w-full">
      <img src={img} alt={name} className="w-full h-64 object-cover rounded-lg mb-4 opacity-90 border-2 border-warmGray" />
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <p className="text-warmGray">Total Value: ${value.toLocaleString()}</p>
      <p className="text-warmGray">Share Price: ${sharePrice.toLocaleString()}</p>
      <p className="text-warmGray">Shares Available: {shares}</p>
      <p className="text-warmGray">Monthly Projected Income: ${monthlyIncome.toLocaleString()}</p>
      <p className="text-warmGray">Monthly Expenses: ${monthlyExpenses.toLocaleString()}</p>
      <p className="text-warmGray">Net Monthly Income: ${(monthlyIncome - monthlyExpenses).toLocaleString()}</p>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <button className="bg-teal text-white px-6 py-2 rounded w-full sm:w-auto">Pay with USD</button>
        <button className="bg-teal text-white px-6 py-2 rounded w-full sm:w-auto">Connect Wallet</button>
        <button className="bg-ochre text-navy px-6 py-2 rounded font-bold w-full sm:w-auto">Invest</button>
      </div>
    </div>
  );
};
export default PropertyDetails;