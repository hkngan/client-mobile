import { SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity, useColorScheme } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Heading } from '../components'
import { COLORS, FONTSIZE, SPACING } from '../themes/theme'
import { useNavigation } from '@react-navigation/native'
import { BookingContext } from '../context/bookingContext'

const SelectSeatScreen = ({route}) => {
  const navigation = useNavigation()

  const [selectedSeat, setSelectedSeat] = useState([]);
  const [total, setTotalPrice] = useState(0);

  const { movie, selectedShowtime, setAmount } = useContext(BookingContext);
  const {title} = movie
  const {cost, time} = selectedShowtime
  const generateSeats = (route) => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seats = [];
  
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowSeats = [];
  
      for (let j = 1; j <= 10; j++) {
        const seatNumber = `${row}${j}`;
        let price = i >= rows.length - 2 ? cost + 30000 : cost;
        rowSeats.push(
          <TouchableOpacity 
            style={[
              styles.seat,
              i >= rows.length - 2 ? styles.lastTwoRows : null,
              selectedSeat && selectedSeat.includes(seatNumber) ? {backgroundColor: COLORS.Yellow2} : {}
            ]}  
            key={seatNumber}
            onPress={() => handleSelectSeat(seatNumber)}
          >
            <Text style={styles.seatText}>{seatNumber}</Text>
          </TouchableOpacity>
        );
      }
  
      seats.push(
        <View style={styles.row} key={row}>
          <Text style={styles.rowText}>{row}</Text>
          {rowSeats}
        </View>
      );
    }
  
    return seats;
  };
  
  const handleSelectSeat = (seatNumber) => {
    if (selectedSeat.includes(seatNumber)) {
      setSelectedSeat(selectedSeat.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeat([...selectedSeat, seatNumber]);
    }
  }
  
  useEffect(() => {
    let total = 0;

    selectedSeat.forEach((seatNumber) => {
      let price;
      if (seatNumber.startsWith("G") || seatNumber.startsWith("H")) {
        price = parseInt(cost) + 30000;
      } else {
        price = parseInt(cost);
      }
      total += price ;
    });
  
    setTotalPrice(total);
  }, [selectedSeat]);
  
  return (
    <ScrollView style={styles.container}>
        <SafeAreaView>
            <Heading header={`${title} | (${time})`}/>
            <View style={styles.seatContainer}>
                <View style={styles.screenContainer}>
                    <Text style={styles.screenText}>Màn hình</Text>
                    <View style={styles.screen}/>
                </View>
                {generateSeats(route)}
                <View style={styles.infoSeatContainer}>
                  <View style={styles.infoSeatBox}>
                      <View style={styles.defaultSeat}/>
                      <Text style={styles.infoText}>Ghế tiêu chuẩn</Text>
                  </View>
                  <View style={styles.infoSeatBox}>
                      <View style={styles.selectingSeat}/>
                      <Text style={styles.infoText}>Ghế đang chọn</Text>
                  </View>
                  <View style={styles.infoSeatBox}>
                      <View style={styles.bookedSeat}/>
                      <Text style={styles.infoText}>Ghế đã đặt</Text>
                  </View> 
                  <View style={styles.infoSeatBox}>
                      <View style={styles.vipSeat}/>
                      <Text style={styles.infoText}>Ghế VIP</Text>
                  </View>
                </View>
                
            </View>
            {selectedSeat.length > 0 ? (
              <View style={styles.priceContainer}>
              <View>
                <Text style={styles.selectedSeat}>Ghế: {selectedSeat.join(', ')}</Text>
                <Text style={styles.priceText}>Tạm tính: {total}</Text>
              </View>
              <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={()=> {
                  setAmount({
                    seat: selectedSeat,
                    sotien: total
                  }) 
                  navigation.navigate('SelectComboStack')
                }}
              >
                <Text style={styles.buttonText}>Tiếp tục</Text>
              </TouchableOpacity>
            </View>
            ) : null}
        </SafeAreaView>
    </ScrollView>
    
  )
}

export default SelectSeatScreen
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container:{
        backgroundColor: COLORS.Black,
        flex: 1
    },
    screenContainer:{
        marginVertical: SPACING.space_16
    },
    screenText:{
        color: COLORS.White,
        alignSelf: 'center'

    },
    seatContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    screen:{
        backgroundColor: COLORS.White,
        width: screenWidth * 0.7,
        height: 2,
        bottom: 0,
        alignSelf: 'center',
        elevation: 5, 
        shadowColor: COLORS.White,
        shadowOffset: {
          width: 10,
          height: 10
        },
        shadowOpacity: 0.90,
        shadowRadius: 100,
        marginVertical: SPACING.space_10

    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        marginVertical: SPACING.space_10
      },
      rowText: {
        fontSize: 20,
      },
      seat: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.Grey,
        marginRight: 5,
      },
      seatText: {
        fontSize: 16,
        color: COLORS.White
      },
      lastTwoRows:{
        backgroundColor: COLORS.Red, 
      },
      infoSeatContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        marginVertical: SPACING.space_10,
        marginHorizontal: SPACING.space_10,
        width: screenWidth * 0.8,
      },
      infoSeatBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: SPACING.space_10,
        width: screenWidth * 0.3, 
      },
      defaultSeat: {
        width: 30, 
        height: 30, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.Grey,
      },
      vipSeat: {
        width: 30, 
        height: 30, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.Red,
      },
      bookedSeat: {
        width: 30, 
        height: 30, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.WhiteRGBA32,
      },
      selectingSeat: {
        width: 30, 
        height: 30, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.Yellow2,
      },
      
      infoText:{
        color: COLORS.White,
        marginLeft: 5
      },
      priceContainer:{
        backgroundColor: COLORS.White,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: screenWidth*0.9,
        alignSelf: 'center',
        borderRadius: SPACING.space_15,
        paddingHorizontal: SPACING.space_10,
        paddingVertical: SPACING.space_12,
        marginVertical: SPACING.space_40
      },
      buttonContainer: {
        backgroundColor: COLORS.Red,
        width: screenWidth * 0.25,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        height: 35,
        borderRadius: SPACING.space_12
      },
      buttonText: {
        color: COLORS.White,
        fontSize: FONTSIZE.size_16
      },
      selectedSeat:{
        color: COLORS.Black,
        fontSize: FONTSIZE.size_18,
        fontWeight: 'bold'
      },
      priceText:{
        color: COLORS.Red,
        fontSize: FONTSIZE.size_18,
      }
})