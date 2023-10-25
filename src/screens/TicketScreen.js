import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZE } from '../themes/theme'
import { Heading } from '../components';

const TicketScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headerText}>Vé vào rạp</Text>
      </SafeAreaView>
    </ScrollView>
  );
}

export default TicketScreen
const styles = StyleSheet.create({
  container:{
    backgroundColor: COLORS.Black,
    flex: 1
  },
  headerText:{
    color: COLORS.White,
    fontSize: FONTSIZE.size_20,
    textTransform: 'uppercase',
    alignSelf: 'center'
  }
})