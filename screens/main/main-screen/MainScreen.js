import React, {useState, useEffect, useContext} from 'react';
import {Image, Text, TouchableOpacity, View, Appearance} from 'react-native';
import { SafeAreaView} from "react-native-safe-area-context";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChartPie, faPerson, faStopwatch20, faUser, faHome, faBell, faImage} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from "@react-navigation/native";

import {UserContext} from "../../login-signup/UserContext";

import img from '../../../assets/img.png';
import postWorkoutMeal from '../../../assets/food/post-workout-meal.png';
import breakfast from '../../../assets/food/breakfast.png';
import lunch from '../../../assets/food/meal-2.png';
import lunch2 from '../../../assets/food/meal-3.png';
import dinner from '../../../assets/food/dinner.png';
import img3 from '../../../assets/calendar.png';
import imgpfp from "../../../assets/kratos.png";

import imgPush from "../../../assets/coach/push.png";
import imgPull from "../../../assets/coach/pull.png";
import imgLegs from "../../../assets/muscles/quads.png";
import imgCardio from "../../../assets/coach/cardio.png";
import {db} from "../../../firebase";
import {doc, getDoc, setDoc} from "firebase/firestore";

const getCurrentMeal = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour <= 10) {
        return 'Breakfast';
    } else if (currentHour >= 11 && currentHour <= 14) {
        return 'Lunch';
    } else if (currentHour >= 15 && currentHour <= 17) {
        return 'Lunch 2';
    } else if (currentHour >= 18 && currentHour <= 21) {
        return 'Dinner';
    } else {
        return 'No meal time';
    }
}

const getMealColor = (meal) => {
    switch (meal) {
        case 'Breakfast':
            return '#2BA5F7'; // Orange
        case 'Lunch':
            return '#fdc701'; // LimeGreen
        case 'Lunch 2':
            return '#ff6e01';
        case 'Dinner':
            return '#2BA5F7'; // DarkRed
        case 'Post-Workout':
            return '#14da1b'; // BlueViolet
        default:
            return '#1da844'; // Default color
    }
}

const getWorkoutImage = (workout) => {
    switch (workout) {
        case 'Push':
            return imgPush; // Replace with your Push workout image import
        case 'Pull':
            return imgPull; // Replace with your Pull workout image import
        case 'Legs':
            return imgLegs; // Replace with your Legs workout image import
        case 'Cardio':
            return imgCardio; // Replace with your Cardio workout image import
        default:
            return img; // Default image
    }
}

const getNextWorkout = () => {
    const currentDay = new Date().getDay(); // 0 is Sunday, 1 is Monday, etc.

    const workouts = ['Cardio', 'Push', 'Pull', 'Legs', 'Cardio', 'Push', 'Pull'];

    return workouts[currentDay];
}

