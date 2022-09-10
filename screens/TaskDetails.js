import { useEffect, useLayoutEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Alert,
    ScrollView,
    TextInput
} from "react-native";
import { Ionicons, FontAwesom } from '@expo/vector-icons';
import { useContext } from 'react';
import SelectList from 'react-native-dropdown-select-list'


import { ThemeContext } from '../contexts/ThemeContext'
import { themes } from '../constants/themes.json';
import ReminderButton from "../components/ReminderButton";

import {
    fetchTask,

} from '../util/database';


function TaskDetails({ route, navigation }) {
    const taskId = route.params.taskId;
    const [title, setTitle] = useState('');
    const [titleText, setTitleText] = useState(title);
    const [selectedImportant, setSelectedImportant] = useState(0);
    const [selectedUrgent, setSelectedUrgent] = useState(0);
    const [selectedEffort, setSelectedEffort] = useState(0);
    const [notes, setNotes] = useState("");

    const importantData = [
        { key: '0', value: 'Life health or major property loss if not done' },
        { key: '1', value: 'Major problem when not done' },
        { key: '2', value: 'Minor setback if not done' },
        { key: '3', value: 'I can live without it being done' },
    ];

    const urgentData = [
        { key: '0', value: 'Today' },
        { key: '1', value: 'This week' },
        { key: '2', value: 'This month' },
        { key: '3', value: 'This year' },
    ];

    const effortData = [
        { key: '0', value: 'Takes less than 10 minutes' },
        { key: '1', value: 'Takes two hours' },
        { key: '2', value: 'Takes a day' },
        { key: '3', value: 'Needs breaking down' },
    ];

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
        // updateImportant();
    }

    async function loadTaskData(taskId) {
        const fetchedTask = await fetchTask(taskId);
        setTitle(fetchedTask.title);
        setSelectedImportant(fetchedTask.important);
        setSelectedUrgent(fetchedTask.urgent);
        setSelectedEffort(fetchedTask.effort);
        setNotes(fetchTask.notes);
    }

    // console.log(importantData[selectedImportant].value)


    useEffect(() => {
        loadTaskData(taskId);
    }, [taskId, loadTaskData])

    function onChangeText(title) {
        setTitleText(title);
    }

    function onReminderButtonPress() {
        return (
            Alert.alert('Coming soon', 'This feature is not implemented yet')
        );
    }

    async function onImportantSelect() {
        // const updateImportant = await updateImportant(taskId, important);
    }


    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <View style={styles.navbar}>
                <TouchableWithoutFeedback onPress={goBackButton}>
                    <Ionicons name="arrow-back" size={24} color={textColor} />
                </TouchableWithoutFeedback>

                <Text style={[styles.title, { color: textColor }]}>Task Details</Text>
            </View>
            <ScrollView>
                <View style={styles.content}>
                    <View>
                        <ReminderButton onPress={onReminderButtonPress} />
                        <Text style={[styles.text, { color: textColor }]}>Title</Text>


                        <TextInput
                            value={title}
                            onChangeText={onChangeText}
                            style={[
                                styles.input,
                                {
                                    backgroundColor: backgroundColor,
                                    color: textColor,
                                    borderColor: accentColor,

                                }]}
                            placeholder='Edit task title'
                            placeholderTextColor={textColor}
                            multiline={true}
                            maxLength={120}

                        />

                        <Text style={[styles.text, { color: textColor }]}>Important</Text>
                        <SelectList
                            setSelected={setSelectedImportant}
                            data={importantData}
                            onSelect={onImportantSelect}
                            search={false}
                            boxStyles={[styles.boxStyles, { borderColor: accentColor }]}
                            dropdownStyles={[styles.dropdownStyles, { borderColor: accentColor }]}
                            dropdownTextStyles={{ color: textColor }}
                            inputStyles={{ color: textColor }}
                            placeholder={importantData[selectedImportant].value}

                        />
                        <Text style={[styles.text, { color: textColor }]}>Urgent</Text>
                        <SelectList
                            setSelected={setSelectedUrgent}
                            data={urgentData}
                            onSelect={() => alert(selectedUrgent)}
                            search={false}
                            boxStyles={[styles.boxStyles, { borderColor: accentColor }]}
                            dropdownStyles={[styles.dropdownStyles, { borderColor: accentColor }]}
                            dropdownTextStyles={{ color: textColor }}
                            inputStyles={{ color: textColor }}
                            placeholder={urgentData[selectedUrgent].value}

                        />
                        <Text style={[styles.text, { color: textColor }]}>Effort</Text>
                        <SelectList
                            setSelected={setSelectedEffort}
                            data={effortData}
                            onSelect={() => alert(selectedEffort)}
                            search={false}
                            boxStyles={[styles.boxStyles, { borderColor: accentColor }]}
                            dropdownStyles={[styles.dropdownStyles, { borderColor: accentColor }]}
                            dropdownTextStyles={{ color: textColor }}
                            inputStyles={{ color: textColor }}
                            placeholder={effortData[selectedEffort].value}


                        />
                        <Text style={[styles.text, { color: textColor }]}>Notes</Text>
                        <TextInput
                            style={[
                                styles.inputNotes,
                                {
                                    borderColor: accentColor,
                                    color: textColor,
                                }
                            ]}
                            value={notes}
                            placeholder="Add notes"
                            placeholderTextColor={textColor}
                        />

                    </View>
                </View>
            </ScrollView>
        </View >
    );
}

export default TaskDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 40,
        marginBottom: 20,
        marginHorizontal: 25,
        alignItems: 'center'

    },
    title: {
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 24,

    },

    boxStyles: {
        borderWidth: 1,
        borderRadius: 6,
        marginHorizontal: 25,
        padding: 15,
        fontSize: 15,
    },
    dropdownStyles: {
        borderWidth: 1,
        borderRadius: 6,
        marginHorizontal: 25,
        fontSize: 15,
    },
    text: {
        marginTop: 25,
        marginLeft: 35,
        fontWeight: '600',
        fontSize: 15,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderRadius: 6,
        marginHorizontal: 25,
        minHeight: 70,
        padding: 15,
        paddingHorizontal: 20,
        fontSize: 20,

    },
    inputNotes: {
        borderWidth: 1,
        marginHorizontal: 25,
        borderRadius: 6,
        minHeight: 200,
        padding: 15,
        paddingHorizontal: 20,
        fontSize: 15,
        textAlignVertical: 'top',
        marginBottom: 20
    },
});

