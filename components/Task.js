import { StyleSheet, TouchableOpacity, View, Text, Dimensions } from "react-native";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext'
import { themes } from '../constants/themes.json';

function Task({ task, onDone, done, important, toggleImportant, onDelete }) {
    const themeCtx = useContext(ThemeContext)
    const { theme } = themeCtx;

    let backgroundColor = themes.lightGreen.backgroundColor
    let primaryColor = themes.lightGreen.primaryColor
    let primaryLighterColor = themes.lightGreen.primaryLighterColor
    let primaryButtonColor = themes.lightGreen.primaryButtonColor
    let accentColor = themes.lightGreen.accentColor
    let accentDarkerColor = themes.lightGreen.accentDarkerColor
    let textColor = themes.lightGreen.textColor
    if (theme === 'green') {

        backgroundColor = themes.lightGreen.backgroundColor
        primaryColor = themes.lightGreen.primaryColor
        primaryLighterColor = themes.lightGreen.primaryLighterColor
        primaryButtonColor = themes.lightGreen.primaryButtonColor
        accentColor = themes.lightGreen.accentColor
        accentDarkerColor = themes.lightGreen.accentDarkerColor
        textColor = themes.lightGreen.textColor

    } else if (theme === 'blue') {
        backgroundColor = themes.lightBlue.backgroundColor
        primaryColor = themes.lightBlue.primaryColor
        primaryLighterColor = themes.lightBlue.primaryLighterColor
        primaryButtonColor = themes.lightBlue.primaryButtonColor
        accentColor = themes.lightBlue.accentColor
        accentDarkerColor = themes.lightBlue.accentDarkerColor
        textColor = themes.lightBlue.textColor
    } else if (theme === 'orange') {
        backgroundColor = themes.lightOrange.backgroundColor
        primaryColor = themes.lightOrange.primaryColor
        primaryLighterColor = themes.lightOrange.primaryLighterColor
        primaryButtonColor = themes.lightOrange.primaryButtonColor
        accentColor = themes.lightOrange.accentColor
        accentDarkerColor = themes.lightOrange.accentDarkerColor
        textColor = themes.lightOrange.textColor
    }
    return (
        <View style={[styles.item, { backgroundColor: primaryColor },
        done && styles.pressed,
        important && [styles.itemImportant, { borderColor: accentDarkerColor }]]}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={[styles.square, { backgroundColor: accentDarkerColor }, done && { backgroundColor: accentColor }]} onPress={onDone}>
                    {done ? <FontAwesome name='check' size={25} color={textColor} /> : null}
                </TouchableOpacity>
                <Text style={[styles.itemText, { color: textColor }, done && styles.pressedText]}>{task}</Text>
            </View>
            <View>
                {done ?
                    <TouchableOpacity onPress={onDelete}>
                        <FontAwesome5 name="trash-alt" size={25} color={accentDarkerColor} />
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={toggleImportant}>
                        {important ?
                            <FontAwesome name='star' size={25} color={accentDarkerColor} /> :
                            <FontAwesome name='star-o' size={25} color={accentDarkerColor} />
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