/* eslint-disable react-native/no-inline-styles */
// --------------------------------------------------------------------//
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// --------------------------------------------------------------------//
import ChatAIScreen from '../screens/ChatScreen/ChatAIScreen';
import FloatingAIButton from '../components/FloatingAIButton';
import HomeScreen from '../screens/Homescreen/HomeScreen';
import PlannerScreen from '../screens/Planningscreen/PlanningScreen';
import StocksScreen from '../screens/Stockscreen/StockScreen';
import MarketScreen from '../screens/Marketscreen/MarketScreen';
import {Colors} from '../styles/AppStyles';
import styles from './MainTabNavigatorStyle';
import GeolocationScreen from '../screens/GeolocatitionScreen/GeolocationScreen';
import GeolocalisationScreen from '../screens/GeolocatitionScreen/GeolocalisationScreen';
import ShoppingListsScreen from '../screens/ShoppingListScreen/ShoppingListScreen';

// --------------------------------------------------------------------//

const Tab = createBottomTabNavigator();

// --------------------------------------------------------------------//
// Temporary screen components (replace with real screens later)
// --------------------------------------------------------------------//

function ProfileScreen() {
  return (
    <View>
      <Text>Profile Page</Text>
    </View>
  );
}


// --------------------------------------------------------------------//
// Tab bar icon and style configuration
// --------------------------------------------------------------------//
function CustomTabBar({state, descriptors, navigation}) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        if (route.name === 'Add') {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(route.name)}
              style={styles.fabButton}>
              <Ionicons name="add" size={35} color="#fff" />
            </TouchableOpacity>
          );
        }

        const {options} = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        let iconName;
        switch (route.name) {
          case 'Home':
            iconName = isFocused ? 'home' : 'home-outline';
            break;
          case 'Planning':
            iconName = isFocused ? 'calendar' : 'calendar-outline';
            break;
          case 'Market':
            iconName = isFocused ? 'cart' : 'cart-outline';
            break;
          case 'Profile':
            iconName = isFocused ? 'person' : 'person-outline';
            break;
          case 'Stocks':
            iconName = isFocused ? 'cube' : 'cube-outline';
            break;
          case 'Courses':
            iconName = isFocused ? 'receipt' : 'receipt-outline';
            break;
             case 'Carte':
             iconName = isFocused ? 'map' : 'map-outline';
            break;
        }

        return (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tabItem}>
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? Colors.textLight : Colors.buttonPressed}
            />
            <Text
              style={{
                fontSize: 10,
                color: isFocused ? Colors.textLight : Colors.buttonPressed,
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// --------------------------------------------------------------------//
// Main Tab Navigator
// --------------------------------------------------------------------//
function MainTabNavigator() {
  return (
      <View style={{ flex: 1}}>
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Market" component={MarketScreen} />
      <Tab.Screen name="Stocks" component={StocksScreen} />
      <Tab.Screen name="Planning" component={PlannerScreen} />
      <Tab.Screen name="Courses" component={ShoppingListsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Carte" component={GeolocationScreen}/>
    </Tab.Navigator>
    <FloatingAIButton/>
    </View>
  );
}

export default MainTabNavigator;
