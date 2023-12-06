import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { COLORS, FONTSIZE, SPACING } from '../themes/theme'
import { AuthContext } from '../context/authContext'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { FontAwesome, MaterialIcons  } from '@expo/vector-icons'
import axios from 'axios'
import config from '../../config'
const ProfileScreen = () => {
  const IPV4 = config.extra.IPV4
  const PORT = config.extra.PORT
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const {logout, state} = useContext(AuthContext)
  const [userData, setUserData]=useState([])
  useEffect(() => {
    if(isFocused){
      const getUserData = async () => {
        try {
          const id = state.user._id
          const response = await axios.get(`http://${IPV4}:${PORT}/api/v1/user/user-info/${id}`)
          setUserData(response.data.info)
        } catch (error) {
          console.error('Error in getUserData function', error)
        }
      }
      getUserData()
    }
  }, [isFocused]);
  
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
      <Text style={styles.headerText}>ACCOUNT</Text>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <FontAwesome name="user" size={40} color={COLORS.White} />
        </View>
        <View>
          <Text style={styles.text}>{userData.name}</Text>
          <TouchableOpacity style={styles.editContainer} onPress={()=>navigation.navigate('EditProfileScreen')}>
            <Text style={styles.text1}>Information</Text>
            <MaterialIcons name="edit" color={COLORS.Yellow2} size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default ProfileScreen
const WIDTH = Dimensions.get('window').width
const styles = StyleSheet.create({
  container:{
    backgroundColor: COLORS.Black,
    flex: 1,
    paddingTop: 40,
  },
  headerText:{
    color: COLORS.White,
    fontSize: FONTSIZE.size_20,
    textTransform: 'uppercase',
    alignSelf: 'center',
    marginVertical: SPACING.space_10
  },
  profileContainer:{
    top: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  text:{
    color: COLORS.White,
    fontSize: FONTSIZE.size_20,
    fontWeight: 'bold'
  },
  avatarContainer:{
    width: WIDTH*0.15,
    height: WIDTH*0.15,
    backgroundColor: COLORS.Grey,
    borderRadius: SPACING.space_36*2,
    marginVertical: SPACING.space_15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SPACING.space_15,
  },
  avatar:{
    width: WIDTH*0.4,
    height: WIDTH*0.4
  },
  logoutButton:{
    backgroundColor: COLORS.RedRGBA0,
    width: WIDTH*0.7,
    height: WIDTH*0.1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_40,
    borderRadius: SPACING.space_15,
    
  },
  buttonText:{
    color: COLORS.White,
    textTransform: 'uppercase',
    fontSize: FONTSIZE.size_18
  },
  editContainer:{
    flexDirection: 'row',
    // position: 'absolute',
    // bottom: -20,
    // marginVertical: SPACING.space_32,
    // marginHorizontal: SPACING.space_28*3
  },
  text1:{
    fontSize: FONTSIZE.size_14, 
    color: COLORS.Yellow2,
    marginRight: SPACING.space_10-5
  }
})