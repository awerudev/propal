import React, {useEffect, useState} from 'react';
import { TouchableOpacity, Text, View, Appearance } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faEdit, faTrash, faCircleUp, faCircleDown } from '@fortawesome/free-solid-svg-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import {useWorkoutLog, WorkoutLogContext} from "./WorkoutLogContext";

const ExerciseList = ({ enableEdit, printSet, handleDeleteExercise, today, exerciseName }) => {
    const { workoutLogs, setWorkoutLogs } = useWorkoutLog(WorkoutLogContext);
    const colorScheme = Appearance.getColorScheme();
    const [exerciseList, setExerciseList] = useState([]);
    const colors = {
        background: colorScheme === 'dark' ? '#000' : '#fff',
        text: colorScheme === 'dark' ? '#fff' : '#000',
        // ...add more color properties as needed
    };

    useEffect(() => {
        if (
            workoutLogs[today] &&
            workoutLogs[today][exerciseName] &&
            Array.isArray(workoutLogs[today][exerciseName].sets)
        ) {
            setExerciseList(
                workoutLogs[today][exerciseName].sets.sort(
                    (a, b) => new Date(a.date) - new Date(b.date)
                )
            );
        } else {
            setExerciseList([]);
        }
    }, [workoutLogs, today, exerciseName]);

    return (
        <SwipeListView
            style={styles.exerciseList}
            data={exerciseList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(data, rowMap) => (
                <View style={styles.listItem}>
                    <View
                        onLongPress={enableEdit}
                    >
                        <View style={[styles.listItem, {backgroundColor: colors.background, borderBottomWidth: 1}]}>
                            <Text style={[styles.listText, {color: colors.text}]}>{data.index + 1}.</Text>
                            <Text style={{color: '#777'}}><Text
                                style={[styles.listText, {color: colors.text}]}>{data.item.weight}</Text> {data.item.isMetric ? 'kg' : 'kg'}
                            </Text>
                            <Text style={{color: '#777'}}><Text
                                style={[styles.listText, {color: colors.text}]}>{data.item.reps}</Text> reps</Text>
                            {data.item.isPr ? (
                                <FontAwesomeIcon icon={faStar} color={'#3F51B5FF'}/>
                            ) : (
                                data.item.isMoreTL ? (
                                    <FontAwesomeIcon icon={faCircleUp} color={'#859502'}/>
                                ) : (
                                    data.item.isLessTL ? (
                                        <FontAwesomeIcon icon={faCircleDown} color={'#ff2800'}/>
                                    ) : (
                                        <FontAwesomeIcon icon={faStar} color={colors.background}/>
                                    )
                                )
                            )}
                        </View>
                    </View>
                </View>
            )}
            renderHiddenItem={(data, rowMap) => (
                <View style={styles.rowBack}>
                    <TouchableOpacity style={styles.backRightBtn}>
                        <FontAwesomeIcon size={24} icon={faEdit} color={colors.text}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.backLeftBtn} onPress={() => {handleDeleteExercise(today, exerciseName, data.index)}}>
                        <FontAwesomeIcon size={24} icon={faTrash} color={colors.text}/>
                    </TouchableOpacity>
                </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
        />
    );
};

export default ExerciseList;

const styles = {
    exerciseList: {
        height: 200,
        paddingHorizontal: 30,
    },
    listText: {
        color: 'white',
        fontWeight: 'bold'
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50,
        borderColor: '#444',
        fontWeight: '16px',
        width: '100%'
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
    },
    backLeftBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        height: 50,
        width: 75,
        backgroundColor: 'red',
        marginLeft: -10,
    },
    backRightBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        height: 50,
        width: 75,
        backgroundColor: 'yellow',
        marginRight: -10
    },
}