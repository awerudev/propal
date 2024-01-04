import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronLeft, faCircleInfo, faCircleUp, faCircleDown, faStar} from "@fortawesome/free-solid-svg-icons";
import {useNavigation} from "@react-navigation/native";
import {WorkoutLogContext, useWorkoutLog} from "../screens/exercise-detail/WorkoutLogContext";
import moment from "moment";
import Header from "./Header";

function ExerciseHistory({ route }) {
    const {exercise, date} = route.params;
    const navigation = useNavigation();
    const [exerciseList, setExerciseList] = useState([]);
    const {workoutLogs} = useContext(WorkoutLogContext);

    useEffect(() => {
        fetchWorkouts();
    }, []);

    function handleClose(exercise, date) {
        console.log('close')
        navigation.navigate('ExerciseDetail', {exercise: exercise, date: date});
    }

    function fetchWorkouts() {
        const filteredExercises = workoutLogs.filter(
            workoutLog => workoutLog.exercise === exercise.name
        );
        const sortedExercises = filteredExercises.sort((a, b) => moment(b.date, "YYYY-MM-DD").valueOf() - moment(a.date, "YYYY-MM-DD").valueOf());
        setExerciseList(sortedExercises);
    }

    return (
        <SafeAreaView>
            <Header
                handleClose={handleClose}
                screenName={'Workout History'}
            />
            {exerciseList.map((exercise) => (
                <View key={exercise.date} style={styles.card}>
                    <Text style={styles.date}>{moment(exercise.date, "YYYY-MM-DD").format("DD MMMM YYYY")}</Text>
                    <Text style={styles.weight}>Weight: {exercise.weight}</Text>
                    <Text style={styles.reps}>Reps: {exercise.reps}</Text>
                    {exercise.isPr ? (
                        <FontAwesomeIcon icon={faStar} color={'#3F51B5FF'}/>
                    ) : exercise.isMoreTL ? (
                        <FontAwesomeIcon icon={faCircleUp} color={'#859502'}/>
                    ) : exercise.isLessTL ? (
                        <FontAwesomeIcon icon={faCircleDown} color={'#ff2800'}/>
                    ) : (
                        <FontAwesomeIcon icon={faStar} color={colors.background}/>
                    )}
                </View>
            ))}
        </SafeAreaView>
    );
}

export default ExerciseHistory;

const styles = {
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: '#000',
        color: 'white'
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
        fontSize: 20,
        maxFontSize: 24,
        color: '#fff',
        alignItems: 'center'
    },
    date: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    statContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statValue: {
        fontSize: 18,
    },
    prIcon: {
        fontSize: 24,
        color: 'gold',
    },
    card: {
        backgroundColor: 'white'
    }
};





