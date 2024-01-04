import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Dropdown = (props) => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const options = ['Chest ●', 'Triceps ●', 'Back ●', 'Biceps ●', 'Legs ●', 'Shoulders ●', 'Abs ●'];
    const circle = '● ';

    const handleOptionSelect = (option) => {
        setSelectedValue(option);
        setShowModal(false);
        props.onOptionSelect(option);
    }

    const styleCheck = (muscle) => {
        return (
            muscle === 'Abs ●' ? { background: styles.core, text: styles.coreText } :
                muscle === 'Chest ●' ? { background: styles.chest, text: styles.chestText } :
                    muscle === 'Back ●' ? { background: styles.back, text: styles.backText } :
                        muscle === 'Legs ●' ? { background: styles.legs, text: styles.legsText } :
                            muscle === 'Shoulders ●' ? { background: styles.shoulders, text: styles.shouldersText } :
                                muscle === 'Biceps ●' ? { background: styles.biceps, text: styles.bicepsText } :
                                    muscle === 'Triceps ●' ? { background: styles.triceps, text: styles.tricepsText } :
                                        { background: styles.generic, text: styles.genericText }
        );
    }

    return (
        <View>
            <TouchableOpacity onPress={() => setShowModal(true)} style={styles.input}>
                <Text style={{ color: '#ccc' }}>{selectedValue || 'Select an option'}</Text>
                <FontAwesomeIcon icon={faChevronDown} color={'#ccc'} style={{ marginRight: 5 }} />
            </TouchableOpacity>
            <Modal
                visible={showModal}
                transparent={true}
                animationType='fade'
                onRequestClose={() => setShowModal(false)}>
                <TouchableOpacity onPress={() => setShowModal(false)} style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}>
                    <View style={{ backgroundColor: 'white', borderRadius: 5, width: 170, marginTop: 160 }}>
                        {options.map(option => (
                            <TouchableOpacity
                                key={option}
                                style={styles.dropdownList}
                                onPress={() => handleOptionSelect(option)}>
                                <Text style={styleCheck(option).background}>
                                    <Text style={styleCheck(option).text}>{circle}</Text>
                                    <Text>{option.replace('●', '').slice()}</Text>
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

export default Dropdown;

const styles = StyleSheet.create({
    input: {
        flexDirection: 'row',
        color: '#F5F5F5',
        height: 50,
        width: '100%',
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dropdownList: {
        padding: 10,
        borderColor: '#bbb'
    },
    chest: {
        backgroundColor: 'white',
    },
    chestText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#C58BF2',
    },
    back: {
        backgroundColor: 'white',
    },
    backText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FCBB62',
    },
    legs: {
        backgroundColor: 'white',
    },
    legsText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FF8383',
    },
    shoulders: {
        backgroundColor: 'white',
    },
    shouldersText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#40E759',
    },
    biceps: {
        backgroundColor: 'white',
    },
    bicepsText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#ffba01',
    },
    triceps: {
        backgroundColor: 'white',
    },
    tricepsText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#A74EEC',
    },
    core: {
        backgroundColor: 'white',
    },
    coreText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#00C1FF',
    },
    generic: {
        backgroundColor: '#333',
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
    },
    genericText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff',
    }
});
