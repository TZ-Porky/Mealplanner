// --------------------------------------------------------------------//
import React, { View, Text } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// --------------------------------------------------------------------//

// --------------------------------------------------------------------//
import HomeScreen from '../screens/Homescreen/HomeScreen';
//import StocksScreen from '../screens/StocksScreen';
//import ProfileScreenContent from '../screens/ProfileScreen';
//import ShoppingListScreen from '../screens/ShoppingListScreen';
//import MealPlannerScreen from '../screens/MealPlannerScreen';
import Colors from '../constants/colors';
// --------------------------------------------------------------------//

// Crée une instance de création de barre de navigation
const Tab = createBottomTabNavigator();

// -------------------------------------------------------------------//
/*                             Fonction Test                          */
// -------------------------------------------------------------------//

function StockPage() {
  return(
    <View>
      <Text>Page des stocks</Text>
    </View>
  );
}

function MarketPage() {
  return(
    <View>
      <Text>Page du marché</Text>
    </View>
  );
}

function PlanningPage() {
  return(
    <View>
      <Text>Page du Planning</Text>
    </View>
  );
}

function ProfilePage() {
  return(
    <View>
      <Text>Page de Profile</Text>
    </View>
  );
}

// -------------------------------------------------------------------//
/*           Options de navigation de la barre de navigation          */
// -------------------------------------------------------------------//
const screenOptions = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    let iconName;

    if (route.name === 'Accueil') {
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === 'Planning') {
      iconName = focused ? 'calendar' : 'calendar-outline';
    } else if (route.name === 'Recettes') {
      iconName = focused ? 'restaurant' : 'restaurant-outline';
    } else if (route.name === 'Stocks') {
      iconName = focused ? 'cube' : 'cube-outline';
    } else if (route.name === 'Courses') {
      iconName = focused ? 'cart' : 'cart-outline';
    } else if (route.name === 'Profil') {
      iconName = focused ? 'person' : 'person-outline';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: Colors.primary,
  tabBarInactiveTintColor: 'gray',
  tabBarStyle: {
    backgroundColor: '#f0f0f0',
    height: 60,
    paddingBottom: 5,
  },
  tabBarLabelStyle: {
    fontSize: 12,
  },
  headerShown: false,
});

// -------------------------------------------------------------------//
/*                         Barre de navigation                        */
// -------------------------------------------------------------------//
function MainTabNavigator() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Planning" component={PlanningPage} />
      <Tab.Screen name="Stocks" component={StockPage} />
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Courses" component={MarketPage} />
      <Tab.Screen name="Profil" component={ProfilePage} />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
