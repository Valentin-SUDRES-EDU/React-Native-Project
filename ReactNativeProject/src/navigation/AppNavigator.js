import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';

import FoodDatabaseScreen from '../screens/FoodDatabaseScreen.js';
import HealthGoalsScreen from '../screens/HealthGoalsScreen.js';
import MealsPlanningScreen from '../screens/MealsPlanningScreen.js';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Health Goals" component={HealthGoalsScreen} />
        <Tab.Screen name="Food Database" component={FoodDatabaseScreen} />
        <Tab.Screen name="Meals Planning" component={MealsPlanningScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
