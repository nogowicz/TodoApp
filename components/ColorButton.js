import { StyleSheet, TouchableOpacity, View } from "react-native";


function ColorButton({ onSelect, selected, color, backgroundColor, textColor }) {
    return (
        <TouchableOpacity onPress={onSelect}>
            <View style={[styles.colorButton, { backgroundColor: color }, selected && { borderWidth: 3, borderColor: textColor }]}>
                <View style={[styles.innerContainer, { backgroundColor: backgroundColor }]}></View>
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
        borderWidth: 0.7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer: {
        height: 15,
        width: 15,
        borderRadius: 10,
    },
});