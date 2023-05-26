import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const dismissKeyboard = () => {
  Keyboard.dismiss();
};

const FoodDatabaseScreen = () => {
  const [search, setSearch] = useState();

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Search your food items</Text>
        </View>

        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={40} color="navy" style={styles.icon} />
          <TextInput onChangeText={setSearch} value={search} style={styles.input} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },

  input: {
    height: 40,
    margin: 20,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'navy',
    cursorColor: 'black',
    backgroundColor: '#e8e8e8',
    padding: 10,
    width: '70%',
    alignItems: 'center',
    alignSelf: 'center',
  },

  text: {
    width: '100%',
    margin: 20,
    textAlign: 'center',
    fontSize: 30,
    alignItems: 'center',
    alignSelf: 'center',
  },

  searchBar: {
    display: 'flex',
    flexDirection: 'row',
  },

  icon: {
    alignSelf: 'center',
    marginLeft: 20,
  },
});

export default FoodDatabaseScreen;
