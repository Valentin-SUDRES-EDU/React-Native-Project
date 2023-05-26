import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

const HealthGoalsScreen = () => {
  const [Age, setAge] = useState();
  const [Gender, setGender] = useState();
  const [Height, setHeight] = useState();
  const [Weight, setWeight] = useState();
  const [ActivityLevel, setActivityLevel] = useState();
  const [HealthGoal, setHealthGoal] = useState();

  const handleFormSubmit = () => {
    console.log('Form submitted!');
    console.log('Age:', Age);
    console.log('Gender:', Gender);
    console.log('Height:', Height);
    console.log('Weight:', Weight);
    console.log('Activity Level:', ActivityLevel);
    console.log('Health Goal:', HealthGoal);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <StatusBar style="auto" />
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
          style={styles.picker}>
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
          style={styles.picker}>
          <Picker.Item label="Sedentary" value="1.2" />
          <Picker.Item label="Light Exercise" value="1.375" />
          <Picker.Item label="Moderate Exercise" value="1.55" />
          <Picker.Item label="Heavy Exercise" value="1.725" />
          <Picker.Item label="Extra Active" value="1.9" />
        </Picker>

        <Text style={styles.text}>Health Goal</Text>
        <Picker
          selectedValue={HealthGoal}
          onValueChange={(itemValue) => setHealthGoal(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Weight Loss" value="-500" />
          <Picker.Item label="Weight Maintenance" value="0" />
          <Picker.Item label="Weight Gain" value="+500" />
        </Picker>

        <Button title="Submit" onPress={handleFormSubmit} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },

  input: {
    height: 40,
    width: '100%',
  },

  picker: {
    marginBottom: 10,
  },

  question: {
    display: 'flex',
    flexDirection: 'row',
  },

  container: {
    marginTop: StatusBar.currentHeight || 0,
    margin: 20,
  },
});

export default HealthGoalsScreen;
