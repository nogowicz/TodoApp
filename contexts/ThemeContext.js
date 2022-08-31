import { createContext, useState } from "react";
import { Appearance } from "react-native";

export const ThemeContext = createContext(Appearance.getColorScheme());

export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);
    function setThemesDefaultMode() {
        const colorScheme = Appearance.getColorScheme();
        if (colorScheme === 'dark') {
            setDarkMode(false);
        } else {
            setDarkMode(true);
        }

    }
    function setThemesLightMode() {
        setDarkMode(false);
    }
    function setThemesDarkMode() {
        setDarkMode(true);
    }
    return (
        <ThemeContext.Provider
            value={{
                isDarkMode: darkMode,
                setThemesDefaultMode: setThemesDefaultMode,
                setThemesLightMode: setThemesLightMode,
                setThemesDarkMode: setThemesDarkMode
            }}>
            {children}
        </ThemeContext.Provider>
    );
}