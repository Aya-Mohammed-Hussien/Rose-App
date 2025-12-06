'use client';

import { Button } from '@/components/ui/button';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { MapPinHouse } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, useRef, useCallback } from 'react';

const defaultCenter = {
  // Cairo
  lat: 30.0444,
  lng: 31.2357,
};

interface AddressMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

export default function Map({ onLocationSelect }: AddressMapProps) {
  const t = useTranslations('Addresses');
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleButtonClick = () => {
    if (!mapRef.current) return;

    const center = mapRef.current.getCenter();
    if (center) {
      const lat = center.lat();
      const lng = center.lng();
      setMarker({ lat, lng });
      onLocationSelect(lat, lng);
    }
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="relative w-full h-[349px]">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={marker || defaultCenter}
        zoom={marker ? 16 : 10}
        onLoad={handleMapLoad}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>

      {/* Button */}
      <Button
        onClick={handleButtonClick}
        variant="outline"
        className="absolute top-4 right-4 z-10 flex items-center gap-2 text-maroon-600 py-2.5 px-3.5"
      >
        <MapPinHouse size={20} />
        {t('find-location-button')}
      </Button>
    </div>
  );
}
