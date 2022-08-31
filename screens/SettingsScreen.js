import { useContext, useState } from "react";
import { Text, View, StyleSheet, FlatList, Appearance } from "react-native";

import ColorButton from "../components/ColorButton";
import OutlinedButton from "../components/OutlinedButton";
import { ThemeContext } from '../contexts/ThemeContext'
import { themes } from '../constants/themes.json';

function SettingsScreen() {
    const themeCtx = useContext(ThemeContext)
    const { isDarkMode, setThemesDefaultMode, setThemesLightMode, setThemesDarkMode } = themeCtx;
    const [themeName, setThemeName] = useState('lightTheme');


    function onSelectedDefaultThemeHandler() {
        setThemeName('defaultTheme');
        setThemesDefaultMode();

    }

    function onSelectedLightThemeHandler() {
        setThemeName('lightTheme');
        setThemesLightMode();

    }

    function onSelectedDarkThemeHandler() {
        setThemeName('darkTheme');
        setThemesDarkMode();

    }




    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? themes.darkGreen.backgroundColor : themes.lightGreen.backgroundColor }]}>
            <Text style={[styles.title, { color: isDarkMode ? themes.darkGreen.textColor : themes.lightGreen.textColor }]}>Settings</Text>
            <View style={styles.settingsList}>
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: isDarkMode ? themes.darkGreen.textColor : themes.lightGreen.textColor }]}>Theme</Text>
                    <View style={styles.sectionInnerContainer}>
                        <OutlinedButton onPress={onSelectedDefaultThemeHandler} title='Default' selected={themeName === 'defaultTheme'} />
                        <OutlinedButton onPress={onSelectedLightThemeHandler} title='Light Theme' selected={themeName === 'lightTheme'} />
                        <OutlinedButton onPress={onSelectedDarkThemeHandler} title='Dark Theme' selected={themeName === 'darkTheme'} />
                    </View>
                </View>
                {/* <View style={styles.section}>
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
                </View> */}
            </View>
        </View>
    );
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    title: {
        marginLeft: 25,
        fontWeight: 'bold',
        fontSize: 32,
    },
    section: {
        margin: 25,
    },
    sectionTitle: {
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




