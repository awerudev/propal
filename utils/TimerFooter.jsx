import React, {useRef, useState, useEffect} from 'react';
import {
    View,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Appearance,
    Animated,
    Modal,
    Dimensions,
    PanResponder
} from 'react-native';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faMinus, faPause, faPlay, faPlus, faStopwatch20} from "@fortawesome/free-solid-svg-icons";
import useTimer from "./useTimer";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {PanGestureHandler} from "react-native-gesture-handler";

const TimerFooter = () => {
    const colorScheme = Appearance.getColorScheme();
    const colors = {
        background: colorScheme === 'dark' ? '#000' : '#fff',
        text: colorScheme === 'dark' ? '#fff' : '#000',
        // ...add more color properties as needed
    };
    const [timerActive, setTimerActive] = useState(false);

    const windowHeight = Dimensions.get('window').height;
    const drawerHeight = windowHeight / 3; // the height of the drawer


    const [time, setTime, stopTime, startTime] = useTimer(1000);
    const timer = useRef(null);

    const incrementCountdownTime = () => {
        setTime(time => time + 1)
        timer.current = setTimeout(incrementCountdownTime, 100);
    };

    const decrementCountdownTime = () => {
        if (time > 0) {
            setTime(time => time - 1)
            timer.current = setTimeout(decrementCountdownTime, 100);
        } else {
            setTimerActive(false);
        }
    };

    const stopTimer = () => {
        clearTimeout(timer.current);
        setTimerActive(false)
    };

    const colorChange = useRef(new Animated.Value(0)).current;
    const backgroundColor = colorChange.interpolate({
        inputRange: [0, time / 2, time],
        outputRange: ['green', 'yellow', 'red']
    });

    useEffect(() => {
        if (timerActive) {
            Animated.timing(colorChange, {
                toValue: time,
                duration: time * 1000,
                useNativeDriver: false
            }).start();
        }
    }, [timerActive, time]);

    const pan = useRef(new Animated.ValueXY({x: 0, y: windowHeight - drawerHeight})).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                if (gesture.dy < 0) { // restrict drawer to not move below the closed position
                    pan.setValue({ x: 0, y: gesture.dy + windowHeight - drawerHeight });
                }
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.moveY < windowHeight / 2) {
                    Animated.spring(pan.y, {
                        toValue: 0,
                        useNativeDriver: false
                    }).start();
                } else {
                    Animated.spring(pan.y, {
                        toValue: 200,
                        useNativeDriver: false
                    }).start();
                }
            }
        })
    ).current;

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[{
                ...styles.footer,
                backgroundColor: backgroundColor,
                maxHeight: 300,
                justifyContent: 'flex-end',
            }, pan.getLayout()]}>
            {/*<FontAwesomeIcon icon={faStopwatch20} color={'#808185'} size={30}/>*/}
            <View style={styles.timerPM}>
                <TouchableOpacity style={styles.minusButtonTimer} onPressIn={decrementCountdownTime}
                                  onPressOut={stopTimer}>
                    <FontAwesomeIcon icon={faMinus} size={24} color='#3F51B5FF'/>
                </TouchableOpacity>
                <TextInput
                    style={[styles.timerScreen, {color: colors.text}]}
                    onChangeText={(text) => setTime(parseInt(text))}
                    keyboardType="numeric"
                    placeholder="0"
                    keyboardAppearance={"dark"}
                >
                    {!isNaN(parseInt(time)) ? parseInt(time) : ''}
                </TextInput>
                <TouchableOpacity style={styles.plusButtonTimer} onPressIn={incrementCountdownTime}
                                  onPressOut={stopTimer}>
                    <FontAwesomeIcon icon={faPlus} size={24} color='#000'/>
                </TouchableOpacity>
            </View>
            <View style={styles.playPauseView}>
                <TouchableOpacity onPress={stopTime}>
                    <FontAwesomeIcon style={styles.timerIcon} icon={faPause} size={38} color='#3F51B5FF'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={startTime}>
                    <FontAwesomeIcon style={styles.timerIcon} icon={faPlay} size={35} color='#3F51B5FF'/>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

export default TimerFooter;

const styles = {
    stopwatchText: {
        padding: 3,
        color: '#3F51B5FF'
    },
    timerButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#3F51B5',
        alignItems: 'center',
        width: 50,
        marginHorizontal: 20,
        marginRight: 20
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 30,
        paddingHorizontal: 20,
        height: 100,
    },
    timerScreen: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        alignItems: 'center',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: '#808185',
        borderRadius: 10,
        padding: 10,
        width: 70
    },
    plusButtonTimer: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#3F51B5',
        marginHorizontal: 10
    },
    minusButtonTimer: {
        borderWidth: 2,
        borderColor: '#3F51B5',
        borderRadius: 10,
        padding: 8,
        marginHorizontal: 10
    },
    timerPM: {
        // marginRight: 25,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    timerIcon: {
        marginRight: 20
    },
    playPauseView: {
        flexDirection: 'row'
    }

}

