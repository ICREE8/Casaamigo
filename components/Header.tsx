'use client';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header className="fixed top-0 w-full bg-navy text-white p-4 flex justify-between items-center z-10 flex-col sm:flex-row">
      <div className="text-xl font-bold mb-2 sm:mb-0">
        <span className="text-ochre">Casa</span>amigo
      </div>
      <button onClick={toggleTheme} className="px-4 py-2 bg-teal text-white rounded hover:bg-ochre w-full sm:w-auto">
        {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </header>
  );
};
export default Header;