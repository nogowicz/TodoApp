import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { useContext, useState } from 'react';

import { ThemeContext } from '../contexts/ThemeContext'
import { themes } from '../constants/themes.json';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Modal from "react-native-modal";

function WhatsNewButton() {
    const themeCtx = useContext(ThemeContext)
    const { theme } = themeCtx;
    const [modalVisible, setModalVisible] = useState(false);

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


    function modalVisibility() {
        setModalVisible(!modalVisible);
    }
    return (
        <>
            <TouchableOpacity onPress={modalVisibility}>
                <View style={[styles.container, { backgroundColor: backgroundColor }]}>
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
                    <View style={[styles.modal, { backgroundColor: backgroundColor }]}>
                        <View style={styles.titleRow}>
                            <Text style={[styles.title, { color: textColor }]}>What's new ?</Text>
                            <TouchableWithoutFeedback onPress={modalVisibility}>
                                <AntDesign name="close" size={24} color={primaryColor} />
                            </TouchableWithoutFeedback>
                        </View>
                        <Text style={[styles.text, { color: textColor }]}>Poprawiono wygląd taska</Text>
                        <Text style={[styles.text, { color: textColor }]}>Sortowanie zapisuje się po wyjściu z aplikacji</Text>
                        <Text style={[styles.text, { color: textColor }]}>Poprawiono wygląd filtra sortowania</Text>


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
        marginHorizontal: 25,
        padding: 15,
        justifyContent: "flex-start",
        alignItems: 'center',
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
        borderColor: '#fff',
        borderRadius: 6
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
    }

});