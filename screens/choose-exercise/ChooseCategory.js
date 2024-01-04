import React, {useEffect, useState} from 'react';
import ExerciseDetail from "../exercise-detail/ExerciseDetail";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView, Appearance, SafeAreaView, Image
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faArrowLeft, faSearch,} from '@fortawesome/free-solid-svg-icons';
import DismissKeyboard from '../../utils/DismissKeyboard'
import {useNavigation} from "@react-navigation/native";
import MainScreen from "../main/main-screen/MainScreen";
import {doc, enableIndexedDbPersistence, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {auth, db} from "../../firebase";
import styles from './styles/styles';
import {hexToRGB, generateUUIDv4, styleCheck} from './utilities';
import ExerciseModal from "./create-exercise/CreateExerciseModal";
import {backgroundColor} from "react-native-calendars/src/style";
import chest from '../../assets/muscles/chest.png';
import back from '../../assets/muscles/back.png';
import quads from '../../assets/muscles/quads.png';
import calves from '../../assets/muscles/calves.png';
import shoulders from '../../assets/muscles/shoulders.png';
import abs from '../../assets/muscles/abs.png';
import neck from '../../assets/muscles/neck.png';
import forearms from '../../assets/muscles/forearms.png';
import biceps from '../../assets/muscles/biceps.png';
import triceps from '../../assets/muscles/triceps.png';
import push from '../../assets/coach/push.png';
import pull from '../../assets/coach/pull.png';
import upper from '../../assets/coach/upper.png';
import lower from '../../assets/coach/lower.png';
import cardio from '../../assets/coach/cardio.png';

function ChooseExercise() {
    const [searchTerm, setSearchTerm] = useState('');
    const [muscleFilter, setMuscleFilter] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [exerciseName, setExerciseName] = useState();
    const [exercisesLocal, setExercisesLocal] = useState([]);
    const [showErrorForName, setShowErrorForName] = useState(false);
    const [showErrorForDropdown, setShowErrorForDropdown] = useState(false);
    const [showList, setShowList] = useState(false);
    const [selectedMuscle, setSelectedMuscle] = useState(null);

    const colorScheme = Appearance.getColorScheme();
    const colors = {
        background: colorScheme === 'dark' ? '#000' : '#fff',
        text: colorScheme === 'dark' ? '#fff' : '#000',
        // ...add more color properties as needed
    };

    const muscleImages = {
        'Chest': chest,
        'Back': back,
        'Shoulders': shoulders,
        'Biceps': biceps,
        'Triceps': triceps,
        'Quads': quads,
        'Neck': neck,
        'Calves': calves,
        'Abs': abs,
        'Push': push,
        'Pull': pull,
        'Upper Body': upper,
        'Lower Body': lower,
        'Cardio': cardio,
        //
        'Legs': quads
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

    const filteredExercises = exercisesLocal
        .filter(exercise => exercise.name.includes(searchTerm))
        .filter(exercise => !muscleFilter || exercise.muscle === muscleFilter);

    const uniqueMuscles = ['Chest', 'Back', 'Legs', 'Abs', 'Shoulders', 'Triceps', 'Biceps',
        'Push', 'Pull', 'Upper Body', 'Lower Body', 'Cardio'];

    function handleClose() {
        navigation.replace('MainScreen');
    }

    const handleExerciseDetail = (exercise, localDate, logSets, muscle) => {
        // console.log(logSets)
        navigation.navigate('ExerciseDetail', {exercise: exercise, date: localDate, logSets: logSets, muscle: muscle});
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
                            width: "10%",
                            height: 40
                        }}>
                            <FontAwesomeIcon icon={faArrowLeft} size={24} color={colors.text}/>
                        </TouchableOpacity>
                        <Text style={[styles.headerTitle, {width: '70%'}]}>Choose Category</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center', width: "10%"}}>
                            <TouchableOpacity onPress={togglePopup} style={{
                                justifyContent: 'center',
                                height: 40,
                                color: colors.text
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
                    <ScrollView style={styles.muscleContainer} contentContainerStyle={{alignItems: 'center'}}>
                        {uniqueMuscles.map((muscle, id) => (
                            <TouchableOpacity
                                key={id}
                                style={[styleCheck(muscle, false), {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: 350,
                                }]}
                                onPress={() => {
                                    navigation.navigate('ChooseExercise', {selectedMuscle: muscle, exercisesL: exercisesLocal});
                                }}
                            >
                                <View style={{width: '50%'}}>
                                <Image
                                    source={muscleImages[muscle]}
                                    style={{
                                        height: 110,
                                        width: 110,
                                        borderRadius: 10,
                                        marginLeft: 25,
                                    }}
                                />
                                </View>
                                <Text style={[styleCheck(muscle, true), {textAlign: "center", fontSize: 28}]}>
                                    {muscle}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </DismissKeyboard>
    );
}

export default ChooseExercise;