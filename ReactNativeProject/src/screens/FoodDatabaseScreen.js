import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const dismissKeyboard = () => {
  Keyboard.dismiss();
};

const FoodDatabaseScreen = () => {
  const [search, setSearch] = useState();
  const [ingredient, setIngredient] = useState(null);

  const fetchData = async () => {
    try {
      const API_ENDPOINT = 'https://api.edamam.com/api/food-database/v2/parser';
      const API_KEY = '7a6626c0cc8f1ce64be0652e414a6fda';
      const API_ID = 'a21c5bfa';
      const query = search;

      console.log(query);

      const url = `${API_ENDPOINT}?ingr=${query}&app_id=${API_ID}&app_key=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      console.log(data);

      if (data.hints && data.hints.length > 0 && data.hints[0].food) {
        setIngredient(data.hints[0].food);
        console.log(ingredient);
      } else {
        setIngredient(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.text}>Search your food items</Text>

        <View style={styles.searchBar}>
          <TextInput onChangeText={setSearch} value={search} style={styles.input} />

          <TouchableOpacity style={styles.button} onPress={fetchData}>
            <MaterialCommunityIcons name="magnify" size={40} color="white" style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View>
          {ingredient && (
            <View>
              <Text>{ingredient.label}</Text>
              <Image source={{ uri: ingredient.image }} style={{ width: 100, height: 100 }} />
              <Text>Per 100g :</Text>
              <Text>{ingredient.nutrients.ENERC_KCAL} kcal</Text>
              <Text>Fat : {Math.floor(ingredient.nutrients.FAT*100)/100} g</Text>
              <Text>Carbohydrate : {Math.floor(ingredient.nutrients.CHOCDF*100)/100} g</Text>
              <Text>Fiber : {Math.floor(ingredient.nutrients.FIBTG*100)/100} g</Text>
              <Text>Protein : {Math.floor(ingredient.nutrients.PROCNT*100)/100} g</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  input: {
    height: 40,
    margin: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#424B54',
    cursorColor: 'black',
    backgroundColor: 'white',
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
  },

  button:{
    flexDirection: 'row', 
    alignSelf: 'center',
    borderRadius : 50,
    backgroundColor: '#424B54',
  }
});

export default FoodDatabaseScreen;
