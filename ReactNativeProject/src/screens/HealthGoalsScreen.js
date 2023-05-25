import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const HealthGoalsScreen = () => {
  const [age, setAge] = useState();
  const [taille, setTaille] = useState();
  const [poids, setPoids] = useState();
  const [sexe, setSexe] = useState();
  const [ActivityLevel, setActivityLevel] = useState();
  const [HealthGoal, setHealthGoal] = useState();

  return (
    <View>
      <View style={styles.question}>
        <Text style={styles.text}>Age</Text>
        <TextInput onChangeText={setAge} value={age} keyboardType="numeric" style={styles.input} />
      </View>

      <Text>Sexe</Text>
      <Picker selectedValue={sexe} onValueChange={(itemValue, itemIndex) => setSexe(itemValue)}>
        <Picker.Item label="Homme" value="male" />
        <Picker.Item label="Femme" value="female" />
      </Picker>

      <View style={styles.question}>
        <Text style={styles.text}>Taille</Text>
        <TextInput
          onChangeText={setTaille}
          value={taille}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.question}>
        <Text style={styles.text}>Poids</Text>
        <TextInput
          onChangeText={setPoids}
          value={poids}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <Text>Activity level</Text>
      <Picker
        selectedValue={ActivityLevel}
        onValueChange={(itemValue, itemIndex) => setActivityLevel(itemValue)}>
        <Picker.Item label="Sedentary" value="1.2" />
        <Picker.Item label="Light Exercise" value="1.375" />
        <Picker.Item label="Moderate Exercise" value="1.55" />
        <Picker.Item label="Heavy Exercise" value="1.725" />
        <Picker.Item label="Extra Active" value="1.9" />
      </Picker>

      <Text>Health Goal</Text>
      <Picker
        selectedValue={HealthGoal}
        onValueChange={(itemValue, itemIndex) => setHealthGoal(itemValue)}>
        <Picker.Item label="Weight Loss" value="-500" />
        <Picker.Item label="Weight Maintenance" value="0" />
        <Picker.Item label="Weight Gain" value="+500" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '70%',
    alignItems: 'center',
    alignSelf: 'center',
  },

  text: {
    width: '30%',
    fontSize: 30,
    alignItems: 'center',
    alignSelf: 'center',
  },

  question: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default HealthGoalsScreen;
