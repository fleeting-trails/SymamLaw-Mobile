import React from 'react'
import { useTheme } from 'react-native-paper'

function useAppTheme() {
  return useTheme<Config.Theme>();
}

export default useAppTheme