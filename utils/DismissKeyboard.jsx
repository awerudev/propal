import React, { useState, useEffect } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

const DismissKeyboard = ({ children }) => {
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                if (keyboardVisible) {
                    Keyboard.dismiss();
                }
            }}
        >
            <View style={{ flex: 1 }}>{children}</View>
        </TouchableWithoutFeedback>
    );
};

export default DismissKeyboard;