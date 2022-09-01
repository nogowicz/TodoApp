import { createContext, useState } from "react";
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [color, setColor] = useState('green');

    function setThemesGreenMode() {
        setColor('green');
    }
    function setThemesBlueMode() {
        setColor('blue');
    }
    function setThemesOrangeMode() {
        setColor('orange');
    }
    return (
        <ThemeContext.Provider
            value={{
                theme: color,
                setGreenTheme: setThemesGreenMode,
                setBlueTheme: setThemesBlueMode,
                setOrangeTheme: setThemesOrangeMode,
            }}>
            {children}
        </ThemeContext.Provider>
    );
}