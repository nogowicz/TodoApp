import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { View, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
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
                <MenuTrigger >
                    <MaterialIcons name="sort" size={28} color={color} />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={
                    {
                        marginTop: -45,
                        borderRadius: 10,
                        width: 130,
                        backgroundColor: backgroundColor
                    }}>
                    <MenuOption style={[{ flexDirection: 'row', alignItems: 'center' }, sorting === 'powerList' && { borderBottomWidth: 2, borderBottomColor: accentColor }]} onSelect={() => powerListSorting()} >
                        <Text style={{ color: textColor }}>Power List</Text>
                    </MenuOption>
                    <MenuOption style={[{ flexDirection: 'row', alignItems: 'center' }, sorting === 'newestFirst' && { borderBottomWidth: 2, borderBottomColor: accentColor }]} onSelect={() => newestFirstSorting()} >
                        <Text style={{ color: textColor }}>Newest First</Text>
                    </MenuOption>
                    <MenuOption style={[{ flexDirection: 'row', alignItems: 'center' }, sorting === 'oldestFirst' && { borderBottomWidth: 2, borderBottomColor: accentColor }]} onSelect={() => oldestFirstSorting()} >
                        <Text style={{ color: textColor }}>Oldest First</Text>
                    </MenuOption>
                    <MenuOption style={[{ flexDirection: 'row', alignItems: 'center' }, sorting === 'customized' && { borderBottomWidth: 2, borderBottomColor: accentColor, borderRadius: 10, }]} onSelect={() => customizedSorting()} >
                        <Text style={{ color: textColor }}>Customized</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </View>
    );
}

export default SortPopupMenu;
