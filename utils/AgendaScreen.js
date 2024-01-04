import React, {useContext, useState, useEffect} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity, Appearance, SafeAreaView} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft, faPlus} from '@fortawesome/free-solid-svg-icons';
import {useWorkoutLog, WorkoutLogContext} from '../screens/exercise-detail/WorkoutLogContext';
import Header from "./Header";
import {useNavigation} from "@react-navigation/native";

const AgendaScreen = () => {
    const [items, setItems] = useState({});
    const {workoutLogs, setWorkoutLogs} = useWorkoutLog(WorkoutLogContext);
    const navigation = useNavigation();

    const colorScheme = Appearance.getColorScheme();
    const colors = {
        background: colorScheme === 'dark' ? '#000' : '#fff',
        text: colorScheme === 'dark' ? '#fff' : '#000',
        // ...add more color properties as needed
    };

    let todayy = new Date().toISOString();
    todayy = todayy.slice(0, todayy.indexOf('T'));

    const [today, setToday] = useState(todayy);


    useEffect(() => {
        const loadItems = () => {
            const newItems = {};
            const baseHeight = 50; // Adjust as needed
            const perSetHeight = 20; // Adjust as needed

            // Iterate over workoutLogs and format for use in the Agenda
            Object.keys(workoutLogs).forEach(day => {
                newItems[day] = [];
                Object.keys(workoutLogs[day]).forEach(exerciseName => {
                    let exercise = workoutLogs[day][exerciseName];
                    if (exercise && exercise.sets) {
                        // Find an existing item for this exercise, or create a new one
                        let item = newItems[day].find(item => item.name === exerciseName);
                        if (!item) {
                            item = {
                                name: exerciseName,
                                sets: [],
                                height: baseHeight, // Start with base height
                                day
                            };
                            newItems[day].push(item);
                        }
                        // Add all sets for this exercise to the item
                        exercise.sets.forEach(set => {
                            item.sets.push({ reps: set.reps, weight: set.weight });
                            item.height += perSetHeight; // Increase height for each set
                        });
                    }
                });
            });

            setItems(newItems);
        };

        loadItems();
        // Find the most recent date in workoutLogs
        const recentDay = Object.keys(workoutLogs).reduce((recentDay, currentDay) => {
            return currentDay > recentDay ? currentDay : recentDay;
        }, "");

        setToday(recentDay);
    }, [today]);

    const loadItems = (day) => {
        const time = day.timestamp;
        const newItems = {};

        for (let i = -15; i < 85; i++) {
            const currTime = time + i * 24 * 60 * 60 * 1000;
            const strTime = timeToString(currTime);

            // Copy over days that have workouts logged
            if (items[strTime]) {
                newItems[strTime] = items[strTime];
            } else {
                // Add an empty array for days with no workouts
                newItems[strTime] = [];
            }
        }

        setItems(newItems);
    };


    const renderItem = (item, isFirst) => {
        return (
            <TouchableOpacity
                style={[styles.item, {height: item.height, backgroundColor: colors.background, color: colors.text, marginRight: 20}]}
                onPress={() => Alert.alert(item.name)}
            >
                <View style={{backgroundColor: '#eee', borderRadius: 30, marginBottom: 5}}>
                    <Text style={{color: colors.text, fontSize: 16, padding: 5, marginLeft: 5, fontWeight: '500'}}>{item.name}</Text>
                </View>
                {item.sets.map((set, index) => (
                    <Text key={index} style={{color: colors.text, marginLeft: 15, marginBottom: 3}}>
                        {index+1}. {set.weight}kg x {set.reps}
                    </Text>
                ))}
            </TouchableOpacity>
        );
    };

    const renderEmptyDate = () => {
        return (
            <View style={styles.emptyDate}>
                <Text style={{color: colors.text}}>This is an empty date!</Text>
            </View>
        );
    };

    const rowHasChanged = (r1, r2) => {
        return r1.name !== r2.name;
    };

    const timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    };

    function handleClose() {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{height: '100%', backgroundColor: colors.background}}>
                <Header
                    handleClose={handleClose}
                    screenName={'Workout History'}
                />
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Agenda
                        items={items}
                        loadItemsForMonth={loadItems}
                        selected={today}
                        renderItem={renderItem}
                        renderEmptyDate={renderEmptyDate}
                        rowHasChanged={rowHasChanged}
                        showClosingKnob={true}
                        theme={{
                            backgroundColor: colors.background,
                            calendarBackground: '#eee',
                            textSectionTitleColor: colors.text,
                            selectedDayBackgroundColor: '#3F51B5FF',
                            selectedDayTextColor: colors.text,
                            todayTextColor: '#3F51B5FF',
                            dayTextColor: colors.text,
                            textDisabledColor: '#555',
                            dotColor: '#3F51B5FF',
                            selectedDotColor: colors.text,
                            arrowColor: colors.text,
                            monthTextColor: colors.text,
                            indicatorColor: colors.text,
                            agendaDayTextColor: colors.text,
                            agendaDayNumColor: colors.text,
                            agendaTodayColor: '#3F51B5FF',
                            agendaKnobColor: '#3F51B5FF',
                            textDayFontSize: 14,
                            textMonthFontSize: 18,
                            textDayHeaderFontSize: 14,
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#111',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
        shadowColor: "#000", // This is your box shadow color
        shadowOffset: {
            width: 0,   // These are your box shadow offsets
            height: 2,
        },
        shadowOpacity: 0.23,  // This is your box shadow opacity
        shadowRadius: 2.62,  // This is your box shadow radius
        elevation: 4,  // This adds shadow to Android and needs to be used in conjunction with the above properties
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30,
    },
    header: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: -30,
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    },
});

export default AgendaScreen;