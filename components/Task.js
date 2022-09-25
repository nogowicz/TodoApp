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
    Ionicons,
    MaterialCommunityIcons,
    Fontisto
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
    let bottomTabsColor;
    let accentColor;
    let accentDarkerColor;
    let textColor;
    let theMostImportantColor;
    let moreImportantColor;
    let importantColors;
    let notImportantColor;
    if (theme === 'green') {
        backgroundColor = themes.green.backgroundColor
        primaryColor = themes.green.primaryColor
        bottomTabsColor = themes.green.bottomTabsColor
        accentColor = themes.green.accentColor
        accentDarkerColor = themes.green.accentDarkerColor
        textColor = themes.green.textColors

    } else if (theme === 'blue') {
        backgroundColor = themes.blue.backgroundColor
        primaryColor = themes.blue.primaryColor
        bottomTabsColor = themes.blue.bottomTabsColor
        accentColor = themes.blue.accentColor
        accentDarkerColor = themes.blue.accentDarkerColor
        textColor = themes.blue.textColor

    } else if (theme === 'orange') {
        backgroundColor = themes.orange.backgroundColor
        primaryColor = themes.orange.primaryColor
        bottomTabsColor = themes.orange.bottomTabsColor
        accentColor = themes.orange.accentColor
        accentDarkerColor = themes.orange.accentDarkerColor
        textColor = themes.orange.textColor

    } else if (theme === 'pink') {
        backgroundColor = themes.pink.backgroundColor
        primaryColor = themes.pink.primaryColor
        bottomTabsColor = themes.pink.bottomTabsColor
        accentColor = themes.pink.accentColor
        accentDarkerColor = themes.pink.accentDarkerColor
        textColor = themes.pink.textColor

    } else if (theme === 'white') {
        backgroundColor = themes.white.backgroundColor
        primaryColor = themes.white.primaryColor
        bottomTabsColor = themes.white.bottomTabsColor
        accentColor = themes.white.accentColor
        accentDarkerColor = themes.white.accentDarkerColor
        textColor = themes.white.textColor

    } else if (theme === 'darkGreen') {
        backgroundColor = themes.darkGreen.backgroundColor
        primaryColor = themes.darkGreen.primaryColor
        bottomTabsColor = themes.darkGreen.bottomTabsColor
        accentColor = themes.darkGreen.accentColor
        accentDarkerColor = themes.darkGreen.accentDarkerColor
        textColor = themes.darkGreen.textColor

    } else if (theme === 'darkRed') {
        backgroundColor = themes.darkRed.backgroundColor
        primaryColor = themes.darkRed.primaryColor
        bottomTabsColor = themes.darkRed.bottomTabsColor
        accentColor = themes.darkRed.accentColor
        accentDarkerColor = themes.darkRed.accentDarkerColor
        textColor = themes.darkRed.textColor

    } else if (theme === 'darkgray') {
        backgroundColor = themes.darkgray.backgroundColor
        primaryColor = themes.darkgray.primaryColor
        bottomTabsColor = themes.darkgray.bottomTabsColor
        accentColor = themes.darkgray.accentColor
        accentDarkerColor = themes.darkgray.accentDarkerColor
        textColor = themes.darkgray.textColor

    } else if (theme === 'darkBlue') {
        backgroundColor = themes.darkBlue.backgroundColor
        primaryColor = themes.darkBlue.primaryColor
        bottomTabsColor = themes.darkBlue.bottomTabsColor
        accentColor = themes.darkBlue.accentColor
        accentDarkerColor = themes.darkBlue.accentDarkerColor
        textColor = themes.darkBlue.textColor

    } else if (theme === 'darkPink') {
        backgroundColor = themes.darkPink.backgroundColor
        primaryColor = themes.darkPink.primaryColor
        bottomTabsColor = themes.darkPink.bottomTabsColor
        accentColor = themes.darkPink.accentColor
        accentDarkerColor = themes.darkPink.accentDarkerColor
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
            <View style={[styles.hiddenItemLeftContainer, { backgroundColor: accentDarkerColor }]}>
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
                    <View style={[styles.item, { backgroundColor: primaryColor },
                    done && styles.pressed]}>
                        <TouchableOpacity style={{ height: 40, width: 40 }} onPress={onDone}>
                            <View style={[styles.circle, { backgroundColor: accentDarkerColor }]}>
                                {done ? <FontAwesome style={{ marginLeft: 1 }} name='check' size={21} color={textColor} /> : null}
                            </View>
                        </TouchableOpacity>
                        <Text style={[styles.itemText, { color: textColor }, done && styles.pressedText]}>{task}</Text>

                        {taskPower !== 0 && loaded && pointsVisibility ?
                            <View style={[styles.points, { backgroundColor: accentColor }]}>
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