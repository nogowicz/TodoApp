import { useEffect, useRef, useState, useContext } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
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
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
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

    function goBackButton() {
        navigation.goBack();

    }

    async function saveButton() {
        updateTaskData();
        navigation.goBack();
    }

    let identifier;
    async function loadTaskData(taskId) {
        const fetchedTask = await fetchTask(taskId);
        setTitle(fetchedTask.title);
        setSelectedImportant(fetchedTask.important);
        setSelectedUrgent(fetchedTask.urgent);
        setSelectedEffort(fetchedTask.effort);
        setNotes(fetchedTask.notes);
        identifier = fetchedTask.notificationIdentifier;
        console.log("Identifier1:" + identifier)
        setDate(fetchedTask.date ? fetchedTask.date : date);
        setHour(fetchedTask.hour ? fetchedTask.hour : hour);
        setMinute(fetchedTask.minute ? fetchedTask.minute : minute);
    }


    async function updateTaskData() {
        await updateTask(taskId, title, selectedImportant, selectedUrgent, selectedEffort, notes, identifier, new Date(date).toISOString(), hour, minute)
    }

    function runAfterLoadTaskData() {
        console.log('running command');
        if (identifier !== 'notAssigned' && identifier !== null) {
            setNotificationSet(true);
        }
        effectRan.current = true;
    }

    useEffect(() => {
        if (effectRan.current === false) {
            loadTaskData(taskId).then(() => runAfterLoadTaskData());

        }

    }, []);
    //Notyfikacja po każdym wejsciu w task details dostaje nowy idenifier przez co nie można anulować taska
    useEffect(() => {
        async function schedule() {
            console.log("Notification status: " + notificationSet)
            if (notificationSet) {
                try {
                    await scheduleNotification();
                    console.log("Identifier2:" + identifier)
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
        if (identifier !== null) {
            schedule();
        }
    }, [notificationSet]);

    function onChangeTitleText(text) {
        setTitle(text);
    }

    function onChangeNotesText(text) {
        setNotes(text);
    }


    const trigger = new Date(date);
    trigger.setHours(hour);
    trigger.setMinutes(minute);
    trigger.setSeconds(0);
    async function scheduleNotification() {
        try {
            identifier = await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'New Task To Do!',
                    body: title,
                    sound: 'default'
                },
                trigger,

            });
            console.log("Notification scheduled: ", trigger)
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
            setHour(currentTime.toLocaleTimeString().slice(0, 2));
            setMinute(currentTime.toLocaleTimeString().slice(3, 5));
            setNotificationSet(true);

        }
    };

    // console.log(identifier)

    function onReminderButtonPress() {
        setShowDate(true);
    }

    async function removeNotification() {

        await Notifications.cancelScheduledNotificationAsync(identifier).then(() => {
            identifier = 'notAssigned';
            setNotificationSet(false);
            updateTaskData();


            console.log('Notification canceled');
        });

    }



    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <View style={styles.navbar}>
                <View style={styles.titleAndBack}>
                    <TouchableOpacity onPress={goBackButton}>
                        <View style={{ width: 26, height: 26 }}>
                            <Ionicons name="arrow-back" size={24} color={textColor} />
                        </View>
                    </TouchableOpacity>

                    <Text style={[styles.title, { color: textColor }]}>Task Details</Text>
                </View>
                <TouchableOpacity onPress={saveButton}>
                    <View style={{ width: 26, height: 26 }}>
                        <MaterialIcons name="done" size={24} color={textColor} />
                    </View>
                </TouchableOpacity>

            </View>
            <ScrollView>
                <View style={styles.content}>
                    <View>
                        <ReminderButton onPress={onReminderButtonPress} notificationSet={notificationSet} date={date} hour={hour} minute={minute} removeNotification={removeNotification} />
                        <Text style={[styles.text, { color: textColor }]}>Title</Text>


                        <TextInput
                            value={title}
                            onChangeText={text => onChangeTitleText(text)}
                            style={[
                                styles.input,
                                {
                                    backgroundColor: backgroundColor,
                                    color: textColor,
                                    borderColor: primaryColor,

                                }]}
                            placeholder='Edit task title'
                            placeholderTextColor={textColor}
                            multiline={false}
                            maxLength={120}

                        />

                        <Text style={[styles.text, { color: textColor }]}>Important</Text>
                        <SelectList
                            setSelected={setSelectedImportant}
                            data={importantData}
                            search={false}
                            boxStyles={[styles.boxStyles, { borderColor: primaryColor }]}
                            dropdownStyles={[styles.dropdownStyles, { borderColor: primaryColor }]}
                            dropdownTextStyles={{ color: textColor }}
                            inputStyles={{ color: textColor }}
                            placeholder={importantData[selectedImportant].value}

                        />
                        <Text style={[styles.text, { color: textColor }]}>Urgent</Text>
                        <SelectList
                            setSelected={setSelectedUrgent}
                            data={urgentData}
                            search={false}
                            boxStyles={[styles.boxStyles, { borderColor: primaryColor }]}
                            dropdownStyles={[styles.dropdownStyles, { borderColor: primaryColor }]}
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
                            boxStyles={[styles.boxStyles, { borderColor: primaryColor }]}
                            dropdownStyles={[styles.dropdownStyles, { borderColor: primaryColor }]}
                            dropdownTextStyles={{ color: textColor }}
                            inputStyles={{ color: textColor }}
                            placeholder={effortData[selectedEffort].value}


                        />
                        <Text style={[styles.text, { color: textColor }]}>Notes</Text>
                        <TextInput
                            style={[
                                styles.inputNotes,
                                {
                                    borderColor: primaryColor,
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
                    value={new Date(date)}
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

