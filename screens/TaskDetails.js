import { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useContext } from 'react';

import { ThemeContext } from '../contexts/ThemeContext'
import { themes } from '../constants/themes.json';
import DetailsTaskInput from "../components/DetailsTaskInput";
import ReminderButton from "../components/ReminderButton";
import NotesInput from "../components/NotesInput";

import { fetchTaskTitle } from '../util/database';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';



function TaskDetails({ route, navigation }) {
    const taskId = route.params.taskId;
    const [title, setTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

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

    function goBackButton() {
        navigation.goBack();
    }

    function toggleImportant() {

    }


    function onReminderButtonPress() {
        return (
            // <RNDateTimePicker mode="time" />
            <View></View>
        );
    }

    async function loadTaskTitle(taskId) {
        const fetchedTaskTitle = await fetchTaskTitle(taskId);
        setTitle(fetchedTaskTitle);
    }

    useEffect(() => {
        loadTaskTitle(taskId);
    }, [taskId])
    const important = true;
    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <TouchableWithoutFeedback onPress={goBackButton}>
                <View style={styles.navbar}>
                    <Ionicons name="arrow-back" size={24} color={accentDarkerColor} />
                    <TouchableWithoutFeedback onPress={toggleImportant}>
                        {important ?
                            <FontAwesome name='star' size={25} color={accentDarkerColor} /> :
                            <FontAwesome name='star-o' size={25} color={accentDarkerColor} />
                        }

                    </TouchableWithoutFeedback>

                </View>
            </TouchableWithoutFeedback>
            <Text style={[styles.title, { color: textColor }]}>Task Details</Text>
            <View style={styles.content}>
                <View>
                    <DetailsTaskInput text={title} />
                    <ReminderButton onPress={onReminderButtonPress} />
                    <NotesInput />

                </View>
            </View>
        </View >
    );
}

export default TaskDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        marginLeft: 25,
        fontWeight: 'bold',
        fontSize: 32,

    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 40,
        marginHorizontal: 25,

    },
});