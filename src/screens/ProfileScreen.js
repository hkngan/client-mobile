import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../themes/theme'

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>ProfileScreen</Text>
    </SafeAreaView>
  )
}

export default ProfileScreen
const styles = StyleSheet.create({
  container:{
    backgroundColor: COLORS.Black,
    flex: 1
  },
})