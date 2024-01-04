import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

const GenderPicker = ({onGenderSelect}) => {
    const [gender, setGender] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text>Select Gender: {gender}</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 200, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                        <TouchableOpacity onPress={() => {
                            setGender('Male');
                            setModalVisible(false);
                            onGenderSelect('Male');  // Notify the parent component
                        }}>
                            <Text style={{ padding: 10 }}>Male</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setGender('Female');
                            setModalVisible(false);
                            onGenderSelect('Female');  // Notify the parent component
                        }}>
                            <Text style={{ padding: 10 }}>Female</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default GenderPicker;