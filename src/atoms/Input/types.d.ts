namespace PropTypes {
    type InputPrimary = import('react-native').TextInputProps & {
        label?: string,
        containerStyle?: import('react-native').ViewStyle,
        inputStyle?: import('react-native').ViewStyle,
    }
}