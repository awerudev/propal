import React, {useContext, useEffect, useState} from 'react';
import {
    Appearance,
    Image,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import DismissKeyboard from "../../utils/DismissKeyboard";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
    faGoogle,
    faApple
} from '@fortawesome/free-brands-svg-icons';
import {
    faBell,
    faChartSimple,
    faChevronRight,
    faCircleInfo,
    faClockRotateLeft,
    faEnvelope,
    faEyeSlash,
    faInfoCircle,
    faLock,
    faPause,
    faQuestionCircle,
    faQuoteLeft,
    faRightFromBracket,
    faShieldCat,
    faToggleOff,
    faToggleOn,
    faTrophy,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import img from "../../assets/kratos.png";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase";
import {useNavigation} from "@react-navigation/native";
import {UserContext} from "../login-signup/UserContext"

const SettingsScreen = () => {
    const { userDetails, setUserDetails } = useContext(UserContext);
    const [name, setFName] = useState('');
    const [lastName, setLName] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const colorScheme = Appearance.getColorScheme();
    const colors = {
        background: colorScheme === 'dark' ? '#000' : '#eee',
        text: colorScheme === 'dark' ? '#fff' : '#000',
        // ...add more color properties as needed
    };

    useEffect(() => {
        setFName(userDetails.name)
        setLName(userDetails.lastName)
        setWeight(userDetails.weight)
        setHeight(userDetails.height)
        setAge(userDetails.age)
    }, []);

    const navigation = useNavigation();
    const handleLogout = async () => {
        console.log("logout")
        signOut(auth)
            .then(() => {
                console.log("Logged out successfully");
                // Navigate to the login screen or perform any other action after logout
                navigation.replace("Login");
            })
            .catch((error) => {
                console.error("Error logging out:", error);
            });
    };

    function handleContactUsPress() {
        navigation.navigate('ContactUsScreen');
    }

    function handleFAQPress() {
        navigation.navigate('FAQScreen');
    }

    function handlePrivacyPolicyPress() {
        navigation.navigate('PrivacyPolicyScreen');
    }

    const [isToggled, setIsToggled] = useState(false); // initial state

    const handleToggle = () => {
        setIsToggled(!isToggled); // toggle the state
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <DismissKeyboard>
                <KeyboardAvoidingView
                    behavior="padding"
                    style={{flex: 1, backgroundColor: colors.background, alignItems: 'center'}}
                >
                    <View style={styles.user}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity>
                                <Image source={img} style={{width: 70, height: 70, borderRadius: 50}}
                                       resizeMode="cover"/>
                            </TouchableOpacity>
                            <View style={{marginLeft: 15, height: 50, justifyContent: 'space-between'}}>
                                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{name} {lastName}</Text>
                                <Text style={{color: '#999'}}>Gain Muscle</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{
                            backgroundColor: '#3F51B5FF',
                            width: 75,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 20
                        }}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', color: colors.background}}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: '95%',
                        marginTop: 15,
                        paddingHorizontal: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <TouchableOpacity style={styles.card}>
                            <Text style={{fontSize: 18, color: '#97B8FE'}}>{height}</Text>
                            <Text>Height</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.card}>
                            <Text style={{fontSize: 18, color: '#97B8FE'}}>{weight}kg</Text>
                            <Text>Weight</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.card}>
                            <Text style={{fontSize: 18, color: '#97B8FE'}}>{age}yo</Text>
                            <Text>Age</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cardAccount}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 15}}>Account</Text>
                        <View style={{width: '99%', height: '80%', justifyContent: 'space-between', paddingLeft: 5, paddingBottom: 10}}>
                            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <FontAwesomeIcon style={styles.timerIcon} icon={faInfoCircle} size={20}
                                                     color='#3F51B5FF'/>
                                    <Text style={{marginLeft: 10}}>Personal Data</Text>
                                </View>
                                <FontAwesomeIcon style={styles.timerIcon} icon={faChevronRight} size={20}
                                                 color='#3F51B5FF'/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <FontAwesomeIcon style={styles.timerIcon} icon={faTrophy} size={20}
                                                     color='#3F51B5FF'/>
                                    <Text style={{marginLeft: 10}}>Achievements</Text>
                                </View>
                                <FontAwesomeIcon style={styles.timerIcon} icon={faChevronRight} size={20}
                                                 color='#3F51B5FF'/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <FontAwesomeIcon style={styles.timerIcon} icon={faClockRotateLeft} size={20}
                                                     color='#3F51B5FF'/>
                                    <Text style={{marginLeft: 10}}>Activity History</Text>
                                </View>
                                <FontAwesomeIcon style={styles.timerIcon} icon={faChevronRight} size={20}
                                                 color='#3F51B5FF'/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <FontAwesomeIcon style={styles.timerIcon} icon={faChartSimple} size={20}
                                                     color='#3F51B5FF'/>
                                    <Text style={{marginLeft: 10}}>Workout Progress</Text>
                                </View>
                                <FontAwesomeIcon style={styles.timerIcon} icon={faChevronRight} size={20}
                                                 color='#3F51B5FF'/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.cardNotifications}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginBottom: 15
                        }}>Notifications</Text>

                        <View
                            style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 5, width: '98%', alignItems: 'center'}}>
                            <View style={{flexDirection: 'row'}}>
                                <FontAwesomeIcon style={styles.timerIcon} icon={faBell} size={20} color='#3F51B5FF'/>
                                <Text style={{marginLeft: 10}}>Pop-up Notifications</Text>
                            </View>
                            <TouchableOpacity onPress={handleToggle}>
                                <FontAwesomeIcon style={styles.timerIcon} icon={isToggled ? faToggleOff : faToggleOn} size={35} color='#3F51B5FF'/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.cardOther}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 15}}>Other</Text>
                        <View style={{width: '99%', height: '80%', justifyContent: 'space-between', paddingLeft: 5, paddingBottom: 10}}>
                            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}} onPress={handleContactUsPress}>
                                <View style={{flexDirection: 'row'}}>
                                    <FontAwesomeIcon style={styles.timerIcon} icon={faEnvelope} size={20}
                                                     color='#3F51B5FF'/>
                                    <Text style={{marginLeft: 10}}>Contact Us</Text>
                                </View>
                                <FontAwesomeIcon style={styles.timerIcon} icon={faChevronRight} size={20}
                                                 color='#3F51B5FF'/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}} onPress={handlePrivacyPolicyPress}>
                                <View style={{flexDirection: 'row'}}>
                                    <FontAwesomeIcon style={styles.timerIcon} icon={faLock} size={20}
                                                     color='#3F51B5FF'/>
                                    <Text style={{marginLeft: 10}}>Privacy Policy</Text>
                                </View>
                                <FontAwesomeIcon style={styles.timerIcon} icon={faChevronRight} size={20}
                                                 color='#3F51B5FF'/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}} onPress={handleFAQPress}>
                                <View style={{flexDirection: 'row'}}>
                                    <FontAwesomeIcon style={styles.timerIcon} icon={faQuestionCircle} size={20}
                                                     color='#3F51B5FF'/>
                                    <Text style={{marginLeft: 10}}>FAQ</Text>
                                </View>
                                <FontAwesomeIcon style={styles.timerIcon} icon={faChevronRight} size={20}
                                                 color='#3F51B5FF'/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}} onPress={handleLogout}>
                                <View style={{flexDirection: 'row'}}>
                                    <FontAwesomeIcon style={styles.timerIcon} icon={faRightFromBracket} size={20}
                                                     color='#3F51B5FF'/>
                                    <Text style={{marginLeft: 10}}>Logout</Text>
                                </View>
                                <FontAwesomeIcon style={styles.timerIcon} icon={faChevronRight} size={20}
                                                 color='#3F51B5FF'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </DismissKeyboard>
        </SafeAreaView>
    );
}

