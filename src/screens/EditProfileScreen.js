import { Modal, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Heading } from '../components'
import { COLORS, FONTSIZE, SPACING } from '../themes/theme'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import config from '../../config'
import { AuthContext } from '../context/authContext'

const EditProfileScreen = () => {
    const IPV4 = config.extra.IPV4
    const PORT = config.extra.PORT
    const isFocused = useIsFocused()
    const navigation = useNavigation()
    const {state} = useContext(AuthContext)

    const [userData, setUserData]=useState([])
    const [name, setName] = useState(userData?.name)

    const [isAlertVisible, setAlertVisible] = useState(false);

    const showAlert = () => {
      setAlertVisible(true);
    }
  
    const hideAlert = () => {
      setAlertVisible(false);
    }
    useEffect(() => {
        if(isFocused){
          const getUserData = async () => {
            try {
              const id = state.user._id
              const response = await axios.get(`http://${IPV4}:${PORT}/api/v1/user/user-info/${id}`)
              setUserData(response.data.info)
              setName(response.data.info.name) 
            } catch (error) {
              console.error('Error in getUserData function', error)
            }
          }
          getUserData()
        }
      }, [isFocused]);
      
    const handleUpdate = async () => {
        try {
            const id = state.user._id
            const response = await axios.put(`http://${IPV4}:${PORT}/api/v1/user/update-profile/${id}`,{
                name: name
            })
            showAlert()
            console.log(response)
        } catch (error) {
            console.error('Error in handleUpdate func', error)
        }
    }
  return (
    <SafeAreaView style={styles.container}>
      <Heading header={'Edit Profile'}/>
      <View>
        <View>
            <TextInput
                value={userData.phone_number}
                style={styles.textInputFalse}
                editable={false}
                selectTextOnFocus={false}
            />
            <TextInput
                value={userData.email}
                style={styles.textInputFalse}
                editable={false}
                selectTextOnFocus={false}
            />
            <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={styles.textInput}
            />
            </View>
            
      </View>
      <TouchableOpacity style={{
                backgroundColor: COLORS.White,
                width: WIDTH*0.8,
                height: 50,
                marginVertical: SPACING.space_24*2,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                bottom: 0,
                borderRadius: SPACING.space_10
              }}
              onPress={handleUpdate}>
                <Text style={{
                    color: COLORS.Red,
                    textTransform: 'uppercase',
                    fontSize: FONTSIZE.size_20,
                    fontWeight: 'bold'
                }}
                
                >UPDATE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('ChangePassword')}>
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
            <Modal
            visible={isAlertVisible}
            transparent={true}
            animationType="slide"
      >
        <View style={styles.customAlertContainer}>
          <View style={styles.alertBox}>
            <Text style={styles.titleAlert}>UPDATED</Text>
            <Text style={styles.contentAlert}>
              Updated successfully.
            </Text>
            <View style={styles.btnContainer}>
              <TouchableOpacity 
                style={styles.confirmButton} 
                onPress={hideAlert}
               >
                <Text style={{fontSize: FONTSIZE.size_16, textAlign:'center', fontWeight: 'bold', color: COLORS.White}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> 
    </SafeAreaView>
  )
}

export default EditProfileScreen
const WIDTH = Dimensions.get('window').width
const styles = StyleSheet.create({
    container:{
      paddingTop: 40,
      backgroundColor: COLORS.Black,
      flex: 1,
      alignItems: 'center'
    },
    textInputFalse:{
        width: WIDTH*0.8,
        height: 50,
        backgroundColor: COLORS.Grey,
        borderRadius: SPACING.space_10,
        color: COLORS.WhiteRGBA50,
        fontSize: FONTSIZE.size_16,
        fontWeight: '400',
        paddingHorizontal: SPACING.space_15,
        borderWidth: 0.5,
        borderColor: COLORS.White,
        marginVertical: SPACING.space_10
    },
    textInput:{
        width: WIDTH*0.8,
        height: 50,
        backgroundColor: COLORS.White,
        borderRadius: SPACING.space_10,
        color: COLORS.Black,
        fontSize: FONTSIZE.size_16,
        fontWeight: '700',
        paddingHorizontal: SPACING.space_15,
        borderWidth: 0.5,
        borderColor: COLORS.White,
        marginVertical: SPACING.space_10
    },
    buttonContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,

    },
    buttonText:{
        color: COLORS.Red,
        fontSize: FONTSIZE.size_16
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
    },
})