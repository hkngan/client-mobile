import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Heading } from '../components'
import { COLORS } from '../themes/theme'

const TicketDetail = ({route}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Heading header={route.params.orderId}/>
    </SafeAreaView>
  )
}

export default TicketDetail
const WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
  container:{
    backgroundColor: COLORS.Black,
    flex: 1,
    paddingTop: 40,
  },
})