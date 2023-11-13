import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { COLORS, FONTSIZE, SPACING } from "../themes/theme";
import { Heading } from "../components";
import { BookingContext } from "../context/bookingContext";
import { image } from "../constant";
import config from "../../config";

const OrderScreen = ({ route }) => {
  const IPV4 = config.extra.IPV4
  const PORT = config.extra.PORT

  const [selectedPayment, setSelectedPayment] = useState(null);

  const { movie, selectedTheater, selectedShowtime, amount, selectedCombos } =
    useContext(BookingContext);
  const { img, title } = movie;
  const { theater_name } = selectedTheater;
  const { room, time, date } = selectedShowtime;
  const { seat, sotien } = amount;
  const { img_combo, combo_name, quantity, gia_combo } =
    selectedCombos;
    console.log(selectedCombos);

  const updatedPath = img_combo ? img_combo.replace(/\\/g, "/") : null;

  const totalCombo = parseInt(quantity * gia_combo);
  const totalPrice =
    totalCombo && sotien ? parseInt(sotien + totalCombo) : parseInt(sotien);

  return (
    <SafeAreaView style={styles.container}>
      <Heading header={"Xác nhận"} />
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
            <Text style={styles.redText}>Ghế: {seat ? seat.join(", ") : ""} ({room})</Text>
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
                <Text style={styles.dateText}>Số lượng: {quantity}</Text>
                <Text style={styles.redText}>{totalCombo}</Text>
              </View>
            </View>
            <View style={styles.line} />
          </View>
        ): null}
        <View style={styles.paymentContainer}>
            <Text style={styles.titleText}>Phương thức thanh toán</Text>
            <TouchableOpacity   
                onPress={() => setSelectedPayment(selectedPayment === 'momo' ? null : 'momo')}
                style={[styles.paymentButton, selectedPayment === 'momo' && styles.selectedPaymentButton]}>
              <Image source={image.momo} style={styles.logo} resizeMode='stretch' />
              <Text style={styles.paymentText}>Momo</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity   
                onPress={() => setSelectedPayment(selectedPayment === 'zalo' ? null : 'zalo')}
                style={[styles.paymentButton, selectedPayment === 'zalo' && styles.selectedPaymentButton]}>
              <Image source={image.zalo} style={styles.logo} resizeMode='stretch' />
              <Text style={styles.paymentText}>Zalo</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity
              onPress={() => setSelectedPayment(selectedPayment === 'paypal' ? null : 'paypal')}
              style={[styles.paymentButton, selectedPayment === 'paypal' && styles.selectedPaymentButton]}>
              <Image source={image.paypal} style={styles.logo} resizeMode='stretch' />
              <Text style={styles.paymentText}>Paypal</Text>
            </TouchableOpacity>
            <View style={styles.line} />
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
          <Text style={styles.totalText}>Tổng tiền: {totalPrice} </Text>
        </View>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Thanh toán</Text>
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
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_10,

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