import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import { Heading } from '../components'
import { COLORS, FONTSIZE, SPACING } from '../themes/theme'
import config from '../../config'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../context/authContext'
import axios from 'axios'

const EnterOTP = () => {
    const IPV4 = config.extra.IPV4
    const PORT = config.extra.PORT
    const navigation = useNavigation()
    const {state} = useContext(AuthContext)

    const [opt, setOtp] = useState('')
    const [isAlertVisible, setAlertVisible] = useState(false);

    const showAlert = () => {
      setAlertVisible(true);
    }
  
    const hideAlert = () => {
      setAlertVisible(false);
    }

    const handleCheck = async () => {
        try {
            const userEmail = state.user.email;
            let response = await axios.post(`http://${IPV4}:${PORT}/api/v1/user/verify`, {
                email: userEmail,
                enteredVerificationCode: opt
            });
    
            if (response.status === 200) {
                navigation.navigate('UpdatePasswordScreen');
            } else {
                showAlert();
            }
        } catch (error) {
            if (error.response) {
                console.log('Server response:', error.response.data);
                console.log('Status code:', error.response.status);
                console.log('Headers:', error.response.headers);
            } else if (error.request) {
                console.log('No response received for the request');
            } else {
                console.log('Error during request:', error.message);
            }
                showAlert();
        }
    };
    
  return (
    <SafeAreaView style={styles.container}>
        <Heading header={'ENTER OTP CODE'}/>
        <TextInput 
          style={styles.inputContainer}
          placeholder='Enter your OTP code'
          value={opt}
          onChangeText={(text) => setOtp(text)}
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
              OTP is not match
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

export default EnterOTP
const WIDTH = Dimensions.get('window').width
const styles = StyleSheet.create({
    container:{
      paddingTop: 40,
      flex: 1,
      backgroundColor: COLORS.Black
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
      width: WIDTH*0.7 ,
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
      width: WIDTH*0.25,
      height: 30,
      paddingHorizontal: SPACING.space_18,
      marginHorizontal: SPACING.space_10,
      marginVertical: SPACING.space_15,
      alignItem: 'center',
      justifyContent: 'center'
    },
    confirmButton:{
      backgroundColor: COLORS.Red,
      width: WIDTH*0.25,
      borderRadius: SPACING.space_10,
      paddingHorizontal: SPACING.space_18,
      marginHorizontal: SPACING.space_10,
      marginVertical: SPACING.space_15,
      alignItem: 'center',
      height: 30,
      justifyContent: 'center'
    }
})