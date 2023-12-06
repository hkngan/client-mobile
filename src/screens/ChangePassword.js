import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Heading } from '../components'
import { COLORS } from '../themes/theme'

const ChangePassword = () => {
  return (
    <SafeAreaView style={styles.container}>
        <Heading header={'Update Password'}/>
    </SafeAreaView>
  )
}

export default ChangePassword

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.Black
    }
})