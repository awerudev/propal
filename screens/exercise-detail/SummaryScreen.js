import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Appearance, TouchableOpacity, Modal } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
    faArrowLeft,
    faStar,
    faCircleUp, faCircleDown, faClipboard,
} from '@fortawesome/free-solid-svg-icons';
import {useWorkoutLog, WorkoutLogContext} from "./WorkoutLogContext";
import {hexToRGB, styleCheck} from "../choose-exercise/utilities";
import stylesFile from "../choose-exercise/styles/styles";
import {backgroundColor} from "react-native-calendars/src/style";
import {auth, db, doc} from "../../firebase";
import {getDoc, updateDoc} from "firebase/firestore";
import Header from "../../utils/Header";
import * as Clipboard from 'expo-clipboard';

const SummaryScreen = ({navigation}) => {
    const [workouts, setWorkouts] = useState([]);
    const {workoutLogs, setWorkoutLogs} = useWorkoutLog(WorkoutLogContext);
    const currentDate = new Date().toISOString().split('T')[0]; // Current date in 'yyyy-mm-dd' format
    const todayWorkouts = workoutLogs[currentDate] || {};
    const [logs, setLogs] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [clipboardContent, setClipboardContent] = useState('');

    let userId;
    if (auth.currentUser !== null) {
        userId = auth.currentUser.uid;
    }

    const colorScheme = Appearance.getColorScheme();
    const colors = {
        background: colorScheme === 'dark' ? '#000' : '#eee',
        text: colorScheme === 'dark' ? '#fff' : '#000',
        // ...add more color properties as needed
    };

    useEffect(() => {
        const workoutsArray = Object.keys(todayWorkouts).map(exerciseName => {
            return {
                exerciseName,
                sets: todayWorkouts[exerciseName].sets,
            };
        });

        setWorkouts(workoutsArray);
    }, [workoutLogs]);

    const handleDeleteExercise = async (exerciseName) => {
        try {
            const docRef = doc(db, `workoutLogs/${userId}`);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                let data = docSnap.data();
                if (currentDate in data) {
                    let exerciseData = data[currentDate];
                    if (exerciseName in exerciseData) {
                        // Update the local logs state (if you're using it to display the logs)
                        setLogs(prevLogs => {
                            return prevLogs.map(log => {
                                if (log.date === currentDate && log.exerciseName === exerciseName) {
                                    return null; // or delete the specific log
                                }
                                return log;
                            }).filter(log => log !== null);
                        });
                        // Delete the set from the exercise data
                        exerciseData[exerciseName].sets.splice(0, exerciseData[exerciseName].sets.length);
                        // If there are no more sets, delete the exercise itself
                        if (exerciseData[exerciseName].sets.length === 0) {
                            delete exerciseData[exerciseName];
                        }
                        // Update the document in Firestore
                        await updateDoc(docRef, {[currentDate]: exerciseData});

                        // Update the workoutLogs in the context
                        let updatedWorkoutLogs = {...workoutLogs};
                        if (Object.keys(updatedWorkoutLogs[currentDate]).length === 0) {
                            delete updatedWorkoutLogs[currentDate];
                        } else {
                            delete updatedWorkoutLogs[currentDate][exerciseName];
                        }
                        setWorkoutLogs(updatedWorkoutLogs);
                    } else {
                        console.log('No log found for date: ' + currentDate + " exercise: " + exerciseName);
                    }
                } else {
                    console.log('No workout logs found');
                }
            }
        } catch (error) {
            console.error('Error deleting set:', error);
        }
    };

    const renderWorkout = ({item}) => {
        const {exerciseName, sets} = item;
        let today = new Date().toISOString();
        today = today.slice(0, today.indexOf('T'));

        return (
            <TouchableOpacity
                onPress={() => {
                    setSelectedExercise(exerciseName);  // Set the selected exercise
                    setModalVisible(true);
                }}
                style={[styles.card, {backgroundColor: `rgba(${hexToRGB(styleCheck(sets[0].muscle, false).backgroundColor)}, 0.2)`}]}>
                <View style={[{
                    marginBottom: 10,
                    backgroundColor: '#eee',
                    justifyContent: 'center',
                    padding: 5,
                    borderRadius: 30,
                    width: '95%'
                }, {backgroundColor: `rgba(${hexToRGB(styleCheck(sets[0].muscle, false).backgroundColor)}, 1)`}]}>
                    <Text style={[styles.exerciseName, {color: colors.background}]}>{exerciseName}</Text>
                </View>
                {sets.map((set, index) => (

                    <View
                    key={index} style={{
                        marginBottom: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '90%',
                        justifyContent: 'center',
                        backgroundColor: colors.background,
                        borderRadius: 10,
                        padding: 5
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '600',
                            width: '10%',
                            marginLeft: '20%'
                        }}>{index + 1}. </Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <Text style={{width: '50%'}}>{set.weight}kg x {set.reps}</Text>
                        </View>
                        <View style={{flexDirection: 'row', width: '20%'}}>
                            {set.isPr ? (
                                <FontAwesomeIcon icon={faStar} color={'#3F51B5FF'}/>
                            ) : (
                                set.isMoreTL ? (
                                    <FontAwesomeIcon icon={faCircleUp} color={'#859502'}/>
                                ) : (
                                    set.isLessTL ? (
                                        <FontAwesomeIcon icon={faCircleDown} color={'#ff2800'}/>
                                    ) : (
                                        <FontAwesomeIcon icon={faStar} color={colors.background}/>
                                    )
                                )
                            )}
                        </View>
                    </View>
                ))}
            </TouchableOpacity>
        );
    };

    function handleClose() {
        navigation.replace('MainScreen');
    }

    const copyToClipboard = () => {
        let clipboardContent = '';

        workouts.forEach(exercise => {
            clipboardContent += `${exercise.exerciseName}\n`;

            exercise.sets.forEach((set, index) => {
                let emoji = '';
                if (set.isPr) {
                    emoji = '🌟'; // Star emoji for PR
                } else if (set.isMoreTL) {
                    emoji = '🔼'; // Upwards arrow for more than last time
                } else if (set.isLessTL) {
                    emoji = '🔽'; // Downwards arrow for less than last time
                }

                clipboardContent += `${index + 1}. ${set.weight}kg × ${set.reps} ${emoji}\n`;
            });

            clipboardContent += '\n'; // Add a newline between exercises
        });

       Clipboard.setStringAsync(clipboardContent);
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <Header
                handleClose={handleClose}
                screenName={"Today's Summary"}
                rightIcon={faClipboard}
                onRightIconPress={copyToClipboard}
            />
           {/* <View style={[styles.header, {backgroundColor: 'white'}]}>
                <TouchableOpacity onPress={handleClose} style={{
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    width: "20%",
                    height: 40
                }}>
                    <FontAwesomeIcon icon={faArrowLeft} size={24} color={colors.text}/>
                </TouchableOpacity>
                <Text style={[styles.headerTitle, {width: '60%'}]}>Today's Summary</Text>
            </View>*/}
            <View style={styles.container}>
                {workouts && (
                    <FlatList
                        data={workouts}
                        renderItem={renderWorkout}
                        keyExtractor={item => item.exerciseName}
                    />
                )}
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure you want to delete this exercise log?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={{...styles.openButton, backgroundColor: "#ff2800"}}
                                onPress={() => {
                                    handleDeleteExercise(selectedExercise);
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={styles.textStyle}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.openButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
        alignItems: 'center'
    },
    exerciseName: {
        fontWeight: '600',
        fontSize: 18,
        textAlign: 'center'
    },
    header: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        shadowColor: "#000", // This is your box shadow color
        shadowOffset: {
            width: 0,   // These are your box shadow offsets
            height: 2,
        },
        shadowOpacity: 0.23,  // This is your box shadow opacity
        shadowRadius: 2.62,  // This is your box shadow radius
        elevation: 4,  // This adds shadow to Android and needs to be used in conjunction with the above properties
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        alignItems: 'center',
        textAlign: 'center',
    },
    closeButton: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
        top: -10,
        left: -10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        width: '85%',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        fontWeight: '500',
        textAlign: "center"
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: '45%', // to take almost half the space
        alignItems: 'center'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
});

export default SummaryScreen;
