import { KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { ThemeContext } from '../contexts/ThemeContext'
import { themes } from '../constants/themes.json';
import { useContext } from 'react';

function CustomTextInput({ value, onChangeText, addTask }) {
    const themeCtx = useContext(ThemeContext)
    const { theme } = themeCtx;

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
        width: '90%',

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