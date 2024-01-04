// ExerciseDetailHeader.js
import React from 'react';
import {View, TouchableOpacity, Text, Appearance} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft, faCircleInfo, faBars} from '@fortawesome/free-solid-svg-icons';
import {hexToRGB, styleCheck} from "../choose-exercise/utilities";

const ExerciseDetailHeader = ({handleClose, exerciseName, handleHistoryView, exercise, localDate, muscle}) => {
    const colorScheme = Appearance.getColorScheme();
    const colors = {
        background: colorScheme === 'dark' ? '#000' : '#fff',
        text: colorScheme === 'dark' ? '#fff' : '#000',
    };
    const muscleColor =`rgba(${hexToRGB(styleCheck(muscle, false).backgroundColor)}, 1)`;

    return (
        <View style={[styles.header, {backgroundColor: colors.background}]}>
            <TouchableOpacity onPress={handleClose}>
                <FontAwesomeIcon icon={faChevronLeft} size={24} color={colors.text}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exerciseNameAndIcon}>
                <Text style={[styles.exerciseName, {color: colors.text}]}>
                    {exerciseName}{' '}

                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleHistoryView(exercise, localDate)}>
                <FontAwesomeIcon icon={faCircleInfo} size={25} color={colors.text}/>
            </TouchableOpacity>
        </View>
    );
};

export default ExerciseDetailHeader;

const styles = {
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: '#000',
        color: 'white',
        shadowColor: "#000", // This is your box shadow color
        shadowOffset: {
            width: 0,   // These are your box shadow offsets
            height: 2,
        },
        shadowOpacity: 0.23,  // This is your box shadow opacity
        shadowRadius: 2.62,  // This is your box shadow radius
        elevation: 4,  // This adds shadow to Android and needs to be used in conjunction with the above properties
        marginBottom: 10
    },
    exerciseNameAndIcon: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 60,
        justifyContent: 'space-around',
    },
    exerciseName: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22,
        maxFontSize: 24,
        color: '#fff',
        alignItems: 'center'
    },
}