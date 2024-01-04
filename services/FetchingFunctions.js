import {auth, db, doc} from "../firebase";
import {getDoc} from "firebase/firestore";

export const fetchExercises = async (db, auth) => {
    let exercises = [];

    // Fetch standard exercises
    const standardExercisesRef = doc(db, "workoutLogs", "listOfExercises");
    const standardExercisesSnap = await getDoc(standardExercisesRef);

    if (standardExercisesSnap.exists()) {
        const data = standardExercisesSnap.data();
        const dataV2 = data.exercises;

        Object.keys(dataV2).forEach((muscle) => {
            Object.keys(dataV2[muscle]).forEach((exerciseId) => {
                const exercise = {
                    id: dataV2[muscle][exerciseId].id,
                    name: dataV2[muscle][exerciseId].name,
                    muscle: dataV2[muscle][exerciseId].muscle,
                    rating: dataV2[muscle][exerciseId].rating
                };
                exercises.push(exercise);
            });
        });
    }

    // Fetch user-specific exercises
    if (auth.currentUser !== null) {
        const userId = auth.currentUser.uid;
        const userExercisesRef = doc(db, "listOfExercises", userId);
        const userExercisesSnap = await getDoc(userExercisesRef);

        if (userExercisesSnap.exists()) {
            const data = userExercisesSnap.data();
            const dataV2 = data.exercises;

            if (dataV2) {
                Object.keys(dataV2).forEach((muscle) => {
                    Object.keys(dataV2[muscle]).forEach((exerciseId) => {
                        const exercise = {
                            id: dataV2[muscle][exerciseId].id,
                            name: dataV2[muscle][exerciseId].name,
                            muscle: dataV2[muscle][exerciseId].muscle,
                            rating: dataV2[muscle][exerciseId].rating
                        };
                        exercises.push(exercise);
                    });
                });
            }
        }
    }

    return exercises;
};
