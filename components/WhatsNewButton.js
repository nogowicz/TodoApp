import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { useContext, useState } from 'react';

import { ThemeContext } from '../contexts/ThemeContext'
import { themes } from '../constants/themes.json';
import { Ionicons } from '@expo/vector-icons';
import Modal from "react-native-modal";

function WhatsNewButton() {
    const themeCtx = useContext(ThemeContext)
    const { theme } = themeCtx;
    const [modalVisible, setModalVisible] = useState(false);

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
    } else if (theme === 'darkGrey') {
        backgroundColor = themes.darkGrey.backgroundColor
        primaryColor = themes.darkGrey.primaryColor
        bottomTabsColor = themes.darkGrey.bottomTabsColor
        accentColor = themes.darkGrey.accentColor
        accentDarkerColor = themes.darkGrey.accentDarkerColor
        textColor = themes.darkGrey.textColor
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

    function modalVisibility() {
        setModalVisible(!modalVisible);
    }
    return (
        <>
            <TouchableOpacity onPress={modalVisibility}>
                <View style={[styles.container, { backgroundColor: accentDarkerColor }]}>
                    <Ionicons name="md-newspaper-outline" size={24} color={textColor} />
                    <Text style={[styles.buttonText, { color: textColor }]}>What's new ?</Text>
                </View>
            </TouchableOpacity>
            <View>
                <Modal
                    isVisible={modalVisible}
                    animationInTiming={800}
                    animationOutTiming={800}
                >
                    <View style={[styles.modal, { backgroundColor: 'white' }]}>
                        <Text style={styles.title}>What's new ?</Text>
                        <Text style={styles.text}>Dodano 'swipe' w lewo na tasku</Text>
                        <Text style={styles.text}>Zmiana wyboru kolorów</Text>
                        <Text style={styles.text}>Zmiana kształtu 'task completion'</Text>
                        <TouchableWithoutFeedback onPress={modalVisibility}>
                            <View style={[styles.closeButton, { borderColor: accentDarkerColor }]}>
                                <Text style={[styles.closeText, { color: accentDarkerColor }]}>Close</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>
            </View>
        </>

    );
}

export default WhatsNewButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderRadius: 6,
        marginHorizontal: 25,
        marginTop: 25,
        padding: 15,
        justifyContent: "flex-start",
        alignItems: 'center'
    },
    text: {
        marginLeft: 10,
    },
    modal: {
        justifyContent: 'center',
        padding: 15,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    buttonText: {
        fontSize: 15,
        marginLeft: 15,
    },
    closeButton: {
        borderWidth: 2,
        width: 80,
        marginLeft: 430,
    },
    closeText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
    }
});