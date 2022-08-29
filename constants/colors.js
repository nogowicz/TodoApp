import { Appearance } from "react-native";

const colorScheme = Appearance.getColorScheme();

export let Colors;
if (colorScheme === 'dark') {
    Colors = {
        backgroundColor: '#211A1A',
        primaryColor: '#272E24',
        primaryLighterColor: '#362929',
        primaryButtonColor: '#D7C2C1',
        accentColor: '#334a2d',
        accentDarkerColor: '#96D785',
        textColor: '#EDE0DF',
    }
} else {
    Colors = {
        backgroundColor: '#f6ffff',
        primaryColor: '#C2FFCE',
        primaryLighterColor: '#E7F1E8',
        primaryButtonColor: '#DCB6A5',
        accentColor: '#81cc91',
        accentDarkerColor: '#519b63',
        textColor: '#000',
    }
}