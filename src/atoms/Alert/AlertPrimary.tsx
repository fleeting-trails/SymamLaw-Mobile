import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useAppTheme from '../../hooks/useAppTheme';
import CustomText from '../CustomText/CustomText';



export default function AlertPrimary({ label, type, lightText } : PropTypes.AlertPrimary) {
    const theme = useAppTheme();
    const styles = createStyles({ theme, type })
    return (
        <View style={styles.container}>
            <CustomText lightText={lightText}>{label}</CustomText>
        </View>
    )
}


const createStyles = ({ theme, type }: { theme: Config.Theme, type: PropTypes.AlertPrimaryTypes }) => {
    const typeColorMap : ({ [key in PropTypes.AlertPrimaryTypes]: string }) = {
        error: theme.colors.error,
        info: theme.colors.primary,
        warning: theme.colors.warning
    }
    const typeColorMapRgb : ({ [key in PropTypes.AlertPrimaryTypes]: string }) = {
        error: theme.colors.errorRgb,
        info: theme.colors.primaryRgb,
        warning: theme.colors.warningRgb
    }
    return StyleSheet.create({
        container: {
            backgroundColor: `rgba(${typeColorMapRgb[type]}, 0.1)`,
            padding: 10,
            borderWidth: 1,
            borderColor: `${typeColorMap[type]}`
        }

    })
}