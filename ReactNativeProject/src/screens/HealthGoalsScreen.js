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
} from 'react-native';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [Age, setAge] = useState();
  const [Gender = 'Male', setGender] = useState();
  const [Height, setHeight] = useState();
  const [Weight, setWeight] = useState();
  const [ActivityLevel = '1.2', setActivityLevel] = useState();
  const [HealthGoal = '-500', setHealthGoal] = useState();
  const [BMR, setBMR] = useState();
  const [BMRActivityLevel, setBMRActivityLevel] = useState();
  const [BMRHealthGoal, setBMRHealthGoal] = useState();

  const handleFormSubmit = () => {
    const BMR = calculateBMR();
    const BMRActivityLevel = adjustBMRWithActivityLevel(BMR);
    const BMRHealthGoal = adjustBMRWithHealthGoal(BMRActivityLevel);

    setBMR(BMR);
    setBMRActivityLevel(BMRActivityLevel);
    setBMRHealthGoal(BMRHealthGoal);

    setShowModal(true);
  };

  const calculateBMR = () => {
    let BMR = 0;

    if (Gender === 'Male') {
      // BMR = 88.362 + (13.397 * weight in kg) + (4.799 * height in cm) - (5.677 * age in years)
      BMR = 88.362 + 13.397 * Weight + 4.799 * Height - 5.677 * Age;
    } else if (Gender === 'Female') {
      //BMR = 447.593 + (9.247 * weight in kg) + (3.098 * height in cm) - (4.330 * age in years)
      BMR = 447.593 + 9.247 * Weight + 3.098 * Height - 4.33 * Age;
    }

    return Math.floor(BMR);
  };

  const adjustBMRWithActivityLevel = (BMR) => {
    let BMRActivityLevel = BMR;
    BMRActivityLevel *= ActivityLevel;

    return Math.floor(BMRActivityLevel);
  };

  const adjustBMRWithHealthGoal = (BMRActivityLevel) => {
    const BMRHealthGoal = BMRActivityLevel;

    switch (HealthGoal) {
      case '-500':
        return Math.floor(BMRHealthGoal - 500);
      case '0':
        return BMRHealthGoal;
      case '+500':
        return Math.floor(BMRHealthGoal + 500);
      default:
        return BMRHealthGoal;
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={Gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}>
              <Picker.Item label="Homme" value="male" />
              <Picker.Item label="Femme" value="female" />
            </Picker>
          </View>

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
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={ActivityLevel}
              onValueChange={(itemValue) => setActivityLevel(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}>
              <Picker.Item label="Sedentary" value="1.2" />
              <Picker.Item label="Light Exercise" value="1.375" />
              <Picker.Item label="Moderate Exercise" value="1.55" />
              <Picker.Item label="Heavy Exercise" value="1.725" />
              <Picker.Item label="Extra Active" value="1.9" />
            </Picker>
          </View>

          <Text style={styles.text}>Health Goal</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={HealthGoal}
              onValueChange={(itemValue) => setHealthGoal(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}>
              <Picker.Item label="Weight Loss" value="-500" />
              <Picker.Item label="Weight Maintenance" value="0" />
              <Picker.Item label="Weight Gain" value="+500" />
            </Picker>
          </View>

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
    fontSize: 14,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  // pickerContainer: {
  //   height: 40,
  //   width: '100%',
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   marginBottom: 10,
  //   paddingHorizontal: 10,
  // },
  picker: {
    height: 125,
    margin: 0,
  },
  pickerItem: {
    height: 125,
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

export default App;
