import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [color, setColor] = useState('green');
    const [sorting, setSorting] = useState();
    const [pointsVisibility, setPointsVisibility] = useState('visible');
    const [funnyQuotesVisibility, setFunnyQuotesVisibility] = useState('visible');

    useEffect(() => {
        async function fetchTheme() {
            const storedTheme = await AsyncStorage.getItem('theme');
            const storedSorting = await AsyncStorage.getItem('sort');
            const storedVisibility = await AsyncStorage.getItem('pointsVisibility');
            const storedFunnyQuotes = await AsyncStorage.getItem('funnyQuotes');

            if (storedTheme) {
                setColor(storedTheme);
            }

            if (storedSorting) {
                setSorting(storedSorting);
            }

            if (storedVisibility) {
                setPointsVisibility(storedVisibility);
            }

            if (storedFunnyQuotes) {
                setFunnyQuotesVisibility(storedFunnyQuotes)
            }



        }
        fetchTheme()
    }, []);

    function togglePointsVisibility() {
        if (pointsVisibility === 'visible') {
            setPointsVisibility('nonvisible');
        } else if (pointsVisibility === 'nonvisible') {
            setPointsVisibility('visible');
        }
    }

    function toggleQuotesVisibility() {
        if (funnyQuotesVisibility === 'visible') {
            setFunnyQuotesVisibility('nonvisible');
        } else if (funnyQuotesVisibility === 'nonvisible') {
            setFunnyQuotesVisibility('visible');
        }
    }


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
    function setThemesdarkOrangeMode() {
        setColor('darkOrange')
    }
    function setThemesdarkGrayMode() {
        setColor('darkGray')
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
                pointsVisibility: pointsVisibility,
                togglePointsVisibility: togglePointsVisibility,
                funnyQuotes: funnyQuotesVisibility,
                toggleQuotesVisibility: toggleQuotesVisibility,
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
                setdarkOrangeTheme: setThemesdarkOrangeMode,
                setdarkGrayTheme: setThemesdarkGrayMode,
                setDarkBlueTheme: setThemesDarkBlueMode,
                setDarkPinkTheme: setThemesDarkPinkMode
            }}>
            {children}
        </ThemeContext.Provider>
    );
}