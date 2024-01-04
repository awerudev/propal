import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Appearance, TouchableOpacity, Modal} from 'react-native';
import {auth, collection, db, doc} from "../../firebase";
import {getDoc, updateDoc} from "firebase/firestore";
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faCircleDown, faCircleUp, faStar} from '@fortawesome/free-solid-svg-icons';
import {useWorkoutLog, WorkoutLogContext} from "./WorkoutLogContext";
import Header from "../../utils/Header";

const PreviousLogsScreen = ({route, navigation}) => {
    const {exerciseName} = route.params;
    const [logs, setLogs] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const {workoutLogs, setWorkoutLogs} = useWorkoutLog(WorkoutLogContext);
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
        let exercises = [];
        for (let date in workoutLogs) {
            for (let exercise in workoutLogs[date]) {
                if (exercise === exerciseName) {
                    exercises.push({
                        date,
                        ...workoutLogs[date][exercise],
                    });
                }
            }
        }

        // Sort by date
        exercises.sort((a, b) => new Date(b.date) - new Date(a.date));

        setLogs(exercises);
    }, [workoutLogs, exerciseName]);

    const handleDeleteExercise = async (date, exerciseName) => {
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
                        // Update the local logs state (if you're using it to display the logs)
                        setLogs(prevLogs => {
                            return prevLogs.map(log => {
                                if (log.date === date && log.exerciseName === exerciseName) {
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
                        await updateDoc(docRef, {[date]: exerciseData});

                        // Update the workoutLogs in the context
                        let updatedWorkoutLogs = {...workoutLogs};
                        if (Object.keys(updatedWorkoutLogs[date]).length === 0) {
                            delete updatedWorkoutLogs[date];
                        } else {
                            delete updatedWorkoutLogs[date][exerciseName];
                        }
                        setWorkoutLogs(updatedWorkoutLogs);
                    } else {
                        console.log('No log found for date: ' + date);
                    }
                } else {
                    console.log('No workout logs found');
                }
            }
        } catch (error) {
            console.error('Error deleting set:', error);
        }
    };

        const renderLog = ({item}) => {
            const {date, sets} = item;
            return (
                <TouchableOpacity
                    style={styles.card}
                    onLongPress={() => {
                        setSelectedDate(item.date);
                        setModalVisible(true);
                    }}
                >
                    <View style={{
                        marginBottom: 10,
                        backgroundColor: '#eee',
                        justifyContent: 'center',
                        padding: 5,
                        borderRadius: 30
                    }}>
                        <Text
                            style={[styles.date, {fontSize: 18, fontWeight: '600', textAlign: 'center'}]}>{date}</Text>
                    </View>
                    <View style={{paddingLeft: 20}}>
                        {sets.map((set, index) => (
                            <View key={index} style={{
                                marginBottom: 5,
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                width: '90%',
                                borderColor: '#ccc',
                                justifyContent: 'center'
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
                    </View>
                </TouchableOpacity>
            );
        };

        function handleClose() {
            navigation.replace('MainScreen');
        }

        return (
            <SafeAreaView style={{flex: 1}}>
                <Header
                    handleClose={handleClose}
                    screenName={`${exerciseName} Logs`}
                />
                <View style={styles.container}>
                    {logs && (
                        <FlatList
                            data={logs}
                            renderItem={renderLog}
                            keyExtractor={item => item.date}
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
                            <Text style={styles.modalText}>Are you sure you want to delete the logs
                                for {selectedDate}?</Text>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={{...styles.openButton, backgroundColor: "#ff2800"}}
                                    onPress={() => {
                                        handleDeleteExercise(selectedDate, exerciseName);
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
        openButton: {
            backgroundColor: "#859502",
            borderRadius: 20,
            padding: 10,
            elevation: 2,
            margin: 5
        },
        textStyle: {
            color: "white",
            fontWeight: "bold",
            textAlign: "center"
        },
        modalText: {
            marginBottom: 15,
            textAlign: "center"
        },
        modalButtons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '50%'
        },
        container: {
            flex: 1,
            padding: 20,
        },
        card: {
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 20,
            marginBottom: 20,
            shadowColor: "#000", // This is your box shadow color
            shadowOffset: {
                width: 0,   // These are your box shadow offsets
                height: 2,
            },
            shadowOpacity: 0.23,  // This is your box shadow opacity
            shadowRadius: 2.62,  // This is your box shadow radius
            elevation: 4,  // This adds shadow to Android and needs to be used in conjunction with the above properties
        },
        exerciseName: {
            fontWeight: 'bold',
            fontSize: 16,
            marginBottom: 10,
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
    });

    export default PreviousLogsScreen;