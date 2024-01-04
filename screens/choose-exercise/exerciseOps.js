import firebaseOps from './firebaseOps';

const validateExerciseData = (exerciseName, selectedMuscleGroup, setShowErrorForName, setShowErrorForDropdown) => {
    if (!exerciseName) {
        setShowErrorForName(true);
        return false;
    } else if (!selectedMuscleGroup) {
        setShowErrorForDropdown(true);
        return false;
    }

    return true;
};

const resetExerciseData = (setExerciseName, setSelectedMuscleGroup) => {
    setExerciseName('');
    setSelectedMuscleGroup('');
};

const handleSave = async (selectedMuscleGroup, exerciseName, set, togglePopup, exercisesLocal, setShowErrorForName, setShowErrorForDropdown, setExerciseName, setSelectedMuscleGroup) => {
    if (!validateExerciseData(exerciseName, selectedMuscleGroup, setShowErrorForName, setShowErrorForDropdown)) {
        return;
    }

    try {
        await firebaseOps.addExercise(selectedMuscleGroup, exerciseName, set, togglePopup, exercisesLocal);
        resetExerciseData(setExerciseName, setSelectedMuscleGroup);
    } catch (error) {
        console.error(error);
    }
};

export default {
    validateExerciseData,
    resetExerciseData,
    handleSave
};
