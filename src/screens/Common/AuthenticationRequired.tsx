import React from 'react'
import { View, Image } from 'react-native';
import useAppTheme from '../../hooks/useAppTheme'
import CustomText from '../../atoms/CustomText/CustomText';
import PrimaryButton from '../../atoms/Button/PrimaryButton';
import useAppNavigation from '../../hooks/useAppNavigation';

function AuthenticationRequired({ message, btnText } : PropTypes.AuntheticationRequired) {
    const theme = useAppTheme();
    const { navigate } = useAppNavigation();
  return (
    <View className='p-5 flex-1 justify-center items-center gap-3' style={{ backgroundColor: theme.colors.background}}>
        <Image 
          source={require('../../assets/authentication-required-graphic.png')}
          style={{
            width: 300,
            height: 300,
            marginBottom: 10
          }}
        />

        <CustomText className='w-[300px] text-center text-2xl'>{message ?? 'Authentication required to view this page'}</CustomText>
        <PrimaryButton className="w-[300px]" textStyle={{ fontSize: 20 }} text={btnText ?? 'Login / Register'} onPress={() => navigate('Login')} color="primary" />
    </View>
  )
}

export default AuthenticationRequired