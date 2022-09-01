import { useContext, useState } from "react";
import { Text, View, StyleSheet, FlatList, Appearance } from "react-native";

import ColorButton from "../components/ColorButton";
import { ThemeContext } from '../contexts/ThemeContext'
import { themes } from '../constants/themes.json';

function SettingsScreen() {
    const themeCtx = useContext(ThemeContext)
    const { theme, setGreenTheme, setBlueTheme, setOrangeTheme } = themeCtx;

    let backgroundColor = themes.lightGreen.backgroundColor
    let primaryColor = themes.lightGreen.primaryColor
    let primaryLighterColor = themes.lightGreen.primaryLighterColor
    let primaryButtonColor = themes.lightGreen.primaryButtonColor
    let accentColor = themes.lightGreen.accentColor
    let accentDarkerColor = themes.lightGreen.accentDarkerColor
    let textColor = themes.lightGreen.textColor
    if (theme === 'green') {

        backgroundColor = themes.lightGreen.backgroundColor
        primaryColor = themes.lightGreen.primaryColor
        primaryLighterColor = themes.lightGreen.primaryLighterColor
        primaryButtonColor = themes.lightGreen.primaryButtonColor
        accentColor = themes.lightGreen.accentColor
        accentDarkerColor = themes.lightGreen.accentDarkerColor
        textColor = themes.lightGreen.textColor

    } else if (theme === 'blue') {
        backgroundColor = themes.lightBlue.backgroundColor
        primaryColor = themes.lightBlue.primaryColor
        primaryLighterColor = themes.lightBlue.primaryLighterColor
        primaryButtonColor = themes.lightBlue.primaryButtonColor
        accentColor = themes.lightBlue.accentColor
        accentDarkerColor = themes.lightBlue.accentDarkerColor
        textColor = themes.lightBlue.textColor
    } else if (theme === 'orange') {
        backgroundColor = themes.lightOrange.backgroundColor
        primaryColor = themes.lightOrange.primaryColor
        primaryLighterColor = themes.lightOrange.primaryLighterColor
        primaryButtonColor = themes.lightOrange.primaryButtonColor
        accentColor = themes.lightOrange.accentColor
        accentDarkerColor = themes.lightOrange.accentDarkerColor
        textColor = themes.lightOrange.textColor
    }


    function onGreenColorSelectHandler() {
        setGreenTheme();
    }

    function onBlueColorSelectHandler() {
        setBlueTheme();
    }

    function onOrangeColorSelectHandler() {
        setOrangeTheme();
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
                            selected={false}
                        />

                        <ColorButton
                            color={themes.lightBlue.accentColor}
                            onSelect={onBlueColorSelectHandler}
                            selected={false}
                        />

                        <ColorButton
                            color={themes.lightOrange.accentColor}
                            onSelect={onOrangeColorSelectHandler}
                            selected={false}
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




