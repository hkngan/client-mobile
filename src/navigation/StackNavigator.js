import { View, Text } from 'react-native'
import React from 'react'
import TabNavigator from './TabNaviagtor'
import {createStackNavigator} from '@react-navigation/stack'
import { LoginScreen, SignupScreen, GetPasswordScreen, MovieDetailScreen, SelectShowtime, SelectTheaterScreen, OrderScreen, SelectSeatScreen, SelectCombo, TicketDetail } from '../screens'
const Stack = createStackNavigator()
const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='LoginStack'>
        <Stack.Screen name='LoginStack' component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name='SignupStack' component={SignupScreen} options={{headerShown: false}}/>
        <Stack.Screen name='GetPWStack' component={GetPasswordScreen} options={{headerShown: false}}/>
        <Stack.Screen name='TabStack' component={TabNavigator} options={{headerShown: false}}/>
        <Stack.Screen name='SelectTheaterStack' component={SelectTheaterScreen} options={{headerShown: false}}/>
        <Stack.Screen name='MovieDetailStack' component={MovieDetailScreen} options={{headerShown: false}}/>
        <Stack.Screen name='BookingSeatStack' component={SelectShowtime} options={{headerShown: false}}/>
        <Stack.Screen name='SelectSeatStack' component={SelectSeatScreen} options={{headerShown: false}}/>
        <Stack.Screen name='SelectComboStack' component={SelectCombo} options={{headerShown: false}}/>
        <Stack.Screen name='OrderScreenStack' component={OrderScreen} options={{headerShown: false}}/>
        <Stack.Screen name='TicketDetail' component={TicketDetail} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default StackNavigator