import {
    MD3LightTheme as DefaultTheme,
    PaperProvider,
} from 'react-native-paper';
// import { MD3Theme } from 'react-native-paper';

export const theme : Config.Theme = {
    ...DefaultTheme,
    // Specify custom property in nested object
    colors: {
        ...DefaultTheme.colors,
        primary: '#0A2647',
        primaryLight: ['#144272', '#205295', '#2C74B3'],
        accent: '#DADADA',
        accentLight: '#FCFFFD',
        primaryGray: '#A0AAC0',
        primaryGrayLight: '#DADADA'

    },
};