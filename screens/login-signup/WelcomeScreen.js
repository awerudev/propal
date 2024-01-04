import React, {useState} from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity, SafeAreaView} from 'react-native';
import img1 from '../../assets/welcome.png';
import {useNavigation} from "@react-navigation/native";

const WelcomeScreen = () => {
    const [name, setName] = useState('Stefan');

    const navigation = useNavigation();

    function handleHome() {
        navigation.navigate('MainScreen');
    }

        return (
            <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
                <View style={{flex: 1, paddingTop: 10, alignItems: 'center'}}>
                    <Image source={img1} style={{width: '100%', height: "50%", marginBottom: 15}} resizeMode="contain"/>
                    <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 15}}>Welcome, {name}</Text>
                    <Text style={{paddingHorizontal: 40, textAlign: 'center'}}>You are all set now, let’s reach your
                        goals together with us</Text>
                    <TouchableOpacity style={{
                        padding: 15,
                        backgroundColor: "#1579FF",
                        borderRadius: 30,
                        width: "69%",
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 50,
                    }} onPress={handleHome}>
                        <Text style={{fontSize: 22, fontWeight: 'bold', color: "white"}}>Home</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
}

export default WelcomeScreen;
