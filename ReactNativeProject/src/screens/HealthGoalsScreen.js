import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';

const HealthGoalsScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [Age, setAge] = useState();
  const [Gender = 'male', setGender] = useState();
  const [Height, setHeight] = useState();
  const [Weight, setWeight] = useState();
  const [ActivityLevel = 'sedentary', setActivityLevel] = useState();
  const [HealthGoal = 'weightLoss', setHealthGoal] = useState();
  const [BMR, setBMR] = useState();
  const [BMRActivityLevel, setBMRActivityLevel] = useState();
  const [BMRHealthGoal, setBMRHealthGoal] = useState();

  const handleFormSubmit = () => {
    const BMR = calculateBMR();
    setBMR(BMR);

    const BMRActivityLevel = adjustBMRWithActivityLevel(BMR);
    setBMRActivityLevel(BMRActivityLevel);

    const BMRHealthGoal = adjustBMRWithHealthGoal(BMRActivityLevel);
    setBMRHealthGoal(BMRHealthGoal);

    setShowModal(true);
  };

  const calculateBMR = () => {
    let BMR = 0;

    if (Gender === 'male') {
      // BMR = 88.362 + (13.397 * weight in kg) + (4.799 * height in cm) - (5.677 * age in years)
      BMR = 88.362 + 13.397 * Weight + 4.799 * Height - 5.677 * Age;
    } else if (Gender === 'female') {
      //BMR = 447.593 + (9.247 * weight in kg) + (3.098 * height in cm) - (4.330 * age in years)
      BMR = 447.593 + 9.247 * Weight + 3.098 * Height - 4.33 * Age;
    }

    return Math.floor(BMR);
  };

  const adjustBMRWithActivityLevel = (BMR) => {
    const BMRActivityLevel = BMR;

    switch (ActivityLevel) {
      case 'sedentary':
        return Math.floor(BMRActivityLevel * 1.2);
      case 'light':
        return Math.floor(BMRActivityLevel * 1.375);
      case 'moderate':
        return Math.floor(BMRActivityLevel * 1.55);
      case 'heavy':
        return Math.floor(BMRActivityLevel * 1.725);
      case 'extra':
        return Math.floor(BMRActivityLevel * 1.9);
      default:
        return Math.floor(BMRActivityLevel * 1.2);
    }
  };

  const adjustBMRWithHealthGoal = (BMRActivityLevel) => {
    const BMRHealthGoal = BMRActivityLevel;

    switch (HealthGoal) {
      case 'weightLoss':
        return Math.floor(BMRHealthGoal - 500);
      case 'weightMaintain':
        return BMRHealthGoal;
      case 'weightGain':
        return Math.floor(BMRHealthGoal + 500);
      default:
        return BMRHealthGoal;
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <Text style={styles.text}>Age</Text>
          <TextInput
            value={Age}
            onChangeText={setAge}
            keyboardType="numeric"
            placeholder="Enter your age"
            style={styles.input}
          />

          <Text style={styles.text}>Gender</Text>
          <Picker
            selectedValue={Gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={[Platform.OS === 'ios' && styles.picker]}
            itemStyle={[Platform.OS === 'ios' && styles.pickerItem]}>
            <Picker.Item label="Homme" value="male" />
            <Picker.Item label="Femme" value="female" />
          </Picker>

          <Text style={styles.text}>Height</Text>
          <TextInput
            value={Height}
            onChangeText={setHeight}
            keyboardType="numeric"
            placeholder="Enter your height"
            style={styles.input}
          />

          <Text style={styles.text}>Weight</Text>
          <TextInput
            value={Weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            placeholder="Enter your weight"
            style={styles.input}
          />

          <Text style={styles.text}>Activity level</Text>
          <Picker
            selectedValue={ActivityLevel}
            onValueChange={(itemValue) => setActivityLevel(itemValue)}
            style={[Platform.OS === 'ios' && styles.picker]}
            itemStyle={[Platform.OS === 'ios' && styles.pickerItem]}>
            <Picker.Item label="Sedentary" value="sedentary" />
            <Picker.Item label="Light Exercise" value="light" />
            <Picker.Item label="Moderate Exercise" value="moderate" />
            <Picker.Item label="Heavy Exercise" value="heavy" />
            <Picker.Item label="Extra Active" value="extra" />
          </Picker>

          <Text style={styles.text}>Health Goal</Text>
          <Picker
            selectedValue={HealthGoal}
            onValueChange={(itemValue) => setHealthGoal(itemValue)}
            style={[Platform.OS === 'ios' && styles.picker]}
            itemStyle={[Platform.OS === 'ios' && styles.pickerItem]}>
            <Picker.Item label="Weight Loss" value="weightLoss" />
            <Picker.Item label="Weight Maintenance" value="weightMaintain" />
            <Picker.Item label="Weight Gain" value="weightGain" />
          </Picker>

          <Button
            title="Submit"
            onPress={handleFormSubmit}
            disabled={!Age || !Height || !Weight}
            style={styles.button}
          />

          <Modal visible={showModal} animationType="slide" transparent>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text>Your BMR is: {BMR} kcal</Text>
                <Text>Your BMR adjusted based on Activity Level is: {BMRActivityLevel} kcal</Text>
                <Text>Your Caloric intake based on Health Goal is: {BMRHealthGoal} kcal</Text>
                <Button title="Close" onPress={() => setShowModal(false)} />
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    marginBottom: 10,
    fontSize: 18,
  },
  input: {
    height: 40,
    marginBottom: 25,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#424B54',
    backgroundColor: '#FFFFFF',
    paddingLeft: 20,
    width: '95%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  picker: {
    height: 100,
    marginBottom: 15,
    marginTop: -10,
  },
  pickerItem: {
    height: 100,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  button: {
    marginBottom: 50,
  },
});

export default HealthGoalsScreen;
