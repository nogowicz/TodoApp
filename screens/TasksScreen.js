import { StyleSheet, Text, View, Keyboard, FlatList } from "react-native";
import Task from "../components/Task";
import CustomTextInput from "../components/CustomTextInput";
import { useEffect, useState } from "react";
import { fetchTasks, insertTask, deleteTask, updateCompletion } from '../util/database';
import { Todo } from "../models/todo";
import { useNavigation } from '@react-navigation/native';

function TasksScreen() {
    const [task, setTask] = useState();
    const [loadedData, setLoadedData] = useState([]);


    async function loadTasks() {
        const fetchedTasks = await fetchTasks();
        setLoadedData(fetchedTasks);

    }

    useEffect(() => {
        loadTasks();
    }, []);



    async function handleAddTask() {
        const taskData = new Todo(task);
        await insertTask(taskData);
        loadTasks();
        Keyboard.dismiss();
        setTask(null);
    }

    const navigation = useNavigation();


    function editTaskHandler(id) {
        navigation.navigate('TaskDetails', {
            taskId: id,
        });
    }

    async function completeTaskHandler(id, completed) {
        if (completed === 0) {
            completed = 1;
        } else if (completed === 1) {
            completed = 0;
        }
        await updateCompletion(id, completed);
        loadTasks();
    }

    async function deleteTaskHandler(id) {
        await deleteTask(id);
        loadTasks();
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
                            onDone={() => completeTaskHandler(item.id, item.completed)}
                            onDelete={() => deleteTaskHandler(item.id)}
                            onEdit={editTaskHandler}
                            done={item.completed}
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
        marginBottom: 180,
    },

});