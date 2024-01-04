import React, {useState, useRef, useEffect, useContext} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView, Appearance, SafeAreaView,
} from 'react-native';
import ExerciseDetailHeader from "./ExerciseDetailHeader";
import {db} from '../../firebase';
import {useNavigation} from "@react-navigation/native";
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import WeightInput from "./WeightInput";
import RepsInput from "./RepsInput";
import ExerciseButtons from "./ExerciseButtons";
import ExerciseList from "./ExerciseList";
import DismissKeyboard from "../../utils/DismissKeyboard";
import {auth, arrayUnion} from '../../firebase';
import {WorkoutLogContext, useWorkoutLog} from "./WorkoutLogContext";
import {hexToRGB, styleCheck} from "../choose-exercise/utilities";

const ExerciseDetail = ({route}) => {
    const {exercise, localDate, logSets, muscle} = route.params;
    let today = new Date().toISOString();
    today = today.slice(0, today.indexOf('T'));
    const [weight, setWeight] = useState(0);
    const [reps, setReps] = useState(0);
    const timer = useRef(null);
    const navigation = useNavigation();
    const exerciseName = exercise.name;
    const {workoutLogs, setWorkoutLogs} = useWorkoutLog(WorkoutLogContext);
    const [repRange, setRepRange] = useState(exercise.repRange || "8");
    console.log(muscle)

    const muscleColor =`rgba(${hexToRGB(styleCheck(muscle, false).backgroundColor)}, 1)`;

    const getLastWorkoutSets = () => {
        if (!workoutLogs) return []; // If workoutLogs is undefined, return an empty array

        // Sort the keys of workoutLogs in descending order (most recent dates first)
        const sortedDates = Object.keys(workoutLogs).sort((a, b) => new Date(b) - new Date(a));

        for (let i = 0; i < sortedDates.length; i++) {
            // Skip today's date
            if (sortedDates[i] === today) continue;

            // Get the workouts for the current date
            const workoutsForDate = workoutLogs[sortedDates[i]];

            // If no workouts were logged on this date, move to the next date
            if (!workoutsForDate) continue;

            // Get the sets for this exercise on the current date
            const exerciseForDate = workoutsForDate[exerciseName];

            // If no sets were logged for this exercise on this date, move to the next date
            if (!exerciseForDate) continue;

            // Map the sets to the required format
            const setsForDate = exerciseForDate.sets.map(set => ({
                date: sortedDates[i],
                exercise: exerciseName,
                weight: set.weight,
                reps: set.reps,
                isMetric: set.metric,
                isPr: set.isPr,
            }));


            // Return the sets for the first date on which this exercise was logged
            return setsForDate;
        }

        // If no sets were found, return an empty array
        return [];
    };

    const getSetsForToday = () => {
        if (!workoutLogs) return []; // If workoutLogs is undefined, return an empty array

        // Find today's workouts
        const todaysWorkouts = workoutLogs[today];

        // If no workouts were logged today, return an empty array
        if (!todaysWorkouts) return [];

        // Find the exercises for today's date
        const exerciseForToday = todaysWorkouts[exerciseName];

        // If no workouts were logged for this exercise today, return an empty array
        if (!exerciseForToday) return [];

        // Map the sets to the required format
        const setsForToday = exerciseForToday.sets.map(set => ({
            date: today,
            exercise: exerciseName,
            weight: set.weight,
            reps: set.reps,
            isMetric: set.metric,
            isPr: set.isPr,
        }));

        return setsForToday;
    };

    let userId;
    if (auth.currentUser !== null) {
        userId = auth.currentUser.uid;
    }

    const [exerciseList, setExerciseList] = useState(getSetsForToday(today));

    useEffect(() => {
        const getSetsForToday = () => {
            const todayWorkoutData = workoutLogs[today];

            if (!todayWorkoutData) {
                console.log(workoutLogs);
                console.log('No workout data for today.');
            }
        };

        getSetsForToday();
    }, [workoutLogs, exerciseName]);

    function enableEdit() {
        console.log('edit enabled')
        // when this function is called,
    }

    const fetchPR = (currentWeight, currentReps, setNumber) => {
        console.log("FetchPR called:\n");
        let lastWeight = 0;
        let lastReps = 0;
        let isLessTL = false;
        let isMoreTL = false;

        if (!workoutLogs || typeof workoutLogs !== 'object') {
            console.log("workoutLogs is not defined or not an object");
            return {maxWeight: lastWeight, maxReps: lastReps, isMoreTL: false, isLessTL: false};
        }

        const lastWorkoutSets = getLastWorkoutSets();
        if (lastWorkoutSets.length >= setNumber) {
            const correspondingSetFromLastWorkout = lastWorkoutSets[setNumber - 1];
            lastWeight = correspondingSetFromLastWorkout.weight;
            lastReps = correspondingSetFromLastWorkout.reps;
        }
        console.log('get last workout weight: ' + lastWeight)

        const {maxWeight, maxReps} = getMaxWeightAndReps(workoutLogs);

        isMoreTL = currentWeight > lastWeight || (currentWeight === lastWeight && currentReps > lastReps);
        if (isMoreTL) {
            console.log("More than last time");
            isMoreTL = true;
        }

        isLessTL = currentWeight < lastWeight || (currentWeight === lastWeight && currentReps < lastReps);
        if (isLessTL) {
            console.log("Less than last time");
            isLessTL = true;
        }

        return {maxWeight, maxReps, isMoreTL, isLessTL};
    }

    const saveSet = async () => {
        console.log("Saving set..")
        const setNumber = exerciseList.length + 1;
        const {maxWeight, maxReps, isMoreTL, isLessTL} = fetchPR(weight, reps, setNumber);
        const newIsPR = weight > maxWeight || (weight === maxWeight && reps >= maxReps);

        const newExercise = {
            date: today,
            exercise: exerciseName,
            weight: weight,
            reps: reps,
            isMoreTL: isMoreTL,
            isLessTL: isLessTL,
            isMetric: true,
            isPr: newIsPR,
            muscle: muscle
        };

        setExerciseList([...exerciseList, newExercise]);
        setWeight(weight);
        setReps(reps);

        try {
            const docRef = doc(db, `workoutLogs/${userId}`);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                await setDoc(docRef, {});
            }

            const newSet = {
                metric: newExercise.isMetric,
                isPr: newExercise.isPr,
                reps: newExercise.reps,
                weight: newExercise.weight,
                isMoreTL: newExercise.isMoreTL,
                isLessTL: newExercise.isLessTL,
                muscle: muscle
            };

            console.log('Data to be saved:', JSON.stringify(newSet, null, 2));

            // Update Firestore
            await updateDoc(docRef, {
                [`${newExercise.date}.${newExercise.exercise}.exerciseName`]: newExercise.exercise,
                [`${newExercise.date}.${newExercise.exercise}.sets`]: arrayUnion(newSet)
            });

            // Update state
            const updatedWorkoutLogs = {...workoutLogs};
            if (!updatedWorkoutLogs[newExercise.date]) {
                updatedWorkoutLogs[newExercise.date] = {};
            }
            if (!updatedWorkoutLogs[newExercise.date][newExercise.exercise]) {
                updatedWorkoutLogs[newExercise.date][newExercise.exercise] = {
                    exerciseName: newExercise.exercise,
                    sets: []
                };
            }
            updatedWorkoutLogs[newExercise.date][newExercise.exercise].sets.push(newSet);
            setWorkoutLogs(updatedWorkoutLogs);

            console.log('Exercise saved successfully');

        } catch (error) {
            console.error('Error saving exercise:', error);
        }
    };


    function handleSummary() {
        navigation.navigate('SummaryScreen');
    }

    function handlePreviousLogs() {
        navigation.navigate('PreviousLogsScreen', {exerciseName: exerciseName});
    }

    function handleClear() {
        setWeight(0);
        setReps(0);
    }

    function getMaxWeightAndReps(workoutLogs) {
        let maxWeight = 0;
        let maxReps = 0;

        if (!workoutLogs || typeof workoutLogs !== 'object') {
            return {maxWeight, maxReps};
        }

        Object.keys(workoutLogs).forEach(date => {
            const exerciseData = workoutLogs[date][exerciseName];
            if (exerciseData) {
                exerciseData.sets.forEach(set => {
                    if (set.weight >= maxWeight && set.reps >= maxReps) {
                        maxWeight = set.weight;
                        maxReps = set.reps;
                    }
                });
            }
        });

        return {maxWeight, maxReps};
    }

    function handleClose() {
        navigation.goBack();
    }

    const handleDeleteExercise = async (date, exerciseName, setIndex) => {
        console.log("index: ", setIndex);
        try {
            const docRef = doc(db, `workoutLogs/${userId}`);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document snapshot data: ", docSnap.data());  // Log the whole document data
                let data = docSnap.data();
                if (date in data) {
                    console.log("Found date in data: ", date);  // Log if the date is found
                    let exerciseData = data[date];
                    if (exerciseName in exerciseData) {
                        // Delete the set from the exercise data
                        exerciseData[exerciseName].sets.splice(setIndex, 1);
                        // If there are no more sets, delete the exercise itself
                        if (exerciseData[exerciseName].sets.length === 0) {
                            delete exerciseData[exerciseName];
                        }
                        // Update the document in Firestore
                        await updateDoc(docRef, {[date]: exerciseData});

                        // Remove the set from the local exerciseList array
                        console.log("want to delete: ", exerciseList[setIndex]);
                        setExerciseList(prevList => prevList.filter((_, index) => index !== setIndex));
                        console.log("after delete: ", exerciseList[setIndex]);

                        // Update the workoutLogs in the context
                        let updatedWorkoutLogs = {...workoutLogs, [date]: exerciseData};
                        setWorkoutLogs(updatedWorkoutLogs);
                    } else {
                        console.log('Exercise not found in log');
                    }
                } else {
                    console.log('No log found for date: ' + date);
                }
            } else {
                console.log('No workout logs found');
            }
        } catch (error) {
            console.error('Error deleting set:', error);
        }
    };

    function handleHistoryView(exercise, localDate) {
        navigation.navigate('HistoryView', {exercise: exercise, date: localDate});
    }

    const handleWeightChange = (value) => {
        setWeight(value);
    };
    const handleRepsChange = (value) => {
        setReps(value);
    };

    const colorScheme = Appearance.getColorScheme();
    const colors = {
        background: colorScheme === 'dark' ? '#000' : '#fff',
        text: colorScheme === 'dark' ? '#fff' : '#000',
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
                <DismissKeyboard>
                    <View style={[styles.container, {backgroundColor: colors.background}]}>
                        <ExerciseDetailHeader
                            handleClose={handleClose}
                            exerciseName={exerciseName}
                            handleHistoryView={handleHistoryView}
                            exercise={exercise}
                            localDate={localDate}
                            muscle={muscle}
                        />

                        <View style={styles.container}>
                            <View style={[styles.textContainer, {marginTop: 5}]}>
                                <Text style={{color: colors.text, fontWeight: 'bold'}}>Weight:</Text>
                            </View>
                            <WeightInput onWeightChange={handleWeightChange} muscle={muscle}/>

                            <View style={styles.textContainer}>
                                <Text style={[styles.textExplanation, {
                                    color: colors.text,
                                    fontWeight: 'bold'
                                }]}>Reps:</Text>
                            </View>
                            <RepsInput onRepsChange={handleRepsChange} muscle={muscle}/>
                            <Text>{repRange}</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: '85%', borderBottomWidth: 1,
                                borderBottomColor: '#4c4d50', marginTop: 10}}>
                                <TouchableOpacity onPress={handlePreviousLogs} style={{
                                    borderColor: muscleColor,
                                    borderWidth: 3,
                                    backgroundColor: colors.background,
                                    height: 50,
                                    width: 100,
                                    padding: 5,
                                    borderRadius: 20,
                                    marginVertical: 15,
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        color: muscleColor,
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }}>History</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleSummary} style={{
                                    borderColor: muscleColor,
                                    borderWidth: 3,
                                    backgroundColor: colors.background,
                                    height: 50,
                                    width: 100,
                                    padding: 5,
                                    borderRadius: 20,
                                    marginVertical: 15,
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        color: muscleColor,
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }}>Summary</Text>
                                </TouchableOpacity>
                            </View>

                            <ExerciseList
                                exerciseList={exerciseList}
                                enableEdit={enableEdit}
                                handleDeleteExercise={handleDeleteExercise}
                                today={today}
                                exerciseName={exerciseName}/>

                            <ExerciseButtons handleClear={handleClear} saveExercise={saveSet} muscle={muscle}/>
                        </View>
                    </View>
                </DismissKeyboard>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ExerciseDetail;

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
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
    button: {
        width: 50,
        height: 50,
        backgroundColor: '#CCC',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FFF'
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#111',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#4c4d50',
    },
    saveButton: {
        marginTop: 10,
        padding: 7,
        width: 100,
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 3,
        borderColor: '#3F51B5FF',
        marginHorizontal: 30,
        borderRadius: 10,
    },
    clearButton: {
        backgroundColor: '#3F51B5FF',
        marginTop: 10,
        padding: 10,
        width: 100,
        alignItems: 'center',
        alignSelf: 'center',
        marginHorizontal: 30,
        borderRadius: 10
    },
    backIcon: {
        fontWeight: 'bold',
        fontSize: 26,
        color: 'white',
    },
    infoIcon: {
        fontWeight: 'bold',
        fontSize: 26,
        color: 'white',
    },
    plusButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#3F51B5'
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 5,
        paddingLeft: 5,
        marginTop: 10,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#4c4d50',
        borderRadius: 10,
        width: '90%'
    },
    textExplanation: {
        color: 'white'
    },
    minusButton: {
        borderWidth: 2,
        borderColor: '#3F51B5',
        borderRadius: 10,
        padding: 8
    },
    footerTimer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
}