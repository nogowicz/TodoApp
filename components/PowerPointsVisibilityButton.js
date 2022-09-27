import { StyleSheet, View, Text } from "react-native";
import ToggleSwitch from 'toggle-switch-react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from '../contexts/ThemeContext'
import { useContext, useState } from 'react';

function PowerPointsVisibilityButton({ color, textColor, primaryColor }) {
    const themeCtx = useContext(ThemeContext)
    const {
        pointsVisibility,
        togglePointsVisibility
    } = themeCtx;
    const [isOn, setIsOn] = useState(Boolean(pointsVisibility));

    const storePointsVisibility = async (value) => {
        try {
            await AsyncStorage.setItem('pointsVisibility', value);
        } catch (e) {
            // saving error
        }
    }

    async function onToggle() {
        storePointsVisibility((!isOn).toString())
        togglePointsVisibility();
        setIsOn(!isOn)
    }
    console.log(isOn)

    AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (error, stores) => {
            stores.map((result, i, store) => {
                console.log({ [store[i][0]]: store[i][1] });
                return true;
            });
        });
    });

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