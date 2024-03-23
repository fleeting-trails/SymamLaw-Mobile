import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Switch } from 'react-native-paper'
import { ScreenContainer, Section } from '../../components'
import CustomText from '../../atoms/CustomText/CustomText'
import LiveClassCard from '../../components/LiveClassCard/LiveClassCard'

export default function Home() {
  return (
    <ScreenContainer>
      <Section title='Upcoming Live Class'>
        <LiveClassCard />
      </Section>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    
  }
})