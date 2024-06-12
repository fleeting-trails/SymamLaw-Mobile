namespace PropTypes {
    type AlertPrimary = {
        label: string,
        type: AlertPrimaryTypes,
        lightText?: boolean
    }
    type AlertPrimaryTypes = ("error" | "info" | "warning")
}