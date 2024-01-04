import React from 'react';
import {View, TouchableOpacity, Text, Appearance} from 'react-native';
import {hexToRGB, styleCheck} from "../choose-exercise/utilities";
import muscleFilter from "../../utils/MuscleFilter";

const ExerciseButtons = ({ handleClear, saveExercise, muscle }) => {
    const colorScheme = Appearance.getColorScheme();
    const muscleColor = `rgba(${hexToRGB(styleCheck(muscle, false).backgroundColor)}, 1)`;
    const muscleColorTransparent = `rgba(${hexToRGB(styleCheck(muscle, false).backgroundColor)}, 0.1)`;
    const colors = {
        background: colorScheme === 'dark' ? '#000' : '#fff',
        text: colorScheme === 'dark' ? '#fff' : '#000',
        // ...add more color properties as needed
    };

    return (
        <View style={[styles.buttonsContainer, {backgroundColor: colors.background}]}>
            <TouchableOpacity style={[styles.saveButton, {backgroundColor: muscleColor}]} onPress={saveExercise}>
                <Text style={[styles.saveButtonText, {color: colors.background}]}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ExerciseButtons;

const styles = {
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#111',
        marginTop: 10,
    },
    saveButton: {
        marginTop: 10,
        padding: 10,
        width: 220,
        alignItems: 'center',
        alignSelf: 'center',
        marginHorizontal: 30,
        borderRadius: 10

    },
    clearButton: {
        marginTop: 10,
        padding: 7,
        width: 100,
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 3,
        marginHorizontal: 30,
        borderRadius: 10,
    },
    clearButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    saveButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
}