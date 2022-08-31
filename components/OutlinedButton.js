import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { ThemeContext } from '../contexts/ThemeContext'
import { themes } from '../constants/themes.json';
import { useContext } from 'react';

function OutlinedButton({ onPress, title, selected }) {
    const themeCtx = useContext(ThemeContext)
    const { isDarkMode } = themeCtx;

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.button,
            selected && { backgroundColor: isDarkMode ? themes.darkGreen.accentColor : themes.lightGreen.accentColor },
            { borderColor: isDarkMode ? themes.darkGreen.accentColor : themes.lightGreen.accentColor }]}>
                <Text style={[styles.text, { color: isDarkMode ? themes.darkGreen.textColor : themes.lightGreen.textColor }, selected && (styles.selectedText, { color: isDarkMode ? themes.darkGreen.textColor : themes.lightGreen.textColor })]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default OutlinedButton;

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderRadius: 10,
        width: 110,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },

    text: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    },
});