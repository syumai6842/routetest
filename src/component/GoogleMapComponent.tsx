import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 35.6895,
  lng: 139.6917
};

const GoogleMapComponent: React.FC = () => {
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!
  });

  const directionsCallback = useCallback((result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => {
    if (status === 'OK') {
      setDirectionsResponse(result);
    } else {
      setError(`Directions request failed due to ${status}`);
    }
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={() => console.log('Google Map loaded')}
    >
      <DirectionsService
        options={{
          destination: 'Tokyo, Japan',
          origin: 'Yokohama, Japan',
          travelMode: google.maps.TravelMode.DRIVING
        }}
        callback={directionsCallback}
      />
      {directionsResponse && (
        <DirectionsRenderer
          options={{
            directions: directionsResponse
          }}
        />
      )}
      {error && <div>{error}</div>}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
