import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons'

function CompletedLine({ completedActive, toggleCompleted }) {
    return (
        <TouchableWithoutFeedback onPress={toggleCompleted}>
            <View style={styles.completed}>
                <Text style={styles.completedText}>Completed</Text>
                <View>
                    {completedActive ? <FontAwesome name='angle-down' size={20} color='grey' /> :
                        <FontAwesome name='angle-right' size={20} color='grey' />}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default CompletedLine;

const styles = StyleSheet.create({
    completed: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginHorizontal: 25,
        marginBottom: 20,
    },
    completedText: {
        color: 'grey',
        paddingRight: 10,
    },

});