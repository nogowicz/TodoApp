import { Dimensions, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, View, Keyboard } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { ThemeContext } from '../contexts/ThemeContext'
import { themes } from '../constants/themes.json';
import { useContext, useState, useEffect } from 'react';

function CustomTextInput({ value, onChangeText, addTask }) {
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const themeCtx = useContext(ThemeContext);
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



    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardStatus(true);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardStatus(false);
        });
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}

        >

            <View style={
                [
                    styles.inputContainer,
                    {
                        borderColor: primaryColor
                    }
                ]}>
                <TextInput
                    style={{
                        backgroundColor: backgroundColor,
                        height: 50,
                        width: windowWidth - 80,
                        color: textColor
                    }}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder='Add new task'
                    placeholderTextColor={textColor}
                    onSubmitEditing={addTask}
                    maxLength={120}

                />
                {value ?
                    <TouchableOpacity onPress={addTask}>
                        <View style={[styles.button, { backgroundColor: primaryColor }]}>
                            <FontAwesome name='angle-up' size={24} color={textColor} />
                        </View>
                    </TouchableOpacity> :

                    <View style={[styles.button, { backgroundColor: primaryColor }, !value && { opacity: 0.5 }]}>
                        <FontAwesome name='angle-up' size={24} color={textColor} />
                    </View>
                }
            </View>
        </KeyboardAvoidingView>
    );
}

export default CustomTextInput;

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 2,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        width: windowWidth - 20,
        marginHorizontal: 10,
        marginBottom: 20,
    },

    button: {
        height: 30,
        width: 30,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },

});