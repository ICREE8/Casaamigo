'use client';
import Header from '../../components/Header';
import Link from 'next/link';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const ochreIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const properties = [
  { id: '123-solar', name: '123 Solar St', city: 'Santa Marta', country: 'Colombia', lat: 11.2404, lng: -74.2110, value: 50000, sharePrice: 12500, shares: '2/4', img: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg' },
  { id: '456-caribe', name: '456 Caribe St', city: 'Medellin', country: 'Colombia', lat: 6.2518, lng: -75.5636, value: 100000, sharePrice: 20000, shares: '1/5', img: 'https://images.pexels.com/photos/1559699/pexels-photo-1559699.jpeg' },
  { id: '789-margarita', name: '789 Playa El Agua', city: 'Isla de Margarita', country: 'Venezuela', lat: 11.1333, lng: -63.8667, value: 75000, sharePrice: 15000, shares: '3/5', img: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { id: '101-tucacas', name: '101 Coral Reef', city: 'Tucacas', country: 'Venezuela', lat: 10.7900, lng: -68.3250, value: 60000, sharePrice: 12000, shares: '1/4', img: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg' },
  { id: '112-merida', name: '112 Sierra Vista', city: 'Merida', country: 'Venezuela', lat: 8.5897, lng: -71.1560, value: 80000, sharePrice: 16000, shares: '2/5', img: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg' },
  { id: '131-cuyagua', name: '131 Surf Haven', city: 'Cuyagua', country: 'Venezuela', lat: 10.4833, lng: -67.6833, value: 65000, sharePrice: 13000, shares: '3/4', img: 'https://images.pexels.com/photos/1559699/pexels-photo-1559699.jpeg' },
];

export default function Properties() {
  const [search, setSearch] = useState('');
  const [showMap, setShowMap] = useState(false);
  const filteredProperties = properties.filter(prop => 
    `${prop.city}, ${prop.country}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto p-5 pt-20">
        <h1 className="text-2xl font-bold text-center mb-6">Explore Properties</h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <input 
            type="text" 
            placeholder="Search cities (e.g., Santa Marta)" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="w-full max-w-md p-2 border border-[var(--airbnb-grey)] rounded-lg focus:outline-none focus:border-[var(--airbnb-red)]"
          />
          <button 
            onClick={() => setShowMap(!showMap)} 
            className="btn-secondary w-full sm:w-auto text-sm"
          >
            {showMap ? 'List View' : 'Map View'}
          </button>
        </div>
        {showMap && (
          <div className="w-full h-[50vh] mb-6">
            <MapContainer center={[10.5, -70.5]} zoom={5} style={{ height: '100%', width: '100%' }} className="rounded-lg">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredProperties.map(prop => (
                <Marker key={prop.id} position={[prop.lat, prop.lng]} icon={ochreIcon}>
                  <Popup>
                    <Link href={`/property/${prop.id}`}>
                      <div>
                        <h3 className="font-bold">{prop.name}</h3>
                        <p className="text-muted">${prop.value.toLocaleString()}</p>
                        <p className="text-muted">{prop.city}, {prop.country}</p>
                      </div>
                    </Link>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
        {!showMap && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {filteredProperties.map(prop => (
              <Link key={prop.id} href={`/property/${prop.id}`}>
                <div className="card flex flex-col h-full cursor-pointer">
                  <img src={prop.img} alt={prop.name} className="w-full h-48 object-cover rounded-t-lg" />
                  <div className="p-4 flex-1">
                    <h2 className="text-lg font-bold mb-1">{prop.name}</h2>
                    <p className="text-muted text-sm mb-1">{prop.city}, {prop.country}</p>
                    <p className="text-muted text-sm">Share Price: ${prop.sharePrice.toLocaleString()}</p>
                    <p className="text-muted text-sm">Shares: {prop.shares}</p>
                    <p className="font-bold mt-2">${prop.value.toLocaleString()}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="flex justify-center">
          <Link href="/">
            <button className="btn-primary">Return Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}