import React from 'react';
import { View, TouchableOpacity, Text, Appearance } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Header = ({ handleClose, screenName, rightIcon, onRightIconPress, rightButton }) => {
    const colorScheme = Appearance.getColorScheme();
    const colors = {
        background: colorScheme === 'dark' ? '#000' : '#fff',
        text: colorScheme === 'dark' ? '#fff' : '#000',
    };

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.icon}>
                <FontAwesomeIcon icon={faChevronLeft} size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.name, { color: colors.text }]}>
                {screenName}
            </Text>
            {rightIcon ? (
                <TouchableOpacity onPress={onRightIconPress} style={styles.icon}>
                    <FontAwesomeIcon icon={rightIcon} size={24} color={colors.text} style={{alignSelf: 'flex-end'}} />
                </TouchableOpacity>
            ) : rightButton ? rightButton : (
                <View style={{ width: '20%' }}></View>
            )}
        </View>
    );
};

export default Header;

const styles = {
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: '#fff', // You can set this to your desired background color
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
    },
    icon: {
        width: '20%',
    },
    name: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22,
        width: '60%',
    },
}
