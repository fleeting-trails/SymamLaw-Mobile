namespace PropTypes {
    type ScreenContainer = {
        children: React.ReactNode,
        style?: import('react-native').ViewStyle,
        nestedScrollEnabled?: boolean
        [x:string] : any
    }
}