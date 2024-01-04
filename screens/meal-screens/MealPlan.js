import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Header from '../../utils/Header';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {} from '@fortawesome/free-solid-svg-icons';

const MealPlan = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const mealPlans = [
    { id: 1, title: 'Keto Diet Plan' },
    { id: 2, title: 'Vegan Diet Plan' },
    { id: 3, title: 'Low Carb Diet Plan' },
    // Add more pre-made meal plans here
  ];

  const handleCreateCustomPlan = () => {
    // Navigate to custom meal plan creation screen
    // Replace 'CustomMealPlanScreen' with the name of your custom plan creation screen
    navigation.navigate('CustomMealPlanScreen');
  };

  function handleClose() {
    navigation.goBack();
  }

  const renderMealPlan = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.mealPlanCard}
        onPress={() => {
          // Handle meal plan selection
          console.log('Selected meal plan:', item.title);
        }}
      >
        <Text style={styles.mealPlanTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{
        flex: 1,
        color: 'white',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
    }}>
        <Header
            handleClose={handleClose}
            screenName={'Meal Plans'} 
        />
      <FlatList
        style
        data={mealPlans}
        renderItem={renderMealPlan}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.createCustomPlanButton}
        onPress={handleCreateCustomPlan}
      >
        <Text style={styles.buttonText}>Create Custom Meal Plan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  mealPlanCard: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  mealPlanTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  createCustomPlanButton: {
    backgroundColor: '#3F51B5FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MealPlan;
