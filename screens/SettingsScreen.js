import { useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import ColorButton from "../components/ColorButton";
import OutlinedButton from "../components/OutlinedButton";
import { Colors } from "../constants/colors";

function SettingsScreen() {
    const [theme, setTheme] = useState('defaultTheme');

    function onSelectedDefaultThemeHandler() {
        setTheme('defaultTheme');
    }

    function onSelectedLightThemeHandler() {
        setTheme('lightTheme');
    }

    function onSelectedDarkThemeHandler() {
        setTheme('darkTheme');
    }

    function onColorSelectHandler() {

    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <View style={styles.settingsList}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Theme</Text>
                    <View style={styles.sectionInnerContainer}>
                        <OutlinedButton onPress={onSelectedDefaultThemeHandler} title='Default' selected={theme === 'defaultTheme'} />
                        <OutlinedButton onPress={onSelectedLightThemeHandler} title='Light Theme' selected={theme === 'lightTheme'} />
                        <OutlinedButton onPress={onSelectedDarkThemeHandler} title='Dark Theme' selected={theme === 'darkTheme'} />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Color</Text>
                    <View style={styles.sectionInnerContainer}>
                        <FlatList
                            renderItem={
                                <ColorButton
                                    color={'blue'}
                                    onSelect={onColorSelectHandler}
                                    selected={true}
                                />
                            }
                            horizontal
                        />

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
        marginBottom: 30,

    }
})