/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import MarketHeader from '../../components/MarketHeader/MarketHeader';
import ShoppingListServices from '../../services/ShoppingListServices';
import {Colors, Layout, Fonts} from '../../styles/AppStyles';
import Icon from 'react-native-vector-icons/Ionicons';

const ShoppingListScreen = () => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = ShoppingListServices.onShoppingListChanged(
      setShoppingLists,
      setLoading(false),
      auth().currentUser?.uid || null,
    );
    return unsubscribe;
  }, []);

  const handleDelete = id => {
    Alert.alert('Supprimer', 'Voulez-vous vraiment supprimer cette liste ?', [
      {text: 'Annuler', style: 'cancel'},
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: () => ShoppingListServices.deleteShoppingList(id),
      },
    ]);
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const ListHeader = () => (
    <View>
      <MarketHeader
        title={'Shopping List'}
        onNotificationsPress={() =>
          Alert.alert('Notifications', 'Notifications pressed')
        }
        onCartPress={() => Alert.alert('Cart', 'Cart pressed')}
        onAddPress={() => navigation.navigate('ShoppingListForm')}
      />
      <View style={styles.greetingSection}>
        <Text style={styles.browseTitle}>
          Your <Text style={styles.browseMealHighlight}>Shopping Lists</Text>
        </Text>
        <Text style={styles.browseSubtitle}>Keep your courses organized.</Text>
      </View>
    </View>
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ShoppingListForm', {list: item})}>
      <View style={styles.cardHeader}>
        <Text style={styles.listTitle}>{item.name}</Text>
        <View style={styles.cardHeaderContent}>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Icon
              name="trash-outline"
              size={Fonts.sizes.large}
              style={styles.deleteIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Icon
              name="share-social-outline"
              size={Fonts.sizes.large}
              style={styles.deleteIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.subTitle}>
        {item.recipeName || 'Liste personnalisée'}
      </Text>
      <Text style={styles.status}>{item.status}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#f3c09e" />
        <Text style={{marginTop: 10}}>Chargement des listes de courses...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ListHeader />
      <FlatList
        data={shoppingLists}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No list found.</Text>
        }
      />
    </View>
  );
};

export default ShoppingListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blankBackground,
  },
  listContainer: {padding: 12},
  card: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cardHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  greetingSection: {
    paddingHorizontal: Layout.spacing.medium,
    marginBottom: Layout.spacing.medium,
  },
  browseTitle: {
    fontSize: Fonts.sizes.xxLarge,
    fontWeight: Fonts.weights.bold,
    color: Colors.textDark,
  },
  browseMealHighlight: {
    color: Colors.primaryOrange,
  },
  browseSubtitle: {
    fontSize: Fonts.sizes.medium,
    color: Colors.textMedium,
    marginTop: Layout.spacing.xSmall,
  },
  listTitle: {fontSize: 18, fontWeight: 'bold'},
  subTitle: {fontSize: 14, color: '#555'},
  status: {fontSize: 12, color: '#999', marginTop: 6},
  deleteText: {color: 'red', fontSize: 12},
  emptyText: {textAlign: 'center', marginTop: 50, color: '#999'},
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.primaryOrange,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 4,
  },
  addButtonText: {color: 'white', fontWeight: 'bold', fontSize: 14},
});
