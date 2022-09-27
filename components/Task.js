import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    TouchableWithoutFeedback,
    Animated
} from "react-native";
import {
    FontAwesome,
    FontAwesome5,
    Ionicons
} from '@expo/vector-icons'
import { fetchTask } from "../util/database";
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext'
import { themes } from '../constants/themes.json';
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

function Task({ id, task, onDone, done, onDelete, onPress }) {
    const themeCtx = useContext(ThemeContext)
    const { theme, pointsVisibility } = themeCtx;
    const [important, setImportant] = useState(0);
    const [urgent, setUrgent] = useState(0);
    const [effort, setEffort] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const taskPower = important + urgent + effort;

    let backgroundColor;
    let primaryColor;
    let textColor;
    if (theme === 'green') {

        backgroundColor = themes.green.backgroundColor
        primaryColor = themes.green.primaryColor
        textColor = themes.green.textColor

    } else if (theme === 'blue') {
        backgroundColor = themes.blue.backgroundColor
        primaryColor = themes.blue.primaryColor
        textColor = themes.blue.textColor
    } else if (theme === 'orange') {
        backgroundColor = themes.orange.backgroundColor
        primaryColor = themes.orange.primaryColor
        textColor = themes.orange.textColor
    } else if (theme === 'pink') {
        backgroundColor = themes.pink.backgroundColor
        primaryColor = themes.pink.primaryColor
        textColor = themes.pink.textColor
    } else if (theme === 'white') {
        backgroundColor = themes.white.backgroundColor
        primaryColor = themes.white.primaryColor
        textColor = themes.white.textColor
    } else if (theme === 'darkGreen') {
        backgroundColor = themes.darkGreen.backgroundColor
        primaryColor = themes.darkGreen.primaryColor
        textColor = themes.darkGreen.textColor
    } else if (theme === 'darkOrange') {
        backgroundColor = themes.darkOrange.backgroundColor
        primaryColor = themes.darkOrange.primaryColor
        textColor = themes.darkOrange.textColor
    } else if (theme === 'darkGray') {
        backgroundColor = themes.darkGray.backgroundColor
        primaryColor = themes.darkGray.primaryColor
        textColor = themes.darkGray.textColor
    } else if (theme === 'darkBlue') {
        backgroundColor = themes.darkBlue.backgroundColor
        primaryColor = themes.darkBlue.primaryColor
        textColor = themes.darkBlue.textColor
    } else if (theme === 'darkPink') {
        backgroundColor = themes.darkPink.backgroundColor
        primaryColor = themes.darkPink.primaryColor
        textColor = themes.darkPink.textColor
    }



    useEffect(() => {
        fetchTaskDetails();
        setLoaded(true);

    });




    async function fetchTaskDetails() {
        const fetchedTask = await fetchTask(id);
        setImportant(fetchedTask.important);
        setUrgent(fetchedTask.urgent);
        setEffort(fetchedTask.effort);
    }


    const RenderLeft = (progress, dragX) => {

        const scale = dragX.interpolate({
            inputRange: [0.5, 180],
            outputRange: [0.1, 1]
        })

        const Style = {
            transform: [
                {
                    scale
                }
            ],
            justifyContent: 'center',
            alignItems: 'center',
        }

        return (
            <View style={[styles.hiddenItemLeftContainer, { backgroundColor: primaryColor }]}>
                <Animated.View style={[Style]}>
                    <Ionicons name="checkmark-done-outline" size={25} color='#fff' />
                    {!done ? <Text style={{ color: '#fff' }}>Done</Text> :
                        <Text style={{ color: '#fff' }}>Undone</Text>}
                </Animated.View>

            </View >

        )

    }

    const RenderRight = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-180, 0.5],
            outputRange: [1, 0.1]
        })

        const Style = {
            transform: [
                {
                    scale
                }
            ],
            justifyContent: 'center',
            alignItems: 'center',
        }

        return (
            <TouchableWithoutFeedback onPress={onDelete}>
                <View style={styles.hiddenItemRightContainer}>
                    <Animated.View style={[Style]}>
                        <FontAwesome5 name="trash-alt" size={25} color='white' />
                        <Text style={[styles.hiddenItemText]}>Delete</Text>
                    </Animated.View>

                </View >
            </TouchableWithoutFeedback>
        )
    }


    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <GestureHandlerRootView>
                <Swipeable
                    overshootLeft={false}
                    overshootRight={false}
                    renderLeftActions={RenderLeft}
                    renderRightActions={RenderRight}
                    onSwipeableLeftOpen={onDone}

                >
                    <View style={[styles.item, { backgroundColor: backgroundColor },
                    done && styles.pressed]}>
                        <TouchableOpacity style={{ height: 40, width: 40 }} onPress={onDone}>
                            <View style={[styles.circle, { backgroundColor: primaryColor }]}>
                                {done ? <FontAwesome style={{ marginLeft: 1 }} name='check' size={21} color={textColor} /> : null}
                            </View>
                        </TouchableOpacity>
                        <Text style={[styles.itemText, { color: textColor }, done && styles.pressedText]}>{task}</Text>

                        {taskPower !== 0 && loaded && pointsVisibility ?
                            <View style={[styles.points, { backgroundColor: primaryColor }]}>
                                <Text style={[{ color: textColor, fontWeight: 'bold' }]}>{taskPower}</Text>
                            </View> : null}
                    </View>
                </Swipeable>
            </GestureHandlerRootView>
        </TouchableWithoutFeedback>

    );

}

export default Task;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 40,
        marginHorizontal: 25,
        paddingHorizontal: 5,
        paddingVertical: 15,
        borderRadius: 4,
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 60,
        opacity: 0.7,
        marginTop: '20%'

    },
    itemText: {
        padding: 10,
        maxWidth: '75%'
    },
    pressedText: {
        textDecorationLine: 'line-through',
        color: '#6b6a6a',
    },
    pressed: {
        borderColor: '#6b6a6a',
    },
    hiddenItemRightContainer: {
        backgroundColor: '#d13838',
        justifyContent: 'center',
        marginHorizontal: 25,
        borderRadius: 5,
        paddingHorizontal: 25,
        alignItems: 'flex-end'
    },
    hiddenItemLeftContainer: {
        justifyContent: 'center',
        marginLeft: 25,
        borderRadius: 5,
        paddingHorizontal: 25,
        alignItems: 'flex-end'
    },
    hiddenItemText: {
        color: 'white',
    },
    points: {
        height: 32,
        width: 32,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
    }
});