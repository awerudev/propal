import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Item = ({ item, index, onEdit, onToggleStar }) => (
    <View style={styles.itemContainer}>
        <TouchableOpacity onPress={onEdit}>
            <Icon name="ios-create" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onToggleStar}>
            <Icon name={item.isStarred ? 'ios-star' : 'ios-star-outline'} size={24} />
        </TouchableOpacity>
        <Text style={styles.itemNumber}>{index + 1}</Text>
        <Text style={styles.itemData}>{item.weight} kg x {item.reps} reps</Text>
    </View>
);

const styles = {
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    itemNumber: {
        fontSize: 16,
        marginHorizontal: 16,
    },
    itemData: {
        fontSize: 16,
        flex: 1,
    },
};

export default Item;