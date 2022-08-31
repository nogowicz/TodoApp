import { StyleSheet, Text, View, Keyboard, TouchableOpacity } from "react-native";
import Task from "../components/Task";
import CustomTextInput from "../components/CustomTextInput";
import { useEffect, useLayoutEffect, useState, useContext } from "react";
import { Todo } from "../models/todo";
import { FontAwesome5 } from '@expo/vector-icons';
import {
    fetchTasks,
    insertTask,
    deleteTask,
    updateCompletion,
    deleteAllCompletedTasks,
    addToImportant,
    fetchCompletedTasks
} from '../util/database';
import { SwipeListView } from 'react-native-swipe-list-view';
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
    const { isDarkMode } = themeCtx;

    async function loadTasks() {
        const fetchedTasks = await fetchTasks();
        setLoadedData(fetchedTasks);

    }

    async function loadCompletedTasks() {
        const fetchedCompletedTasks = await fetchCompletedTasks();
        setLoadedCompletedData(fetchedCompletedTasks);
    }

    useEffect(() => {
        loadTasks();
        loadCompletedTasks();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (

                <FontAwesome5
                    name='trash-alt'
                    size={25}
                    color={isDarkMode ? themes.darkGreen.accentColor : themes.lightGreen.accentColor}
                    style={{ marginRight: 25 }}
                    onPress={deleteCompletedTasks}
                />
            )
        });

    }, [navigation]);


    async function handleAddTask() {
        const taskData = new Todo(task);
        await insertTask(taskData);
        loadTasks();
        loadCompletedTasks();
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
        loadTasks();
        loadCompletedTasks();
    }

    async function completeTaskHandler(id, completed) {
        if (!completed) {
            completed = 1;
        } else if (completed) {
            completed = 0;
        }
        await updateCompletion(id, completed);
        loadTasks();
        loadCompletedTasks();
    }

    async function deleteTaskHandler(id) {
        await deleteTask(id);
        loadTasks();
        loadCompletedTasks();
    }

    async function deleteCompletedTasks() {
        await deleteAllCompletedTasks();
        loadTasks();
        loadCompletedTasks();
    }

    function onCompleteAvailable() {
        setCompletedOpen(!completedOpen);
    }


    if ((!loadedData.length) && (!loadedCompletedData.length)) {
        return (
            <View style={[styles.container, { backgroundColor: isDarkMode ? themes.darkGreen.textColor : themes.lightGreen.textColor }]}>
                <Text style={[styles.title, { color: isDarkMode ? themes.darkGreen.textColor : themes.lightGreen.textColor }]}>Your Tasks</Text>

                <View style={styles.items}>
                    <Text style={[styles.fallbackText, { color: isDarkMode ? themes.darkGreen.textColor : themes.lightGreen.textColor }]}>You don't have tasks yet, start by adding some!</Text>
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

        <View style={[styles.container, { backgroundColor: isDarkMode ? themes.darkGreen.backgroundColor : themes.lightGreen.backgroundColor }]}>
            <Text style={[styles.title, { color: isDarkMode ? themes.darkGreen.textColor : themes.lightGreen.textColor }]}>Your Tasks</Text>

            <View style={styles.items}>
                <SwipeListView
                    data={loadedData}
                    keyExtractor={(item) => item.id}
                    renderItem={(data) => {
                        return (
                            <Task
                                task={data.item.title}
                                done={data.item.completed}
                                important={data.item.important}
                                onDone={() => completeTaskHandler(data.item.id, data.item.completed)}
                                onDelete={() => deleteTaskHandler(data.item.id)}
                                toggleImportant={() => toggleImportant(data.item.id, data.item.important)}
                            />);
                    }}
                    renderHiddenItem={(data) => {
                        return (
                            <TouchableOpacity onPress={() => deleteTaskHandler(data.item.id)}>
                                <View style={styles.hiddenItemContainer}>
                                    <FontAwesome5
                                        name='trash-alt'
                                        size={25}
                                        color={'white'}
                                        style={styles.hiddenItemIcon}
                                        onPress={deleteCompletedTasks}
                                    />
                                    <Text style={styles.hiddenItemText}>Delete</Text>

                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    leftOpenValue={80}
                    rightOpenValue={-90}
                    previewRowKey={'1'}
                    previewOpenValue={180}
                    previewOpenDelay={3000}
                    disableRightSwipe={true}
                    showsVerticalScrollIndicator={false}
                // rightActionValue={-500}

                />
                {loadedCompletedData.length > 0 &&

                    <View>
                        <CompletedLine completedActive={completedOpen} toggleCompleted={onCompleteAvailable} />
                        {completedOpen &&
                            <SwipeListView
                                data={loadedCompletedData}
                                keyExtractor={(item) => item.id}
                                renderItem={(data) => {
                                    return (
                                        <Task
                                            task={data.item.title}
                                            done={data.item.completed}
                                            important={data.item.important}
                                            onDone={() => completeTaskHandler(data.item.id, data.item.completed)}
                                            onDelete={() => deleteTaskHandler(data.item.id)}
                                            toggleImportant={() => toggleImportant(data.item.id, data.item.important)}
                                        />);
                                }}
                                renderHiddenItem={(data) => {
                                    return (
                                        <TouchableOpacity onPress={() => deleteTaskHandler(data.item.id)}>
                                            <View style={styles.hiddenItemContainer}>
                                                <FontAwesome5
                                                    name='trash-alt'
                                                    size={25}
                                                    color={'white'}
                                                    style={styles.hiddenItemIcon}
                                                    onPress={deleteCompletedTasks}
                                                />
                                                <Text style={styles.hiddenItemText}>Delete</Text>

                                            </View>
                                        </TouchableOpacity>
                                    );
                                }}
                                leftOpenValue={80}
                                rightOpenValue={-90}
                                previewRowKey={'1'}
                                previewOpenValue={180}
                                previewOpenDelay={3000}
                                disableRightSwipe={true}
                                showsVerticalScrollIndicator={false}
                            // rightActionValue={-500}

                            />
                        }
                    </View>

                }
            </View>

            <CustomTextInput
                value={task}
                onChangeText={text => setTask(text)}
                addTask={handleAddTask}
            />
        </View>
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
        marginBottom: 180,
    },
    fallbackText: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 15,
        marginTop: '50%',
    },
    hiddenItemContainer: {
        backgroundColor: '#d13838',
        height: 60,
        justifyContent: 'center',
        marginHorizontal: 25,
        borderRadius: 5,
        paddingHorizontal: 25,
        alignItems: 'flex-end'
    },
    hiddenItemText: {
        color: 'white',
    },
    hiddenItemIcon: {
        paddingHorizontal: 9,
    },
});