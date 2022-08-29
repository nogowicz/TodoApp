import { KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Colors } from '../constants/colors';

function CustomTextInput({ value, onChangeText, addTask }) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.inputContainer}
        >
            <TextInput
                style={styles.input}
                placeholder='Add new task'
                placeholderTextColor={Colors.textColor}
                value={value}
                onChangeText={onChangeText}
                maxLength={120}
            />
            <TouchableOpacity onPress={addTask}>
                <View style={styles.button}>
                    <FontAwesome name='angle-up' size={24} color={Colors.textColor} />
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

export default CustomTextInput;

const styles = StyleSheet.create({
    inputContainer: {
        borderColor: Colors.accentColor,
        backgroundColor: Colors.primaryLighterColor,
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
        color: Colors.textColor
    },

    button: {
        height: 30,
        width: 30,
        backgroundColor: Colors.accentColor,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
});