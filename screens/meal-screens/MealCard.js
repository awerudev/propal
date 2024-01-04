import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheckCircle, faCircle} from '@fortawesome/free-solid-svg-icons';

const MealCard = ({meal}) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxToggle = () => {
        setIsChecked(!isChecked);
    };

    return (
        <TouchableOpacity
            style={[styles.card, isChecked && styles.checkedCard]}
            onPress={handleCheckboxToggle}
        >
            <View style={styles.mealInfo}>
                <View style={styles.titleContainer}>
                    <Text style={styles.mealName}>{meal.name}</Text>
                    <FontAwesomeIcon
                        icon={isChecked ? faCheckCircle : faCircle}
                        size={20}
                        color="white"
                    />
                </View>
                {meal.ingredients.map((ingredient, index) => (
                    <Text key={index} style={styles.ingredient}>
                        {ingredient}
                    </Text>
                ))}
                <View style={{marginTop: 10}}>
                    <Text style={styles.nutritionInfo}>
                        Total Calories: {meal.totalCalories}
                    </Text>
                    <Text style={styles.nutritionInfo}>Macros: {meal.macros}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        backgroundColor: '#000',
        color: '#fff',
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#3F51B5FF',
        marginBottom: 10,
        width: '90%',
    },
    checkedCard: {
        borderColor: '#3F51B5FF',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#3F51B5FF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginBottom: 10,
        overflow: 'hidden',
    },
    mealName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    mealInfo: {
        flex: 1,
        width: '100%',
        padding: 10,
    },
    ingredient: {
        fontSize: 14,
        color: '#fff',
        marginLeft: 10,
    },
    nutritionInfo: {
        fontSize: 12,
        color: 'gray',
    },
});

export default MealCard;