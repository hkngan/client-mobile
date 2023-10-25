import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { baseImagePath } from '../api/apicalls'
import { COLORS, FONTSIZE, SPACING } from '../themes/theme'
const CastBox = ({
    baseImg,
    title,
    subtitle,
    shouldMarginateAtEnd,
    cardWidth,
    isLast,
    isFirst
}) => {
  return (
    <View style={[
        styles.container,
        shouldMarginateAtEnd 
            ? isFirst 
                ? {marginLeft: SPACING.space_24} 
                : isLast 
                ? {marginRight: SPACING.space_24} 
                : {}
            : {},
            {maxWidth: cardWidth}
    ]}>
        <Image source={{uri: baseImg}} style={[styles.img, {width: cardWidth}]}/>
        <Text numberOfLines={1} style={styles.nameText}>{title}</Text>
        <Text numberOfLines={1} style={styles.subNameText}>{subtitle}</Text>
    </View>
  )
}

export default CastBox

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    img:{
        aspectRatio: 1920/2880,
        borderRadius: SPACING.space_24 *4
    },
    subNameText:{
        color: COLORS.White,
        fontSize: FONTSIZE.size_12,
        alignSelf: 'stretch'
    },
    nameText: {
        color: COLORS.White,
        alignSelf: 'stretch',
        fontSize: FONTSIZE.size_14
    }
})