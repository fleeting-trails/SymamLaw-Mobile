namespace PropTypes {
    type AlertPrimary = {
        label: string,
        type: AlertPrimaryTypes
    }
    type AlertPrimaryTypes = ("error" | "info" | "warning")
}