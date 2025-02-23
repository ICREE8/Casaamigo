'use client';
import Header from '../../components/Header';
import Link from 'next/link';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom Ochre marker icon
const ochreIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const properties = [
  { id: '123-solar', name: '123 Solar St', city: 'Santa Marta, Colombia', lat: 11.2404, lng: -74.2110, value: 50000, sharePrice: 12500, shares: '2/4', img: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg' },
  { id: '456-caribe', name: '456 Caribe St', city: 'Medellin, Colombia', lat: 6.2518, lng: -75.5636, value: 100000, sharePrice: 20000, shares: '1/5', img: 'https://images.pexels.com/photos/1559699/pexels-photo-1559699.jpeg' },
  { id: '789-margarita', name: '789 Playa El Agua', city: 'Isla de Margarita, Venezuela', lat: 11.1333, lng: -63.8667, value: 75000, sharePrice: 15000, shares: '3/5', img: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: '101-tucacas', name: '101 Coral Reef', city: 'Tucacas, Venezuela', lat: 10.7900, lng: -68.3250, value: 60000, sharePrice: 12000, shares: '1/4', img: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg' },
  { id: '112-merida', name: '112 Sierra Vista', city: 'Merida, Venezuela', lat: 8.5897, lng: -71.1560, value: 80000, sharePrice: 16000, shares: '2/5', img: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg' },
  { id: '131-cuyagua', name: '131 Surf Haven', city: 'Cuyagua, Venezuela', lat: 10.4833, lng: -67.6833, value: 65000, sharePrice: 13000, shares: '3/4', img: 'https://images.pexels.com/photos/1559699/pexels-photo-1559699.jpeg' },
];

export default function Properties() {
  const [search, setSearch] = useState('');
  const filteredProperties = properties.filter(prop => 
    prop.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-navy font-body">
      <Header />
      <div className="container mx-auto p-5 pt-20">
        <h1 className="text-3xl font-display font-bold text-center mb-4">Explore Properties</h1>
        <input 
          type="text" 
          placeholder="Search cities (e.g., Santa Marta)" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className="w-full max-w-md mx-auto block p-2 mb-6 border border-teal rounded-lg text-navy focus:outline-none focus:border-ochre"
        />
        <div className="w-full h-[50vh] mb-6">
          <MapContainer center={[10.5, -70.5]} zoom={5} style={{ height: '100%', width: '100%' }} className="rounded-lg">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredProperties.map(prop => (
              <Marker key={prop.id} position={[prop.lat, prop.lng]} icon={ochreIcon}>
                <Popup>
                  <Link href={`/property/${prop.id}`}>
                    <div className="text-navy">
                      <h3 className="font-bold">{prop.name}</h3>
                      <p>{prop.city}</p>
                      <p>Home Value: ${prop.value.toLocaleString()}</p>
                      <p>Share Price: ${prop.sharePrice.toLocaleString()}</p>
                    </div>
                  </Link>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {filteredProperties.map(prop => (
            <Link key={prop.id} href={`/property/${prop.id}`}>
              <div className="bg-navy text-white p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow flex flex-col sm:flex-row items-start">
                <img src={prop.img} alt={prop.name} className="w-full sm:w-48 h-32 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4 opacity-90 border-2 border-warmGray" />
                <div className="flex-1">
                  <h2 className="text-xl font-display font-bold mb-2">{prop.name}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <p className="text-warmGray text-base">Home Value: <span className="text-white text-lg font-bold">${prop.value.toLocaleString()}</span></p>
                      <p className="text-warmGray text-base">Shares: <span className="text-teal">{prop.shares}</span></p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-warmGray text-base">Share Price: <span className="text-teal text-lg font-bold">${prop.sharePrice.toLocaleString()}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}