import {Text, TouchableOpacity, View} from "react-native";

function MuscleFilter({ setMuscleFilter, muscles }) {
    return (
        <View>
            {muscles.map(muscle => (
                <TouchableOpacity
                    key={muscle}
                    onPress={() => setMuscleFilter(muscle)}
                >
                    <Text>{muscle}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

export default MuscleFilter