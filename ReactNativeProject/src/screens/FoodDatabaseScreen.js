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
  Modal,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { v4 as uuidv4 } from 'uuid';

import MealSelectionModal from '../components/MealSelectionModal.js';
import {
  useSelectedIngredients,
  useSelectedIngredientsDispatch,
} from '../context/SelectedIngredientsContext.js';

const FoodDatabaseScreen = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [isNoResults, setIsNoResults] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedMeals, setSelectedMeals] = useState(new Map());
  const [nutritionData, setNutritionData] = useState(null);
  const selectedIngredients = useSelectedIngredients();
  const setSelectedIngredients = useSelectedIngredientsDispatch();
  const [autoCompleteData, setAutoCompleteData] = useState([]);
  const [showAutoComplete, setShowAutoComplete] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const generateUniqueId = () => {
    return uuidv4();
  };

  const fetchData = async (selectedAutoCompleteItem = '') => {
    setData([]);
    setNextPageUrl();
    dismissKeyboard();
    setShowAutoComplete(false);
    try {
      const API_ENDPOINT = 'https://api.edamam.com/api/food-database/v2/parser';
      const API_KEY = '7a6626c0cc8f1ce64be0652e414a6fda';
      const API_ID = 'a21c5bfa';
      const query = selectedAutoCompleteItem !== '' ? selectedAutoCompleteItem : search;

      const url = `${API_ENDPOINT}?ingr=${query}&app_id=${API_ID}&app_key=${API_KEY}`;

      const response = await fetch(url);
      const result = await response.json();

      if (result.hints && result.hints.length > 0) {
        setIsNoResults(false);
        setData(result.hints.map((hint) => ({ ...hint.food, id: generateUniqueId() })));
        if (result._links && result._links.next) setNextPageUrl(result._links.next?.href || null);
      } else {
        setData([]);
        setNextPageUrl(null);
        setIsNoResults(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEndReached = async () => {
    if (nextPageUrl) {
      try {
        const response = await fetch(nextPageUrl);
        const result = await response.json();

        if (result.hints && result.hints.length > 0) {
          setData((prevData) => [
            ...prevData,
            ...result.hints.map((hint) => ({ ...hint.food, id: generateUniqueId() })),
          ]);
          if (result._links && result._links.next) setNextPageUrl(result._links.next?.href || null);
        } else {
          setData([]);
          setNextPageUrl(null);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchAutoCompleteData = async (text) => {
    try {
      const API_ENDPOINT = 'https://api.edamam.com/auto-complete';
      const API_KEY = '7a6626c0cc8f1ce64be0652e414a6fda';
      const API_ID = 'a21c5bfa';
      const search = text;

      const url = `${API_ENDPOINT}?q=${search}&limit=10&app_id=${API_ID}&app_key=${API_KEY}`;

      const response = await fetch(url);
      const result = await response.json();

      if (result) {
        setAutoCompleteData(result);
      } else {
        setAutoCompleteData([]);
        setShowAutoComplete(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAutoComplete = (text) => {
    setSearch(text);
    if (text.length >= 2) {
      fetchAutoCompleteData(text);
      setShowAutoComplete(true);
    } else {
      setAutoCompleteData([]);
      setShowAutoComplete(false);
    }
  };

  const handleAutoCompleteSelection = (selectedItem) => {
    setSearch(selectedItem);
    fetchData(selectedItem);
    setShowAutoComplete(false);
  };

  const fetchNutritionInfo = async (selectedItem) => {
    if (selectedItem) {
      try {
        const API_ENDPOINT = 'https://api.edamam.com/api/food-database/v2/nutrients';
        const API_KEY = '7a6626c0cc8f1ce64be0652e414a6fda';
        const API_ID = 'a21c5bfa';

        const url = `${API_ENDPOINT}?app_id=${API_ID}&app_key=${API_KEY}`;

        const requestData = {
          ingredients: [{ quantity: 100, measureURI: 'g', foodId: selectedItem.foodId }],
        };

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        const result = await response.json();

        setNutritionData(result ? result : null);
      } catch (error) {
        console.error(error);
      }
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

  const isItemSelected = (item) => {
    return selectedIngredients.some((selectedItem) => selectedItem.item.id === item.id);
  };

  const handleMealSelection = (day, meals) => {
    if (selectedMeals) {
      if (!selectedMeals) setSelectedMeals(new Map());
      selectedMeals.set(day, meals);
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderFoodItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.itemContainer, item === selectedItem && styles.selectedItemContainer]}
      onPress={() => {
        setSelectedItem(item);
        fetchNutritionInfo(item);
      }}>
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
    </TouchableOpacity>
  );

  const Table = ({ nutritionData }) => {
    const renderTableRow = (label, quantity, unit) => {
      return (
        <View key={label} style={styles.tableRow}>
          <Text style={styles.tableDataLeft}>{label}</Text>
          <Text style={styles.tableDataRight}>{RoundValue(quantity, 2) + ' ' + unit}</Text>
        </View>
      );
    };

    return (
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeaderLeft}>Nutrient</Text>
          <Text style={styles.tableHeaderRight}>Quantity in 100g</Text>
        </View>
        {Object.entries(nutritionData.totalNutrients).map(([key, value]) => {
          return renderTableRow(value.label, value.quantity, value.unit);
        })}
      </View>
    );
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <SafeAreaView>
        {!selectedItem && !nutritionData && (
          <View>
            <Text style={styles.text}>Search your food items</Text>
            <View style={styles.searchBar}>
              <TextInput
                onChangeText={handleAutoComplete}
                value={search}
                style={styles.input}
                onSubmitEditing={() => {
                  fetchData('');
                  setShowAutoComplete(false);
                }}
                placeholder="Enter a food name to get data on it"
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  fetchData('');
                  setShowAutoComplete(false);
                }}>
                <MaterialCommunityIcons
                  name="magnify"
                  size={40}
                  color="white"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            {showAutoComplete && (
              <FlatList
                data={autoCompleteData}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.autoCompleteItem}
                    onPress={() => handleAutoCompleteSelection(item)}>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
              />
            )}
          </View>
        )}

        {isNoResults && !showAutoComplete && <Text>No item found</Text>}

        {!selectedItem && !nutritionData && (
          <FlatList
            data={data}
            renderItem={renderFoodItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
          />
        )}

        {selectedItem && nutritionData && (
          <ScrollView>
            <View>
              <View style={styles.detailView}>
                <Text style={styles.detailTitle}>{selectedItem.label}</Text>
                {selectedItem.image ? (
                  <Image source={{ uri: selectedItem.image }} style={styles.image} />
                ) : (
                  <MaterialCommunityIcons
                    name="image-off-outline"
                    color="lightgrey"
                    size={100}
                    style={styles.image}
                  />
                )}
                <Table nutritionData={nutritionData} />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => {
                    if (isItemSelected(selectedItem)) {
                      setSelectedIngredients({ type: 'deleted', item: selectedItem });
                    } else {
                      openModal();
                    }
                  }}>
                  <Text style={styles.buttonText}>
                    {isItemSelected(selectedItem) ? 'Remove from meals planning' : 'Add to meals planning'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    setSelectedItem(null);
                    setNutritionData(null);
                  }}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
                <Modal
                  visible={modalVisible}
                  animationType="slide"
                  transparent
                  onRequestClose={() => setModalVisible(false)}>
                  <MealSelectionModal
                    handleMealSelection={handleMealSelection}
                    closeModal={() => {
                      setModalVisible(false);
                      setSelectedIngredients({
                        type: 'added',
                        item: selectedItem,
                        nutritionData,
                        meals: selectedMeals,
                      });
                    }}
                    selectedItem={{ item: selectedItem, nutritionData, meals: selectedMeals }}
                  />
                </Modal>
              </View>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: '#FFFFFF',
    padding: 10,
    width: '70%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 50,
    backgroundColor: '#3AB800',
  },
  autoCompleteItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
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

  detailView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  detailImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    alignSelf: 'center',
  },
  addButton: {
    backgroundColor: '#50C878',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  closeButton: {
    backgroundColor: '#424B54',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  tableContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#424B54',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#424B54',
  },
  tableHeaderLeft: {
    flex: 1,
    fontWeight: 'bold',
  },
  tableHeaderRight: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  tableDataLeft: {
    width: '70%',
    textAlign: 'left',
  },
  tableDataRight: {
    flex: 1,
    textAlign: 'right',
  },
});

export default FoodDatabaseScreen;
