import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { BORDER_RADIUS, COLORS, SPACING, FONTSIZE } from '../themes/theme'

const MovieCard = ({
    title, 
    imagePath,
    shouldMarginateAtEnd,
    isLast,
    isFirst,
    cardWidth,
    shouldMarginateAround,
    navigate
}) => {
  return (
    <View style={[styles.container,
        shouldMarginateAtEnd 
            ? isFirst 
                ? {marginLeft: SPACING.space_36} 
                : isLast 
                ? {marginRight: SPACING.space_36}
                : {}
            : {},
            shouldMarginateAround ? {margin: SPACING.space_12} : {},
            {maxWidth: cardWidth}
        ]}>
        <TouchableOpacity onPress={navigate}>
            <View>
                <Image style={[styles.img, {width: cardWidth}]} source={{uri: imagePath}}/>
                <Text numberOfLines={1} style={styles.txt}>{title}</Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}

export default MovieCard

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flex: 1,
        backgroundColor: COLORS.Black
    },
    img:{
        aspectRatio: 2/3,
        borderRadius: 20
    },
    txt:{
        color: COLORS.White,
        fontSize: FONTSIZE.size_18,
        textAlign: 'center',
        paddingVertical: SPACING.space_10
    }
})