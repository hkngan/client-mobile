import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Heading } from '../components'
import { COLORS, FONTSIZE, SPACING } from '../themes/theme'
import { TextInput } from 'react-native-gesture-handler'
import config from '../../config'
import { AuthContext } from '../context/authContext'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
const ChangePassword = () => {
  const IPV4 = config.extra.IPV4
  const PORT = config.extra.PORT
  const navigation = useNavigation()
  const {state} = useContext(AuthContext)
  
  const [email, setEmail] = useState('')
  const [isAlertVisible, setAlertVisible] = useState(false);

  const showAlert = () => {
    setAlertVisible(true);
  }

  const hideAlert = () => {
    setAlertVisible(false);
  }
  const handleCheck = async () => {
    try {
      const userEmail = state.user.email
      if(userEmail !== email){
        showAlert()
      }else{
        let response = await axios.post(`http://${IPV4}:${PORT}/api/v1/user/send-otp`, {
          email: email
        })
        console.log(response.data)
        navigation.navigate('EnterOTP')
      }
    } catch (error) {
      console.error('Error in handleCheck function', error)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
        <Heading header={'Update Password'}/>
        <TextInput 
          style={styles.inputContainer}
          placeholder='Enter your email'
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor={COLORS.WhiteRGBA50}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleCheck}>
            <Text style={styles.btnText}>CHECK</Text>
          </TouchableOpacity>

          <Modal
            visible={isAlertVisible}
            transparent={true}
            animationType="slide"
      >
        <View style={styles.customAlertContainer}>
          <View style={styles.alertBox}>
            <Text style={styles.titleAlert}>WARNING</Text>
            <Text style={styles.contentAlert}>
              Email is not match
            </Text>
            <View style={styles.btnContainer}>
              <TouchableOpacity 
                style={styles.confirmButton} 
                onPress={hideAlert}
               >
                <Text style={{fontSize: FONTSIZE.size_16, textAlign:'center', fontWeight: 'bold', color: COLORS.White}}>BACK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> 
    </SafeAreaView>
  )
}

export default ChangePassword
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: COLORS.Black,
      paddingTop: 40
    },
    inputContainer:{
      color: COLORS.White,
      fontSize: FONTSIZE.size_16,
      paddingHorizontal: SPACING.space_20,
      paddingVertical: SPACING.space_8,
      marginHorizontal: SPACING.space_18,
      marginVertical: SPACING.space_15,
      borderColor: COLORS.WhiteRGBA75,
      borderRadius: SPACING.space_15,
      borderBottomWidth: 1,
    },
    buttonContainer: {
      backgroundColor: COLORS.RedRGBA0,
      paddingHorizontal: SPACING.space_18,
      paddingVertical: SPACING.space_18,
      marginHorizontal: SPACING.space_24,
      marginVertical: SPACING.space_18,
      borderRadius: SPACING.space_10,
      justifyContent: "center",
      alignItems: "center",
    },
    btnText: {
      color: COLORS.White,
      fontSize: FONTSIZE.size_18,
      textTransform: "uppercase",
    },
    customAlertContainer:{
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: COLORS.Grey1,
    },
    alertBox:{ 
      backgroundColor: 'white', 
      padding: 20, 
      borderRadius: 10, 
      width: screenWidth*0.7 ,
      justifyContent: 'center', 
      alignItems: 'center'
    },
    titleAlert:{
      color: COLORS.Black,
      fontWeight: 'bold',
      fontSize: FONTSIZE.size_20,
      textAlign: 'center',
      textTransform: 'uppercase',
      marginVertical: SPACING.space_10
    },
    contentAlert:{
      color: COLORS.Black,
      fontSize: FONTSIZE.size_16,
      fontWeight: '600'
    },
    btnContainer:{
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    cancelButton:{
      borderColor: COLORS.Red,
      borderWidth: 1,
      borderRadius: SPACING.space_10,
      width: screenWidth*0.25,
      height: 30,
      paddingHorizontal: SPACING.space_18,
      marginHorizontal: SPACING.space_10,
      marginVertical: SPACING.space_15,
      alignItem: 'center',
      justifyContent: 'center'
    },
    confirmButton:{
      backgroundColor: COLORS.Red,
      width: screenWidth*0.25,
      borderRadius: SPACING.space_10,
      paddingHorizontal: SPACING.space_18,
      marginHorizontal: SPACING.space_10,
      marginVertical: SPACING.space_15,
      alignItem: 'center',
      height: 30,
      justifyContent: 'center'
    }
})