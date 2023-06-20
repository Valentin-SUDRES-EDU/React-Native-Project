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
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedMeal, setSelectedMeal] = useState('Breakfast');
  const selectedIngredients = useSelectedIngredients();
  const setSelectedIngredients = useSelectedIngredientsDispatch();

  const [filteredIngredients, setfilteredIngredients] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealOptions = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];

  const renderDayItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.dayButton, selectedDay === item && styles.selectedDayButton]}
      onPress={() => {
        setSelectedDay(item);
        setfilteredIngredients(
          selectedIngredients.filter((ingredient) =>
            ingredient.meals?.get(item).includes(selectedMeal)
          )
        );
      }}>
      <Text style={styles.dayText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderMealItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.dayButton, selectedMeal === item && styles.selectedDayButton]}
      onPress={() => {
        setSelectedMeal(item);
        setfilteredIngredients(
          selectedIngredients.filter((ingredient) => 
            ingredient.meals?.get(selectedDay).includes(item)
          )
        );
      }}>
      <Text style={styles.dayText}>{item}</Text>
    </TouchableOpacity>
  );

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
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item)}>
          <Text style={styles.buttonText}>Delete</Text>
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
          data={daysOfWeek}
          renderItem={renderDayItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <FlatList
          data={mealOptions}
          renderItem={renderMealItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <FlatList
          data={filteredIngredients}
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
    zIndex: -1000,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  dayContainer: {
    flexDirection: 'column',
  },

  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,
  },

  dayHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  mealContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
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
    width: 75,
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
    width: 75,
  },

  navigationContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  dayButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  selectedDayButton: {
    backgroundColor: 'green',
  },
  dayText: {
    fontWeight: 'bold',
  },
  mealsContainer: {
    flex: 1,
    padding: 20,
  },
  selectedDayText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mealButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000',
    marginTop: 10,
  },
};

export default MealsPlanningScreen;
