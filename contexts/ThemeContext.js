import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [color, setColor] = useState('green');

    useEffect(() => {
        async function fetchTheme() {
            const storedTheme = await AsyncStorage.getItem('theme');

            if (storedTheme) {
                setColor(storedTheme)
            }

        }
        fetchTheme();
    }, []);

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
    return (
        <ThemeContext.Provider
            value={{
                theme: color,
                setGreenTheme: setThemesGreenMode,
                setBlueTheme: setThemesBlueMode,
                setOrangeTheme: setThemesOrangeMode,
                setPinkTheme: setThemesPinkMode,
                setWhiteTheme: setThemesWhiteMode
            }}>
            {children}
        </ThemeContext.Provider>
    );
}