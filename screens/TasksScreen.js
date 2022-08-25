import { ScrollView, StyleSheet, Text, View, Keyboard, TouchableOpacity, FlatList } from "react-native";
import Task from "../components/Task";
import CustomTextInput from "../components/CustomTextInput";
import { useEffect, useState } from "react";
import { fetchTasks, insertTask } from '../util/database';
import { Todo } from "../models/todo";
import { useIsFocused } from '@react-navigation/native';



function TasksScreen() {
    const [task, setTask] = useState();
    const [completion, setCompletion] = useState(false);
    const [loadedData, setLoadedData] = useState([]);

    const isFocused = useIsFocused();

    async function loadTasks() {
        const fetchedTasks = await fetchTasks();
        setLoadedData(fetchedTasks);
    }

    useEffect(() => {

        if (isFocused) {
            loadTasks();
        }
    }, [isFocused]);



    async function handleAddTask() {
        const taskData = new Todo(task);
        await insertTask(taskData);
        loadTasks();
        Keyboard.dismiss();
        setTask(null);
    }

    function editTask() {

    }

    function deleteTask() {

    }

    function completeTask() {
        setCompletion(!completion);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Tasks</Text>

            <ScrollView
                contentContainerStyle={{
                    flexGrow: 2,
                }}
                style={styles.taskList}
                keyboardShouldPersistTaps='handled'
                scrollEnabled={false}
            >
                <View style={styles.items}>

                    {
                        loadedData.map((item, index) => {
                            return (
                                <Task key={index} onPress={completeTask} done={completion}>{item.title}</Task>

                            );
                        })
                    }
                </View>
            </ScrollView>


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
        backgroundColor: '#D9D9D9',

    },
    title: {
        marginTop: 50,
        marginLeft: 25,
        fontWeight: 'bold',
        fontSize: 32,

    },
    items: {
        marginTop: 30,
    },
    taskList: {
        marginBottom: 83,
    },
});