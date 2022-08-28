import { StyleSheet, Text, View, Keyboard, TouchableOpacity } from "react-native";
import Task from "../components/Task";
import CustomTextInput from "../components/CustomTextInput";
import { useEffect, useLayoutEffect, useState } from "react";
import { Todo } from "../models/todo";
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from "../constants/colors";
import {
    fetchTasks,
    insertTask,
    deleteTask,
    updateCompletion,
    deleteAllCompletedTasks,
    addToImportant
} from '../util/database';
import { SwipeListView } from 'react-native-swipe-list-view';



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
                    color={Colors.accentColor}
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

                {/* <FlatList
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
                /> */}
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
        backgroundColor: Colors.backgroundColor,

    },
    title: {
        marginLeft: 25,
        fontWeight: 'bold',
        fontSize: 32,
        color: Colors.textColor

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
        color: Colors.textColor,
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