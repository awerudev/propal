import React, { useContext, useEffect, useState } from 'react';
import { Image, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { UserContext } from "../screens/login-signup/UserContext";
import { useWorkoutLog } from "../screens/exercise-detail/WorkoutLogContext";
import { ExercisesContext } from "../context/ExercisesContext";
import { fetchExercises } from "../services/FetchingFunctions";

const LogoScreen = () => {
    const navigation = useNavigation();
    const { userDetails, setUserDetails } = useContext(UserContext);
    const { setWorkoutLogs } = useWorkoutLog();
    const [isLoading, setIsLoading] = useState(false);
    const { exercisesLocal, setExercisesLocal } = useContext(ExercisesContext);

    const fetchData = async () => {
        const exercises = await fetchExercises(db, auth);
        setExercisesLocal(exercises);
    };

    useEffect(() => {
        setIsLoading(true); // start showing the loader immediately

        const unsubscribe = onAuthStateChanged(auth, async authUser => {
            if (authUser) {
                // Fetch user data from Firestore
                const docRef = doc(db, 'users', authUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    // Set the user data from Firestore into state
                    setUserDetails({
                        email: docSnap.get("email"),
                        height: docSnap.get("height"),
                        weight: docSnap.get("weight"),
                        age: docSnap.get("age"),
                        name: docSnap.get("name"),
                        lastName: docSnap.get("lastName"),
                    });
                } else {
                    console.log("No such document!");
                }

                // Fetch workout log data
                const docRef2 = doc(db, 'workoutLogs', authUser.uid);
                const docSnap2 = await getDoc(docRef2);

                if (docSnap2.exists()) {
                    // Retrieve all workout log data and save it in the context
                    const workoutLogData = docSnap2.data();
                    // Set the workoutLogs state with the retrieved data
                    setWorkoutLogs(workoutLogData);
                } else {
                    console.log("No such document!");
                }

                // Fetch exercises
                await fetchData();

                navigation.navigate("MainScreen");
            } else {
                navigation.navigate("LoginScreen");
            }
            setIsLoading(false); // stop showing the loader once all data fetching is done
        });

        return unsubscribe;
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/biggerlogotext.png')}
                style={styles.logo}
            />
            {isLoading && <ActivityIndicator size="large" color="#3F51B5FF" />}
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
}

export default LogoScreen;
