import { useContext, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import ColorButton from "../components/ColorButton";
import { ThemeContext } from '../contexts/ThemeContext'
import { themes } from '../constants/themes.json';
import AsyncStorage from "@react-native-async-storage/async-storage";

function SettingsScreen() {
    const themeCtx = useContext(ThemeContext)
    const {
        theme,
        setGreenTheme,
        setBlueTheme,
        setOrangeTheme,
        setPinkTheme,
        setWhiteTheme
    } = themeCtx;
    const [themeName, setThemeName] = useState(theme);

    let backgroundColor;
    let primaryColor;
    let bottomTabsColor;
    let accentColor;
    let accentDarkerColor;
    let textColor;
    if (theme === 'green') {

        backgroundColor = themes.lightGreen.backgroundColor
        primaryColor = themes.lightGreen.primaryColor
        bottomTabsColor = themes.lightGreen.bottomTabsColor
        accentColor = themes.lightGreen.accentColor
        accentDarkerColor = themes.lightGreen.accentDarkerColor
        textColor = themes.lightGreen.textColor

    } else if (theme === 'blue') {
        backgroundColor = themes.lightBlue.backgroundColor
        primaryColor = themes.lightBlue.primaryColor
        bottomTabsColor = themes.lightBlue.bottomTabsColor
        accentColor = themes.lightBlue.accentColor
        accentDarkerColor = themes.lightBlue.accentDarkerColor
        textColor = themes.lightBlue.textColor
    } else if (theme === 'orange') {
        backgroundColor = themes.lightOrange.backgroundColor
        primaryColor = themes.lightOrange.primaryColor
        bottomTabsColor = themes.lightOrange.bottomTabsColor
        accentColor = themes.lightOrange.accentColor
        accentDarkerColor = themes.lightOrange.accentDarkerColor
        textColor = themes.lightOrange.textColor
    } else if (theme === 'pink') {
        backgroundColor = themes.lightPink.backgroundColor
        primaryColor = themes.lightPink.primaryColor
        bottomTabsColor = themes.lightPink.bottomTabsColor
        accentColor = themes.lightPink.accentColor
        accentDarkerColor = themes.lightPink.accentDarkerColor
        textColor = themes.lightPink.textColor
    } else if (theme === 'white') {
        backgroundColor = themes.white.backgroundColor
        primaryColor = themes.white.primaryColor
        bottomTabsColor = themes.white.bottomTabsColor
        accentColor = themes.white.accentColor
        accentDarkerColor = themes.white.accentDarkerColor
        textColor = themes.white.textColor
    }

    const storeTheme = async (value) => {
        try {
            await AsyncStorage.setItem('theme', value)
        } catch (e) {
            // saving error
        }
    }


    async function onGreenColorSelectHandler() {
        setGreenTheme();
        setThemeName('green');
        storeTheme('green');
    }

    async function onBlueColorSelectHandler() {
        setBlueTheme();
        setThemeName('blue');
        storeTheme('blue');
    }

    async function onOrangeColorSelectHandler() {
        setOrangeTheme();
        setThemeName('orange');
        storeTheme('orange');
    }

    async function onPinkColorSelectHandler() {
        setPinkTheme();
        setThemeName('pink');
        storeTheme('pink');
    }

    async function onWhiteColorSelectHandler() {
        setWhiteTheme();
        setThemeName('white');
        storeTheme('white');
    }



    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <Text style={[styles.title, { color: textColor }]}>Settings</Text>
            <View style={styles.settingsList}>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Color</Text>
                    <View style={styles.sectionInnerContainer}>

                        <ColorButton
                            color={themes.lightGreen.accentColor}
                            onSelect={onGreenColorSelectHandler}
                            selected={themeName === 'green'}
                        />

                        <ColorButton
                            color={themes.lightBlue.accentColor}
                            onSelect={onBlueColorSelectHandler}
                            selected={themeName === 'blue'}
                        />

                        <ColorButton
                            color={themes.lightOrange.accentColor}
                            onSelect={onOrangeColorSelectHandler}
                            selected={themeName === 'orange'}
                        />

                        <ColorButton
                            color={themes.lightPink.accentColor}
                            onSelect={onPinkColorSelectHandler}
                            selected={themeName === 'pink'}
                        />

                        <ColorButton
                            color={themes.white.accentColor}
                            onSelect={onWhiteColorSelectHandler}
                            selected={themeName === 'white'}
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




