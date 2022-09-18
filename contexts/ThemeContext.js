import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [color, setColor] = useState('green');
    const [sorting, setSorting] = useState();

    useEffect(() => {
        async function fetchTheme() {
            const storedTheme = await AsyncStorage.getItem('theme');
            const storedSorting = await AsyncStorage.getItem('sort');
            if (storedTheme) {
                setColor(storedTheme);

            }

            if (storedSorting) {
                setSorting(storedSorting);
            }




        }
        fetchTheme();
    }, []);


    function setPowerListSorting() {
        setSorting('powerList');
    }

    function setNewestFirstSorting() {
        setSorting('newestFirst');
    }

    function setOldestFirstSorting() {
        setSorting('oldestFirst');
    }

    function setCustomizedSorting() {
        setSorting('customized');
    }


    function setThemesGreenMode() {
        setColor('green');
    }
    function setThemesBlueMode() {
        setColor('blue');
    }
    function setThemesOrangeMode() {
        setColor('orange');
    }
    function setThemesPinkMode() {
        setColor('pink')
    }
    function setThemesWhiteMode() {
        setColor('white')
    }
    function setThemesDarkGreenMode() {
        setColor('darkGreen')
    }
    function setThemesDarkRedMode() {
        setColor('darkRed')
    }
    function setThemesDarkGreyMode() {
        setColor('darkGrey')
    }
    function setThemesDarkBlueMode() {
        setColor('darkBlue')
    }
    function setThemesDarkPinkMode() {
        setColor('darkPink')
    }

    return (
        <ThemeContext.Provider
            value={{
                sort: sorting,
                setPowerListSorting: setPowerListSorting,
                setNewestFirstSorting: setNewestFirstSorting,
                setOldestFirstSorting: setOldestFirstSorting,
                setCustomizedSorting: setCustomizedSorting,
                theme: color,
                setGreenTheme: setThemesGreenMode,
                setBlueTheme: setThemesBlueMode,
                setOrangeTheme: setThemesOrangeMode,
                setPinkTheme: setThemesPinkMode,
                setWhiteTheme: setThemesWhiteMode,
                setDarkGreenTheme: setThemesDarkGreenMode,
                setDarkRedTheme: setThemesDarkRedMode,
                setDarkGreyTheme: setThemesDarkGreyMode,
                setDarkBlueTheme: setThemesDarkBlueMode,
                setDarkPinkTheme: setThemesDarkPinkMode
            }}>
            {children}
        </ThemeContext.Provider>
    );
}