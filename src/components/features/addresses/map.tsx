'use client';

import { Button } from '@/components/ui/button';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { MapPinHouse, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const [isLocating, setIsLocating] = useState(false);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleButtonClick = () => {
    if (!navigator.geolocation) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Geolocation is not supported by your browser.',
      });
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const pos = { lat: latitude, lng: longitude };
        setMarker(pos);
        onLocationSelect(latitude, longitude);
        if (mapRef.current) {
          mapRef.current.panTo(pos);
          mapRef.current.setZoom(17);
        }
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        let message = 'Could not get your location.';
        if (error.code === error.PERMISSION_DENIED) {
          message = 'Please allow location access in your browser settings.';
        }
        toast({
          variant: 'destructive',
          title: 'Location Error',
          description: message,
        });
      },
      { enableHighAccuracy: true }
    );
  };

  if (loadError) {
    return (
      <div className="w-full h-[349px] flex items-center justify-center bg-gray-100 border rounded-md text-red-500 p-4 text-center">
        Error loading Google Maps. Please check your API key and billing settings.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[349px] flex items-center justify-center bg-gray-50 border rounded-md">
        <Loader2 className="animate-spin text-maroon-600" size={32} />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[349px] rounded-md overflow-hidden border">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={marker || defaultCenter}
        zoom={marker ? 17 : 12}
        onLoad={handleMapLoad}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        }}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>

      {/* Button */}
      <Button
        onClick={handleButtonClick}
        disabled={isLocating}
        variant="outline"
        className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white text-maroon-600 hover:text-maroon-700 hover:bg-white shadow-md py-2.5 px-3.5"
      >
        {isLocating ? <Loader2 size={20} className="animate-spin" /> : <MapPinHouse size={20} />}
        {t('find-location-button')}
      </Button>
    </div>
  );
}
