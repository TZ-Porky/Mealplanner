import { useState, useEffect, useCallback } from 'react';
import { GooglePlacesService } from '../services/GooglePlacesServices';

export const useMarkets = (location) => {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (location) {
      fetchMarkets();
    }
  }, [fetchMarkets, location]);

  const fetchMarkets = useCallback(async () => {
    if (!location) {return;}

    setLoading(true);
    setError('');

    try {
      const nearbyMarkets = await GooglePlacesService.fetchNearbyMarkets(
        location.latitude,
        location.longitude
      );
      setMarkets(nearbyMarkets);
    } catch (err) {
      setError(err.message);
      setMarkets([]);
    } finally {
      setLoading(false);
    }
  }, [location]);

  const refreshMarkets = () => {
    fetchMarkets();
  };

  return { markets, loading, error, refreshMarkets };
};
