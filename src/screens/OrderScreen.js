import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../themes/theme'
import { Heading } from '../components'

const OrderScreen = ({route}) => {
  const { selectedShowtime } = route.params;
  return (
    <SafeAreaView style={{
      backgroundColor: COLORS.Black,
      flex: 1
    }}>
      <Heading header={'Xác nhận'}/>
      <Text style={{color: COLORS.White}}>{route.params.totalPrice}</Text>


    </SafeAreaView>
  )
}

export default OrderScreen

const styles = StyleSheet.create({})