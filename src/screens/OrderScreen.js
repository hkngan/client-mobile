import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { COLORS, FONTSIZE, SPACING } from "../themes/theme";
import { Heading } from "../components";
import { BookingContext } from "../context/bookingContext";
import { image } from "../constant";
import config from "../../config";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useStripe } from "@stripe/stripe-react-native";
import { useNavigation } from "@react-navigation/native";
const OrderScreen = ({ route }) => {
  const IPV4 = config.extra.IPV4
  const PORT = config.extra.PORT
  const stripe = useStripe()
  const navigation = useNavigation()
  const [selectedPayment, setSelectedPayment] = useState(null);
  const { movie, selectedTheater, selectedShowtime, amount, selectedCombos } =
    useContext(BookingContext);
  const {state} = useContext(AuthContext)
  const {user} = state
  // console.log('payment screen',user._id)
  const { img, title, id } = movie;
  const { theater_name } = selectedTheater;
  const { room, time, date } = selectedShowtime;
  const { seat, sotien } = amount;
  const { img_combo, combo_name, quantity, gia_combo } = selectedCombos;

  const updatedPath = img_combo ? img_combo.replace(/\\/g, "/") : null;

  const totalCombo = parseInt(quantity * gia_combo);
  const totalPrice =
    totalCombo && sotien ? parseInt(sotien + totalCombo) : parseInt(sotien);
    const url = img 
    // console.log(url)
    const parts = url.split("/")
    // console.log(parts)
    const imagePath = parts.slice(3).join("/")
    // console.log(id)
const handlePayment = async () => {
  try {
    const orderData = {
      itemInfo: { 
        name: movie.title,
        price: amount.sotien,
        img: imagePath,
        seat: amount.seat,
        movie: movie.id
      },
      combo: selectedCombos.quantity > 0 ? {
        name: selectedCombos.combo_name,
        price: selectedCombos.gia_combo,
        quantity: selectedCombos.quantity,
        img: selectedCombos.img_combo
      } : null,
      theater: selectedTheater.theater_name,
      room: selectedShowtime.room,
      date_start: selectedShowtime.date,
      time: selectedShowtime.time,
      totalAmount: totalPrice,
      user: user._id,
    };

    const response = await axios.post(`http://${IPV4}:${PORT}/api/v1/user/order`, orderData);

    if (response.data) {
      const { clientSecret } = response.data;

      const initSheet = await stripe.initPaymentSheet({
        merchantDisplayName: "Cinemagic Theater",
        paymentIntentClientSecret: clientSecret,
      });
      if (initSheet.error) {
        Alert.alert(initSheet.error.message);
        return;
      }

      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,

      });
      if (presentSheet.error) {
        Alert.alert(presentSheet.error.message);
        return;
      }
      navigation.navigate('TabStack', {screen: 'TicketTab'})
    } else {
      Alert.alert("No data received from payment initiation");
    }

  } catch (err) {
    console.error('Error in handlePayment function', err);
    Alert.alert("Something went wrong, try again later!");
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <Heading header={"Payment"} />
      <ScrollView>
        <View style={styles.infoMovieContainer}>
          <Image source={{ uri: img }} style={styles.poster} />
          <View style={styles.infoMovie}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.dateText}>{date}</Text>
            <Text style={styles.dateText}>{time}</Text>
            <Text style={styles.redText}>
              {theater_name}
            </Text>
            <Text style={styles.redText}>Seat: {seat ? seat.join(", ") : ""} ({room})</Text>
            <Text style={styles.redText}>{sotien} đ</Text>
          </View>
        </View>
        <View style={styles.line} />
        { quantity > 0 ? (         
           <View>
            <View style={styles.infoMovieContainer}>
              <Image
                source={{ uri: `http://${IPV4}:${PORT}/${updatedPath}` }}
                style={styles.poster_combo}
              />
              <View style={styles.infoMovie}>
                <Text style={styles.titleText}>{combo_name}</Text>
                <Text style={styles.dateText}>Amount: {quantity}</Text>
                <Text style={styles.redText}>{totalCombo}</Text>
              </View>
            </View>
            <View style={styles.line} />
          </View>
        ): null}
        <View style={styles.paymentContainer}>
            <Text style={styles.titleText}>Payment method:</Text>
            <TouchableOpacity
              onPress={() => setSelectedPayment(selectedPayment === 'visa' ? null : 'visa')}
              style={[styles.paymentButton, selectedPayment === 'visa' && styles.selectedPaymentButton]}>
              <Image source={image.visa} style={styles.logo} resizeMode='stretch' />
              <Text style={styles.paymentText}>Visa</Text>
            </TouchableOpacity>
            <View style={styles.line} />
        </View>
      </ScrollView>
      <View style={[styles.totalContainer, styles.shadow]}>
        <View>
          <Text style={styles.totalText}>Total: {totalPrice} </Text>
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={handlePayment}>
          <Text style={styles.buttonText}>Pay</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};
export default OrderScreen;
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black,
    flex: 1,
  },
  infoMovieContainer: {
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_15,
    flexDirection: "row",
  },
  poster: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.4,
    aspectRatio: 400 / 500,
    alignSelf: "flex-start",
  },
  poster_combo: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.4,
    aspectRatio: 500 / 300,
    alignSelf: "flex-start",
  },
  infoMovie: {
    marginHorizontal: SPACING.space_15,
  },
  titleText: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  dateText: {
    color: COLORS.White,
    fontWeight: "normal",
    fontStyle: "italic",
    marginBottom: 5,
  },
  redText: {
    color: COLORS.Red,
    marginBottom: 5,
  },
  line: {
    backgroundColor: COLORS.Grey,
    width: screenWidth,
    height: 1,
  },
  totalContainer: {
    backgroundColor: COLORS.White,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: screenWidth,
    height: screenWidth * 0.2,
    marginVertical: SPACING.space_10,
    paddingVertical: SPACING.space_10,
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: SPACING.space_20,
    borderTopLeftRadius: SPACING.space_20,
  },
  buttonContainer: {
    backgroundColor: COLORS.Red,
    width: screenWidth * 0.5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: 35,
    borderRadius: SPACING.space_12,
   
  },
  buttonText: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_16,
  },

  totalText: {
    color: COLORS.Black,
    fontSize: FONTSIZE.size_18,
    fontWeight: '500',
    alignSelf: "center",
    height: 35,
    marginVertical: SPACING.space_15,
  },
  shadow: {
    shadowColor: COLORS.Black,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.99,
    shadowRadius: 1.22,
    elevation: 2,
  },
  paymentContainer:{
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_15,

  },
  paymentButton:{
    flexDirection: 'row',
    marginVertical: SPACING.space_10,
    marginHorizontal: SPACING.space_10,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_10,
  },
  logo:{
    width: 35,
    height: 35,
    aspectRatio: 500 / 500,
    backgroundColor: COLORS.White,
    borderRadius: 5
  },
  paymentText:{
    color: COLORS.White,
    fontSize: FONTSIZE.size_16,
    marginLeft: SPACING.space_15,
    alignSelf: 'center'
  },
  selectedPaymentButton:{
    backgroundColor: COLORS.WhiteRGBA32,
    borderRadius: SPACING.space_10
  }
});