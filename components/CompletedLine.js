import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons'
import { useContext } from "react";
import { ThemeContext } from '../contexts/ThemeContext'
import { themes } from '../constants/themes.json';

function CompletedLine({ completedActive, toggleCompleted }) {
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
        <TouchableWithoutFeedback onPress={toggleCompleted}>
            <View style={[styles.completed, { borderBottomColor: textColor }]}>
                <Text style={[styles.completedText, { color: textColor }]}>Completed</Text>
                <View>
                    {completedActive ? <FontAwesome name='angle-down' size={20} color={textColor} /> :
                        <FontAwesome name='angle-right' size={20} color={textColor} />}
                </View>
            </View>
        </TouchableWithoutFeedback >
    );
}

export default CompletedLine;

const styles = StyleSheet.create({
    completed: {
        borderBottomWidth: 2,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginHorizontal: 35,
        marginBottom: 20,
    },
    completedText: {
        paddingRight: 10,
    },

});