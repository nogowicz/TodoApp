import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { View, Text } from 'react-native'
import { MaterialIcons, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext'
import { themes } from '../constants/themes.json';
import AsyncStorage from "@react-native-async-storage/async-storage";

function SortPopupMenu({ color }) {
    const themeCtx = useContext(ThemeContext);
    const {
        theme,
        sort,
        setPowerListSorting,
        setNewestFirstSorting,
        setOldestFirstSorting,
        setCustomizedSorting

    } = themeCtx;

    const [sorting, setSorting] = useState(sort);


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




    const storeSorting = async (value) => {
        try {
            await AsyncStorage.setItem('sort', value);
        } catch (e) {
            // saving error
        }
    }

    async function powerListSorting() {
        setPowerListSorting();
        setSorting('powerList');
        storeSorting('powerList');
    }

    async function newestFirstSorting() {
        setNewestFirstSorting();
        setSorting('newestFirst');
        storeSorting('newestFirst');
    }

    async function oldestFirstSorting() {
        setOldestFirstSorting();
        setSorting('oldestFirst');
        storeSorting('oldestFirst');
    }

    async function customizedSorting() {
        setCustomizedSorting();
        setSorting('customized');
        storeSorting('customized');
    }

    return (
        <View>
            <Menu>
                <MenuTrigger>
                    <MaterialIcons name="sort" size={28} color={color} />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={
                    {
                        marginTop: -45,
                        borderRadius: 10,
                        width: 150,
                        backgroundColor: backgroundColor,
                        padding: 5,
                    }}>
                    <MenuOption style={[{ flexDirection: 'row', alignItems: 'center' }, sorting === 'powerList' && { borderBottomWidth: 2, borderBottomColor: primaryColor }]} onSelect={() => powerListSorting()} >
                        <MaterialIcons name="bolt" size={24} color={primaryColor} />
                        <Text style={{ color: textColor, fontSize: 18, marginLeft: 5 }}>Power List</Text>
                    </MenuOption>
                    <MenuOption style={[{ flexDirection: 'row', alignItems: 'center' }, sorting === 'newestFirst' && { borderBottomWidth: 2, borderBottomColor: primaryColor }]} onSelect={() => newestFirstSorting()} >
                        <Octicons name="sort-asc" size={24} color={primaryColor} />
                        <Text style={{ color: textColor, fontSize: 18, marginLeft: 5 }}>Newest First</Text>
                    </MenuOption>
                    <MenuOption style={[{ flexDirection: 'row', alignItems: 'center' }, sorting === 'oldestFirst' && { borderBottomWidth: 2, borderBottomColor: primaryColor }]} onSelect={() => oldestFirstSorting()} >
                        <Octicons name="sort-desc" size={24} color={primaryColor} />
                        <Text style={{ color: textColor, fontSize: 18, marginLeft: 5 }}>Oldest First</Text>
                    </MenuOption>
                    <MenuOption style={[{ flexDirection: 'row', alignItems: 'center' }, sorting === 'customized' && { borderBottomWidth: 2, borderBottomColor: primaryColor, borderRadius: 10, }]} onSelect={() => customizedSorting()} >
                        <MaterialCommunityIcons name="sort-variant-lock-open" size={24} color={primaryColor} />
                        <Text style={{ color: textColor, fontSize: 18, marginLeft: 5 }}>Customized</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </View>
    );
}

export default SortPopupMenu;
