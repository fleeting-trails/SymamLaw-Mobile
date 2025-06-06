import {
    MD3LightTheme as DefaultTheme,
    PaperProvider,
} from 'react-native-paper';
// import { MD3Theme } from 'react-native-paper';
export const getTheme = (dark : boolean = false) : Config.Theme =>  {
    return {
        ...DefaultTheme,
        // Specify custom property in nested object
        dark,
        colors: {
            ...DefaultTheme.colors,
            primary: !dark ? '#0A2647' : '#D6E6F8',
            primaryRgb: !dark ? '10, 38, 71' : '214, 230, 248',
            primaryLight: !dark ? ['#144272', '#205295', '#2C74B3'] : ['#C1DBF6', '#9BBAE2', '#709DC5'],
            accent: '#F4F7BE',
            accentLight: '#FCFFFD',
            primaryGray: '#A0AAC0',
            primaryGrayLight: '#DADADA',
            background: !dark ? '#ffffff' : '#000000',
            backgroundPrimary: '#0A2647',
            backgroundPrimaryLight: '#144272',
            backgroundGray: !dark ? '#DADADA' : '#404040',
            backgroundGrayLight: !dark ? "#EEEEEE" : "#303030",
            text: !dark ? '#000000' : "#ffffff",
            textPrimary: !dark ? '#0A2647' : '#D6E6F8',
            textLight: !dark ? '#ffffff' : '#000000',
            textLightPrimary: !dark ? '#D6E6F8' : '#0A2647',
            textGray: '#6B758A',
            success: '#5CB85C',
            error: "#cc0000",
            errorText: !dark ? "#B00020" : "#CF6679",
            errorRgb: "176, 0, 32",
            errorTextRgb: !dark ? "176, 0, 32" : "207, 102, 121",
            warning: '#ffcc00',
            warningRgb: '255,204,0'
        },
    }
}