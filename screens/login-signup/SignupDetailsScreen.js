import React, {useState, useRef, useContext} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    Platform,
    Button,
    SafeAreaView,
    Modal, KeyboardAvoidingView, Appearance
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {
    faCalendarDays, faChevronDown,
    faChevronRight,
    faRulerVertical,
    faVenusMars,
    faWeight
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import DismissKeyboard from "../../utils/DismissKeyboard";
import DateTimePicker from '@react-native-community/datetimepicker';
import {UserContext} from "./UserContext"
import GenderPicker from "./GenderPicker";
import {useNavigation} from "@react-navigation/native";
import colors from "react-native/Libraries/NewAppScreen/components/Colors";

const SignupDetailsScreen = () => {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [gender, setGender] = useState(null);
    const { userDetails, setUserDetails } = useContext(UserContext);
    const [selectedGender, setSelectedGender] = useState(null);
    const navigation = useNavigation();
    const colorScheme = Appearance.getColorScheme();

    const handleNext = () => {
        if (!fName || !lName || !selectedGender || !date || !weight || !height) {
            console.log(fName, lName, selectedGender, date, weight, height)
            alert('Please fill out all fields');
            return;
        }

        // Set the user data in the context
        setUserDetails({
            name: fName,
            lastName: lName,
            gender: selectedGender,
            dateOfBirth: date,
            weight: weight,
            height: height,
        });

        navigation.navigate('EmailPasswordScreen');
    };

    const source = require('../../assets/userPic.png');

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setModalVisible(false);  // Explicitly set this to false
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const [modalVisible, setModalVisible] = useState(false);
    const pickerRef = useRef();

    return (
        <SafeAreaView style={{flex: 1}}>
            <DismissKeyboard>
                <View style={{backgroundColor: 'white', alignItems: 'center', flexDirection: 'row', height: '100%', overflow: 'hidden'}}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : null}
                        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 5}
                        style={{flex: 1, backgroundColor:'white', justifyContent: 'flex-start', alignItems: 'center'}}
                    >
                    <View style={{justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Text style={{fontSize: 26, fontWeight: 'bold', marginBottom: 10}}>Let's complete your
                            profile</Text>
                        <Text style={{color: 'grey'}}>it will help us to know more about you!</Text>
                    </View>
                    <TouchableOpacity style={{marginTop: 20, marginBottom: 20}}>
                        <Image source={source} style={{width: 70, height: 70, marginBottom: 10}}/>
                        <Text>Add Photo</Text>
                    </TouchableOpacity>
                    <View
                        style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginBottom: 20}}>
                        <TextInput
                            placeholder="First Name"
                            value={fName}
                            onChangeText={text => setFName(text)}
                            style={[styles.input, {width: 145}]}
                        />
                        <TextInput
                            placeholder="Last Name"
                            value={lName}
                            onChangeText={text => setLName(text)}
                            style={[styles.input, {width: 145}]}
                        />
                    </View>

                    <View style={[styles.input, {
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '80%',
                        marginBottom: 20
                    }]}>
                        <FontAwesomeIcon icon={faVenusMars} size={24} color="gray" style={{marginRight: 10}}/>
                        <GenderPicker onGenderSelect={(gender) => {
                            console.log("Gender selected:", gender);
                            setSelectedGender(gender);
                        }} />
                        <FontAwesomeIcon icon={faChevronDown} size={24} color="gray" style={{marginLeft: 'auto'}} onPress={() => pickerRef.current.togglePicker()}/>
                    </View>

                    <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.input, {
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        width: '80%'
                    }]}>
                        <View style={{ flexDirection: 'row'}}>
                            <FontAwesomeIcon icon={faCalendarDays} size={24} color="gray"
                                             style={{marginRight: 10}}/>
                            <Text style={{
                                color: 'lightgrey',
                                fontWeight: '500',
                                paddingTop: 5,
                            }}>{date.toISOString().slice(0, date.toISOString().indexOf('T'))}</Text>
                        </View>
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display={Platform.OS === 'android' ? 'default' : 'spinner'}
                                    onChange={onChange}
                                    style={[styles.modalContent, {width: '100%'}]}
                                />
                                {Platform.OS === 'ios' && (
                                    <Button title="Save" onPress={() => setModalVisible(false)} color="red" />
                                )}
                            </View>
                        </View>
                    </Modal>
                        <View style={[styles.input, {flexDirection: 'row', width: '70%', marginTop: 30}]}>
                            <FontAwesomeIcon icon={faWeight} size={24} color="gray"/>
                            <TextInput
                                placeholder="Your weight"
                                value={weight}
                                onChangeText={text => setWeight(text)}
                                keyboardType="numeric"
                                style={{marginLeft: 10, width: '100%'}}
                            />
                        </View>
                        <View style={[styles.input, {flexDirection: 'row', width: '70%', marginTop: 20}]}>
                            <FontAwesomeIcon icon={faRulerVertical} size={24} color="gray"/>
                            <TextInput
                                placeholder="Your height"
                                value={height}
                                onChangeText={text => setHeight(text)}
                                keyboardType="numeric"
                                style={{marginLeft: 10, width: '100%'}}
                            />
                        </View>
                        <TouchableOpacity style={{flexDirection: 'row', padding: 15, width: '50%', marginTop: 40, backgroundColor: "#3F51B5FF", justifyContent: 'center', alignItems: 'center', borderRadius: 30}}
                                          onPress={handleNext}
                        >
                            <Text style={{color: 'white', fontWeight: '700', fontSize: 18}}>Next</Text>
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                size={24}
                                color="white"
                            />
                    </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
            </DismissKeyboard>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        padding: 20,
    },
    section: {
        backgroundColor: '#444',
        borderRadius: 5,
        marginBottom: 5,
        padding: 10,
        marginTop: 15
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 30,
        marginTop: 10,
        height: 50,
        shadowColor: "#000", // This is your box shadow color
        shadowOffset: {
            width: 0,   // These are your box shadow offsets
            height: 2,
        },
        shadowOpacity: 0.23,  // This is your box shadow opacity
        shadowRadius: 2.62,  // This is your box shadow radius
        elevation: 4,  // This adds shadow to Android and needs to be used in conjunction with the above properties
    }, button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        borderRadius: 25,
        paddingHorizontal: 20,
        margin: 20,
    },
    buttonText: {
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: '#000',
        width: '80%',
        padding: 20,
    },
    modalText: {
        fontSize: 20,
        marginBottom: 20,
    },
});

export default SignupDetailsScreen;