/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
//import ShoppingListServices from '../services/ShoppingListServices';
import AuthServices from '../../services/AuthServices';
import firestore from '@react-native-firebase/firestore';
import ShoppingList from '../../models/ListeCourse';
// Importe tes styles

const ShoppingListsScreen = ({navigation}) => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserAndLists = async () => {
      try {
        const user = await AuthServices.getCurrentUser();
        if (user) {
          setCurrentUser(user);
          // Écoute des listes de courses de l'utilisateur
          const unsubscribe = firestore()
            .collection('shoppingLists')
            .where('authorId', '==', user.uid)
            .orderBy('dateCreated', 'desc')
            .onSnapshot(
              querySnapshot => {
                const lists = [];
                querySnapshot.forEach(doc => {
                  lists.push(ShoppingList.fromFirestore(doc.data(), doc.id));
                });
                setShoppingLists(lists);
                setLoading(false);
              },
              err => {
                console.error(
                  'Erreur lors de la récupération des listes de courses en temps réel:',
                  err,
                );
                setError('Impossible de charger les listes de courses.');
                setLoading(false);
              },
            );
          return () => unsubscribe();
        } else {
          setError('Utilisateur non connecté.');
          setLoading(false);
        }
      } catch (err) {
        console.error(
          'Erreur lors du chargement initial des listes de courses:',
          err,
        );
        setError('Une erreur est survenue.');
        setLoading(false);
      }
    };

    fetchUserAndLists();
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      // style={styles.listItem}
      onPress={() =>
        navigation.navigate('ShoppingListDetailScreen', {
          shoppingListId: item.id,
        })
      }>
      <Text>{item.name}</Text>
      <Text>Recette: {item.recipeName || 'N/A'}</Text>
      <Text>Date: {item.dateCreated.toLocaleDateString()}</Text>
      <Text>Statut: {item.status}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#f3c09e" />;
  }

  if (error) {
    return <Text>Erreur: {error}</Text>;
  }

  return (
    <View style={{flex: 1, padding: 16}}>
      <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>
        Mes Listes de Courses
      </Text>
      {shoppingLists.length === 0 ? (
        <Text>Vous n'avez pas encore de listes de courses.</Text>
      ) : (
        <FlatList
          data={shoppingLists}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default ShoppingListsScreen;
