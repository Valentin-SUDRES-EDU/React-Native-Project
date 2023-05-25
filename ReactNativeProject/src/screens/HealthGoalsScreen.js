import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';

const HealthGoalsScreen = () => {
  // const [selectedAge, setSelectedAge] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedActivityLevel, setSelectedActivityLevel] = useState();
  const [selectedHealthGoal, setSelectedHealthGoal] = useState();

  // const ages = [];
  // for (let i = 0; i < 100; i++) {
  //   ages.push(<Picker.Item label={i} value={i} />);
  // }

  return (
    <View>
      {/* <Text>Age</Text>
      <Picker
        selectedValue={selectedAge}
        onValueChange={(itemValue, itemIndex) => setSelectedAge(itemValue)}>
        {ages}
      </Picker> */}

      <Text>Sexe</Text>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedLanguage(itemValue)
        }>
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>

      <Text>Activity level</Text>
      <Picker
        selectedValue={selectedActivityLevel}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedActivityLevel(itemValue)
        }>
        <Picker.Item label="Sedentary" value="1.2" />
        <Picker.Item label="Light Exercise" value="1.375" />
        <Picker.Item label="Moderate Exercise" value="1.55" />
        <Picker.Item label="Heavy Exercise" value="1.725" />
        <Picker.Item label="Extra Active" value="1.9" />
      </Picker>

      <Text>Health Goal</Text>
      <Picker
        selectedValue={selectedHealthGoal}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedHealthGoal(itemValue)
        }>
        <Picker.Item label="Weight Loss" value="-500" />
        <Picker.Item label="Weight Maintenance" value="0" />
        <Picker.Item label="Weight Gain" value="+500" />
      </Picker>

    </View>
  );
};

export default HealthGoalsScreen;
