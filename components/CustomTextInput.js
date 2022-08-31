import { KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { ThemeContext } from '../contexts/ThemeContext'
import { themes } from '../constants/themes.json';
import { useContext } from 'react';

function CustomTextInput({ value, onChangeText, addTask }) {
    const themeCtx = useContext(ThemeContext)
    const { isDarkMode } = themeCtx;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.inputContainer,
            { backgroundColor: isDarkMode ? themes.darkGreen.backgroundColor : themes.lightGreen.backgroundColor },
            { borderColor: isDarkMode ? themes.darkGreen.accentColor : themes.lightGreen.accentColor }
            ]}

        >
            <TextInput
                style={[styles.input, { color: isDarkMode ? themes.darkGreen.textColor : themes.lightGreen.textColor }]}
                placeholder='Add new task'
                placeholderTextColor={isDarkMode ? themes.darkGreen.textColor : themes.lightGreen.textColor}
                value={value}
                onChangeText={onChangeText}
                maxLength={120}
            />
            <TouchableOpacity onPress={addTask}>
                <View style={[styles.button, { backgroundColor: isDarkMode ? themes.darkGreen.accentColor : themes.lightGreen.accentColor }]}>
                    <FontAwesome name='angle-up' size={24} color={isDarkMode ? themes.darkGreen.textColor : themes.lightGreen.textColor} />
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