import { StyleSheet, View, Text } from "react-native";
import ToggleSwitch from 'toggle-switch-react-native'
import { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Foundation } from '@expo/vector-icons';
import { ThemeContext } from '../contexts/ThemeContext'


function QuotesVisibilityButton({ color, textColor, primaryColor }) {
    const themeCtx = useContext(ThemeContext)
    const {
        funnyQuotes,
        toggleQuotesVisibility
    } = themeCtx;

    console.log(funnyQuotes)
    const [isOn, setIsOn] = useState(() => {
        if (funnyQuotes === 'visible') {
            return true;
        } else {
            return false;
        }
    });
    const storeQuotesVisibility = async (value) => {
        try {
            await AsyncStorage.setItem('funnyQuotes', value);
        } catch (e) {
            // saving error
        }
    }

    async function onToggle() {
        if (funnyQuotes === 'nonvisible') {
            storeQuotesVisibility('visible');
            setIsOn(true);
        } else if (funnyQuotes === 'visible') {
            storeQuotesVisibility('nonvisible');
            setIsOn(false);
        }
        toggleQuotesVisibility();

    }


    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Foundation name="comment-quotes" size={24} color={textColor} />
                <Text style={[styles.buttonText, { color: textColor }]}>Funny Quotes Visibility</Text>
            </View>
            <ToggleSwitch
                isOn={isOn}
                onColor={primaryColor}
                offColor="#ccc"
                size="medium"
                onToggle={onToggle}
            />
        </View>
    );
}

export default QuotesVisibilityButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 25,
        padding: 15,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: '#454545',
    },
    buttonText: {
        fontSize: 15,
        marginLeft: 15,
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});