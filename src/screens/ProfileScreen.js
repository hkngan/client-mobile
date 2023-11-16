import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, {useContext} from 'react'
import { COLORS, FONTSIZE, SPACING } from '../themes/theme'
import { image } from '../constant'
import { AuthContext } from '../context/authContext'
import { useNavigation } from '@react-navigation/native'
const ProfileScreen = () => {
  const navigation = useNavigation()
  const {logout} = useContext(AuthContext)
  const handleLogout = () => {
    try {
      logout()
      navigation.navigate('LoginStack')
    } catch (error) {
      console.log('Error in handleLogout', error)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.avatarContainer}>
        <Image source={image.avatar} style={styles.avatar}/>
      </TouchableOpacity>
      <Text style={styles.text}>Kim Ngan</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ProfileScreen
const WIDTH = Dimensions.get('window').width
const styles = StyleSheet.create({
  container:{
    backgroundColor: COLORS.Black,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    color: COLORS.White,
    fontSize: FONTSIZE.size_20,
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  avatarContainer:{
    marginVertical: SPACING.space_10
  },
  avatar:{
    width: WIDTH*0.4,
    height: WIDTH*0.4
  },
  logoutButton:{
    backgroundColor: COLORS.RedRGBA0,
    width: WIDTH*0.7,
    height: WIDTH*0.1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
    borderRadius: SPACING.space_15
  },
  buttonText:{
    color: COLORS.White,
    textTransform: 'uppercase',
    fontSize: FONTSIZE.size_18
  }
})