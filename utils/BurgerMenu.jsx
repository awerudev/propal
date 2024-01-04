import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';

const BurgerMenu = () => {
    const [visible, setVisible] = useState(false);

    return (
        <View>
            <TouchableOpacity onPress={() => setVisible(true)}>
                <MaterialIcons name="menu" size={24} color="black"/>
            </TouchableOpacity>
            <Modal visible={visible}>
                <View>
                    <TouchableOpacity onPress={() => setVisible(false)}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>Notes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>Timer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>Goals</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

export default BurgerMenu;