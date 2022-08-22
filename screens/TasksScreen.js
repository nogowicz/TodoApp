import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import Task from "../components/Task";
import CustomTextInput from "../components/CustomTextInput";

function TasksScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Tasks</Text>
            <View style={styles.items}>
                <Task>Task1</Task>
                <Task>Task2</Task>
                <Task>Task3</Task>
            </View>
            <CustomTextInput />
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
        marginTop: 100,
        marginLeft: 25,
        fontWeight: 'bold',
        fontSize: 32,

    },
    items: {
        marginTop: 30,
    }
});