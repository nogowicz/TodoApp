import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from '../constants/colors'

function ColorButton({ onSelect, selected, color }) {
    return (
        <TouchableOpacity onPress={onSelect}>
            <View style={[styles.colorButton, { backgroundColor: color }, selected && { borderWidth: 3, borderColor: 'black' }]}>
            </View>
        </TouchableOpacity>
    );
}

export default ColorButton;

const styles = StyleSheet.create({
    colorButton: {
        height: 40,
        width: 40,
        borderRadius: 60,

    }
});