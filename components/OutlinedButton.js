import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

function OutlinedButton({ text, color, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.outlinedButton, { borderColor: color }]}>
                <Text style={[styles.outlinedButtonText, { color: color }]}>{text}</Text>
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

    },
    outlinedButtonText: {
        fontSize: 20,
    },
});