import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const RenameModal = ({ isVisible, onClose, onSave }) => {
    const [newName, setNewName] = useState('');

    if (!isVisible) return null;

    return (
        <View style={styles.modalContainer}>
            <TextInput
                value={newName}
                onChangeText={setNewName}
                placeholder="New Exercise Name"
                style={styles.input}
            />
            <TouchableOpacity onPress={() => {
                onSave(newName);
                setNewName('');  // Reset the input after saving
            }}>
                <Text>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
                <Text>Close</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        top: '40%',
        left: '20%',
        width: '60%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '100%',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
});

export default RenameModal;
