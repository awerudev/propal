import React, {useState, useContext} from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity, SafeAreaView} from 'react-native';
import Swiper from 'react-native-swiper';
import img1 from '../../assets/img_4.png';
import img2 from '../../assets/img_5.png';
import img3 from '../../assets/img_6.png';
import {useNavigation} from "@react-navigation/native";
import {UserContext} from "./UserContext"
import firebase from "firebase/compat";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from '../../firebase';

const GoalSelectionScreen = () => {
    const { userDetails, setUserDetails } = useContext(UserContext);
    const goals = [
        {name: 'Gain Muscle', image: img1},
        {name: 'Lose Fat', image: img2},
        {name: 'Improve Stamina', image: img3},
        // Add more goals here
    ];
    const navigation = useNavigation();

    const handleFinish = () => {
        const selectedGoal = goals[activeIndex].name;

        setUserDetails(prevDetails => ({
            ...prevDetails,
            goal: selectedGoal,
        }));

        // Now you could send this data to Firebase.
        createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password)
            .then((userCredential) => {
                // Successful creation, now update profile
                const user = userCredential.user;
                return updateProfile(user, {
                    displayName: userDetails.username, // Replace with the actual name
                    // any other information
                }).then(() => user); // pass user to the next promise chain
            })
            .then((user) => {
                // Now save additional user details in Firestore
                console.log(user.uid)
                return setDoc(doc(db, 'users', user.uid), {
                    goal: selectedGoal,
                    email: userDetails.email,
                    age: 23,
                    weight: userDetails.weight,
                    height: userDetails.height,
                    name: userDetails.name,
                    lastName: userDetails.lastName,
                    // Add other details as necessary
                });
            })
            .then(() => {
                navigation.navigate('WelcomeScreen');
            })
            .catch((error) => {
                // Handle the error here - you might want to show an error message and stop the navigation
                console.error(error);
            });
    };

    const {width: viewportWidth} = Dimensions.get('window');

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, paddingTop: 10, alignItems: 'center'}}>
                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 15}}>
                    <Text style={{fontSize: 26, fontWeight: 'bold'}}>What is your goal?</Text>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: "#999"}}>It will help us choose the best</Text>
                        <Text style={{color: "#999"}}>program for you</Text>
                    </View>
                </View>
                <Swiper
                    onIndexChanged={(index) => setActiveIndex(index)}
                    loop={false}
                    style={{height: viewportWidth}}
                    showsPagination={false}
                >
                    {goals.map((item, index) => (
                        <View key={index} style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: "#1579FF",
                            marginHorizontal: 30,
                            borderRadius: 20
                        }}>
                            <Image source={item.image} style={{width: '100%', height: "50%"}} resizeMode="contain"/>
                            <Text style={{fontSize: 24, fontWeight: 'bold', marginTop: 10, color: 'white'}}>{item.name}</Text>
                            <Text style={{fontSize: 14, paddingHorizontal: 40, marginTop: 10, textAlign: 'center', color: 'white'}}>I’m “skinny fat”. look thin but have no shape. I want to add learn muscle in the right way</Text>
                        </View>
                    ))}
                </Swiper>

                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    {goals.map((goal, index) => (
                        <View
                            key={index}
                            style={{
                                height: 10,
                                width: 10,
                                borderRadius: 5,
                                margin: 5,
                                backgroundColor: index === activeIndex ? 'black' : 'gray',
                                marginVertical: 20
                            }}
                        />
                    ))}
                </View>
                <TouchableOpacity style={{padding:15, backgroundColor: "#1579FF", borderRadius: 30, width: "69%", justifyContent: 'center', alignItems: 'center'}} onPress={handleFinish}>
                    <Text style={{fontSize: 22, fontWeight: 'bold', color: "white"}}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default GoalSelectionScreen;
