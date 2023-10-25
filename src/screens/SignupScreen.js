import { SafeAreaView, ScrollView, StyleSheet, Text, View, ImageBackground, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { image } from '../constant'
import { SPACING, FONTSIZE, COLORS } from '../themes/theme'
import { Heading } from '../components'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
const SignupScreen = () => {
  const navigation = useNavigation()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone_number, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async () => {
    try {
      if(!name || !email || !phone_number|| !password){
        Alert.alert('Please enter all fields')
        return;
      }
      const {data} = await axios.post('http://192.168.1.6:3001/api/v1/user/user-signup', {
        
        name,
        phone_number,
        email,
        password
      })
      alert(data && data.message)
      navigation.navigate('LoginStack')
      console.log("Register Data", {name,phone_number, email, password})
    } catch (error) {
      alert(error.response.data.message)
      console.log(error)
    }
  }
  return (
    <ScrollView
      style={styles.container}
      pagingEnabled
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView>
        <KeyboardAvoidingView
          enabled
          behavior={Platform.OS === 'ios' ? 'padding' : null }>
          <ImageBackground source={image.photo3} style={styles.imgBackground}>
            <LinearGradient
              colors={[COLORS.BlackRGB10, COLORS.Black]}
              style={styles.linearGradient}
            >
              <View style={styles.headerContainer}>
                <Heading
                  iconName="arrow-left"
                  action={() => navigation.goback()}
                />
              </View>
            </LinearGradient>
          </ImageBackground>
          <View style={styles.contentContainter}>
            <TextInput
              placeholder="Full name"
              placeholderTextColor={COLORS.WhiteRGBA75}
              style={styles.inputContainter}
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor={COLORS.WhiteRGBA75}
              style={styles.inputContainter}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              placeholder="Phone-number"
              placeholderTextColor={COLORS.WhiteRGBA75}
              style={styles.inputContainter}
              value={phone_number}
              onChangeText={(text) => setPhoneNumber(text)}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor={COLORS.WhiteRGBA75}
              style={styles.inputContainter}
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
              <Text style={styles.btnText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
}

export default SignupScreen

const styles = StyleSheet.create({
  container:{
    backgroundColor: COLORS.Black,
    flex: 1
  },
  keyBoardContainer:{
    flex: 1
  },
  imgBackground:{
    width: '100%',
    aspectRatio: 5000 / 2500,
},
linearGradient: {
    height: "100%",
  },
  headerContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  }, 
  timeContainer:{
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: SPACING.space_28,
    paddingVertical: SPACING.space_8,
    marginHorizontal: SPACING.space_8,
    // marginVertical: SPACING.space_10,
  },
  txt: {
    color: COLORS.WhiteRGBA75,
    fontSize: FONTSIZE.size_16,
    
  },
  inputContainter: {
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
})