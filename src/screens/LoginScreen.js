import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Modal
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useContext } from "react";
import { COLORS, FONTSIZE, SPACING } from "../themes/theme";
import { image } from "../constant";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from "../context/authContext";
import config from "../../config";

const LoginScreen = () => {
  const navigation = useNavigation();
  const navigateToGetPassword = () => {
    navigation.navigate("GetPWStack");
  };
  const navigateToSignup = () => {
    navigation.navigate("SignupStack");
  };
  const IPV4 = config.extra.IPV4
  const PORT = config.extra.PORT
  const authContext = useContext(AuthContext)
  const state = authContext.state
  const setState = authContext.setState
  const {token} = state
  // console.log("token: ", token)
  const [phone_number, setPhoneNumber]= useState('')
  const [password, setPassword] = useState('')
  const [isAlertVisible, setAlertVisible] = useState(false);

  const showAlert = () => {
    setAlertVisible(true);
  }

  const hideAlert = () => {
    setAlertVisible(false);
  }
  const handleLogin = async () => {
    try {
        const apiUrl = `http://${IPV4}:${PORT}/api/v1/user/user-login`
        if (phone_number === ''|| password === '')  {
          showAlert()
          return;
        }
        const { data } = await axios.post(apiUrl, {
          phone_number,
          password
        });
        authContext.setState(data);
        await AsyncStorage.setItem('@auth', JSON.stringify(data));
        navigation.navigate('TabStack');
    } catch (error) {
      console.error(error);
    }
  };
  const getData = async () => {
    let data = await AsyncStorage.getItem('@auth')
   }
  getData()
  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView>
        <ImageBackground source={image.background} style={styles.imgBackground}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradient}
          ></LinearGradient>
        </ImageBackground>
        <View style={styles.contentContainer}>
          <TextInput
            placeholder={"Phone-number or email"}
            placeholderTextColor={COLORS.WhiteRGBA75}
            style={styles.Inputcontainer}
            value={phone_number}
            keyboardType="numeric"
            onChangeText={(text) => setPhoneNumber(text)}
          ></TextInput>
          <TextInput
            placeholder={"Password"}
            placeholderTextColor={COLORS.WhiteRGBA75}
            style={styles.Inputcontainer}
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
          <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
          <Text onPress={navigateToGetPassword} style={styles.pwText}>
            Forgot password?
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.ruleContainer}>
            <View style={styles.rule} />
            <Text style={styles.txt}>or</Text>
            <View style={styles.rule} />
          </View>
          <TouchableOpacity style={styles.btnSignup} onPress={navigateToSignup}>
            <Text style={styles.txtSignup}>create membership account</Text>
          </TouchableOpacity>
        </View>
        <Modal
            visible={isAlertVisible}
            transparent={true}
            animationType="slide" >
            <View style={styles.customAlertContainer}>
              <View style={styles.alertBox}>                
                  <Text style={styles.contentAlert}>
                      Please enter all fields!
                  </Text>

                    <TouchableOpacity style={styles.cancelButton} onPress={hideAlert}>
                        <Text style={{textAlign:'center', fontWeight: 'bold', color: COLORS.Red}}>OK</Text>
                    </TouchableOpacity>
                </View>
              </View>
          </Modal> 
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginScreen;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black,
  },
  imgBackground: {
    width: "100%",
    aspectRatio: 3500 / 2500,
  },
  linearGradient: {
    height: "100%",
  },
  contentContainer: {
    justifyContent: "center",
  },
  Inputcontainer: {
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
  pwText: {
    color: COLORS.WhiteRGBA75,
    fontSize: FONTSIZE.size_16,
    textAlign: "right",
    marginHorizontal: SPACING.space_20,
    marginVertical: SPACING.space_2,
  },
  bottomContainer: {
    justifyContent: "center",
  },
  txt: {
    color: COLORS.White,
    textTransform: "uppercase",
    fontWeight: "bold",
    marginVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_8,
  },
  ruleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rule: {
    backgroundColor: COLORS.White,
    flex: 1,
    height: 1,
    margin: SPACING.space_28,
  },
  btnSignup: {
    borderWidth: 1,
    borderColor: COLORS.WhiteRGBA75,
    paddingHorizontal: SPACING.space_18,
    paddingVertical: SPACING.space_18,
    marginHorizontal: SPACING.space_24,
    marginVertical: SPACING.space_18,
    borderRadius: SPACING.space_10,
    justifyContent: "center",
    alignItems: "center",
  },
  txtSignup: {
    color: COLORS.WhiteRGBA75,
    fontSize: FONTSIZE.size_16,
    textTransform: "capitalize",
  },
  customAlertContainer:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: COLORS.Grey
  },
  alertBox:{ 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 10, 
    width: 300,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  titleAlert:{
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: FONTSIZE.size_20,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginVertical: SPACING.space_10
  },
  redText:{
    color: COLORS.Red,
    textTransform: 'capitalize'
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
});
