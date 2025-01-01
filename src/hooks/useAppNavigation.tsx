import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch } from '../redux/hooks';
import { setGoBackFunction, setTopNavigationEnabled } from '../redux/slices/header';

export default function useAppNavigation() {
  const navigator = useNavigation<Config.StackNavigation>();
  const dispatch = useAppDispatch();

  const handleGoBack = () => {
    navigator.goBack();
    if (navigator.canGoBack()) dispatch(setGoBackFunction(navigator.goBack))
    else dispatch(setGoBackFunction(null))
  }
  const handleNavigate = (screen : string, params?: any) => {
    dispatch(setTopNavigationEnabled(true));
    if (navigator.canGoBack()) {
      dispatch(setGoBackFunction(handleGoBack));
    } else {
      dispatch(setGoBackFunction(null))
    }
    navigator.navigate(screen, params)
  }



  return { navigate : handleNavigate, navigator };
}