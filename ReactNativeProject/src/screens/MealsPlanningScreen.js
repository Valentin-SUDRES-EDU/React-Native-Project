import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MealSelectionModal from '../components/MealSelectionModal.js';
import {
  useSelectedIngredients,
  useSelectedIngredientsDispatch,
} from '../context/SelectedIngredientsContext.js';

const MealsPlanningScreen = () => {
  const selectedIngredients = useSelectedIngredients();
  const setSelectedIngredients = useSelectedIngredientsDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleMealSelection = (day, meals) => {
    if (selectedItem) {
      selectedItem.meals.set(day, meals);
    }
    console.log(selectedItem.meals);
  };

  const onEdit = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const onDelete = (item) => {
    setSelectedIngredients({ type: 'deleted', item: item.item });
  };

  const renderRightActions = (progress, dragX, item) => {
    return (
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(item)}>
          <Text style={styles.buttonText}>Edit Day</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item)}>
          <Text style={styles.buttonText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}>
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

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <FlatList
          data={selectedIngredients}
          renderItem={renderItem}
          keyExtractor={(item) => item.item.id}
        />
      </GestureHandlerRootView>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}>
        <MealSelectionModal
          handleMealSelection={handleMealSelection}
          closeModal={() => setModalVisible(false)}
          selectedItem={selectedItem}
        />
      </Modal>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  buttons: {
    flexDirection: 'row',
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
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
};

export default MealsPlanningScreen;
