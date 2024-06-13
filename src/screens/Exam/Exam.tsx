import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useAppTheme from '../../hooks/useAppTheme';
import { ScreenContainer } from '../../components';
import BottomDrawer from '../../atoms/Drawer/BottomDrawer';


export default function Exam() {
    const theme = useAppTheme();
    const styles = createStyles({ theme })
    return (
        <ScreenContainer>
            <BottomDrawer />
        </ScreenContainer>
    )
}


const createStyles = ({ theme }: { theme: Config.Theme }) => {
    return StyleSheet.create({


    })
}