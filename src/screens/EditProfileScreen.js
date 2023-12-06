import { Alert, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
            Alert.alert('Update successfully!')
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
              }}>
                <Text style={{
                    color: COLORS.Red,
                    textTransform: 'uppercase',
                    fontSize: FONTSIZE.size_20,
                    fontWeight: 'bold'
                }}
                onPress={handleUpdate}
                >UPDATE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('ChangePassword')}>
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
    </SafeAreaView>
  )
}

export default EditProfileScreen
const WIDTH = Dimensions.get('window').width
const styles = StyleSheet.create({
    container:{
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
    }
})