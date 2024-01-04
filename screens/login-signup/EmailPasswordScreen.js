import React, {useContext, useState} from 'react';
import {
    Image,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import DismissKeyboard from "../../utils/DismissKeyboard";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
    faGoogle,
    faApple
} from '@fortawesome/free-brands-svg-icons';
import {
    faEnvelope,
    faEyeSlash, faLock
} from '@fortawesome/free-solid-svg-icons';
import {UserContext} from "./UserContext"

const EmailPasswordScreen = () => {
    const { userDetails, setUserDetails } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function handleCreateAccount() {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        setUserDetails(prevDetails => ({
            ...prevDetails,
            email: email,
            password: password,
        }));

        navigation.navigate('GoalSelectionScreen');
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <DismissKeyboard>
                <KeyboardAvoidingView
                    behavior="padding"
                    style={{flex: 1, backgroundColor:'white', justifyContent: 'center', alignItems: 'center'}}
                >
                    <Text style={{
                        fontSize: 50,
                        fontWeight: 'bold',
                        marginTop: -50,
                        marginBottom: 40,
                        marginLeft: 30,
                        marginRight: 'auto'
                    }}>Create Account</Text>
                    {/*<Image source={require('../../assets/biggerlogotext.png')} style={styles.logo} />*/}

                    <View style={styles.inputContainer}>
                        <View style={styles.iconInputContainer}>
                            <FontAwesomeIcon icon={faEnvelope} size={24} color="#3F51B5FF" />
                            <TextInput
                                placeholder="Email"
                                value={email}
                                onChangeText={text => setEmail(text)}
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.iconInputContainer}>
                            <FontAwesomeIcon style={{marginRight: 5}} icon={faLock} size={24} color="#3F51B5FF" />
                            <TextInput
                                placeholder="Password"
                                value={password}
                                onChangeText={text => setPassword(text)}
                                style={styles.inputPassword}
                                secureTextEntry={!isPasswordVisible}
                            />
                            <TouchableOpacity style={{justifyContent: 'center', marginRight: 20}} onPressIn={() => setIsPasswordVisible(true)}
                                              onPressOut={() => setIsPasswordVisible(false)}>
                                <FontAwesomeIcon icon={faEyeSlash} size={24} color="#3F51B5FF" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.iconInputContainer}>
                            <FontAwesomeIcon style={{marginRight: 5}} icon={faLock} size={24} color="#3F51B5FF" />
                            <TextInput
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChangeText={text => setConfirmPassword(text)}
                                style={styles.inputPassword}
                                secureTextEntry={!isPasswordVisible}
                            />
                            <TouchableOpacity style={{justifyContent: 'center', marginRight: 20}} onPressIn={() => setIsPasswordVisible(true)}
                                              onPressOut={() => setIsPasswordVisible(false)}>
                                <FontAwesomeIcon icon={faEyeSlash} size={24} color="#3F51B5FF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={handleCreateAccount}
                            style={[styles.button, password.length < 8 && password.length > 0 ? styles.buttonDisabled : {}]}
                        >
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </DismissKeyboard>
        </SafeAreaView>
    );
}

export default EmailPasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 130
    },
    inputContainer: {
        width: '80%',
    },
    input2: {
        flex: 1,
        paddingLeft: 10,
    },
    /*input: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 30,
        marginTop: 20,
        height: 50,
        shadowColor: "#000", // This is your box shadow color
        shadowOffset: {
            width: 0,   // These are your box shadow offsets
            height: 2,
        },
        shadowOpacity: 0.23,  // This is your box shadow opacity
        shadowRadius: 2.62,  // This is your box shadow radius
        elevation: 4,  // This adds shadow to Android and needs to be used in conjunction with the above properties
    },*/
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#3F51B5FF',
        width: '80%',
        padding: 15,
        borderRadius: 30,
        alignItems: "center",
        height: 69,
        justifyContent: 'center'
    },
    button2: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '100%',
        padding: 15,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: "center",
        shadowColor: "#000", // This is your box shadow color
        shadowOffset: {
            width: 0,   // These are your box shadow offsets
            height: 2,
        },
        shadowOpacity: 0.23,  // This is your box shadow opacity
        shadowRadius: 2.62,  // This is your box shadow radius
        elevation: 4,  // This adds shadow to Android and needs to be used in conjunction with the above properties
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 26
    },
    buttonOutlineText: {
        color: '#3F51B5FF',
        fontWeight: '700',
        fontSize: 16
    },
    logo: {
        height: 200,
        width: 200
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        height: 2,
        width: 130,
        backgroundColor: 'lightgray',
    },
    text: {
        width: 50,
        textAlign: 'center',
        fontWeight: '600',
        color: 'lightgray'
    },
    inputIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eee',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    inputPassword: {
        flex: 1,
    },
    icon: {
        position: 'absolute',
        right: 10,
    },
    buttonDisabled: {
        backgroundColor: '#3F51B5FF',
        opacity: 0.5,
    },
    iconInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        marginTop: 20,
        height: 50,
        shadowColor: "#000", // This is your box shadow color
        shadowOffset: {
            width: 0,   // These are your box shadow offsets
            height: 2,
        },
        shadowOpacity: 0.23,  // This is your box shadow opacity
        shadowRadius: 2.62,  // This is your box shadow radius
        elevation: 4,  // This adds shadow to Android and needs to be used in conjunction with the above properties
        paddingLeft: 15,
    },
    input: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingLeft: 5,
        paddingVertical: 10,
    },
});