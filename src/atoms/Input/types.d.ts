namespace PropTypes {
    type InputPrimary = import('react-native').TextInputProps & {
        label?: string,
        containerStyle?: import('react-native').ViewStyle,
        inputStyle?: import('react-native').ViewStyle,
    }
    type InputUnderlined = import('react-native').TextInputProps & {
        label?: string,
        containerStyle?: import('react-native').ViewStyle,
        inputStyle?: import('react-native').ViewStyle,
    } 
    type DateTimePickerPrimary = {
        label?: string
    }
    type ListInput = {
        label?: string,
        inputStyle?: import('react-native').ViewStyle,
        onChange?: (values: Array<string>) => void,
        defaultValue?: Array<string>
    }
}