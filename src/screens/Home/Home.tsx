import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScreenContainer } from '../../components'
import CustomText from '../../atoms/CustomText/CustomText'

export default function Home() {
  return (
    <ScreenContainer style={styles.container}>
      <CustomText>Home</CustomText>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})