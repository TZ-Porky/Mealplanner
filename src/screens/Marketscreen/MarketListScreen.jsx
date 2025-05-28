import React from 'react';
import {
  Text,
  SafeAreaView,
} from 'react-native';


const MarketScreen = () => {

  // Génération d'ID unique
  const generateUniqueId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };


  return (
    <SafeAreaView>
      <Text>Liste du Marché</Text>
    </SafeAreaView>
  );
};

export default MarketScreen;
