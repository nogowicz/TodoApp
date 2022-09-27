import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { useContext, useState } from 'react';

import AsyncStorage from "@react-native-async-storage/async-storage";
import ColorButton from "../components/ColorButton";
import { ThemeContext } from '../contexts/ThemeContext'
import { themes } from '../constants/themes.json';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import Modal from "react-native-modal";

function ThemePicker() {
    const themeCtx = useContext(ThemeContext)
    const [modalVisible, setModalVisible] = useState(false);
    const {
        theme,
        setGreenTheme,
        setBlueTheme,
        setOrangeTheme,
        setPinkTheme,
        setWhiteTheme,
        setDarkGreenTheme,
        setdarkOrangeTheme,
        setdarkGrayTheme,
        setDarkBlueTheme,
        setDarkPinkTheme
    } = themeCtx;
    const [themeName, setThemeName] = useState(theme);


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

    const storeTheme = async (value) => {
        try {
            await AsyncStorage.setItem('theme', value);
        } catch (e) {
            // saving error
        }
    }


    async function onGreenColorSelectHandler() {
        setGreenTheme();
        setThemeName('green');
        storeTheme('green');
    }

    async function onBlueColorSelectHandler() {
        setBlueTheme();
        setThemeName('blue');
        storeTheme('blue');
    }

    async function onOrangeColorSelectHandler() {
        setOrangeTheme();
        setThemeName('orange');
        storeTheme('orange');
    }

    async function onPinkColorSelectHandler() {
        setPinkTheme();
        setThemeName('pink');
        storeTheme('pink');
    }

    async function onWhiteColorSelectHandler() {
        setWhiteTheme();
        setThemeName('white');
        storeTheme('white');
    }

    async function onDarkGreenColorSelectHandler() {
        setDarkGreenTheme();
        setThemeName('darkGreen');
        storeTheme('darkGreen');
    }

    async function ondarkOrangeColorSelectHandler() {
        setdarkOrangeTheme();
        setThemeName('darkOrange');
        storeTheme('darkOrange');
    }

    async function ondarkGrayColorSelectHandler() {
        setdarkGrayTheme();
        setThemeName('darkGray');
        storeTheme('darkGray');
    }

    async function onDarkBlueColorSelectHandler() {
        setDarkBlueTheme();
        setThemeName('darkBlue');
        storeTheme('darkBlue');
    }

    async function onDarkPinkColorSelectHandler() {
        setDarkPinkTheme();
        setThemeName('darkPink');
        storeTheme('darkPink');
    }


    function modalVisibility() {
        setModalVisible(!modalVisible);
    }
    return (
        <>
            <TouchableOpacity onPress={modalVisibility}>
                <View style={[styles.container, { backgroundColor: backgroundColor }]}>
                    <MaterialIcons name="format-paint" size={24} color={textColor} />
                    <Text style={[styles.buttonText, { color: textColor }]}>Change Theme</Text>
                </View>
            </TouchableOpacity>
            <View>
                <Modal
                    isVisible={modalVisible}
                    animationInTiming={800}
                    animationOutTiming={800}
                >
                    <View style={[styles.modal, { backgroundColor: backgroundColor, borderColor: textColor }]}>
                        <View style={styles.titleRow}>
                            <Text style={[styles.title, { color: textColor }]}>Change Theme</Text>
                            <TouchableWithoutFeedback onPress={modalVisibility}>
                                <AntDesign name="close" size={24} color={primaryColor} />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.section}>
                            <View style={styles.sectionInnerContainer}>

                                <ColorButton
                                    color={themes.green.primaryColor}
                                    textColor={themes.green.textColor}
                                    backgroundColor={themes.green.backgroundColor}
                                    onSelect={onGreenColorSelectHandler}
                                    selected={themeName === 'green'}
                                />

                                <ColorButton
                                    color={themes.blue.primaryColor}
                                    textColor={themes.blue.textColor}
                                    backgroundColor={themes.blue.backgroundColor}
                                    onSelect={onBlueColorSelectHandler}
                                    selected={themeName === 'blue'}
                                />

                                <ColorButton
                                    color={themes.orange.primaryColor}
                                    textColor={themes.orange.textColor}
                                    backgroundColor={themes.orange.backgroundColor}
                                    onSelect={onOrangeColorSelectHandler}
                                    selected={themeName === 'orange'}
                                />

                                <ColorButton
                                    color={themes.pink.primaryColor}
                                    textColor={themes.pink.textColor}
                                    backgroundColor={themes.pink.backgroundColor}
                                    onSelect={onPinkColorSelectHandler}
                                    selected={themeName === 'pink'}
                                />

                                <ColorButton
                                    color={themes.white.primaryColor}
                                    textColor={themes.white.textColor}
                                    backgroundColor={themes.white.backgroundColor}
                                    onSelect={onWhiteColorSelectHandler}
                                    selected={themeName === 'white'}
                                />


                            </View>
                        </View>
                        <View style={styles.section}>
                            <View style={styles.sectionInnerContainer}>


                                <ColorButton
                                    color={themes.darkGreen.primaryColor}
                                    textColor={themes.darkGreen.textColor}
                                    backgroundColor={themes.darkGreen.backgroundColor}
                                    onSelect={onDarkGreenColorSelectHandler}
                                    selected={themeName === 'darkGreen'}
                                />

                                <ColorButton
                                    color={themes.darkBlue.primaryColor}
                                    textColor={themes.darkBlue.textColor}
                                    backgroundColor={themes.darkBlue.backgroundColor}
                                    onSelect={onDarkBlueColorSelectHandler}
                                    selected={themeName === 'darkBlue'}
                                />

                                <ColorButton
                                    color={themes.darkOrange.primaryColor}
                                    textColor={themes.darkOrange.textColor}
                                    backgroundColor={themes.darkOrange.backgroundColor}
                                    onSelect={ondarkOrangeColorSelectHandler}
                                    selected={themeName === 'darkOrange'}
                                />

                                <ColorButton
                                    color={themes.darkPink.primaryColor}
                                    textColor={themes.darkPink.textColor}
                                    backgroundColor={themes.darkPink.backgroundColor}
                                    onSelect={onDarkPinkColorSelectHandler}
                                    selected={themeName === 'darkPink'}
                                />

                                <ColorButton
                                    color={themes.darkGray.primaryColor}
                                    textColor={themes.darkGray.textColor}
                                    backgroundColor={themes.darkGray.backgroundColor}
                                    onSelect={ondarkGrayColorSelectHandler}
                                    selected={themeName === 'darkGray'}
                                />


                            </View>
                        </View>

                    </View>
                </Modal>
            </View>
        </>

    );
}

export default ThemePicker;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginHorizontal: 25,
        marginTop: 25,
        padding: 15,
        justifyContent: "flex-start",
        alignItems: 'center',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#454545',
    },
    text: {
        marginLeft: 10,
    },
    modal: {
        justifyContent: 'center',
        padding: 15,
        borderWidth: 2,
        borderRadius: 6,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    buttonText: {
        fontSize: 15,
        marginLeft: 15,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sectionInnerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-around",
        marginBottom: 30,
        padding: 20,
    }

});