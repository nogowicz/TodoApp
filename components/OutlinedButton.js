import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Colors } from "../constants/colors";

function OutlinedButton({ onPress, title, selected }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.button, selected && styles.selectedButton]}>
                <Text style={[styles.text, selected && styles.selectedText]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default OutlinedButton;

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: Colors.accentColor,
        borderRadius: 10,
        width: 110,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    selectedButton: {
        backgroundColor: Colors.accentColor
    },
    text: {
        color: Colors.textColor,
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    },
    selectedText: {
        color: 'black',
    },
});