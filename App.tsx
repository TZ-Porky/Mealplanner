import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import MainTabNavigator from './src/navigation/MainTabNavigator'; // Assurez-vous que le chemin est correct
import SplashScreen from './src/screens/Splashscreen/SplashScreen';
import AuthentificationScreen from './src/screens/Authentificationscreen/AuthentificationScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="/" screenOptions={{headerShown: false}}>
      <Stack.Screen name="/" component={SplashScreen} />
      <Stack.Screen name="Auth" component={AuthentificationScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
