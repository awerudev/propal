import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import Item from './Item';

const List = () => {
    const [data, setData] = useState([
        { weight: 55, reps: 8, isStarred: false },
        { weight: 60, reps: 8, isStarred: true },
        { weight: 65, reps: 8, isStarred: false },
    ]);

    const onEdit = (item) => {
        console.log('Edit item: ', item);
    };

    const onToggleStar = (item) => {
        setData((prevData) =>
            prevData.map((d) => {
                if (d === item) {
                    return { ...d, isStarred: !d.isStarred };
                }
                return d;
            })
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item, index }) => (
                    <Item
                        item={item}
                        index={index}
                        onEdit={() => onEdit(item)}
                        onToggleStar={() => onToggleStar(item)}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
};

export default List;