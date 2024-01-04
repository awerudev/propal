import React, {useState, useEffect, useContext} from 'react';
import {
    View,
    Button,
    Image,
    StyleSheet,
    SafeAreaView,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    Appearance, ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
    faArrowLeft,
    faBell,
    faCamera, faFilePen, faImage, faPlus
} from '@fortawesome/free-solid-svg-icons';
import {UserContext} from "../login-signup/UserContext";
import { format } from 'date-fns';
import logo from '../../assets/whiteLogo.png';
import {useNavigation} from "@react-navigation/native";
import imgpfp from "../../assets/kratos.png";
import Header from "../../utils/Header"; // replace this with the actual path to your logo

export default function BodyScreen() {
    const colorScheme = Appearance.getColorScheme();
    const navigation = useNavigation();
    const { userDetails } = useContext(UserContext);
    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);
    const [waist, setWaist] = useState(null);
    const [neck, setNeck] = useState(null);
    const [arms, setArms] = useState(null);
    const [bmi, setBmi] = useState(null);
    const [bmr, setBmr] = useState(null);
    const [bodyFat, setBodyFat] = useState(null);

    const weight = userDetails.weight;
    const heightInCm = userDetails.height;
    const heightInM = heightInCm / 100;
    const age = userDetails.age;
    const gender = userDetails.gender;

    const colors = {
        background: colorScheme === 'dark' ? '#000' : '#fff',
        text: colorScheme === 'dark' ? '#fff' : '#000',
        header: colorScheme === 'dark' ? 'black' : 'white',
        // ...add more color properties as needed
    };

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
                const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
                if (cameraStatus.status !== 'granted') {
                    alert('Sorry, we need camera permissions to make this work!');
                }
            }
        })();
    }, []);

    useEffect(() => {
        if (weight && heightInM) {
            const bmi = weight / (heightInM * heightInM);
            setBmi(bmi.toFixed(2));
        }
        if (weight && heightInCm && age) {
            let bmr;
            if (gender === 'male') {
                bmr = 88.362 + (13.397 * weight) + (4.799 * heightInCm) - (5.677 * age);
            } else {
                bmr = 447.593 + (9.247 * weight) + (3.098 * heightInCm) - (4.330 * age);
            }
            setBmr(bmr.toFixed(2));
        }
        if (waist && neck && heightInCm) {
            const bodyFat = 495 / (1.0324 - 0.19077*(Math.log10(waist-neck)) + 0.15456*(Math.log10(heightInCm))) - 450;
            setBodyFat(bodyFat.toFixed(2));
        }
    }, [weight, waist, neck, arms]);

    function handleUpdate() {
        navigation.navigate('UpdateScreen');
    }

    function handleClose() {
        navigation.navigate('MainScreen');
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={[{backgroundColor: colors.background}, styles.container]}>

                <Header
                    handleClose={handleClose}
                    screenName={'Body Screen'}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '85%', marginTop: 30, paddingHorizontal: 10 }}>
                    <View style={styles.card}>
                        <Text style={{ fontSize: 18, color: '#97B8FE' }}>{weight} kg</Text>
                        <Text>Weight</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={{ fontSize: 18, color: '#97B8FE' }}>{bmi}</Text>
                        <Text>BMI</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={{ fontSize: 18, color: '#97B8FE' }}>{bodyFat}%</Text>
                        <Text>Body Fat</Text>
                    </View>
                </View>

                <ScrollView style={styles.scrollStyle} showsVerticalScrollIndicator={false}>
                    {images.length > 0 ? (
                        images.map((image, index) => (
                            <View key={index}>
                                <TouchableOpacity onPress={() => handleImagePress(image.timestamp)}>
                                    <Image source={{uri: image.uri}} style={styles.image}/>
                                    <View style={styles.timestampOverlay}>
                                        <Image source={logo} style={styles.logo}/>
                                        <Text style={styles.timestampText}>{image.timestamp}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noImagesText}>Tap the camera or gallery button below to take your first progress picture!</Text>
                    )}
                </ScrollView>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                        <FontAwesomeIcon icon={faFilePen} size={24} color={colors.background}/>
                        <Text style={styles.buttonText}> Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '85%',
        marginBottom: 20,
        marginTop: 20
    },
    button: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#3F51B5FF',
        padding: 10,
        borderRadius: 5,
        width: 300
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'cover',
        alignSelf: 'center',
        marginBottom: 30,
        borderRadius: 10,
    },
    input: {
        height: 45,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#FFFFFF',
    },
    cardHeader: {
        shadowColor: "#000", // This is your box shadow color
        shadowOffset: {
            width: 0,   // These are your box shadow offsets
            height: 2,
        },
        shadowOpacity: 0.23,  // This is your box shadow opacity
        shadowRadius: 2.62,  // This is your box shadow radius
        elevation: 4,  // This adds shadow to Android and needs to be used in conjunction with the above properties
        height: 50
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
    noImagesText: {
        fontSize: 18,
        textAlign: 'left',
        marginTop: 20
    },
    scrollStyle: {
        marginTop: 30,
        height: 300,
        width: 300,
        shadowColor: "#000", // This is your box shadow color
        shadowOffset: {
            width: 0,   // These are your box shadow offsets
            height: 2,
        },
        shadowOpacity: 0.23,  // This is your box shadow opacity
        shadowRadius: 2.62,  // This is your box shadow radius
        elevation: 4,  // This adds shadow to Android and needs to be used in conjunction with the above properties
    },
    timestampOverlay: {
        position: 'absolute',
        bottom: 30,
        right: 0,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    timestampText: {
        color: 'white',
        fontSize: 22,
        marginLeft: 10,
        fontWeight: '500'
    },
    logo: {
        width: 40,
        height: 40
    },
});
  
