import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { BORDER_RADIUS, COLORS, FONTSIZE, SPACING } from '../themes/theme'
import { useFonts } from 'expo-font'
import {Feather} from '@expo/vector-icons'

const SearchBox = ({searchFunc}) => {
    const [fontLoaded] = useFonts({
        'Medium' : require('../assets/fonts/Arimo-Medium.ttf')
    })
    // if(!fontLoaded){
    //     return null
    // }
    const [searchText, setSearchText] = useState('')
  return (
    <View style={styles.inputBox}>
        <TextInput 
            style={styles.textInput} 
            placeholder='Nhập tên phim..' 
            placeholderTextColor={COLORS.White}
            onChangeText={textInput => setSearchText(textInput)}
            value={searchText}
            />
        <TouchableOpacity onPress={()=>searchFunc(searchText)}>
            <Feather name='search' color={COLORS.Red} size={25}/>
        </TouchableOpacity>
    </View>
  )
}

export default SearchBox

const styles = StyleSheet.create({
    inputBox:{
        display: 'flex',
        paddingVertical: SPACING.space_8,
        paddingHorizontal: SPACING.space_24,
        borderWidth: 1,
        borderColor: COLORS.WhiteRGBA75,
        // borderRadius: BORDER_RADIUS.radius_20,
        borderRadius: 20,
        flexDirection: 'row'
    },
    textInput:{
        width: '90%',
        fontSize: FONTSIZE.size_18,
        // fontFamily: 'Arimo-Medium',
        color: COLORS.White
    }
})