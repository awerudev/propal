import {auth, db} from "../../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { generateUUIDv4 } from "./utilities";

const addExercise = async (muscleGroup, exerciseName, set, togglePopup, exercisesLocal) => {
    if (auth.currentUser === null) {
        console.error('User is not logged in');
        return;
    }

    const userId = auth.currentUser.uid;
    const id = generateUUIDv4();

    try {
        const docRef = doc(db, `listOfExercises/${userId}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();

            // Check if muscle group exists
            if (muscleGroup in data["exercises"]) {
                const muscleRef = data["exercises"][muscleGroup];

                // Check if exercise exists
                if (exerciseName in muscleRef) {
                    console.log("exercise exists!")
                } else {
                    // Exercise does not exist, add it to the muscle group
                    await updateDoc(docRef, {
                        [`exercises.${muscleGroup}.${exerciseName}`]: {
                            id,
                            muscle: muscleGroup,
                            name: exerciseName,
                            rating: set  // assuming that 'set' is rating
                        }
                    });
                }
            } else {
                // Muscle group does not exist, add it and the exercise
                await updateDoc(docRef, {
                    [`exercises.${muscleGroup}`]: {
                        [exerciseName]: {
                            id,
                            muscle: muscleGroup,
                            name: exerciseName,
                            rating: set  // assuming that 'set' is rating
                        }
                    }
                });
            }
        } else {
            // Document does not exist, create it and add the exercise
            await setDoc(docRef, {
                exercises: {
                    [muscleGroup]: {
                        [exerciseName]: {
                            id,
                            muscle: muscleGroup,
                            name: exerciseName,
                            rating: set  // assuming that 'set' is rating
                        }
                    }
                }
            });
        }

        togglePopup();
        console.log('Exercise added successfully');

        // Retrieve the updated exercise data and add it to the local array
        const updatedDocSnap = await getDoc(docRef);
        const updatedData = updatedDocSnap.data();
        const updatedExercise = updatedData["exercises"][muscleGroup][exerciseName];
        exercisesLocal.push(updatedExercise);

    } catch (error) {
        console.error('Error adding exercise:', error);
    }
};


export default {
    addExercise
};
