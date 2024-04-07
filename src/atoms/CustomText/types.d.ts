namespace PropTypes {
    type CustomText = import('react-native').TextProps & {
        variant?: ( "300" | "300i" | "400" | "400i" | "500" | "500i" | "600" | "600i" | "700" | "700i" | "800" | "800i" | "900" | "900i" ),
        children: string,
        color?: CustomTextColorEnum,
        style?: import("react-native").TextStyle,
        lightText?: boolean,
        truncate?: number,
    }
    type CustomTextColorEnum = ('default' | 'primary')
}