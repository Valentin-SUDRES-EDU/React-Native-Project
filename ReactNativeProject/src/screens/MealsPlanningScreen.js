import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useSelectedIngredients } from '../context/SelectedIngredientsContext.js';

const MealsPlanningScreen = () => {
  const selectedIngredients = useSelectedIngredients();
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {item.item.image ? (
        <Image source={{ uri: item.item.image }} style={styles.image} />
      ) : (
        <MaterialCommunityIcons
          name="image-off-outline"
          color="lightgrey"
          size={50}
          style={styles.image}
        />
      )}
      <Text>{item.item.label}</Text>
      <Text> - Calories : {item.nutritionData.calories} kcal</Text>
    </View>
  );

  return (
    <FlatList
      data={selectedIngredients}
      renderItem={renderItem}
      keyExtractor={(item) => item.item.id}
    />
  );
};

const styles = {
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
};

export default MealsPlanningScreen;
