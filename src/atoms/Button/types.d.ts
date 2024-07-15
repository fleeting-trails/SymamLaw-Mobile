namespace PropTypes {
    type PrimaryButton = {
        text: string,
        icon?: React.ReactNode,
        endIcon?: React.ReactNode,
        color?: ButtonColorEnum,
        size?: ButtonSizeEnum,
        lightText?: boolean,
        onPress?: () => void,
        style?: import('react-native').ViewStyle,
        loading?: boolean
        [key: string] : any
    }
    type ButtonColorEnum = ("primary" | "accent" | "light" | string)
    type ButtonSizeEnum = ('small' | 'medium' | 'large')
}