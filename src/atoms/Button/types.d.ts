namespace PropTypes {
    type PrimaryButton =  {
        text: string,
        icon?: React.ReactNode,
        color?: ButtonColorEnum,
        size?: ButtonSizeEnum,
        lightText?: boolean
        [x:string] : any
    }
    type ButtonColorEnum = ("primary" | "accent" | "light" | string)
    type ButtonSizeEnum = ('small' | 'medium' | 'large')
}