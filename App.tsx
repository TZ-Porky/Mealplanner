import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabNavigator from './src/navigation/MainTabNavigator'; // Assurez-vous que le chemin est correct
import SplashScreen from './src/screens/Splashscreen/SplashScreen';
import LandingScreen from './src/screens/Landingscreen/LandingScreen';
import ConnexionScreen from './src/screens/Authentificationscreen/ConnexionScreen';
import InscriptionScreen from './src/screens/Authentificationscreen/InscriptionScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen/RecipeDetailScreen';
import AddMealScreen from './src/screens/AddMealScreen/AddMealScreen';
import EditMealScreen from './src/screens/EditMealScreen/EditMealScreen';
import SetupNavigator from './src/navigation/SetupNavigator';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="/" screenOptions={{headerShown: false}}>
      <Stack.Screen name="/" component={SplashScreen} />
      <Stack.Screen name="Land" component={LandingScreen} />
      <Stack.Screen name="SignIn" component={ConnexionScreen} />
      <Stack.Screen name="AddMeal" component={AddMealScreen} />
      <Stack.Screen name="SignUp" component={InscriptionScreen} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
      <Stack.Screen name="EditMeal" component={EditMealScreen}/>
      <Stack.Screen name="Setup" component={SetupNavigator} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
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
