import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const MealSelectionModal = ({ handleMealSelection, closeModal, selectedItem }) => {
  const [selectedMeals, setSelectedMeals] = useState(selectedItem.meals);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealOptions = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];

  const toggleMealSelection = (day, meal) => {
    setSelectedMeals((prevSelectedMeals) => {
      const updatedMeals = new Map(prevSelectedMeals);

      if (updatedMeals.has(day)) {
        const meals = updatedMeals.get(day);

        if (meals.includes(meal)) {
          const updatedMealsList = meals.filter((m) => m !== meal);
          updatedMeals.set(day, updatedMealsList);
        } else {
          const updatedMealsList = [...meals, meal];
          updatedMeals.set(day, updatedMealsList);
        }
      } else {
        updatedMeals.set(day, [meal]);
      }

      return updatedMeals;
    });
  };

  const saveSelection = () => {
    daysOfWeek.forEach((day) => {
      const meals = selectedMeals.get(day) || [];
      handleMealSelection(day, meals);
    });
    closeModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Select Days and Meals</Text>
        {daysOfWeek.map((day) => (
          <View key={day} style={styles.dayContainer}>
            <Text style={styles.dayText}>{day}</Text>
            <View style={styles.mealsContainer}>
              {mealOptions.map((meal) => (
                <TouchableOpacity
                  key={meal}
                  style={[
                    styles.mealButton,
                    selectedMeals.get(day)?.includes(meal) && styles.selectedMealButton,
                  ]}
                  onPress={() => toggleMealSelection(day, meal)}>
                  <Text style={styles.mealButtonText}>{meal}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.saveButton} onPress={saveSelection}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dayButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  selectedDayButton: {
    backgroundColor: 'green',
  },
  dayText: {
    fontWeight: 'bold',
    width: 75,
    fontSize: 12,
  },
  mealsContainer: {
    flexDirection: 'row',
  },
  mealButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    marginLeft: 10,
  },
  mealButtonText: {
    fontSize: 8,
  },
  selectedMealButton: {
    backgroundColor: 'green',
  },
  saveButton: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
};

export default MealSelectionModal;
