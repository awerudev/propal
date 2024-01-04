// ExerciseModal.js
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import DismissKeyboard from "../../../utils/DismissKeyboard";
import Dropdown from "./Dropdown";

const ExerciseModal = ({
                           isPopupOpen,
                           togglePopup,
                           exerciseName,
                           setExerciseName,
                           showErrorForName,
                           showErrorForDropdown,
                           handleChildComponentValue,
                           handleSave,
                           styles,
                           colors
                       }) => {
    return (
        <Modal transparent={true} visible={isPopupOpen}>
            <DismissKeyboard>
                <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={togglePopup}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={togglePopup}
                                          style={{
                                              justifyContent: 'flex-end',
                                              alignItems: 'flex-end',
                                              marginTop: -5
                                          }}>
                            <FontAwesomeIcon icon={faX} color={'black'}/>
                        </TouchableOpacity>
                        <Text style={styles.title}>Create New Exercise</Text>
                        <View style={styles.inputsModule}>
                            <TextInput
                                style={styles.input}
                                placeholder="Exercise Name"
                                placeholderTextColor={'#ccc'}
                                value={exerciseName}
                                onChangeText={text => setExerciseName(text)}/>
                            {showErrorForName && (
                                <Text style={styles.errorText}>Exercise name is required.</Text>
                            )}
                            <View style={[styles.input, {backgroundColor: colors.background}]}>
                                <Dropdown onOptionSelect={handleChildComponentValue}/>
                            </View>
                            {showErrorForDropdown && (
                                <Text style={styles.errorText}>Muscle category is required.</Text>
                            )}
                        </View>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </DismissKeyboard>
        </Modal>
    )
};

export default ExerciseModal;