const MainScreen = () => {
    const navigation = useNavigation();
    const colorScheme = Appearance.getColorScheme();
    const {userDetails} = useContext(UserContext);

    const [username, setUsername] = useState("User");
    const [exercisesLocal, setExercisesLocal] = useState([]);
    const [todaysExercise, setTodaysExercise] = useState('Push');

    const colors = {
        background: colorScheme === 'dark' ? '#000' : '#fff',
        text: colorScheme === 'dark' ? '#fff' : '#000',
    };

    useEffect(() => {
        setUsername(userDetails.name);
    }, []);

    function handleCalendarPress() {
        navigation.navigate('AgendaScreen');
    }

    function handleUpdatePress() {
        navigation.navigate('UpdateScreen');
    }

    function handleStartWorkoutPress() {
        navigation.navigate('ChooseCategory');
    }

    function handleMealLogPress() {
        navigation.navigate('MealLog');
    }

    function handleSettingsPress() {
        navigation.navigate('SettingsScreen');
    }

    function handleChartsPress() {
        navigation.navigate('ChartsScreen', {exercisesL: exercisesLocal});
    }

    function handleGalleryPress() {
        navigation.navigate('GalleryScreen');
    }

    const meal = getCurrentMeal();

    const workout = getNextWorkout();

    const mealColor = getMealColor(meal);
    const workoutImage = getWorkoutImage(workout);
    const getMealImage = () => {
        switch (meal) {
            case 'Breakfast':
                return breakfast;
            case 'Lunch':
                return lunch;
            case 'Lunch 2':
                return lunch2;
            case 'Dinner':
                return dinner;
            case 'Post Workout':
                return postWorkoutMeal;
            default:
                return null;
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={[{padding: 10, flexDirection: 'row', justifyContent: 'space-between'}, styles.cardHeader]}>
                <View style={{flexDirection: 'row', marginLeft: 15}}>
                    <TouchableOpacity>
                        <Image source={imgpfp} style={{width: 45, height: 45, borderRadius: 50}}
                               resizeMode="cover"/>
                    </TouchableOpacity>
                    <View style={{paddingLeft: 10}}>
                        <Text style={{color: 'darkgrey', fontSize: 14, fontWeight: '400'}}>Welcome Back,</Text>
                        <Text style={{
                            color: colors.text,
                            fontSize: 24,
                            fontWeight: '600',
                            paddingLeft: 5
                        }}>{username}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', paddingRight: 20}}>
                    <FontAwesomeIcon icon={faBell} size={24} color="#111"/>
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <TouchableOpacity onPress={handleStartWorkoutPress} style={[{
                    backgroundColor: '#CDD6FF',
                }, styles.card]}>
                    <View style={{width: '55%'}}>
                        <Text style={{color: 'black', fontSize: 22, fontWeight: '600'}}>Start Workout</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{color: '#0033ff'}}>Today's workout: </Text><Text>{workout}</Text>
                        </View>
                        <TouchableOpacity onPress={handleStartWorkoutPress} style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 40,
                            width: '60%',
                            marginTop: 15
                        }}>
                            <Text style={{color: '#96B3FE', fontWeight: 'bold'}}>Start</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{backgroundColor: '#E8EDFF', borderRadius: 50}}>
                        <Image source={workoutImage} style={{width: 125, height: 100, borderRadius: 20}} resizeMode="contain"/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleMealLogPress}
                                  style={[{marginVertical: 30, backgroundColor: '#F2F2F2'}, styles.card]}>
                    <View style={{width: '60%'}}>
                        <Text style={{color: 'black', fontSize: 22, fontWeight: '600'}}>Meal Log</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{color: mealColor}}>Next meal: </Text><Text>{meal}</Text>
                        </View>
                        <TouchableOpacity onPress={handleMealLogPress} style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 40,
                            width: '60%',
                            marginTop: 15
                        }}>
                            <Text style={{color: '#96B3FE', fontWeight: 'bold'}}>View More</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{backgroundColor: '#E8EDFF', borderRadius: 50, padding: 10}}>
                        <Image source={getMealImage()} style={{width: 120, height: 104}}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCalendarPress}
                                  style={[{marginBottom: 30, backgroundColor: '#F34D56'}, styles.card]}>
                    <View style={{width: '60%'}}>
                        <View style={{paddingLeft: 10}}>
                            <Text style={{color: 'black', fontSize: 22, fontWeight: '600'}}>Workout</Text>
                            <Text style={{color: 'black', fontSize: 22, fontWeight: '600'}}>History</Text>
                        </View>
                        <TouchableOpacity onPress={handleCalendarPress} style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 40,
                            width: '60%',
                            marginTop: 15
                        }}>
                            <Text style={{color: '#96B3FE', fontWeight: 'bold'}}>View More</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{backgroundColor: '#E8EDFF', borderRadius: 30}}>
                        <Image source={img3} style={{width: 104, height: 104, borderRadius: 30}}/>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <View style={{flexDirection: 'row', width: '40%'}}>
                    <TouchableOpacity onPress={handleUpdatePress} style={styles.footerItem}>
                        <FontAwesomeIcon icon={faPerson} size={24} color="#1579FF"/>
                        <Text style={styles.footerText}>Body</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleGalleryPress} style={styles.footerItem}>
                        <FontAwesomeIcon icon={faImage} size={24} color="#1579FF"/>
                        <Text style={styles.footerText}>Gallery</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.footerItem, {
                    width: '20%',
                    paddingVertical: 10,
                    bottom: 20,
                    backgroundColor: '#DAE3FF',
                    borderRadius: 50,
                    height: 80
                }]}>
                    <FontAwesomeIcon icon={faHome} size={30} color="#34113F"/>
                    <Text style={{color: "#34113F"}}>Home</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', width: '40%'}}>
                    <TouchableOpacity onPress={handleChartsPress} style={styles.footerItem}>
                        <FontAwesomeIcon icon={faChartPie} size={24} color="#1579FF"/>
                        <Text style={styles.footerText}>Status</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSettingsPress} style={styles.footerItem}>
                        <FontAwesomeIcon icon={faUser} size={24} color="#1579FF"/>
                        <Text style={styles.footerText}>User</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default MainScreen;

const styles = {
    body: {
        backgroundColor: '#f0f0f0'
    },
    startButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    footerItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        width: '50%',
        height: 50,
    },
    mainText: {
        color: '#3F51B5',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 5,
    },
    footerText: {
        color: '#1579FF',
    },
    menuText: {
        color: 'white',
        fontSize: '18px',
        padding: 5,
        marginLeft: 5,
        borderBottom: 'black',
    },
    menuButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: -35,
        width: 110,
    },
    logo: {
        width: 40,
        height: 40,
    },
    chooseExercise: {
        backgroundColor: '#222',
        padding: 10,
        borderRadius: 10,
        width: 100,
        height: 90,
        alignItems: 'center',
    },
    main: {
        backgroundColor: 'red'
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        height: 160,
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000", // This is your box shadow color
        shadowOffset: {
            width: 0,   // These are your box shadow offsets
            height: 2,
        },
        shadowOpacity: 0.23,  // This is your box shadow opacity
        shadowRadius: 2.62,  // This is your box shadow radius
        elevation: 4,  // This adds shadow to Android and needs to be used in conjunction with the above properties
    },
    cardHeader: {
        backgroundColor: 'white',
        shadowColor: "#000", // This is your box shadow color
        shadowOffset: {
            width: 0,   // These are your box shadow offsets
            height: 2,
        },
        shadowOpacity: 0.23,  // This is your box shadow opacity
        shadowRadius: 2.62,  // This is your box shadow radius
        elevation: 4,  // This adds shadow to Android and needs to be used in conjunction with the above properties
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 'auto',
        justifyContent: 'space-between',
        width: '100%',
        height: 70,
        backgroundColor: '#fff',
        shadowColor: "#000", // This is your box shadow color
        shadowOffset: {
            width: 0,   // These are your box shadow offsets
            height: 2,
        },
        shadowOpacity: 0.23,  // This is your box shadow opacity
        shadowRadius: 2.62,  // This is your box shadow radius
        elevation: 4,  // This adds shadow to Android and needs to be used in conjunction with the above properties
    }
};