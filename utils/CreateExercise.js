import React, { useState } from 'react';
import { Button, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App({isPopupOpen}) {

    return (
        <View style={styles.container}>
            <Modal transparent={true} visible={isPopupOpen}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>This is a modal</Text>
                        <Button title="Close" onPress={() => !isPopupOpen} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    modalText: {
        fontSize: 20,
        marginBottom: 20,
    },
    text: {
        fontSize: 20,
        color: '#fff',
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },

});