/* eslint-disable no-shadow */
import {useState, useEffect, useRef} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    requestLocationPermission();

    // Nettoyage du timeout si le composant est démonté
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setError('Permission de localisation refusée.');
          setLoading(false);
          return;
        }
      }

      timeoutRef.current = setTimeout(() => {
        setError('Délai dépassé : Impossible d’obtenir la position.');
        setLoading(false);
      }, 20000); // timeout de secours (20 sec)

      Geolocation.getCurrentPosition(
        position => {
          clearTimeout(timeoutRef.current);
          setLocation(position.coords);
          setLoading(false);
        },
        error => {
          clearTimeout(timeoutRef.current);
          console.log('⛔ Erreur de localisation brute :', error); // 👈 ICI
          setError(`Erreur de localisation : ${error.message}`);
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          forceRequestLocation: true,
        },
      );
    } catch (e) {
      setError(`Erreur inattendue : ${e.message}`);
      setLoading(false);
    }
  };

  const refreshLocation = () => {
    setLoading(true);
    setError('');
    setLocation(null);
    requestLocationPermission();
  };

  return {location, loading, error, refreshLocation};
};
