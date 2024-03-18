namespace Config {
    type Theme = import('react-native-paper').MD3Theme & {
        colors: {
            primaryLight: Array<string>,
            accent: string
            accentLight: string,
            primaryGray: string,
            primaryGrayLight: string
        }
    }
}