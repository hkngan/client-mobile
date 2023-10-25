import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZE, SPACING } from '../themes/theme'

const Title = ({title}) => {
  return (
      <Text style={styles.txt}>{title}</Text>
  )
}

export default Title

const styles = StyleSheet.create({
    txt:{
        fontSize: FONTSIZE.size_18,
        color: COLORS.White,
        paddingHorizontal: SPACING.space_4,
        paddingVertical: SPACING.space_15,
        fontStyle: 'italic',
        marginLeft: SPACING.space_15
    }
})