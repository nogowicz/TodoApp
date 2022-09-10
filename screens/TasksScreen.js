import { StyleSheet, Text, View, Keyboard, ScrollView } from "react-native";
import Task from "../components/Task";
import CustomTextInput from "../components/CustomTextInput";
import { useEffect, useState, useContext } from "react";
import { Todo } from "../models/todo";
import {
    fetchTasks,
    insertTask,
    deleteTask,
    updateCompletion,
    deleteAllCompletedTasks,
    addToImportant,
    fetchCompletedTasks
} from '../util/database';
import CompletedLine from "../components/CompletedLine";
import { ThemeContext } from '../contexts/ThemeContext'
import { themes } from '../constants/themes.json';
import OutlinedButton from "../components/OutlinedButton";




function TasksScreen({ navigation }) {
    const [task, setTask] = useState();
    const [loadedData, setLoadedData] = useState([]);
    const [loadedCompletedData, setLoadedCompletedData] = useState([]);
    const [completedOpen, setCompletedOpen] = useState(false);
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

    async function loadTasks() {
        const fetchedTasks = await fetchTasks();
        setLoadedData(fetchedTasks);

    }

    async function loadCompletedTasks() {
        const fetchedCompletedTasks = await fetchCompletedTasks();
        setLoadedCompletedData(fetchedCompletedTasks);
    }

    function fetch() {
        loadTasks();
        loadCompletedTasks();
    }



    useEffect(() => {
        fetch();
    }, []);



    async function handleAddTask() {
        const taskData = new Todo(task);
        await insertTask(taskData);
        fetch();
        Keyboard.dismiss();
        setTask(null);
    }


    async function toggleImportant(id, important) {
        if (!important) {
            important = 1;
        } else if (important) {
            important = 0;
        }
        await addToImportant(id, important);
        fetch();
    }

    async function completeTaskHandler(id, completed) {
        if (!completed) {
            completed = 1;
        } else if (completed) {
            completed = 0;
        }
        await updateCompletion(id, completed);
        fetch();
    }

    async function deleteTaskHandler(id) {
        await deleteTask(id);
        fetch();
    }

    async function deleteCompletedTasks() {
        await deleteAllCompletedTasks();
        fetch();
    }

    function onCompleteAvailable() {
        setCompletedOpen(!completedOpen);
    }

    function pressHandler(taskId) {
        navigation.navigate('TaskDetails', {
            taskId: taskId,
        });
    }


    if ((!loadedData.length) && (!loadedCompletedData.length)) {
        return (
            <View style={[styles.container, { backgroundColor: backgroundColor }]}>
                <Text style={[styles.title, { color: textColor }]}>Your Tasks</Text>

                <View style={styles.items}>
                    <Text style={[styles.fallbackText, { color: textColor }]}>You don't have tasks yet, start by adding some!</Text>
                </View>
                <CustomTextInput
                    value={task}
                    onChangeText={text => setTask(text)}
                    addTask={handleAddTask}
                />
            </View>
        );
    }



    return (

        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <Text style={[styles.title, { color: textColor }]}>Your Tasks</Text>
            <ScrollView style={styles.items}>
                <View>
                    {loadedData.map((item) => {
                        return (
                            <Task
                                key={item.id}
                                task={item.title}
                                done={item.completed}
                                important={item.important}
                                onDone={() => completeTaskHandler(item.id, item.completed)}
                                onDelete={() => deleteTaskHandler(item.id)}
                                toggleImportant={() => toggleImportant(item.id, item.important)}
                                onPress={() => pressHandler(item.id)}
                            />
                        )
                    })}

                    {loadedCompletedData.length > 0 &&

                        <View>
                            <CompletedLine completedActive={completedOpen} toggleCompleted={onCompleteAvailable} />
                            {completedOpen &&
                                <View>
                                    <OutlinedButton text='Delete All' color={accentDarkerColor} onPress={deleteCompletedTasks} />
                                    {loadedCompletedData.map((item) => {
                                        return (

                                            <Task
                                                key={item.id}
                                                task={item.title}
                                                done={item.completed}
                                                important={item.important}
                                                onDone={() => completeTaskHandler(item.id, item.completed)}
                                                onDelete={() => deleteTaskHandler(item.id)}
                                                toggleImportant={() => toggleImportant(item.id, item.important)}
                                                onPress={() => pressHandler(item.id)}
                                            />

                                        )
                                    })}

                                </View>
                            }
                        </View>
                    }
                </View>
            </ScrollView>

            <CustomTextInput
                value={task}
                onChangeText={text => setTask(text)}
                addTask={handleAddTask}
            />


        </View >
    );
}

export default TasksScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    title: {
        marginLeft: 25,
        fontWeight: 'bold',
        fontSize: 32,

    },
    items: {
        marginTop: 30,
        marginBottom: 100,
    },
    fallbackText: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 15,
        marginTop: '50%',
    },

});