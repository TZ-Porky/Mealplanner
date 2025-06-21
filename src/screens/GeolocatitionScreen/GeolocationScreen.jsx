/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  FlatList,
  TouchableOpacity,
  Modal,
  Linking,
  Image,
  TextInput,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import {Colors} from '../../styles/AppStyles';

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
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
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
          {enableHighAccuracy: false, timeout: 20000, maximumAge: 10000},
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

  const getPhotoUrl = market => {
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
      <View style={styles.loadingContainer}>
        <View style={styles.loadingCard}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>
            Recherche de la localisation...
          </Text>
        </View>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorCard}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorCard}>
          <Text style={styles.errorIcon}>📍</Text>
          <Text style={styles.errorText}>
            Impossible d'obtenir la localisation.
          </Text>
        </View>
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
        customMapStyle={[
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{visibility: 'off'}],
          },
        ]}>
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
        <View style={styles.headerContainer}>
          <Text style={styles.title}>🏪 Marchés proches</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{markets.length}</Text>
          </View>
        </View>

        <FlatList
          data={markets}
          keyExtractor={item => item.place_id || item.name}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.marketCard}
              onPress={() => {
                setSelectedMarket(item);
                setComment('');
              }}
              activeOpacity={0.7}>
              <View style={styles.marketInfo}>
                <Text style={styles.marketName}>{item.name}</Text>
                <Text style={styles.marketAddress}>{item.vicinity}</Text>
                {item.rating && (
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>⭐ {item.rating}</Text>
                  </View>
                )}
              </View>
              <View style={styles.chevron}>
                <Text style={styles.chevronText}>›</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyText}>
                Aucun marché trouvé dans cette zone
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>

      <Modal
        visible={!!selectedMarket}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedMarket(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => setSelectedMarket(null)}
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {getPhotoUrl(selectedMarket) && (
              <Image
                source={{uri: getPhotoUrl(selectedMarket)}}
                style={styles.marketImage}
                resizeMode="cover"
              />
            )}

            <View style={styles.modalBody}>
              <Text style={styles.modalTitle}>{selectedMarket?.name}</Text>

              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>📍</Text>
                <Text style={styles.infoText}>{selectedMarket?.vicinity}</Text>
              </View>

              {selectedMarket?.types && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoIcon}>🏷️</Text>
                  <Text style={styles.infoText}>
                    {selectedMarket.types.slice(0, 2).join(', ')}
                  </Text>
                </View>
              )}

              {selectedMarket?.rating && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoIcon}>⭐</Text>
                  <Text style={styles.infoText}>
                    {selectedMarket.rating} / 5
                  </Text>
                </View>
              )}

              {selectedMarket?.opening_hours && (
                <View style={styles.statusContainer}>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor: selectedMarket.opening_hours.open_now
                          ? '#E8F5E8'
                          : '#FFE8E8',
                      },
                    ]}>
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color: selectedMarket.opening_hours.open_now
                            ? '#2E7D32'
                            : '#C62828',
                        },
                      ]}>
                      {selectedMarket.opening_hours.open_now
                        ? '🟢 Ouvert'
                        : '🔴 Fermé'}
                    </Text>
                  </View>
                </View>
              )}

              <TouchableOpacity
                onPress={() =>
                  openDirections(
                    selectedMarket.geometry.location.lat,
                    selectedMarket.geometry.location.lng,
                  )
                }
                style={styles.directionsButton}>
                <Text style={styles.directionsButtonText}>
                  🧭 Obtenir l'itinéraire
                </Text>
              </TouchableOpacity>

              <TextInput
                style={styles.commentInput}
                placeholder="Écrire un commentaire..."
                placeholderTextColor="#999"
                value={comment}
                onChangeText={setComment}
                multiline
                numberOfLines={3}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  map: {
    flex: 2,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  badge: {
    backgroundColor: Colors.primaryOrange,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  marketCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  marketInfo: {
    flex: 1,
  },
  marketName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  marketAddress: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 6,
  },
  ratingContainer: {
    alignSelf: 'flex-start',
  },
  ratingText: {
    fontSize: 12,
    color: '#FF8C00',
    fontWeight: '500',
  },
  chevron: {
    marginLeft: 12,
  },
  chevronText: {
    fontSize: 20,
    color: '#CCCCCC',
    fontWeight: '300',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingCard: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  errorCard: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#FF5252',
  },
  errorIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    color: '#C62828',
    textAlign: 'center',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    paddingBottom: 0,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  marketImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  modalBody: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#666666',
    flex: 1,
  },
  statusContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  directionsButton: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: Colors.shadowColor,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  directionsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1A1A1A',
    backgroundColor: '#F8F9FA',
    textAlignVertical: 'top',
    minHeight: 80,
  },
});
