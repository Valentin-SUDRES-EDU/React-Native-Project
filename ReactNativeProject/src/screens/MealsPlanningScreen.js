import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Animated } from 'react-native';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  useSelectedIngredients,
  useSelectedIngredientsDispatch,
} from '../context/SelectedIngredientsContext.js';

const MealsPlanningScreen = () => {
  const selectedIngredients = useSelectedIngredients();
  const setSelectedIngredients = useSelectedIngredientsDispatch();

  const renderItem = ({ item }) => {
    const onEdit = () => {
      setSelectedIngredients({ type: 'deleted', item: item.item });
      console.log(selectedIngredients);
    };

    const onDelete = () => {
      setSelectedIngredients({ type: 'deleted', item: item.item });
      console.log(selectedIngredients);
    };

    const renderRightActions = (progress, dragX) => {
      const trans = dragX.interpolate({
        inputRange: [-200, 0],
        outputRange: [1, 0],
      });

      return (
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.editButton} onPress={onEdit}>
            <Animated.Text style={{ transform: [{ scale: trans }] }}>Edit Day</Animated.Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Animated.Text style={{ transform: [{ scale: trans }] }}>Supprimer</Animated.Text>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <Swipeable renderRightActions={renderRightActions}>
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
      </Swipeable>
    );
  };

  return (
    <GestureHandlerRootView>
      <FlatList
        data={selectedIngredients}
        renderItem={renderItem}
        keyExtractor={(item) => item.item.id}
      />
    </GestureHandlerRootView>
  );
};

const styles = {
  buttons: {
    flexDirection: 'column',
  },
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
  editButton: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
};

export default MealsPlanningScreen;
