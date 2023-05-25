import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import * as React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FoodDatabaseScreen from '../screens/FoodDatabaseScreen.js';
import HealthGoalsScreen from '../screens/HealthGoalsScreen.js';
import MealsPlanningScreen from '../screens/MealsPlanningScreen.js';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Health Goals"
          component={HealthGoalsScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="flag-checkered"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Food Database"
          component={FoodDatabaseScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="food-apple"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Meals Planning"
          component={MealsPlanningScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="food-turkey"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
