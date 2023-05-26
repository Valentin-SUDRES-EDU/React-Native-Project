import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FoodDatabaseScreen = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

  const fetchData = async () => {
    dismissKeyboard();
    try {
      const API_ENDPOINT = 'https://api.edamam.com/api/food-database/v2/parser';
      const API_KEY = '7a6626c0cc8f1ce64be0652e414a6fda';
      const API_ID = 'a21c5bfa';
      const query = search;

      const url = `${API_ENDPOINT}?ingr=${query}&app_id=${API_ID}&app_key=${API_KEY}`;

      const response = await fetch(url);
      const result = await response.json();

      if (result.hints && result.hints.length > 0) {
        setData(result.hints.map((hint) => hint.food));
      } else {
        setData([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const RoundValue = (value, places) => {
    if (isNaN(value)) value = 0;
    return Math.floor(value * Math.pow(10, places)) / Math.pow(10, places);
  };

  const renderFoodItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemContainerTitle}>{truncateText(item.label, 20)}</Text>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : (
        <MaterialCommunityIcons
          name="image-off-outline"
          color="lightgrey"
          size={100}
          style={styles.image}
        />
      )}
      <Text style={styles.itemContainerText}>
        Per 100g: {RoundValue(item.nutrients.ENERC_KCAL, 2)} kcal
      </Text>
      <Text style={styles.itemContainerText}>Fat: {RoundValue(item.nutrients.FAT, 2)} g</Text>
      <Text style={styles.itemContainerText}>Fiber: {RoundValue(item.nutrients.FIBTG, 2)} g</Text>
      <Text style={styles.itemContainerText}>
        Protein: {RoundValue(item.nutrients.PROCNT, 2)} g
      </Text>
      <Text style={styles.itemContainerText}>
        Carbohydrate: {RoundValue(item.nutrients.CHOCDF, 2)} g
      </Text>
    </View>
  );

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <SafeAreaView>
        <Text style={styles.text}>Search your food items</Text>
        <View style={styles.searchBar}>
          <TextInput
            onChangeText={setSearch}
            value={search}
            style={styles.input}
            onSubmitEditing={fetchData}
            placeholder="Enter a food name to get data on it"
          />
          <TouchableOpacity style={styles.button} onPress={fetchData}>
            <MaterialCommunityIcons name="magnify" size={40} color="white" style={styles.icon} />
          </TouchableOpacity>
        </View>

        <ScrollView>
          <FlatList
            data={data}
            renderItem={renderFoodItem}
            keyExtractor={(item) => item.foodId}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    width: '100%',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 30,
    alignItems: 'center',
    alignSelf: 'center',
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
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
  button: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 50,
    backgroundColor: '#424B54',
  },

  listContainer: {
    justifyContent: 'space-between',
  },

  itemContainer: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#424B54',
    cursorColor: 'black',
    backgroundColor: 'white',
    margin: 5,
  },

  itemContainerTitle: {
    alignSelf: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 15,
  },

  itemContainerText: {
    alignSelf: 'center',
    marginBottom: 2,
    fontSize: 12,
  },

  image: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default FoodDatabaseScreen;
