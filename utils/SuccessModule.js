import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { View, Modal, Text } from 'react-native';

const SuccessModule = ({ visible, hideModal }) => {
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(visible);
        if (visible) {
            setTimeout(() => {
                hideModal();
            }, 3000); // Hide the modals after 3 seconds
        }
    }, [visible]);

    return (
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5 }}>
                    <Text>This is a modal!</Text>
                </View>
            </View>
        </Modal>
    );
};

export default SuccessModule;