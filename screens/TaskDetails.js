import { Text, View, StyleSheet } from "react-native";

function TaskDetails() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Task Details</Text>
        </View>
    );
}

export default TaskDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9D9D9'
    },
    title: {
        marginTop: 50,
        marginLeft: 25,
        fontWeight: 'bold',
        fontSize: 32,

    }
});