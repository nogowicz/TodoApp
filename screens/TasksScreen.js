import { StyleSheet, Text, View, Keyboard, FlatList, TouchableWithoutFeedback } from "react-native";
import Task from "../components/Task";
import CustomTextInput from "../components/CustomTextInput";
import { useEffect, useLayoutEffect, useState } from "react";
import { Todo } from "../models/todo";
import { FontAwesome5 } from '@expo/vector-icons';
import { darkBaseColors } from "../constants/colors";
import {
    fetchTasks,
    insertTask,
    deleteTask,
    updateCompletion,
    deleteAllCompletedTasks,
    addToImportant
} from '../util/database';

function TasksScreen({ navigation }) {
    const [task, setTask] = useState();
    const [loadedData, setLoadedData] = useState([]);


    async function loadTasks() {
        const fetchedTasks = await fetchTasks();
        setLoadedData(fetchedTasks);

    }

    useEffect(() => {
        loadTasks();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => (
                <FontAwesome5
                    name='trash-alt'
                    size={25}
                    color={darkBaseColors.accentColor}
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
    }

    async function completeTaskHandler(id, completed) {
        if (!completed) {
            completed = 1;
        } else if (completed) {
            completed = 0;
        }
        await updateCompletion(id, completed);
        loadTasks();
    }

    async function deleteTaskHandler(id) {
        await deleteTask(id);
        loadTasks();
    }

    async function deleteCompletedTasks() {
        await deleteAllCompletedTasks();
        loadTasks();
    }


    if (!loadedData || loadedData.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Your Tasks</Text>

                <View style={styles.items}>
                    <Text style={styles.fallbackText}>You don't have tasks yet, start by adding some!</Text>
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
        <View style={styles.container}>
            <Text style={styles.title}>Your Tasks</Text>

            <View style={styles.items}>


                <FlatList
                    data={loadedData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Task
                            task={item.title}
                            done={item.completed}
                            important={item.important}
                            onDone={() => completeTaskHandler(item.id, item.completed)}
                            onDelete={() => deleteTaskHandler(item.id)}
                            toggleImportant={() => toggleImportant(item.id, item.important)}
                        />
                    )}
                />
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
        backgroundColor: darkBaseColors.backgroundColor,

    },
    title: {
        marginTop: 50,
        marginLeft: 25,
        fontWeight: 'bold',
        fontSize: 32,
        color: darkBaseColors.textColor

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
        marginTop: '50%'
    },
    rowBack: {
        height: 60,
    },
    backBtn: {
        position: "absolute",
        bottom: 0,
        top: 0,
        justifyContent: 0,
        right: 0,
        backgroundColor: 'red'
    },
    backBtnInner: {
        alignItems: 'center',
    },
    backBtnText: {
        color: 'white',
        marginTop: 2,
    },
    rowFront: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    }

});