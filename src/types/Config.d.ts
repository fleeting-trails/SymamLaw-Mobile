namespace Config {
    type Theme = import('react-native-paper').MD3Theme & {
        colors: {
            primaryRgb: string,
            primaryLight: Array<string>,
            accent: string
            accentLight: string,
            primaryGray: string,
            primaryGrayLight: string,
            background: string,
            text: string,
            backgroundPrimary: string,
            backgroundPrimaryLight: string,
            textPrimary: string,
            textLight: string,
            textLightPrimary: string,
            textGray: string,
            error: string,
            errorRgb: string,
            warning: string,
            warningRgb: string
        }
    }
    type ScreensStack = {
        [key: string] : any
    }
    type StackNavigation = import('@react-navigation/stack').StackNavigationProp<ScreensStack>
    type ThemedStyle = {
        theme: Config.Theme,
        [key: string]: any
    }
}