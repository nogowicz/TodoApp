import { KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

function CustomTextInput({ value, onChangeText, addTask }) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.inputContainer}
        >
            <TextInput
                style={styles.input}
                placeholder='Add new task'
                value={value}
                onChangeText={onChangeText}
            />
            <TouchableOpacity onPress={addTask}>
                <View style={styles.button}>
                    <FontAwesome name='angle-up' size={24} color='white' />
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

export default CustomTextInput;

const styles = StyleSheet.create({
    inputContainer: {
        borderColor: '#1F58EB',
        backgroundColor: '#fff',
        borderWidth: 2,
        marginHorizontal: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 20,
        minHeight: 50,
        width: '90%',

    },

    input: {
        width: '80%',
        height: 50,
        flex: 1,
        paddingHorizontal: 10,
    },

    button: {
        height: 30,
        width: 30,
        backgroundColor: '#1F58EB',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
});