import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'



function Task({ task, onDone, done, onEdit, onDelete }) {
    return (
        <View style={[styles.item, done && styles.pressed]}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.square} onPress={onDone}>
                    {done ? <FontAwesome name='check' size={25} color='#1F58EB' /> : null}
                </TouchableOpacity>
                <Text style={[styles.itemText, done && styles.pressedText]}>{task}</Text>
            </View>
            <View>
                {!done ?
                    <TouchableOpacity onPress={onEdit}>
                        <FontAwesome name='edit' size={25} color='black' />
                    </TouchableOpacity> : null}
                {done ?
                    <TouchableOpacity onPress={onDelete}>
                        <FontAwesome5 name="trash-alt" size={25} color='black' />
                    </TouchableOpacity> : null}
            </View>

        </View>

    );

}

export default Task;

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 4,
        marginBottom: 20,
        marginHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#1F58EB',
        minHeight: 60,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#D9D9D9',
        borderRadius: 2,
        opacity: 0.7,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '80%',
    },
    pressedText: {
        textDecorationLine: 'line-through',
        color: '#949292',
    },
    pressed: {
        borderColor: '#949292',
    }

});