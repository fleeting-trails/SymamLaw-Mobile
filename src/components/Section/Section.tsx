import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from '../../atoms/CustomText/CustomText'

export function Section({ title, children, ...props } : PropTypes.Section) {
  return (
    <View {...props}>
        <CustomText variant='800' style={styles.heading}>{title}</CustomText>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        letterSpacing: 0,
        marginBottom: 7
    }
})