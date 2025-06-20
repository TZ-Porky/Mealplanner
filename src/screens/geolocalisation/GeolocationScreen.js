/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, PermissionsAndroid, Platform, FlatList, TouchableOpacity, Modal, Linking, Image, TextInput } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';

export default function GeolocationScreen() {
  const [location, setLocation] = useState(null);
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [comment, setComment] = useState('');
  const apiKey = 'AIzaSyDqJtH6hpF1i1ct9qHzKsqHh4wzMwZTzfw';

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            setErrorMsg('Permission localisation refusée.');
            setLoading(false);
            return;
          }
        }
        Geolocation.getCurrentPosition(
          async pos => {
            setLocation(pos.coords);
            await fetchNearbyMarkets(pos.coords.latitude, pos.coords.longitude);
            setLoading(false);
          },
          error => {
            setErrorMsg('Erreur de localisation : ' + error.message);
            setLoading(false);
          },
          { enableHighAccuracy: false, timeout: 20000, maximumAge: 10000 }
        );
      } catch (e) {
        setErrorMsg('Erreur inattendue : ' + e.message);
        setLoading(false);
      }
    };
    requestLocationPermission();
  }, []);

  const fetchNearbyMarkets = async (latitude, longitude) => {
    const radius = 5000;
    const keywords = ['marché', 'market', 'bazaar', 'central'];
    let allResults = [];

    for (let keyword of keywords) {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&keyword=${keyword}&key=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.results) {
          allResults = allResults.concat(data.results);
        }
      } catch (e) {}
    }

    const uniqueMarkets = [];
    const seen = new Set();
    for (let item of allResults) {
      if (!seen.has(item.place_id)) {
        seen.add(item.place_id);
        uniqueMarkets.push(item);
      }
    }

    setMarkets(uniqueMarkets);
  };

  const getPhotoUrl = (market) => {
    if (market && market.photos && market.photos.length > 0) {
      const ref = market.photos[0].photo_reference;
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${apiKey}`;
    }
    return null;
  };

  const openDirections = (lat, lng) => {
    const url = Platform.select({
      ios: `maps://app?daddr=${lat},${lng}`,
      android: `google.navigation:q=${lat},${lng}`,
    });
    Linking.openURL(url);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Recherche de la localisation...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.center}>
        <Text>Impossible d'obtenir la localisation.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation
      >
        {markets.map((market, idx) => (
          <Marker
            key={market.place_id || idx}
            coordinate={{
              latitude: market.geometry.location.lat,
              longitude: market.geometry.location.lng,
            }}
            title={market.name}
            description={market.vicinity}
            onPress={() => {
              setSelectedMarket(market);
              setComment('');
            }}
          />
        ))}
      </MapView>
      <View style={styles.listContainer}>
        <Text style={styles.title}>Marchés proches :</Text>
        <FlatList
          data={markets}
          keyExtractor={item => item.place_id || item.name}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {
              setSelectedMarket(item);
              setComment('');
            }}>
              <Text style={styles.item}>
                {item.name} - {item.vicinity}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text>Aucun marché trouvé.</Text>}
        />
      </View>
      <Modal visible={!!selectedMarket} transparent animationType="slide" onRequestClose={() => setSelectedMarket(null)}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            {getPhotoUrl(selectedMarket) && (
              <Image
                source={{ uri: getPhotoUrl(selectedMarket) }}
                style={{ width: 200, height: 120, borderRadius: 8, marginBottom: 10 }}
                resizeMode="cover"
              />
            )}
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{selectedMarket?.name}</Text>
            <Text>Adresse : {selectedMarket?.vicinity}</Text>
            {selectedMarket?.types && (
              <Text>Type : {selectedMarket.types.join(', ')}</Text>
            )}
            {selectedMarket?.rating && <Text>Note : {selectedMarket.rating} ⭐</Text>}
            {selectedMarket?.opening_hours && (
              <Text>
                {selectedMarket.opening_hours.open_now ? 'Ouvert' : 'Fermé'} actuellement
              </Text>
            )}
            <TouchableOpacity
              onPress={() => openDirections(selectedMarket.geometry.location.lat, selectedMarket.geometry.location.lng)}
              style={styles.openMapBtn}
            >
              <Text style={{ color: 'green', marginTop: 10 }}>Itinéraire</Text>
            </TouchableOpacity>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 6,
                padding: 8,
                marginTop: 15,
                width: 200,
              }}
              placeholder="Écrire un commentaire..."
              value={comment}
              onChangeText={setComment}
              multiline
            />
            <TouchableOpacity onPress={() => setSelectedMarket(null)} style={styles.closeBtn}>
              <Text style={{ color: 'blue' }}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  map: { flex: 2 },
  listContainer: { flex: 1, padding: 10, backgroundColor: '#fff' },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  item: { fontSize: 15, marginBottom: 4 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modal: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center' },
  closeBtn: { marginTop: 15 },
  openMapBtn: { marginTop: 10 },
});
