import React from 'react'
import { View } from 'react-native';
import useAppTheme from '../../hooks/useAppTheme'
import CustomText from '../../atoms/CustomText/CustomText';
import PrimaryButton from '../../atoms/Button/PrimaryButton';
import useAppNavigation from '../../hooks/useAppNavigation';

function AuthenticationRequired({ message, btnText } : PropTypes.AuntheticationRequired) {
    const theme = useAppTheme();
    const { navigate } = useAppNavigation();
  return (
    <View className='p-5 flex-1 justify-center gap-3' style={{ backgroundColor: theme.colors.background}}>
        <CustomText className='text-center'>{message ?? 'Authentication required to view this page'}</CustomText>
        <PrimaryButton text={btnText ?? 'Login / Register'} onPress={() => navigate('Login')} color="primary" />
    </View>
  )
}

export default AuthenticationRequired