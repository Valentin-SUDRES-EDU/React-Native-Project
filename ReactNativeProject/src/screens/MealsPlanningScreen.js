import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MealSelectionModal from '../components/MealSelectionModal.js';
import BMRContext from '../context/BMRContext.js';
import {
  useSelectedIngredients,
  useSelectedIngredientsDispatch,
} from '../context/SelectedIngredientsContext.js';

const MealsPlanningScreen = () => {
  const { BMR, setBMR } = useContext(BMRContext);

  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedMeal, setSelectedMeal] = useState('Breakfast');
  const selectedIngredients = useSelectedIngredients();
  const setSelectedIngredients = useSelectedIngredientsDispatch();

  const [filteredIngredients, setfilteredIngredients] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [totalDayCalories, setTotalDayCalories] = useState(0);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealOptions = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];

  const calculateTotalMealCalories = () => {
    let totalCalories = 0;
    filteredIngredients.forEach((ingredient) => {
      totalCalories += ingredient.nutritionData.calories;
    });
    return totalCalories;
  };

  const calculateTotalDayCalories = () => {
    let totalCalories = 0;
    selectedIngredients.forEach((ingredient) => {
      totalCalories += ingredient.nutritionData.calories * ingredient.meals.get(selectedDay).length;
      console.log(selectedDay);
      console.log(ingredient.meals.get(selectedDay));
    });
    setTotalDayCalories(totalCalories);
  };

  useEffect(() => {
    calculateTotalDayCalories();
  }, [selectedIngredients]);

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
      <Text style={styles.dayText}>
        {item
          .split(' ')
          .map((word) => word.substring(0, 2))
          .join(' ')}
      </Text>
    </TouchableOpacity>
  );

  const renderMealItem = ({ item }) => {
    const handleMealSelection = () => {
      setSelectedMeal(item);
      setfilteredIngredients(
        selectedIngredients.filter((ingredient) =>
          ingredient.meals?.get(selectedDay).includes(item)
        )
      );
    };

    const totalMealCalories = calculateTotalMealCalories();
    const totalDayCalories = calculateTotalDayCalories();

    return (
      <View>
        <TouchableOpacity
          style={[styles.mealButton, selectedMeal === item && styles.selectedMealButton]}
          onPress={handleMealSelection}>
          <Text style={styles.dayText}>{item}</Text>
        </TouchableOpacity>

        {selectedMeal === item && (
          <View>
            <FlatList
              data={filteredIngredients}
              renderItem={renderItem}
              keyExtractor={(item) => item.item.id}
            />
            <Text style={styles.TotMealCalText}>
              Total {selectedMeal} Calories: {totalMealCalories} kcal
            </Text>
          </View>
        )}
      </View>
    );
  };

  const handleMealSelection = (day, meals) => {
    if (selectedItem) {
      selectedItem.meals.set(day, meals);
      calculateTotalDayCalories();
    }
  };

  const onEdit = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
    calculateTotalDayCalories();
  };

  const onDelete = (item) => {
    setSelectedIngredients({ type: 'deleted', item: item.item });
    calculateTotalDayCalories();
  };

  const renderRightActions = (progress, dragX, item) => {
    return (
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(item)}>
          <MaterialCommunityIcons name="pencil" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item)}>
          <MaterialCommunityIcons name="delete" size={20} color="white" />
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
        <Text> - {item.nutritionData.calories} kcal per 100g</Text>
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
          style={styles.dayList}
          contentContainerStyle={styles.dayListContent}
        />
        <FlatList data={mealOptions} renderItem={renderMealItem} keyExtractor={(item) => item} />
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

      <Text style={styles.TotalDayCalText}>
        Total {selectedDay} Calories: {totalDayCalories} kcal
      </Text>
      {BMR && <Text style={styles.TotalDayCalText}>Reminder: Your BMR is {BMR} kcal</Text>}
      {!BMR && <Text style={styles.TotalDayCalText}>To to Health Goal to check BMR</Text>}
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
    borderLeftWidth: 8,
    borderLeftColor: 'white',
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
    width: 50,
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
    width: 50,
  },

  dayList: {
    width: '100%',
    paddingHorizontal: 0,
  },

  dayListContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 0,
  },

  dayButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginBottom: 10,
  },

  selectedDayButton: {
    backgroundColor: '#E69035',
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: '100%',
  },

  selectedMealButton: {
    borderLeftWidth: 8,
    borderLeftColor: '#DB7E1A',
    backgroundColor: '#F0B97F',
  },

  TotMealCalText: {
    textAlign: 'right',
    padding: 10,
    backgroundColor: '#DB7E1A',
    fontWeight: 'bold',
  },

  TotalDayCalText: {
    textAlign: 'right',
    padding: 10,
    fontSize: 15,
    backgroundColor: '#E69035',
    fontWeight: 'bold',
  },
};

export default MealsPlanningScreen;
