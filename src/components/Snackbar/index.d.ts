namespace PropTypes {
    type SnackbarPrimary = {
        type: SnackbarPrimaryTypes,
        actionBtnText?: string,
        onActionBtnPress?: () => void,
        visible: boolean,
        setVisible: (visible: boolean) => void,
        label: string
    }
    type SnackbarPrimaryTypes = "info" | "error"
}