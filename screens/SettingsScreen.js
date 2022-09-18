import { useContext, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import ColorButton from "../components/ColorButton";
import { ThemeContext } from '../contexts/ThemeContext'
import { themes } from '../constants/themes.json';
import AsyncStorage from "@react-native-async-storage/async-storage";
import WhatsNewButton from "../components/WhatsNewButton";

function SettingsScreen() {
    const themeCtx = useContext(ThemeContext)
    const {
        theme,
        setGreenTheme,
        setBlueTheme,
        setOrangeTheme,
        setPinkTheme,
        setWhiteTheme,
        setDarkGreenTheme,
        setDarkRedTheme,
        setDarkGreyTheme,
        setDarkBlueTheme,
        setDarkPinkTheme
    } = themeCtx;
    const [themeName, setThemeName] = useState(theme);

    let backgroundColor;
    let primaryColor;
    let bottomTabsColor;
    let accentColor;
    let accentDarkerColor;
    let textColor;
    if (theme === 'green') {

        backgroundColor = themes.green.backgroundColor
        primaryColor = themes.green.primaryColor
        bottomTabsColor = themes.green.bottomTabsColor
        accentColor = themes.green.accentColor
        accentDarkerColor = themes.green.accentDarkerColor
        textColor = themes.green.textColor

    } else if (theme === 'blue') {
        backgroundColor = themes.blue.backgroundColor
        primaryColor = themes.blue.primaryColor
        bottomTabsColor = themes.blue.bottomTabsColor
        accentColor = themes.blue.accentColor
        accentDarkerColor = themes.blue.accentDarkerColor
        textColor = themes.blue.textColor
    } else if (theme === 'orange') {
        backgroundColor = themes.orange.backgroundColor
        primaryColor = themes.orange.primaryColor
        bottomTabsColor = themes.orange.bottomTabsColor
        accentColor = themes.orange.accentColor
        accentDarkerColor = themes.orange.accentDarkerColor
        textColor = themes.orange.textColor
    } else if (theme === 'pink') {
        backgroundColor = themes.pink.backgroundColor
        primaryColor = themes.pink.primaryColor
        bottomTabsColor = themes.pink.bottomTabsColor
        accentColor = themes.pink.accentColor
        accentDarkerColor = themes.pink.accentDarkerColor
        textColor = themes.pink.textColor
    } else if (theme === 'white') {
        backgroundColor = themes.white.backgroundColor
        primaryColor = themes.white.primaryColor
        bottomTabsColor = themes.white.bottomTabsColor
        accentColor = themes.white.accentColor
        accentDarkerColor = themes.white.accentDarkerColor
        textColor = themes.white.textColor
    } else if (theme === 'darkGreen') {
        backgroundColor = themes.darkGreen.backgroundColor
        primaryColor = themes.darkGreen.primaryColor
        bottomTabsColor = themes.darkGreen.bottomTabsColor
        accentColor = themes.darkGreen.accentColor
        accentDarkerColor = themes.darkGreen.accentDarkerColor
        textColor = themes.darkGreen.textColor
    } else if (theme === 'darkRed') {
        backgroundColor = themes.darkRed.backgroundColor
        primaryColor = themes.darkRed.primaryColor
        bottomTabsColor = themes.darkRed.bottomTabsColor
        accentColor = themes.darkRed.accentColor
        accentDarkerColor = themes.darkRed.accentDarkerColor
        textColor = themes.darkRed.textColor
    } else if (theme === 'darkGrey') {
        backgroundColor = themes.darkGrey.backgroundColor
        primaryColor = themes.darkGrey.primaryColor
        bottomTabsColor = themes.darkGrey.bottomTabsColor
        accentColor = themes.darkGrey.accentColor
        accentDarkerColor = themes.darkGrey.accentDarkerColor
        textColor = themes.darkGrey.textColor
    } else if (theme === 'darkBlue') {
        backgroundColor = themes.darkBlue.backgroundColor
        primaryColor = themes.darkBlue.primaryColor
        bottomTabsColor = themes.darkBlue.bottomTabsColor
        accentColor = themes.darkBlue.accentColor
        accentDarkerColor = themes.darkBlue.accentDarkerColor
        textColor = themes.darkBlue.textColor
    } else if (theme === 'darkPink') {
        backgroundColor = themes.darkPink.backgroundColor
        primaryColor = themes.darkPink.primaryColor
        bottomTabsColor = themes.darkPink.bottomTabsColor
        accentColor = themes.darkPink.accentColor
        accentDarkerColor = themes.darkPink.accentDarkerColor
        textColor = themes.darkPink.textColor
    }

    const storeTheme = async (value) => {
        try {
            await AsyncStorage.setItem('theme', value);
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

    async function onDarkGreenColorSelectHandler() {
        setDarkGreenTheme();
        setThemeName('darkGreen');
        storeTheme('darkGreen');
    }

    async function onDarkRedColorSelectHandler() {
        setDarkRedTheme();
        setThemeName('darkRed');
        storeTheme('darkRed');
    }

    async function onDarkGreyColorSelectHandler() {
        setDarkGreyTheme();
        setThemeName('darkGrey');
        storeTheme('darkGrey');
    }

    async function onDarkBlueColorSelectHandler() {
        setDarkBlueTheme();
        setThemeName('darkBlue');
        storeTheme('darkBlue');
    }

    async function onDarkPinkColorSelectHandler() {
        setDarkPinkTheme();
        setThemeName('darkPink');
        storeTheme('darkPink');
    }



    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <Text style={[styles.title, { color: textColor }]}>Settings</Text>
            <View style={styles.settingsList}>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Light Colors</Text>
                    <View style={styles.sectionInnerContainer}>

                        <ColorButton
                            color={themes.green.accentColor}
                            onSelect={onGreenColorSelectHandler}
                            selected={themeName === 'green'}
                        />

                        <ColorButton
                            color={themes.blue.accentColor}
                            onSelect={onBlueColorSelectHandler}
                            selected={themeName === 'blue'}
                        />

                        <ColorButton
                            color={themes.orange.accentColor}
                            onSelect={onOrangeColorSelectHandler}
                            selected={themeName === 'orange'}
                        />

                        <ColorButton
                            color={themes.pink.accentColor}
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
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: textColor }]}>Dark Colors</Text>
                    <View style={styles.sectionInnerContainer}>


                        <ColorButton
                            color={themes.darkGreen.accentColor}
                            onSelect={onDarkGreenColorSelectHandler}
                            selected={themeName === 'darkGreen'}
                        />

                        <ColorButton
                            color={themes.darkBlue.accentColor}
                            onSelect={onDarkBlueColorSelectHandler}
                            selected={themeName === 'darkBlue'}
                        />

                        <ColorButton
                            color={themes.darkRed.accentColor}
                            onSelect={onDarkRedColorSelectHandler}
                            selected={themeName === 'darkRed'}
                        />

                        <ColorButton
                            color={themes.darkPink.accentColor}
                            onSelect={onDarkPinkColorSelectHandler}
                            selected={themeName === 'darkPink'}
                        />

                        <ColorButton
                            color={themes.darkGrey.accentColor}
                            onSelect={onDarkGreyColorSelectHandler}
                            selected={themeName === 'darkGrey'}
                        />


                    </View>
                </View>
                <WhatsNewButton />
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




