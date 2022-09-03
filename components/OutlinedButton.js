import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'

function OutlinedButton({ text, color, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.outlinedButton, { borderColor: color }]}>
                <FontAwesome5 name="trash-alt" size={25} color={color} />
            </View>
        </TouchableOpacity>
    );
}

export default OutlinedButton;

const styles = StyleSheet.create({
    outlinedButton: {
        borderWidth: 2,
        alignItems: 'center',
        marginHorizontal: 25,
        marginBottom: 20,
        height: 40,
        justifyContent: 'center'
    },

});