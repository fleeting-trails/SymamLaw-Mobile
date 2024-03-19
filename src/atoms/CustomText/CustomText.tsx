import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function CustomText({ variant = '300', children, ...props } : PropTypes.CustomText) {
  return (
    <View>
    {(variant === '300') && <Text style={{ fontFamily: 'Rubik_300Light' }}>{children}</Text>}
    {(variant === '300i') && <Text style={{ fontFamily: 'Rubik_300Light_Italic' }}>{children}</Text>}
    {(variant === '400') && <Text style={{ fontFamily: 'Rubik_400Regular' }}>{children}</Text>}
    {(variant === '400i') && <Text style={{ fontFamily: 'Rubik_400Regular_Italic' }}>{children}</Text>}
    {(variant === '500') && <Text style={{ fontFamily: 'Rubik_500Medium' }}>{children}</Text>}
    {(variant === '500i') && <Text style={{ fontFamily: 'Rubik_500Medium_Italic' }}>{children}</Text>}
    {(variant === '600') && <Text style={{ fontFamily: 'Rubik_600SemiBold' }}>{children}</Text>}
    {(variant === '600i') && <Text style={{ fontFamily: 'Rubik_600SemiBold_Italic' }}>{children}</Text>}
    {(variant === '700') && <Text style={{ fontFamily: 'Rubik_700Bold' }}>{children}</Text>}
    {(variant === '700i') && <Text style={{ fontFamily: 'Rubik_700Bold_Italic' }}>{children}</Text>}
    {(variant === '800') && <Text style={{ fontFamily: 'Rubik_800ExtraBold' }}>{children}</Text>}
    {(variant === '800i') && <Text style={{ fontFamily: 'Rubik_800ExtraBold_Italic' }}>{children}</Text>}
    {(variant === '900') && <Text style={{ fontFamily: 'Rubik_900Black' }}>{children}</Text>}
    {(variant === '900i') && <Text style={{ fontFamily: 'Rubik_900Black_Italic' }}>{children}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({})