/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const MarketsList = ({markets, loading, error, onMarketPress, onRefresh}) => {
  const renderMarketItem = ({item}) => (
    <TouchableOpacity
      style={styles.marketItem}
      onPress={() => onMarketPress(item)}>
      <View style={styles.marketInfo}>
        <Text style={styles.marketName}>{item.name}</Text>
        <Text style={styles.marketAddress}>{item.vicinity}</Text>
        <View style={styles.marketMeta}>
          {item.rating && <Text style={styles.rating}>⭐ {item.rating}</Text>}
          {item.opening_hours && (
            <Text
              style={[
                styles.status,
                {color: item.opening_hours.open_now ? 'green' : 'red'},
              ]}>
              {item.opening_hours.open_now ? 'Ouvert' : 'Fermé'}
            </Text>
          )}
        </View>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {error ? error : 'Aucun marché trouvé dans les environs'}
      </Text>
      {error && (
        <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
          <Text style={styles.retryText}>Réessayer</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Marchés proches</Text>
        <TouchableOpacity onPress={onRefresh} disabled={loading}>
          <Text style={styles.refreshButton}>
            {loading ? '🔄' : '↻'} Actualiser
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Recherche des marchés...</Text>
        </View>
      ) : (
        <FlatList
          data={markets}
          renderItem={renderMarketItem}
          keyExtractor={item => item.place_id || item.name}
          ListEmptyComponent={renderEmptyComponent}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  refreshButton: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  marketItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  marketInfo: {
    flex: 1,
  },
  marketName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  marketAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  marketMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#f39c12',
    marginRight: 10,
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
  },
  arrow: {
    fontSize: 20,
    color: '#ccc',
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default MarketsList;
