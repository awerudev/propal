import React, {useContext, useEffect, useState} from 'react';
import ExerciseDetail from "../exercise-detail/ExerciseDetail";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView, Appearance, SafeAreaView,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faArrowLeft, faSearch,} from '@fortawesome/free-solid-svg-icons';
import DismissKeyboard from '../../utils/DismissKeyboard'
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {auth, db} from "../../firebase";
import styles from './styles/styles';
import { hexToRGB, generateUUIDv4, styleCheck } from './utilities';
import ExerciseModal from "./create-exercise/CreateExerciseModal";
import {ExercisesContext} from "../../context/ExercisesContext";
import OptionsModal from "../../components/modals/OptionsModal";
import RenameModal from "../../components/modals/RenameModal";

const sanitizeMuscleName = (name) => {
    return name.replace('●', '').trim();
};

function ChooseExercise({route}) {
    const { selectedMuscle: muscleFromRoute } = route.params || {};
    const [searchTerm, setSearchTerm] = useState('');
    const [muscleFilter, setMuscleFilter] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [exerciseName, setExerciseName] = useState();
    const [showErrorForName, setShowErrorForName] = useState(false);
    const [showErrorForDropdown, setShowErrorForDropdown] = useState(false);
    const [selectedMuscle, setSelectedMuscle] = useState(muscleFromRoute);
    const { exercisesLocal } = useContext(ExercisesContext);
    const sanitizedMuscleFromRoute = sanitizeMuscleName(muscleFromRoute);
    const filteredExercises = exercisesLocal.filter(exercise => sanitizeMuscleName(exercise.muscle) === sanitizedMuscleFromRoute);
    const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
    const [isRenameModalVisible, setIsRenameModalVisible] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);


    const colorScheme = Appearance.getColorScheme();
    const colors = {
        background: colorScheme === 'dark' ? '#000' : '#fff',
        text: colorScheme === 'dark' ? '#fff' : '#000',
        // ...add more color properties as needed
    };

    let localDate = new Date().toISOString();
    localDate = localDate.slice(0, localDate.indexOf('T'));
    const navigation = useNavigation();

    const togglePopup = () => {
        setShowErrorForName(false);
        setShowErrorForDropdown(false);
        setIsPopupOpen(!isPopupOpen);
    }

    const toggleSearchBar = () => {
        setIsSearchOpen(!isSearchOpen);
    }

    const handleSearch = () => {
        setSearchTerm('');
        setMuscleFilter(null);
    };

    function handleClose() {
        navigation.goBack();
    }

    const handleExerciseDetail = (exercise, localDate, muscle) => {
        // console.log(logSets)
        navigation.navigate('ExerciseDetail', {exercise: exercise, date: localDate, muscle: muscle});
    };

    const addExercise = async (muscleGroup, exerciseName, rating) => {
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

                // Check if 'exercises' field exists and is an object
                if (data.hasOwnProperty("exercises") && typeof data["exercises"] === "object") {

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
                                    rating: rating
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
                                    rating: rating
                                }
                            }
                        });
                    }
                } else {
                    // 'exercises' field does not exist or is not an object, create it and add the exercise
                    await setDoc(docRef, {
                        exercises: {
                            [muscleGroup]: {
                                [exerciseName]: {
                                    id,
                                    muscle: muscleGroup,
                                    name: exerciseName,
                                    rating: rating
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
            }

        } catch (error) {
            console.error('Error adding exercise:', error);
        }
    };

    /*const deleteExercise = async (exerciseName) => {
        if (auth.currentUser === null) {
            console.error('User is not logged in');
            return;
        }

        const userId = auth.currentUser.uid;
        const docRef = doc(db, `listOfExercises/${userId}`);

        try {
            await updateDoc(docRef, {
                [`exercises.${selectedMuscleGroup}.${exerciseName}`]: firebase.firestore.FieldValue.delete()
            });

            console.log('Exercise deleted successfully');
        } catch (error) {
            console.error('Error deleting exercise:', error);
        }
    };

    const renameExercise = async (oldName, newName) => {
        if (auth.currentUser === null) {
            console.error('User is not logged in');
            return;
        }

        const userId = auth.currentUser.uid;
        const docRef = doc(db, `listOfExercises/${userId}`);

        try {
            await updateDoc(docRef, {
                [`exercises.${selectedMuscleGroup}.${newName}`]: {
                    ...selectedExercise,
                    name: newName
                }
            });

            // After renaming, delete the old exercise name
            await updateDoc(docRef, {
                [`exercises.${selectedMuscleGroup}.${oldName}`]: firebase.firestore.FieldValue.delete()
            });

            console.log('Exercise renamed successfully');
        } catch (error) {
            console.error('Error renaming exercise:', error);
        }
    };*/

    async function handleSave() {
        //console.log(exerciseName, selectedMuscleGroup)
        if (!exerciseName) {
            setShowErrorForName(true)
        } else if (!selectedMuscleGroup) {
            setShowErrorForDropdown(true)
        }

        try {
            await addExercise(selectedMuscleGroup, exerciseName, 1);
            // Reset input values after successful save
            setExerciseName('');
            setSelectedMuscleGroup('');

        } catch (error) {
            console.error(error);
        }
    }

    const handleChildComponentValue = (value) => {
        setSelectedMuscleGroup(value);
    };

    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');

    return (
        <DismissKeyboard>
            <ExerciseModal
                isPopupOpen={isPopupOpen}
                togglePopup={togglePopup}
                exerciseName={exerciseName}
                setExerciseName={setExerciseName}
                showErrorForName={showErrorForName}
                showErrorForDropdown={showErrorForDropdown}
                handleChildComponentValue={handleChildComponentValue}
                handleSave={handleSave}
                styles={styles}
                colors={colors}
            />
            <SafeAreaView style={{flex: 1}}>
                <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
                    <View style={[styles.header, {backgroundColor: colors.backgroundColor}]}>
                        <TouchableOpacity onPress={handleClose} style={{
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            width: "20%",
                            height: 40
                        }}>
                            <FontAwesomeIcon icon={faArrowLeft} size={24} color={colors.text}/>
                        </TouchableOpacity>
                        <Text style={[styles.headerTitle, {width: '60%'}]}>{selectedMuscle} Exercises</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center', width: "20%"}}>
                            <TouchableOpacity onPress={toggleSearchBar} style={{justifyContent: 'center', marginRight: 15}}>
                                <FontAwesomeIcon icon={faSearch} size={20} color={colors.text}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={togglePopup} style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 40,
                                color: colors.text,
                            }}>
                                <FontAwesomeIcon icon={faPlus} size={24} color={colors.text}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {isSearchOpen &&
                        <View style={[styles.searchContainer]}>
                            <View style={styles.searchHeader}>
                                <TextInput
                                    style={styles.searchBar}
                                    placeholder=" Search exercise.."
                                    placeholderTextColor={'#ccc'}
                                    value={searchTerm}
                                    onChangeText={text => setSearchTerm(text)}
                                    onFocus={handleSearch}
                                />
                            </View>
                        </View>
                    }
                    {selectedMuscle &&
                        <ScrollView style={[styles.exercisesContainer, {backgroundColor: `rgba(${hexToRGB(styleCheck(selectedMuscle, false).backgroundColor)}, 0.2)`}]}>
                            {filteredExercises.map((exercise, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[exercise.muscle === null ? {display: 'none'} : {
                                        ...styleCheck(exercise.muscle, false),
                                        flex: 1,
                                        flexDirection: 'row'
                                    }, index === filteredExercises.length - 1 && styles.lastItem]}
                                    onPress={() => {
                                        handleExerciseDetail(exercise, localDate, exercise.muscle);
                                    }}
                                    onLongPress={() => {
                                        setSelectedExercise(exercise);
                                        setIsOptionsModalVisible(true);
                                    }}
                                >
                                    <Text style={[styleCheck(exercise.muscle, true),{paddingLeft: 10}]}>● </Text>
                                    <Text style={[styles.genericText, {paddingLeft: 5}]}>
                                        {exercise.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    }
                </View>
            </SafeAreaView>
        </DismissKeyboard>
    );
}

export default ChooseExercise;