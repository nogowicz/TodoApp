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
        setDarkRedTheme,
        setDarkgrayTheme,
        setDarkBlueTheme,
        setDarkPinkTheme
    } = themeCtx;
    const [themeName, setThemeName] = useState(theme);


    let backgroundColor;
    let primaryColor;
    let bottomTabsColor;
    let accentColor;
    let accentDarkerColor;
    let textColor;
    if (theme === 'green') {

        backgroundColor = themes.green.backgroundColor
        primaryColor = themes.green.primaryColor
        bottomTabsColor = themes.green.bottomTabsColor
        accentColor = themes.green.accentColor
        accentDarkerColor = themes.green.accentDarkerColor
        textColor = themes.green.textColor

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

    async function onDarkRedColorSelectHandler() {
        setDarkRedTheme();
        setThemeName('darkRed');
        storeTheme('darkRed');
    }

    async function onDarkgrayColorSelectHandler() {
        setDarkgrayTheme();
        setThemeName('darkgray');
        storeTheme('darkgray');
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
                                <AntDesign name="close" size={24} color={accentDarkerColor} />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.section}>
                            <View style={styles.sectionInnerContainer}>

                                <ColorButton
                                    color={themes.green.accentColor}
                                    textColor={themes.green.textColor}
                                    backgroundColor={themes.green.backgroundColor}
                                    onSelect={onGreenColorSelectHandler}
                                    selected={themeName === 'green'}
                                />

                                <ColorButton
                                    color={themes.blue.accentColor}
                                    textColor={themes.blue.textColor}
                                    backgroundColor={themes.blue.backgroundColor}
                                    onSelect={onBlueColorSelectHandler}
                                    selected={themeName === 'blue'}
                                />

                                <ColorButton
                                    color={themes.orange.accentColor}
                                    textColor={themes.orange.textColor}
                                    backgroundColor={themes.orange.backgroundColor}
                                    onSelect={onOrangeColorSelectHandler}
                                    selected={themeName === 'orange'}
                                />

                                <ColorButton
                                    color={themes.pink.accentColor}
                                    textColor={themes.pink.textColor}
                                    backgroundColor={themes.pink.backgroundColor}
                                    onSelect={onPinkColorSelectHandler}
                                    selected={themeName === 'pink'}
                                />

                                <ColorButton
                                    color={themes.white.accentColor}
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
                                    color={themes.darkGreen.accentColor}
                                    textColor={themes.darkGreen.textColor}
                                    backgroundColor={themes.darkGreen.backgroundColor}
                                    onSelect={onDarkGreenColorSelectHandler}
                                    selected={themeName === 'darkGreen'}
                                />

                                <ColorButton
                                    color={themes.darkBlue.accentColor}
                                    textColor={themes.darkBlue.textColor}
                                    backgroundColor={themes.darkBlue.backgroundColor}
                                    onSelect={onDarkBlueColorSelectHandler}
                                    selected={themeName === 'darkBlue'}
                                />

                                <ColorButton
                                    color={themes.darkRed.accentColor}
                                    textColor={themes.darkRed.textColor}
                                    backgroundColor={themes.darkRed.backgroundColor}
                                    onSelect={onDarkRedColorSelectHandler}
                                    selected={themeName === 'darkRed'}
                                />

                                <ColorButton
                                    color={themes.darkPink.accentColor}
                                    textColor={themes.darkPink.textColor}
                                    backgroundColor={themes.darkPink.backgroundColor}
                                    onSelect={onDarkPinkColorSelectHandler}
                                    selected={themeName === 'darkPink'}
                                />

                                <ColorButton
                                    color={themes.darkgray.accentColor}
                                    textColor={themes.darkgray.textColor}
                                    backgroundColor={themes.darkgray.backgroundColor}
                                    onSelect={onDarkgrayColorSelectHandler}
                                    selected={themeName === 'darkgray'}
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
        borderWidth: 1,
        borderRadius: 10,
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