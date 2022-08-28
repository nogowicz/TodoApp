import { Text, View, StyleSheet } from "react-native";
import OutlinedButton from "../components/OutlinedButton";
import { Colors } from "../constants/colors";

function SettingsScreen() {
    function onSelectedThemeHandler() {

    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <View style={styles.settingsList}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Theme</Text>
                    <View style={styles.sectionInnerContainer}>
                        <OutlinedButton onPress={onSelectedThemeHandler} title='Default' selected={true} />
                        <OutlinedButton onPress={onSelectedThemeHandler} title='Light Theme' selected={false} />
                        <OutlinedButton onPress={onSelectedThemeHandler} title='Dark Theme' selected={false} />
                    </View>
                </View>
            </View>
        </View>
    );
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    title: {
        marginLeft: 25,
        fontWeight: 'bold',
        fontSize: 32,
        color: Colors.textColor,
    },
    section: {
        margin: 25,
    },
    sectionTitle: {
        color: Colors.textColor,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    sectionInnerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-around",

    }
})