import { KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

function CustomTextInput() {
    function handleAddTask() {
        console.log('Adding Task...')
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.inputContainer}
        >
            <TextInput style={styles.input} placeholder='Add new task' />
            <TouchableOpacity onPress={handleAddTask}>
                <View style={styles.button}>
                    <FontAwesome name='angle-up' size={32} color='white' />
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

export default CustomTextInput;

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
        marginHorizontal: 25,
        borderRadius: 10,
        padding: 10,
        width: '80%',
    },
    inputContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        height: 45,
        width: 45,
        backgroundColor: '#1F58EB',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 25,
    },
});