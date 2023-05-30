import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { SelectedIngredientsProvider } from '../context/SelectedIngredientsContext.js';
import FoodDatabaseScreen from '../screens/FoodDatabaseScreen.js';
import HealthGoalsScreen from '../screens/HealthGoalsScreen.js';
import MealsPlanningScreen from '../screens/MealsPlanningScreen.js';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <SelectedIngredientsProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Health Goals"
            component={HealthGoalsScreen}
            options={{
              headerStyle: {
                backgroundColor: '#1D8EE4',
              },
              headerTintColor: '#fff',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="flag-checkered" color={color} size={size} />
              ),
              tabBarActiveTintColor: '#1D8EE4',
              tabBarInactiveTintColor: '#424B54',
            }}
          />
          <Tab.Screen
            name="Food Database"
            component={FoodDatabaseScreen}
            options={{
              headerStyle: {
                backgroundColor: '#3AB800',
              },
              headerTintColor: '#fff',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="food-apple" color={color} size={size} />
              ),
              tabBarActiveTintColor: '#3AB800',
              tabBarInactiveTintColor: '#424B54',
            }}
          />
          <Tab.Screen
            name="Meals Planning"
            component={MealsPlanningScreen}
            options={{
              headerStyle: {
                backgroundColor: '#E69035',
              },
              headerTintColor: '#fff',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="food-turkey" color={color} size={size} />
              ),
              tabBarActiveTintColor: '#E69035',
              tabBarInactiveTintColor: '#424B54',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SelectedIngredientsProvider>
  );
}
