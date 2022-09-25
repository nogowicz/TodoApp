import { useEffect, useRef, useState, useContext } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    ScrollView,
    TextInput,
} from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import SelectList from 'react-native-dropdown-select-list';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';


import { ThemeContext } from '../contexts/ThemeContext'
import { themes } from '../constants/themes.json';
import ReminderButton from "../components/ReminderButton";

import {
    fetchTask,
    updateTask
} from '../util/database';



function TaskDetails({ route, navigation }) {
    const taskId = route.params.taskId;
    const [title, setTitle] = useState('');
    const [selectedImportant, setSelectedImportant] = useState(0);
    const [selectedUrgent, setSelectedUrgent] = useState(0);
    const [selectedEffort, setSelectedEffort] = useState(0);
    const [notes, setNotes] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [notificationSet, setNotificationSet] = useState(false);
    const effectRan = useRef(false);

    const importantData = [
        { key: '0', value: 'No entry' },
        { key: '1', value: 'I can live without it being done' },
        { key: '2', value: 'Minor setback if not done' },
        { key: '3', value: 'Major problem when not done' },
        { key: '4', value: 'Life health or major property loss if not done' },
    ];

    const urgentData = [
        { key: '0', value: 'No entry' },
        { key: '1', value: 'This year' },
        { key: '2', value: 'This month' },
        { key: '3', value: 'This week' },
        { key: '4', value: 'Today' },
    ];

    const effortData = [
        { key: '0', value: 'No entry' },
        { key: '1', value: 'Needs breaking down' },
        { key: '2', value: 'Takes a day' },
        { key: '3', value: 'Takes two hours' },
        { key: '4', value: 'Takes less than 10 minutes' },
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
    } else if (theme === 'darkgray') {
        backgroundColor = themes.darkgray.backgroundColor
        primaryColor = themes.darkgray.primaryColor
        bottomTabsColor = themes.darkgray.bottomTabsColor
        accentColor = themes.darkgray.accentColor
        accentDarkerColor = themes.darkgray.accentDarkerColor
        textColor = themes.darkgray.textColor
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

    async function saveButton() {
        updateTaskData();
        navigation.goBack();
    }

    async function loadTaskData(taskId) {
        const fetchedTask = await fetchTask(taskId);
        setTitle(fetchedTask.title);
        setSelectedImportant(fetchedTask.important);
        setSelectedUrgent(fetchedTask.urgent);
        setSelectedEffort(fetchedTask.effort);
        setNotes(fetchedTask.notes);
    }

    async function updateTaskData() {
        await updateTask(taskId, title, selectedImportant, selectedUrgent, selectedEffort, notes)
    }


    useEffect(() => {
        if (effectRan.current === false) {
            loadTaskData(taskId);
            effectRan.current = true;
        }

    });

    useEffect(() => {
        async function schedule() {
            if (notificationSet) {
                try {
                    await scheduleNotification();
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
        schedule();
    }, [notificationSet]);

    function onChangeTitleText(text) {
        setTitle(text);
    }

    function onChangeNotesText(text) {
        setNotes(text);
    }

    let notificationTime = `${date.toISOString().slice(0, 10)}${time.toISOString().slice(10, 24)}`;
    let notificationTimeInMilliseconds = (new Date(notificationTime).getTime() + (2 * 60 * 60 * 1000)) - (new Date().getTime() + (2 * 60 * 60 * 1000));

    async function scheduleNotification() {
        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'New Task To Do!',
                    body: title,
                    sound: 'dzwonek.wav'
                },
                trigger: {
                    seconds: notificationTimeInMilliseconds / 1000
                }
            });
            console.log('Notification was schedule');
        } catch (e) {
            alert('The notification failed to schedule, make sure the hour is valid')
        }
    }

    const onDateChange = (event, selectedDate) => {
        if (event.type === 'set') {
            const currentDate = selectedDate;
            setShowDate(false);
            setDate(currentDate);
            setShowTime(true);
        }
    };

    const onTimeChange = async (event, selectedTime) => {
        if (event.type === 'set') {
            const currentTime = selectedTime;
            setTime(currentTime);
            setShowTime(false);
            setNotificationSet(true);



        }
    };


    function onReminderButtonPress() {
        setShowDate(true);
    }

    function removeNotification() {
        setNotificationSet(false);
    }


    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <View style={styles.navbar}>
                <View style={styles.titleAndBack}>
                    <TouchableWithoutFeedback onPress={goBackButton}>
                        <Ionicons name="arrow-back" size={24} color={textColor} />
                    </TouchableWithoutFeedback>

                    <Text style={[styles.title, { color: textColor }]}>Task Details</Text>
                </View>
                <TouchableWithoutFeedback onPress={saveButton}>
                    <MaterialIcons name="done" size={24} color={textColor} />
                </TouchableWithoutFeedback>

            </View>
            <ScrollView>
                <View style={styles.content}>
                    <View>
                        <ReminderButton onPress={onReminderButtonPress} notificationSet={notificationSet} date={date} time={time} removeNotification={removeNotification} />
                        <Text style={[styles.text, { color: textColor }]}>Title</Text>


                        <TextInput
                            value={title}
                            onChangeText={text => onChangeTitleText(text)}
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
                            // onSelect={() => alert(selectedEffort)}
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
                            onChangeText={text => onChangeNotesText(text)}
                            placeholder="Add notes"
                            placeholderTextColor={textColor}
                            multiline={true}
                        />

                    </View>
                </View>
            </ScrollView>
            {showDate && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    is24Hour={true}
                    onChange={onDateChange}
                />
            )}
            {showTime && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={time}
                    mode='time'
                    is24Hour={true}
                    onChange={onTimeChange}
                />
            )}
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
        justifyContent: 'space-between',
        marginTop: 40,
        marginBottom: 20,
        marginHorizontal: 25,
        alignItems: 'center'

    },
    titleAndBack: {
        flexDirection: 'row',
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

