import { useContext, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ThemeContext } from '../contexts/ThemeContext'
import { themes } from '../constants/themes.json';
import WhatsNewButton from "../components/WhatsNewButton";
import ThemePicker from "../components/ThemePicker";
import PowerPointsVisibilityButton from "../components/PowerPointsVisibilityButton";


function SettingsScreen() {
    const themeCtx = useContext(ThemeContext)
    const { theme } = themeCtx;


    let backgroundColor;
    let primaryColor;
    let textColor;
    if (theme === 'green') {

        backgroundColor = themes.green.backgroundColor
        primaryColor = themes.green.primaryColor
        textColor = themes.green.textColor

    } else if (theme === 'blue') {
        backgroundColor = themes.blue.backgroundColor
        primaryColor = themes.blue.primaryColor
        textColor = themes.blue.textColor
    } else if (theme === 'orange') {
        backgroundColor = themes.orange.backgroundColor
        primaryColor = themes.orange.primaryColor
        textColor = themes.orange.textColor
    } else if (theme === 'pink') {
        backgroundColor = themes.pink.backgroundColor
        primaryColor = themes.pink.primaryColor
        textColor = themes.pink.textColor
    } else if (theme === 'white') {
        backgroundColor = themes.white.backgroundColor
        primaryColor = themes.white.primaryColor
        textColor = themes.white.textColor
    } else if (theme === 'darkGreen') {
        backgroundColor = themes.darkGreen.backgroundColor
        primaryColor = themes.darkGreen.primaryColor
        textColor = themes.darkGreen.textColor
    } else if (theme === 'darkOrange') {
        backgroundColor = themes.darkOrange.backgroundColor
        primaryColor = themes.darkOrange.primaryColor
        textColor = themes.darkOrange.textColor
    } else if (theme === 'darkGray') {
        backgroundColor = themes.darkGray.backgroundColor
        primaryColor = themes.darkGray.primaryColor
        textColor = themes.darkGray.textColor
    } else if (theme === 'darkBlue') {
        backgroundColor = themes.darkBlue.backgroundColor
        primaryColor = themes.darkBlue.primaryColor
        textColor = themes.darkBlue.textColor
    } else if (theme === 'darkPink') {
        backgroundColor = themes.darkPink.backgroundColor
        primaryColor = themes.darkPink.primaryColor
        textColor = themes.darkPink.textColor
    }



    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <Text style={[styles.title, { color: textColor }]}>Settings</Text>
            <View style={styles.settingsList}>
                <ThemePicker />
                <PowerPointsVisibilityButton
                    color={backgroundColor}
                    textColor={textColor}
                    primaryColor={primaryColor}
                />
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

})




