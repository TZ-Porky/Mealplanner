/* eslint-disable react-native/no-inline-styles */
// --------------------------------------------------------------------//
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// --------------------------------------------------------------------//

import HomeScreen from '../screens/Homescreen/HomeScreen';
// Placeholder components (à remplacer plus tard par les vrais)
import {Colors} from '../styles/AppStyles';
import styles from './MainTabNavigator';
// --------------------------------------------------------------------//

const Tab = createBottomTabNavigator();

// --------------------------------------------------------------------//
// Temporary screen components (replace with real screens later)
// --------------------------------------------------------------------//
function StocksScreen() {
  return (
    <View>
      <Text>Stocks Page</Text>
    </View>
  );
}

function MarketScreen() {
  return (
    <View>
      <Text>Market Page</Text>
    </View>
  );
}

function PlanningScreen() {
  return (
    <View>
      <Text>Planning Page</Text>
    </View>
  );
}

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
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Planning" component={PlanningScreen} />
      <Tab.Screen name="Stocks" component={StocksScreen} />
      <Tab.Screen name="Add" component={HomeScreen} />
      <Tab.Screen name="Market" component={MarketScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
