import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OptionsModal = ({ isVisible, onClose, onRename, onDelete }) => {
    if (!isVisible) return null;

    return (
        <View style={styles.modalContainer}>
            <TouchableOpacity onPress={onRename}>
                <Text>Rename</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
                <Text>Delete</Text>
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
});

export default OptionsModal;