/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, ActivityIndicator, Text, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useGeolocation} from '../../Hooks/useGeolocation';
import {useMarkets} from '../../Hooks/useMarkets';
import MarketModal from '../../components/MarketModal/MarketModal';
import MarketsList from '../../components/MarketList/MarketList';
import Button from '../../components/common/Button';

const GeolocalisationScreen = () => {
  const {
    location,
    loading: locationLoading,
    error: locationError,
    refreshLocation,
  } = useGeolocation();
  const {
    markets,
    loading: marketsLoading,
    error: marketsError,
    refreshMarkets,
  } = useMarkets(location);
  const [selectedMarket, setSelectedMarket] = useState(null);

  const handleCommentSubmit = (market, comment) => {
    console.log('Commentaire pour', market.name, ':', comment);

    // Fermer la modal après soumission
    setSelectedMarket(null);

    Alert.alert('Succès', 'Votre commentaire a été enregistré !');
  };

  const handleRefresh = () => {
    refreshLocation();
    refreshMarkets();
  };

  // États de chargement
  if (locationLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#EB7A34" />
        <Text>Chargement de la localisation...</Text>
        {location && (
          <Text>
            Position : {location.latitude}, {location.longitude}
          </Text>
        )}
      </View>
    );
  }

  // Erreur de localisation
  if (locationError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{locationError}</Text>
        <Button title="Réessayer" onPress={refreshLocation} style={{flex: 1}} />
      </View>
    );
  }

  // Pas de localisation
  if (!location) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          Impossible d'obtenir la localisation
        </Text>
        <Button title="Réessayer" onPress={refreshLocation} style={{flex: 1}} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation
        showsMyLocationButton>
        {markets.map((market, index) => (
          <Marker
            key={market.place_id || `${market.name}-${index}`}
            coordinate={{
              latitude: market.geometry.location.lat,
              longitude: market.geometry.location.lng,
            }}
            title={market.name}
            description={market.vicinity}
            onPress={() => setSelectedMarket(market)}
          />
        ))}
      </MapView>

      <MarketsList
        markets={markets}
        loading={marketsLoading}
        error={marketsError}
        onMarketPress={setSelectedMarket}
        onRefresh={handleRefresh}
      />

      <MarketModal
        market={selectedMarket}
        visible={!!selectedMarket}
        onClose={() => setSelectedMarket(null)}
        onComment={handleCommentSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 2,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#dc3545',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GeolocalisationScreen;
