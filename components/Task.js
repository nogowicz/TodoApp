import { StyleSheet, TouchableOpacity, View, Text, Dimensions } from "react-native";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext'
import { themes } from '../constants/themes.json';

function Task({ task, onDone, done, important, toggleImportant, onDelete }) {
    const themeCtx = useContext(ThemeContext)
    const { isDarkMode } = themeCtx;
    return (
        <View style={[styles.item, { backgroundColor: isDarkMode ? themes.darkGreen.primaryColor : themes.lightGreen.primaryColor },
        done && styles.pressed,
        important && [styles.itemImportant, { borderColor: isDarkMode ? themes.darkGreen.accentDarkerColor : themes.lightGreen.accentDarkerColor }]]}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={[styles.square, { backgroundColor: isDarkMode ? themes.darkGreen.accentDarkerColor : themes.lightGreen.accentDarkerColor }, done && { backgroundColor: isDarkMode ? themes.darkGreen.accentColor : themes.lightGreen.accentColor }]} onPress={onDone}>
                    {done ? <FontAwesome name='check' size={25} color={isDarkMode ? themes.darkGreen.textColor : themes.lightGreen.textColor} /> : null}
                </TouchableOpacity>
                <Text style={[styles.itemText, { color: isDarkMode ? themes.darkGreen.textColor : themes.lightGreen.textColor }, done && styles.pressedText]}>{task}</Text>
            </View>
            <View>
                {done ?
                    <TouchableOpacity onPress={onDelete}>
                        <FontAwesome5 name="trash-alt" size={25} color={isDarkMode ? themes.darkGreen.accentDarkerColor : themes.lightGreen.accentDarkerColor} />
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={toggleImportant}>
                        {important ?
                            <FontAwesome name='star' size={25} color={isDarkMode ? themes.darkGreen.accentDarkerColor : themes.lightGreen.accentDarkerColor} /> :
                            <FontAwesome name='star-o' size={25} color={isDarkMode ? themes.darkGreen.accentDarkerColor : themes.lightGreen.accentDarkerColor} />
                        }

                    </TouchableOpacity>}
            </View>

        </View>

    );

}

export default Task;

const styles = StyleSheet.create({
    item: {
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