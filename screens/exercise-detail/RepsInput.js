import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput, TouchableOpacity, Appearance} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {hexToRGB, styleCheck} from "../choose-exercise/utilities";

const RepsInput = ({onRepsChange, muscle}) => {
    const colorScheme = Appearance.getColorScheme();
    const colors = {
        background: colorScheme === 'dark' ? '#000' : '#fff',
        text: colorScheme === 'dark' ? '#fff' : '#000',
        // ...add more color properties as needed
    };
    const muscleColor =`rgba(${hexToRGB(styleCheck(muscle, false).backgroundColor)}, 1)`;

    const timer = useRef(null);
    const [reps, setReps] = useState(0);

    useEffect(() => {
        if (reps === 0) {
            clearTimeout(timer.current);
        }
    }, [reps]);

    const incrementReps = () => {
        setReps(reps => {
            const newReps = reps + 1;
            onRepsChange(newReps);
            return newReps;
        });
        timer.current = setTimeout(incrementReps, 100);
    };

    const decrementReps = () => {
        if (reps > 0) {
            setReps(reps => {
                const newReps = reps - 1;
                onRepsChange(newReps);
                return newReps;
            });
            timer.current = setTimeout(decrementReps, 100);
        }
    };

    const stopTimer = () => {
        clearTimeout(timer.current);
    };

    return (
        <View style={styles.repsContainer}>
            <TouchableOpacity
                style={[styles.minusButton, {borderColor: muscleColor}]}
                onPressIn={decrementReps}
                onPressOut={stopTimer}
            >
                <FontAwesomeIcon icon={faMinus} size={24} color={muscleColor}/>
            </TouchableOpacity>

            <TextInput
                style={[styles.input, {color: colors.text}]}
                onChangeText={(text) => {
                    setReps(parseInt(text));
                    onRepsChange(parseInt(text));
                }}
                keyboardType="numeric"
                placeholder="0"
                keyboardAppearance={"dark"}
            >
                {isNaN(parseInt(reps)) ? '' : parseInt(reps)}
            </TextInput>
            <TouchableOpacity
                style={[styles.plusButton, {backgroundColor: muscleColor}]}
                onPressIn={incrementReps}
                onPressOut={stopTimer}>
                <FontAwesomeIcon icon={faPlus} size={24} color={colors.background}/>
            </TouchableOpacity>
        </View>
    );
};

export default RepsInput;

const styles = {
    repsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        paddingHorizontal: 30,
        marginTop: 10,
        marginHorizontal: 40,
        borderRadius: 10,
        width: "70%"
    },
    minusButton: {
        borderWidth: 2,
        borderColor: '#3F51B5',
        borderRadius: 10,
        padding: 8
    },
    plusButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#3F51B5'
    },
    input: {
        width: 50,
        height: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        borderBottomWidth: 1,
        borderColor: '#4c4d50',
        color: 'white'
    },
}