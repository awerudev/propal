import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput, TouchableOpacity, Appearance} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {hexToRGB, styleCheck} from "../choose-exercise/utilities";

const WeightInput = ({onWeightChange, muscle}) => {
    const colorScheme = Appearance.getColorScheme();
    const colors = {
        background: colorScheme === 'dark' ? '#000' : '#fff',
        text: colorScheme === 'dark' ? '#fff' : '#000',
        keyboard: colorScheme === 'dark' ? 'dark' : 'light'
        // ...add more color properties as needed
    };
    const muscleColor = `rgba(${hexToRGB(styleCheck(muscle, false).backgroundColor)}, 1)`;

    const timer = useRef(null);
    const [weight, setWeight] = useState(0);

    useEffect(() => {
        if (weight === 0) {
            clearTimeout(timer.current);
        }
    }, [weight]);

    const incrementWeight = () => {
        setWeight(weight => {
            const newWeight = weight + 1;
            onWeightChange(newWeight);
            return newWeight;
        });
        timer.current = setTimeout(incrementWeight, 100);
    };

    const decrementWeight = () => {
        if (weight > 0) {
            setWeight(weight => {
                const newWeight = weight - 1;
                onWeightChange(newWeight);
                return newWeight;
            });
            timer.current = setTimeout(decrementWeight, 100);
        }
    };

    const stopTimer = () => {
        clearTimeout(timer.current);
    };

    return (
        <View style={styles.weightContainer}>
            <TouchableOpacity
                style={[styles.minusButton, {borderColor: muscleColor}]}
                onPressIn={decrementWeight}
                onPressOut={stopTimer}
            >
                <FontAwesomeIcon icon={faMinus} size={24} color={muscleColor}/>
            </TouchableOpacity>

            <TextInput
                style={[styles.input, {color: colors.text}]}
                onChangeText={(text) => {
                    setWeight(parseInt(text));
                    onWeightChange(parseInt(text));
                }}
                keyboardType="numeric"
                placeholder="0"
                keyboardAppearance={colors.keyboard}
            >
                {isNaN(parseInt(weight)) ? '' : parseInt(weight)}
            </TextInput>
            <TouchableOpacity
                style={[styles.plusButton, {backgroundColor: muscleColor}]}
                onPressIn={incrementWeight}
                onPressOut={stopTimer}>
                <FontAwesomeIcon icon={faPlus} size={24} color={colors.background}/>
            </TouchableOpacity>
        </View>
    );
};

export default WeightInput;

const styles = {
    weightContainer: {
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
        padding: 8,
    },
    plusButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#3F51B5',
    },
    input: {
        width: 50,
        height: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        borderBottomWidth: 1,
        borderColor: '#4c4d50'
    },
}