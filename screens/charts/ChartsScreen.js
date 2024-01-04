import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, Appearance, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {VictoryLine, VictoryChart, VictoryAxis, VictoryGroup, VictoryScatter, VictoryLegend} from "victory-native";
import {useWorkoutLog, WorkoutLogContext} from '../exercise-detail/WorkoutLogContext';
import Header from "../../utils/Header";
import {FontAwesome} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {tr} from 'date-fns/locale';

// Helper function to generate random color
const getRandomColor = () => {
    let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    while (color.length < 7) {
        color += '0';
    }
    return color;
};

const ChartsScreen = () => {
    const insets = useSafeAreaInsets();
    const {workoutLogs} = useContext(WorkoutLogContext);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [currentMonthOffset, setCurrentMonthOffset] = useState(0);
    const navigation = useNavigation();
    const colorScheme = Appearance.getColorScheme();

    const colors = {
        background: colorScheme === 'dark' ? '#000' : '#fff',
        text: colorScheme === 'dark' ? '#fff' : '#000',
        header: colorScheme === 'dark' ? 'black' : 'white',
    };

    function handleClose() {
        navigation.goBack();
    }

    const adjustMonthOffset = (amount) => {
        setCurrentMonthOffset(prevOffset => prevOffset + amount);
    };

    const isDate = (str) => {
        const pattern = /^\d{4}-\d{2}-\d{2}$/;
        return pattern.test(str);
    };

    const getExercises = () => {
        const exercises = new Set();
        Object.keys(workoutLogs).forEach(day => {
            Object.keys(workoutLogs[day]).forEach(exercise => {
                if (!isDate(exercise)) {
                    exercises.add(exercise);
                }
            });
        });
        return Array.from(exercises);
    };


    const exercises = getExercises();

    const toggleExerciseSelection = (exercise) => {
        if (selectedExercises.includes(exercise)) {
            setSelectedExercises(prevExercises => prevExercises.filter(e => e !== exercise));
        } else {
            setSelectedExercises([exercise]);
        }
    };

    const getExerciseData = (exerciseName) => {
        const data = Object.keys(workoutLogs)
            .reduce((result, day) => {
                const dailyLogs = workoutLogs[day];
                if (dailyLogs[exerciseName]) {
                    const exercise = dailyLogs[exerciseName];
                    const maxWeight = exercise.sets && Array.isArray(exercise.sets)
                        ? Math.max(...exercise.sets.map(set => set.weight))
                        : 0;  // or some other default value

                    result.push({date: day.slice(5, day.length), value: maxWeight, fullDate: day});
                }
                return result;
            }, [])
            .sort((a, b) => new Date(b.fullDate) - new Date(a.fullDate));

        return data.slice(0, 4); // Return the last 4 logs
    };

    const getLastFourLogs = (exerciseName) => {
        return Object.keys(workoutLogs)
            .reduce((result, day) => {
                const dailyLogs = workoutLogs[day];
                if (dailyLogs[exerciseName]) {
                    const exercise = dailyLogs[exerciseName];
                    const maxWeight = exercise.sets && Array.isArray(exercise.sets)
                        ? Math.max(...exercise.sets.map(set => set.weight))
                        : 0;  // or some other default value

                    result.push({ date: day.slice(5, day.length), value: maxWeight, fullDate: day });
                }
                return result;
            }, [])
            .sort((a, b) => new Date(b.fullDate) - new Date(a.fullDate))
            .slice(0, 4); // Return the last 4 logs
    };

    const availableExercises = exercises.filter(exercise => getLastFourLogs(exercise).length > 0);

    const colorForExercise = getRandomColor();

    const data = {
        labels: selectedExercises.length > 0 ? getLastFourLogs(selectedExercises[0]).map(e => e.date) : [],
        datasets: selectedExercises.length > 0 ? [{
            data: getLastFourLogs(selectedExercises[0]).map(e => ({x: e.date, y: e.value})),
            color: colorForExercise,
            strokeWidth: 2
        }] : []
    };

    console.log('Workout logs: ', workoutLogs);
    console.log('Selected exercises: ', selectedExercises);
    selectedExercises.forEach(exercise => {
        console.log(`Data for ${exercise}: `, getExerciseData(exercise));
    });

    const getCurrentMonthYear = () => {
        const date = new Date();
        date.setMonth(date.getMonth() - currentMonthOffset);
        return `${date.toLocaleString('default', {month: 'long'})} ${date.getFullYear()}`;
    };

    const allWeights = selectedExercises.flatMap(exercise => getExerciseData(exercise).map(e => e.value));
    const minWeight = Math.max(0, Math.min(...allWeights) - 10);  // Ensure it's never less than 0
    const maxWeight = Math.max(...allWeights) + 10;

    const generateYTicks = (min, max) => {
        const range = max - min;
        const step = range / 4; // to get 5 values
        return Array.from({length: 5}, (_, i) => Math.round(min + step * i));
    };

    const generateXTicks = () => {
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - currentMonthOffset);
        startDate.setDate(1);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0);

        const currentMonthDates = selectedExercises.flatMap(exercise =>
            getLastFourLogs(exercise).map(e => e.date)
        );

        if (currentMonthDates.length === 1) {
            return [startDate.toISOString().slice(5, 10), currentMonthDates[0], endDate.toISOString().slice(5, 10)];
        } else if (currentMonthDates.length === 2) {
            return [startDate.toISOString().slice(5, 10), ...currentMonthDates, endDate.toISOString().slice(5, 10)];
        } else {
            return currentMonthDates;
        }
    };


    const yTicks = generateYTicks(minWeight, maxWeight);
    const xTicks = generateXTicks().reverse();

    const hasLogsForMonth = (offset) => {
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - offset - 1);
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() - offset);

        return Object.keys(workoutLogs).some(day => {
            const logDate = new Date(day);
            return logDate >= startDate && logDate < endDate;
        });
    };

    const earliestDate = xTicks[0];
    const latestDate = xTicks[xTicks.length - 1];

    const getLogsBeforeDate = (date) => {
        return Object.keys(workoutLogs)
            .filter(logDate => new Date(logDate) < new Date(date))
            .sort((a, b) => new Date(b) - new Date(a))
            .slice(0, 4);
    };

    const getLogsAfterDate = (date) => {
        return Object.keys(workoutLogs)
            .filter(logDate => new Date(logDate) > new Date(date))
            .sort((a, b) => new Date(a) - new Date(b))
            .slice(0, 4);
    };

    const adjustDateOffset = (direction) => {
        if (direction === 'back') {
            const logs = getLogsBeforeDate(earliestDate);
            if (logs.length > 0) {
                // Update the displayed logs
            }
        } else if (direction === 'forward') {
            const logs = getLogsAfterDate(latestDate);
            if (logs.length > 0) {
                // Update the displayed logs
            }
        }
    };

    const hasLogsBefore = getLogsBeforeDate(earliestDate).length > 0;
    const hasLogsAfter = getLogsAfterDate(latestDate).length > 0;


    return (
        <SafeAreaView style={{flex: 1}}>
            <Header
                handleClose={handleClose}
                screenName={'Progress Charts'}
            />

            <ScrollView
                style={styles.exercisesContainer}
                contentContainerStyle={styles.exercisesContentContainer}
            >
                {availableExercises.map(exercise => (
                    <TouchableOpacity key={exercise} onPress={() => toggleExerciseSelection(exercise)}
                                      style={styles.exerciseButton}>
                        <View style={{
                            marginBottom: 10,
                            width: '100%',
                            padding: 10,
                            backgroundColor: '#fff',
                            borderRadius: 10
                        }}>
                            <Text style={{fontSize: 15, fontWeight: '500'}}>
                                {exercise}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.chartContainer}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10
                }}>
                    <TouchableOpacity onPress={() => adjustDateOffset('back')} disabled={!hasLogsBefore}>
                        <FontAwesome name="chevron-left" size={24} color="#000"/>
                    </TouchableOpacity>
                    <Text style={styles.chartTitle}>{selectedExercises[0] || 'Select an Exercise'}</Text>
                    <TouchableOpacity onPress={() => adjustDateOffset('forward')} disabled={!hasLogsAfter}>
                        <FontAwesome name="chevron-right" size={24} color="#000"/>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    {selectedExercises.length > 0 &&
                        <VictoryChart
                            width={Dimensions.get('window').width - 30}
                            height={320}
                            padding={{top: 50, bottom: 50, left: 50, right: 50}}
                        >
                            <VictoryAxis
                                tickValues={xTicks}
                                style={{axis: {stroke: colors.text}}}
                            />

                            <VictoryAxis
                                dependentAxis
                                domain={[minWeight, maxWeight]}
                                tickValues={yTicks}
                            />
                            <VictoryGroup colorScale={data.datasets.map(dataset => dataset.color)}>
                                {data.datasets.map((dataset, index) =>
                                    <VictoryLine
                                        key={index}
                                        data={dataset.data}
                                        style={{data: {stroke: dataset.color}}}
                                    />
                                )}
                                {data.datasets.map((dataset, index) =>
                                    <VictoryScatter
                                        key={index}
                                        data={dataset.data}
                                        size={6}
                                        labels={({datum}) => `${datum.y}kg`}
                                        style={{data: {fill: dataset.color}, labels: {fontSize: 10}}}
                                    />
                                )}
                            </VictoryGroup>
                        </VictoryChart>
                    }
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    chartContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        alignSelf: 'stretch',
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    exercisesContainer: {
        flex: 1,
        padding: 10,
        width: '90%',
        alignSelf: 'center',
        height: '40%'
    },
    exercisesContentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    exercise: {
        margin: 5,
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 15,
        maxWidth: '60%',
    },
    selectedExercise: {
        margin: 5,
        padding: 10,
        backgroundColor: '#aaa',
        borderRadius: 5,
        maxWidth: '60%',
    },
    cardHeader: {
        shadowColor: "#000", // This is your box shadow color
        shadowOffset: {
            width: 0,   // These are your box shadow offsets
            height: 2,
        },
        shadowOpacity: 0.23,  // This is your box shadow opacity
        shadowRadius: 2.62,  // This is your box shadow radius
        elevation: 3, // This is the box elevation for android
    },
    exerciseButton: {
        width: '90%'
    }
});

export default ChartsScreen;
