import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { darkBaseColors } from "../constants/colors";



function Task({ task, onDone, done, important, toggleImportant, onDelete }) {
    return (
        <View style={[styles.item, done && styles.pressed, important && styles.itemImportant]}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={[styles.square, done && styles.pressedSquare]} onPress={onDone}>
                    {done ? <FontAwesome name='check' size={25} color={darkBaseColors.accentColor} /> : null}
                </TouchableOpacity>
                <Text style={[styles.itemText, done && styles.pressedText]}>{task}</Text>
            </View>
            <View>
                {done ?
                    <TouchableOpacity onPress={onDelete}>
                        <FontAwesome5 name="trash-alt" size={25} color={darkBaseColors.accentColor} />
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={toggleImportant}>
                        {important ?
                            <FontAwesome name='star' size={25} color={darkBaseColors.accentColor} /> :
                            <FontAwesome name='star-o' size={25} color={darkBaseColors.accentColor} />
                        }

                    </TouchableOpacity>}
            </View>

        </View>

    );

}

export default Task;

const styles = StyleSheet.create({
    item: {
        backgroundColor: darkBaseColors.primaryColor,
        padding: 15,
        borderRadius: 4,
        marginBottom: 20,
        marginHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 60,
    },
    itemImportant: {
        borderWidth: 2,
        borderColor: darkBaseColors.accentColor,
        marginHorizontal: 23,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: darkBaseColors.accentColor,
        borderRadius: 2,
        opacity: 0.7,
        marginRight: 15,
    },
    pressedSquare: {
        backgroundColor: darkBaseColors.accentDarkerColor,
    },
    itemText: {
        maxWidth: '80%',
        color: 'white'
    },
    pressedText: {
        textDecorationLine: 'line-through',
        color: '#949292',
    },
    pressed: {
        borderColor: '#949292',
    }

});