export default SettingsScreen;

const styles = StyleSheet.create({
    user: {
        marginTop: 30,
        width: '95%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        height: 70,
        width: '30%',
        justifyContent: 'space-between',
        paddingVertical: 10,
        alignItems: 'center',
        shadowColor: "#000", // This is your box shadow color
        shadowOffset: {
            width: 0,   // These are your box shadow offsets
            height: 2,
        },
        shadowOpacity: 0.23,  // This is your box shadow opacity
        shadowRadius: 2.62,  // This is your box shadow radius
        elevation: 4,  // This adds shadow to Android and needs to be used in conjunction with the above properties
    },
    cardAccount: {
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'space-between',
        shadowColor: "#000", // This is your box shadow color
        shadowOffset: {
            width: 0,   // These are your box shadow offsets
            height: 2,
        },
        shadowOpacity: 0.23,  // This is your box shadow opacity
        shadowRadius: 2.62,  // This is your box shadow radius
        elevation: 4,  // This adds shadow to Android and needs to be used in conjunction with the above properties
        height: 200,
        marginTop: 15,
        width: "90%",
        paddingHorizontal: 10,
        paddingVertical: 15,
        alignItems: 'flex-start',
        paddingLeft: 20,
    },
    cardNotifications: {
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'space-between',
        shadowColor: "#000", // This is your box shadow color
        shadowOffset: {
            width: 0,   // These are your box shadow offsets
            height: 2,
        },
        shadowOpacity: 0.23,  // This is your box shadow opacity
        shadowRadius: 2.62,  // This is your box shadow radius
        elevation: 4,  // This adds shadow to Android and needs to be used in conjunction with the above properties
        height: 100,
        marginTop: 15,
        width: "90%",
        paddingHorizontal: 10,
        paddingVertical: 15,
        alignItems: 'flex-start',
        paddingLeft: 20,
        paddingBottom: 20
    },
    cardOther: {
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'space-between',
        shadowColor: "#000", // This is your box shadow color
        shadowOffset: {
            width: 0,   // These are your box shadow offsets
            height: 2,
        },
        shadowOpacity: 0.23,  // This is your box shadow opacity
        shadowRadius: 2.62,  // This is your box shadow radius
        elevation: 4,  // This adds shadow to Android and needs to be used in conjunction with the above properties
        height: 200,
        marginTop: 15,
        width: "90%",
        paddingHorizontal: 10,
        paddingVertical: 15,
        alignItems: 'flex-start',
        paddingLeft: 20,
        paddingBottom: 20
    }
});