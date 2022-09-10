import { KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { ThemeContext } from '../contexts/ThemeContext'
import { themes } from '../constants/themes.json';
import { useContext } from 'react';

function CustomTextInput({ value, onChangeText, addTask }) {
    const themeCtx = useContext(ThemeContext)
    const { theme } = themeCtx;

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



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.inputContainer,
            { backgroundColor: backgroundColor },
            { borderColor: accentColor }
            ]}

        >
            <TextInput
                style={[styles.input, { color: textColor }]}
                placeholder='Add new task'
                placeholderTextColor={textColor}
                value={value}
                onChangeText={onChangeText}
                maxLength={120}
            />
            <TouchableOpacity onPress={addTask}>
                <View style={[styles.button, { backgroundColor: accentColor }]}>
                    <FontAwesome name='angle-up' size={24} color={textColor} />
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

export default CustomTextInput;

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 2,
        marginHorizontal: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 20,
        minHeight: 50,
        width: '90%'
    },

    input: {
        width: '80%',
        height: 50,
        flex: 1,
        paddingHorizontal: 10,
    },

    button: {
        height: 30,
        width: 30,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
});