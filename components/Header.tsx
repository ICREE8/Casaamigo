'use client';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { ethers } from 'ethers'; // ethers@5 from thirdweb

const Header: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum); // ethers@5 syntax
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) setAccount(accounts[0]);
      }
    };
    checkConnection();
  }, []);

  return (
    <header className="fixed top-0 w-full bg-navy text-white p-4 flex justify-between items-center z-10 flex-col sm:flex-row">
      <div className="text-xl font-bold mb-2 sm:mb-0">
        <span className="text-ochre">Casa</span>amigo
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <button onClick={toggleTheme} className="px-4 py-2 bg-teal text-white rounded hover:bg-ochre w-full sm:w-auto">
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
    </header>
  );
};
export default Header;