import React, { useState, useContext } from 'react';
import { SafeAreaView, KeyboardAvoidingView, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from "./UserContext";
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {faApple, faGoogle} from "@fortawesome/free-brands-svg-icons";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleLogin = async () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log("Logged in with:", user.email);
            })
            .catch((error) => alert(error.message));
    };

    function handleCreateAccount() {
        navigation.navigate('SignupDetailsScreen');
    }

    return (
        <SafeAreaView style={{flex: 1}}>
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
                }}>Login</Text>
                <View style={styles.inputContainer}>
                    <Text style={{fontWeight: '600'}}>Your Email Address</Text>
                    <TextInput
                        placeholder="name@example.com"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />
                    <Text style={{marginTop: 40, fontWeight: '600'}}>Choose a Password</Text>
                    <View style={[styles.input, {flexDirection: 'row'}]}>
                        <TextInput
                            placeholder="at least 8 characters"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            style={styles.inputPassword}
                            secureTextEntry={!isPasswordVisible}
                        />
                        <TouchableOpacity style={{justifyContent: 'center'}} onPressIn={() => setIsPasswordVisible(true)}
                                          onPressOut={() => setIsPasswordVisible(false)}>
                            <FontAwesomeIcon icon={faEyeSlash} size={24} color="#3F51B5FF" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleLogin}
                        style={[styles.button, password.length < 8 && password.length > 0 ? styles.buttonDisabled : {}]}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', marginTop: 30, height: 20}}>
                    <Text style={{justifyContent: 'center', alignItems: 'center', fontWeight: '600'}}>Not registered yet?</Text>
                    <TouchableOpacity onPress={handleCreateAccount}><Text style={{color: '#3F51B5FF', fontWeight: '600'}}> Create an Account</Text></TouchableOpacity>
                </View>
                <View style={styles.lineContainer}>
                    <View style={styles.line} />
                    <Text style={styles.text}>OR</Text>
                    <View style={styles.line} />
                </View>
                <View style={{width: '80%'}}>
                    <TouchableOpacity style={[styles.button2, {marginTop: 20}]}>
                        <FontAwesomeIcon icon={faGoogle} size={24} color="#3F51B5FF" style={{marginRight: 10}}/><Text style={{fontWeight: '600'}}> Sign up with Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button2, {marginTop: 30}]}>
                        <FontAwesomeIcon icon={faApple} size={24} color="#3F51B5FF" style={{marginRight: 10}}/><Text style={{fontWeight: '600'}}> Sign up with Apple</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default LoginScreen;

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 130
    },
    inputContainer: {
        width: '80%',
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
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: '#3F51B5FF',
        width: '80%',
        padding: 15,
        borderRadius: 30,
        alignItems: "center"
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
        fontSize: 16
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
}