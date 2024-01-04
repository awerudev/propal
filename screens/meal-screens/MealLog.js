import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, Appearance, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {UserContext} from "../login-signup/UserContext";

const MealLog = ({ navigation }) => {

    const EGG_WHITE_AMOUNT = 4;
    const WHOLE_EGG_AMOUNT = 2;
    const OATS_AMOUNT = 60; // in grams
    const GREEK_YOGURT_AMOUNT = 1;
    const CHICKEN_BREAST_AMOUNT = 200; // in grams
    const RICE_AMOUNT = 400; // in grams
    const POTATO_AMOUNT = 200; // in grams
    const CORNFLAKES_AMOUNT = 100; // in grams
    const WHEY_ISOLATE_AMOUNT = 50; // in grams
    const BANANA_AMOUNT = 1;

    const { userDetails, setUserDetails } = useContext(UserContext);
    const colorScheme = Appearance.getColorScheme();
    const colors = {
        background: colorScheme === 'dark' ? '#000' : '#eee',
        text: colorScheme === 'dark' ? '#fff' : '#000',
        // ...add more color properties as needed
    };

    const nutritionalValues = {
        'egg white': { weight: 33, calories: 17, protein: 3.6, carbohydrates: 0.2, fats: 0.1 },
        'whole egg': { weight: 50, calories: 68, protein: 5.5, carbohydrates: 0.4, fats: 4.8 },
        'oat': { weight: 100, calories: 389, protein: 16.9, carbohydrates: 66.3, fats: 6.9 },
        'greek yoghurt': { weight: 100, calories: 59, protein: 10, carbohydrates: 3.6, fats: 0.4 },
        'chicken breast': { weight: 100, calories: 165, protein: 31, carbohydrates: 0, fats: 3.6 },
        'rice': { weight: 100, calories: 130, protein: 2.7, carbohydrates: 28, fats: 0.3 },
        'salad': { weight: 100, calories: 15, protein: 1.2, carbohydrates: 3, fats: 0.2 },
        'fruit': { weight: 100, calories: 52, protein: 0.5, carbohydrates: 13.8, fats: 0.2 },
        'potatoe': { weight: 100, calories: 77, protein: 2, carbohydrates: 17.6, fats: 0.1 },
        'cornflake': { weight: 100, calories: 380, protein: 7, carbohydrates: 84, fats: 0.9 },
        'whey isolate': { weight: 100, calories: 110, protein: 25, carbohydrates: 2, fats: 0.5 },
        'banana': { weight: 100, calories: 89, protein: 1.1, carbohydrates: 22.8, fats: 0.3 },
    };

    const meals = [
        {
            name: 'Meal 1',
            ingredients: [
                { name: `${EGG_WHITE_AMOUNT} egg whites`, image: require('../../assets/food/eggs.png') },
                { name: `${WHOLE_EGG_AMOUNT} whole eggs`, image: require('../../assets/food/eggs.png') },
                { name: `${OATS_AMOUNT} oats`, image: require('../../assets/food/cornflakes.png')},
                { name: `${GREEK_YOGURT_AMOUNT} greek yoghurt`, image: require('../../assets/food/yogurt.png')},
            ],
            totalCalories: 0, // These will be calculated later
            macros: {
                protein: 0,
                carbohydrates: 0,
                fats: 0
            },
        },
        {
            name: 'Meal 2',
            ingredients: [
                { name: `${CHICKEN_BREAST_AMOUNT}g chicken breast`, image: require('../../assets/food/chicken-breast.png') },
                { name: `${RICE_AMOUNT}g rice`, image: require('../../assets/food/rice.png') },
                { name: 'salad', image: require('../../assets/food/salad.png')},
                { name: '1 piece of fruit', image: require('../../assets/food/fruits.png')},
            ],
            totalCalories: 0,
            macros: {
                protein: 0,
                carbohydrates: 0,
                fats: 0
            },
        },
        {
            name: 'Meal 3',
            ingredients: [
                { name: `${CHICKEN_BREAST_AMOUNT}g chicken breast`, image: require('../../assets/food/chicken-breast.png') },
                { name: `${POTATO_AMOUNT}g potatoes`, image: require('../../assets/food/potato.png') },
                { name: 'salad', image: require('../../assets/food/salad.png')},
            ],
            totalCalories: 0,
            macros: {
                protein: 0,
                carbohydrates: 0,
                fats: 0
            },
        },
        {
            name: 'Post Workout Meal',
            ingredients: [
                { name: `${CORNFLAKES_AMOUNT}g cornflakes`, image: require('../../assets/food/corn.png') },
                { name: `${WHEY_ISOLATE_AMOUNT}g whey isolate`, image: require('../../assets/food/protein-shake.png') },
                { name: `${BANANA_AMOUNT} banana`, image: require('../../assets/food/banana.png')},
            ],
            totalCalories: 0,
            macros: {
                protein: 0,
                carbohydrates: 0,
                fats: 0
            },
        },
        {
            name: 'Meal 4',
            ingredients: [
                { name: `${EGG_WHITE_AMOUNT} egg whites`, image: require('../../assets/food/eggs.png') },
                { name: `${WHOLE_EGG_AMOUNT} whole eggs`, image: require('../../assets/food/eggs.png') },
                { name: `${GREEK_YOGURT_AMOUNT} greek yoghurt`, image: require('../../assets/food/yogurt.png')},
            ],
            totalCalories: 0,
            macros: {
                protein: 0,
                carbohydrates: 0,
                fats: 0
            },
        },
    ];

    const parseIngredient = (ingredientStr) => {
        const parts = ingredientStr.split(' ');
        let amount = 1; // default
        let name = ingredientStr;

        // Check if the first part is a number or contains 'g'
        if (!isNaN(parts[0]) || parts[0].endsWith('g')) {
            amount = parseFloat(parts[0]);
            name = parts.slice(1).join(' '); // get the rest of the parts as the name
        }

        // Special handling for eggs
        if (name.includes('egg white') || name.includes('whole egg')) {
            amount = parseFloat(parts[0]); // This will be the number of pieces, not grams
            name = name.replace(/\d+/g, '').trim(); // Remove the number from the name
        }

        // Convert plurals to singular for lookup
        if (name.endsWith('s')) {
            name = name.slice(0, -1);
        }

        return { amount, name };
    };

    meals.forEach(meal => {
        let totalCalories = 0;
        let totalProtein = 0;
        let totalCarbs = 0;
        let totalFats = 0;

        meal.ingredients.forEach(ingredient => {
            const { amount, name } = parseIngredient(ingredient.name);

            if (nutritionalValues[name]) {
                let weightFactor;
                if (name.includes('egg')) {
                    weightFactor = 1;
                } else if (name.includes('greek')) {
                    weightFactor = 1.5;
                } else {
                    weightFactor = nutritionalValues[name].weight ? (amount / nutritionalValues[name].weight) : (amount / 100);
                }
                const ingredientCalories = nutritionalValues[name].calories * weightFactor;
                const ingredientProtein = nutritionalValues[name].protein * weightFactor;
                const ingredientCarbs = nutritionalValues[name].carbohydrates * weightFactor;
                const ingredientFats = nutritionalValues[name].fats * weightFactor;

                totalCalories += ingredientCalories;
                totalProtein += ingredientProtein;
                totalCarbs += ingredientCarbs;
                totalFats += ingredientFats;
            } else {
                console.log(`No nutritional values found for ${name}`);
            }
        });

        meal.totalCalories = Math.round(totalCalories);
        meal.macros = {
            protein: Math.round(totalProtein),
            carbohydrates: Math.round(totalCarbs),
            fats: Math.round(totalFats),
        };
    });


    function handleClose() {
        navigation.goBack();
    }

    const renderMeal = ({ item }) => {
        return (
            <TouchableOpacity style={styles.card}>
                <View style={{
                    backgroundColor: '#ccc',
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 10,
                }}>
                    <Text style={styles.mealName}>{item.name}</Text>
                </View>
                {item.ingredients.map((ingredient, index) => {
                    const adjustedIngredient = adjustIngredient(ingredient);
                    return (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                            <Image source={adjustedIngredient.image} style={{ width: 30, height: 30, marginHorizontal: 5 }} />
                            <Text style={[styles.mealDetails, {lineHeight: 30}]}>{adjustedIngredient.name}</Text>
                        </View>
                    );
                })}
                <View style={{
                    backgroundColor: "#ccc",
                    marginTop: 5,
                    padding: 10,
                    borderRadius: 5
                }}>
                    <Text style={[styles.mealDetails, {fontWeight: '600'}]}>Total Calories: {item.totalCalories}</Text>
                    <Text style={[styles.mealDetails, {fontWeight: '600'}]}>Protein: {item.macros.protein}g</Text>
                    <Text style={[styles.mealDetails, {fontWeight: '600'}]}>Carbohydrates: {item.macros.carbohydrates}g</Text>
                    <Text style={[styles.mealDetails, {fontWeight: '600'}]}>Fats: {item.macros.fats}g</Text>
                </View>
            </TouchableOpacity>
        );
    };

    function adjustIngredient(ingredient) {
        const amountRegex = /^(\d+\.?\d*)/; // This regex will also match decimal numbers
        const match = ingredient.name.match(amountRegex);

        if (!match) return ingredient; // If there's no match, return the ingredient unchanged

        const amount = parseFloat(match[1]);
        let adjustedAmount = amount;

        if (userDetails.goal === 'muscle') {
            adjustedAmount = Math.round(amount * 1.2); // Increase by 20% for muscle gain
        } else if (userDetails.goal === 'weight_loss') {
            adjustedAmount = Math.round(amount * 0.8); // Decrease by 20% for weight loss
        } else if (userDetails.goal === 'maintain') {
            adjustedAmount = amount; // No change for maintenance
        }

        // Replace the original amount with the adjusted amount in the ingredient name
        const adjustedName = ingredient.name.replace(amountRegex, adjustedAmount.toString());

        return {
            ...ingredient,
            name: adjustedName
        };
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={[styles.header, {backgroundColor: 'white'}]}>
                <TouchableOpacity onPress={handleClose} style={{
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    width: "20%",
                    height: 40
                }}>
                    <FontAwesomeIcon icon={faArrowLeft} size={24} color={colors.text}/>
                </TouchableOpacity>
                <Text style={[styles.headerTitle, {width: '60%'}]}>Meal Plans</Text>
            </View>
            {/*<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginTop: 30, paddingHorizontal: 10 }}>
                <View style={styles.card_sm}>
                    <Text style={{ fontSize: 18, color: '#97B8FE' }}>{20} carbs</Text>
                    <Text>Weight</Text>
                </View>
                <View style={styles.card_sm}>
                    <Text style={{ fontSize: 18, color: '#97B8FE' }}>{30} fats</Text>
                    <Text>BMI</Text>
                </View>
                <View style={styles.card_sm}>
                    <Text style={{ fontSize: 18, color: '#97B8FE' }}>{40} protein</Text>
                    <Text>Body Fat</Text>
                </View>
                <View style={styles.card_sm}>
                    <Text style={{ fontSize: 18, color: '#97B8FE' }}>{40} protein</Text>
                    <Text>Body Fat</Text>
                </View>
            </View>*/}
            <View style={styles.container}>
                {meals && (
                    <FlatList
                        data={meals}
                        renderItem={renderMeal}
                        keyExtractor={item => item.name}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    mealName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    mealDetails: {
        fontSize: 14,
        marginBottom: 5,
    },
    header: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        alignItems: 'center',
        textAlign: 'center',
    },
    card_sm: {
        backgroundColor: '#fff',
        borderRadius: 20,
        height: 70,
        width: '20%',
        justifyContent: 'space-between',
        paddingVertical: 10,
        alignItems: 'center',
        shadowColor: "#000", // This is your box shadow color
        shadowOffset: {
            width: 0,   // These are your box shadow offsets
            height: 2,
        },
        shadowOpacity: 0.23,  // This is your box shadow opacity
        shadowRadius: 2.62,  // This is your box shadow radius
        elevation: 4,  // This adds shadow to Android and needs to be used in conjunction with the above properties
    }
});

export default MealLog;
