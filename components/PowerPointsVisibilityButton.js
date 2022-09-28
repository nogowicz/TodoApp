import { StyleSheet, View, Text } from "react-native";
import ToggleSwitch from 'toggle-switch-react-native'
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from '../contexts/ThemeContext'


function PowerPointsVisibilityButton({ color, textColor, primaryColor }
) {
    const themeCtx = useContext(ThemeContext)
    const { theme,
        pointsVisibility,
        togglePointsVisibility } = themeCtx;
    const [isOn, setIsOn] = useState(() => {
        if (pointsVisibility === 'visible') {
            return true;
        } else {
            return false;
        }
    });
    const storePointsVisibility = async (value) => {
        try {
            await AsyncStorage.setItem('pointsVisibility', value);
        } catch (e) {
            // saving error
        }
    }

    // useEffect(() => {

    // }, [pointsVisibility])

    async function onToggle() {
        if (pointsVisibility === 'nonvisible') {
            storePointsVisibility('visible');
            setIsOn(true);
        } else if (pointsVisibility === 'visible') {
            storePointsVisibility('nonvisible');
            setIsOn(false);
        }
        togglePointsVisibility();

    }



    // AsyncStorage.getAllKeys().then((keyArray) => {
    //     AsyncStorage.multiGet(keyArray).then((keyValArray) => {
    //         let myStorage: any = {};
    //         for (let keyVal of keyValArray) {
    //             myStorage[keyVal[0]] = keyVal[1]
    //         }

    //         console.log('CURRENT STORAGE: ', myStorage);
    //     })
    // });
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={[styles.points, { backgroundColor: textColor }]}>
                    <Text style={[{ color: color, fontWeight: 'bold' }]}>12</Text>
                </View>
                <Text style={[styles.buttonText, { color: textColor }]}>Power Task Visibility</Text>
            </View>
            <ToggleSwitch
                isOn={isOn}
                onColor={primaryColor}
                offColor="#ccc"
                size="medium"
                onToggle={onToggle}
            />
        </View>
    );
}

export default PowerPointsVisibilityButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 25,
        padding: 15,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: '#454545',
    },
    points: {
        height: 24,
        width: 24,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 15,
        marginLeft: 15,
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});