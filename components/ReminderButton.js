import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useContext } from 'react';

import { ThemeContext } from '../contexts/ThemeContext'
import { themes } from '../constants/themes.json';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

function ReminderButton({ onPress, notificationSet, date, time, removeNotification }) {
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
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container, { backgroundColor: primaryColor }]}>
                <View style={styles.containerLeft}>
                    {notificationSet ? <MaterialIcons name="notifications-active" size={24} color={textColor} /> :
                        <Ionicons name="notifications-outline" size={24} color={textColor} />}

                    <Text style={[styles.text, { color: textColor }]}>Remind me</Text>
                    {notificationSet ?
                        <Text style={[styles.text, { color: textColor }]}>at {date.toDateString()}  {time.toTimeString().slice(0, 5)}</Text> : null}
                </View>
                {notificationSet ? <TouchableOpacity onPress={removeNotification}>
                    <Ionicons name="close" size={24} color={textColor} />
                </TouchableOpacity> : null}

            </View>
        </TouchableOpacity >
    );
}

export default ReminderButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 6,
        marginHorizontal: 25,
        marginTop: 25,
        padding: 15,
        alignItems: 'center'
    },
    containerLeft: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text: {
        marginLeft: 10,
        marginRight: -5,
    },
});