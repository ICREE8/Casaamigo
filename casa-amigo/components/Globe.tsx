'use client';
import Globe from 'react-globe.gl';

const GlobeComponent: React.FC = () => {
  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
      backgroundColor="rgba(0,0,0,0)"
      width={typeof window !== 'undefined' ? window.innerWidth : 1200}
      height={600}
      pointOfView={{ lat: 20, lng: -80, altitude: 1.5 }}
      className="opacity-80"
    />
  );
};
export default GlobeComponent;