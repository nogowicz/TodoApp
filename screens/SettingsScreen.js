import { Text, View, StyleSheet } from "react-native";
import { darkBaseColors } from "../constants/colors";

function SettingsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
        </View>
    );
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkBaseColors.backgroundColor
    },
    title: {
        marginTop: 50,
        marginLeft: 25,
        fontWeight: 'bold',
        fontSize: 32,
        color: darkBaseColors.textColor
    }
});