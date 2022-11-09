import { StyleSheet, Text, View, Keyboard, ScrollView, ActivityIndicator } from "react-native";
import Task from "../components/Task";
import CustomTextInput from "../components/CustomTextInput";
import { useEffect, useState, useContext } from "react";
import { Todo } from "../models/todo";
import {
    fetchTasks,
    fetchTasksInPowerMode,
    fetchTasksInNewestFirstMode,
    insertTask,
    deleteTask,
    updateCompletion,
    deleteAllCompletedTasks,
    fetchCompletedTasks,
} from '../util/database';
import CompletedLine from "../components/CompletedLine";
import { ThemeContext } from '../contexts/ThemeContext'
import { themes } from '../constants/themes.json';
import OutlinedButton from "../components/OutlinedButton";
import { useIsFocused } from '@react-navigation/native'
import { MenuProvider } from 'react-native-popup-menu';
import SortPopupMenu from "../components/SortPopupMenu";

function TasksScreen({ navigation }) {
    const [task, setTask] = useState();
    const [loadedData, setLoadedData] = useState([]);
    const [loadedCompletedData, setLoadedCompletedData] = useState([]);
    const [completedOpen, setCompletedOpen] = useState(false);
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const themeCtx = useContext(ThemeContext)
    const { theme, sort, funnyQuotes } = themeCtx;
    const isFocused = useIsFocused();
    const [initialized, setInitialized] = useState(false);
    const [randomQuote, setRandomQuote] = useState(0);
    let fetchedTasks;

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




    async function loadTasks() {
        if (sort === 'powerList') {
            fetchedTasks = await fetchTasksInPowerMode();
        } else if (sort === 'newestFirst') {
            fetchedTasks = await fetchTasksInNewestFirstMode();
        } else if (sort === 'oldestFirst') {
            fetchedTasks = await fetchTasks();
        } else {
            fetchedTasks = await fetchTasks();
        }
        setLoadedData(fetchedTasks);

    }

    async function loadCompletedTasks() {
        const fetchedCompletedTasks = await fetchCompletedTasks();
        setLoadedCompletedData(fetchedCompletedTasks);
    }

    async function fetch() {
        loadTasks()
        loadCompletedTasks();
    }



    useEffect(() => {
        fetch().then(() => {
            setInitialized(true)
        })
    }, [isFocused, sort]);


    async function handleAddTask() {
        const taskData = new Todo(task);
        await insertTask(taskData);
        fetch();
        Keyboard.dismiss();
        setTask(null);
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

    const quotes = [
        { key: 0, value: "" },
        { key: 1, value: "People say nothing is impossible, but I do nothing every day." },
        { key: 2, value: "You can’t have everything. Where would you put it?" },
        { key: 3, value: "When life gives you lemons, squirt someone in the eye." },
        { key: 4, value: "A clear conscience is a sure sign of a bad memory." },
        { key: 5, value: "Age is of no importance unless you’re a cheese." },
        { key: 6, value: "Trying is the first step toward failure." },
        { key: 7, value: "What are you going to do tomorrow, do... whatever." }
    ];

    function rand(min, max) {
        min = parseInt(min, 10)
        max = parseInt(max, 10)

        if (min > max) {
            var tmp = min;
            min = max;
            max = tmp;
        }

        return Math.floor(Math.random() * (max - min + 1) + min);
    }


    useEffect(() => {
        if (randomQuote === 0) {
            setRandomQuote(rand(1, quotes.length))
        }
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

    if ((!loadedData.length) && (!loadedCompletedData.length)) {
        return (
            <View style={[styles.container, { backgroundColor: backgroundColor }]}>
                <View style={styles.navBar}>
                    <View>
                        <Text style={[styles.title, { color: textColor }]}>Your Tasks</Text>
                        {funnyQuotes === 'visible' ?
                            <Text style={{ color: textColor }}>{quotes[randomQuote].value}</Text> : null}
                    </View>
                </View>
                <View style={[styles.items]}>
                    <Text style={[styles.fallbackText, { color: textColor }, keyboardStatus ? { marginBottom: '20%' } : { marginBottom: '77%' }]}>You don't have tasks yet, start by adding some!</Text>
                </View>
                <View style={{
                    position: 'absolute',
                    bottom: 0
                }}>
                    <CustomTextInput
                        value={task}
                        onChangeText={text => setTask(text)}
                        addTask={handleAddTask}
                    />
                </View>
            </View>

        );
    }

    if (!initialized) {
        return (
            <View style={[styles.loaderContainer, { backgroundColor: backgroundColor }]}>
                <ActivityIndicator style={styles.activityLoader} size='large' color='#487db9' />
            </View>
        );
    } else {

        return (
            <MenuProvider>
                <View style={[styles.container, { backgroundColor: backgroundColor }]}>
                    <View style={styles.navBar}>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.title, { color: textColor }]}>Your Tasks</Text>
                            {funnyQuotes === 'visible' ?
                                <Text style={{ color: textColor }}>{quotes[randomQuote].value}</Text> : null}
                        </View>
                        <SortPopupMenu style={{ flex: 1 }} color={textColor} />
                    </View>
                    <ScrollView style={styles.items}>
                        <View>
                            {loadedData.map((item) => {
                                return (
                                    <Task
                                        key={item.id}
                                        id={item.id}
                                        task={item.title}
                                        done={item.completed}
                                        onDone={() => completeTaskHandler(item.id, item.completed)}
                                        onDelete={() => deleteTaskHandler(item.id)}
                                        onPress={() => pressHandler(item.id)}
                                    />
                                )
                            })}

                            {loadedCompletedData.length > 0 &&

                                <View>
                                    <CompletedLine completedActive={completedOpen} toggleCompleted={onCompleteAvailable} />
                                    {completedOpen &&
                                        <View>
                                            <OutlinedButton text='Delete All' color={primaryColor} onPress={deleteCompletedTasks} />
                                            {loadedCompletedData.map((item) => {
                                                return (

                                                    <Task
                                                        key={item.id}
                                                        id={item.id}
                                                        task={item.title}
                                                        done={item.completed}
                                                        onDone={() => completeTaskHandler(item.id, item.completed)}
                                                        onDelete={() => deleteTaskHandler(item.id)}
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
            </MenuProvider >
        );
    }
}


export default TasksScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    title: {

        fontWeight: 'bold',
        fontSize: 32,

    },
    items: {
        marginTop: 30,
        marginBottom: 100,
    },
    fallbackText: {
        textAlign: 'center',
        fontSize: 15,
        marginTop: '50%',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 25,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    activityLoader: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        height: 30,
        width: 30,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },

});