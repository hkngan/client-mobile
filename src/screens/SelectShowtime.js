import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, SPACING, FONTSIZE } from "../themes/theme";
import { Heading } from "../components";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from "axios";
import { BookingContext } from "../context/bookingContext";

const generateDate = () => {
  const date = new Date();
  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekdays = [];
  for (let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekdays.push(tempDate);
  }
  return weekdays;
};

const SelectShowtime = ({ route }) => {
  const navigation = useNavigation();

  const [showtimes, setShowtimes] = useState([]);
  const [dateArray, setDateArray] = useState(generateDate());
  const [selectedDate, setSelectedDate] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null)
  const [isAlertVisible, setAlertVisible] = useState(false);


  const { movie, selectedTheater, setSelectedShowtime } = useContext(BookingContext);
  const {title, rate} = movie;
  const {theater_name} = selectedTheater;

useEffect(() => {
  const getShowtimes = async () => {
    try {
        const formattedDate = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.toString().padStart(2, '0')}`;
        const encodedMovieName = encodeURIComponent(title);
        const encodedTheaterName = encodeURIComponent(theater_name);
        let res = await axios.get(
          `http://10.13.129.12:3001/api/v1/movie/showtime/film?theater_name=${encodedTheaterName}&movie_name=${encodedMovieName}&day=${formattedDate}`
        );
        setShowtimes(res.data.showtimeList);
      
    } catch (error) {
      console.log("Error in getShowtimes func", error);
    }
  };
  getShowtimes();
}, [selectedDate]);
  const showAlert = () => {
    setAlertVisible(true);
  }

  const hideAlert = () => {
    setAlertVisible(false);
  }
  const handleCityPress = (date) => {
    setSelectedDate(date);
  };
  const handleShowtimePress = (room, time, cost) => {
    setSelectedRoom(room);
    setSelectedTime(time);
    setSelectedPrice(cost)
    showAlert(); 
  };
  const handleSubmit = () => {
    try {
      setSelectedShowtime({
        cost: selectedPrice,
        room: selectedRoom,
        time: selectedTime,
        date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.toString().padStart(2, '0')}`
      })
      navigation.navigate('SelectSeatStack')
      hideAlert()
    } catch (error) {
      console.log('Error in handleSubmit', error)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
       <Heading header={theater_name} />
        <View>
        <FlatList
          data={dateArray}
          keyExtractor={item => item.date}
          horizontal
          bounces={false}
          contentContainerStyle={styles.containerGap24}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => handleCityPress(item.date)}>
                <View
                  style={[
                    styles.dateContainer,
                    index == 0
                      ? {marginLeft: SPACING.space_24}
                      : index == dateArray.length - 1
                      ? {marginRight: SPACING.space_24}
                      : {},
                      selectedDate === item.date &&
                       {backgroundColor: COLORS.Red}
                      
                  ]}>
                  <Text style={styles.dateText}>{item.date}</Text>
                  <Text style={styles.dayText}>{item.day}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        {showtimes.length > 0 ? (
          <View>
            <View style={styles.titleContainer}>
              <MaterialCommunityIcons name="movie-star" size={40} color={COLORS.Red} style={styles.icon}/>
              <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={styles.contentContainer}>
              {showtimes.map((showtime) =>{
                return (
                  <TouchableOpacity 
                    style={styles.showtimeContainer} 
                    key={showtime._id}
                    onPress={() => handleShowtimePress(showtime.room_name, showtime.time, showtime.cost)}
                  >
                   <Text style={styles.roomText}>{showtime.room_name}</Text>
                   <Text style={styles.timeText}>{showtime.time}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
          
        ) : (
          <Text style={styles.noShowtimesText}>Chưa có lịch chiếu</Text>
        )}
        </View> 


      <Modal
        visible={isAlertVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.customAlertContainer}>
          <View style={styles.alertBox}>
            <Text style={styles.titleAlert}>thông báo</Text>
            <Text style={styles.contentAlert}>
              Rạp chiếu phim hiện tại bạn đang chọn là {theater_name}, suất: {selectedTime}, phòng chiếu:  {selectedRoom}
            </Text>
            <Text style={styles.redText}>{rate}</Text>
            <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={hideAlert}>
                <Text style={{textAlign:'center', fontWeight: 'bold', color: COLORS.Red}}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.confirmButton} 
                onPress={handleSubmit}>
                <Text style={{textAlign:'center', fontWeight: 'bold', color: COLORS.White}}>Xác Nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> 
      </SafeAreaView>
    </ScrollView>
  );
};

export default SelectShowtime;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black,
    flex: 1,
  },
  containerGap24: {
    gap: SPACING.space_32,
  },
  dateContainer: {
    width: SPACING.space_10 * 5,
    height: SPACING.space_10 * 6,
    borderRadius: SPACING.space_10 * 10,
    backgroundColor: COLORS.DarkGrey,
    borderRadius: SPACING.space_24,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_12
  },
  dateText: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
  },
  dayText: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  theaterText: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
    textAlign: "center",
  },
  borderContainer: {
    marginVertical: SPACING.space_24,
  },
  timeContainer: {
    paddingVertical: SPACING.space_16,
    borderWidth: 1,
    paddingHorizontal: SPACING.space_20,
    borderRadius: SPACING.space_24,
    backgroundColor: COLORS.DarkGrey,
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.Black,
    fontWeight: 'bold'
  },
  titleContainer:{
    marginVertical: SPACING.space_10,
    backgroundColor: '#EEEDED',
    flexDirection: 'row',
    alignContent: 'center'
  },
  icon:{
    marginHorizontal: SPACING.space_10,
    marginVertical: SPACING.space_10,
  },
  titleText:{
    color: COLORS.Black,
    marginHorizontal: SPACING.space_10,
    marginVertical: SPACING.space_10,
    fontSize: FONTSIZE.size_18,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: SPACING.space_24,
    backgroundColor: COLORS.RedRGBA0,
    borderRadius: SPACING.space_24 * 2,
    width: "40%",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
  },
  noShowtimesText:{
    color: COLORS.Red,
    fontSize: FONTSIZE.size_18,
    textTransform: "uppercase",
    marginHorizontal: SPACING.space_18,
    marginVertical: SPACING.space_10,
    alignSelf: 'center'
  },
  buttonPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_24,
    paddingBottom: SPACING.space_24,
  },
  priceContainer: {
    alignItems: 'center',
  },
  totalPriceText: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.Grey,
  },
  price: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  contentContainer:{
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginVertical: SPACING.space_12

  },
  showtimeContainer:{
    backgroundColor: COLORS.White,
    height: screenWidth * 0.25,
    width: screenWidth * 0.25,
    marginHorizontal: SPACING.space_15,
    borderRadius: SPACING.space_15,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_10
  },
  roomText:{
    color: COLORS.Black,
    textTransform: 'uppercase',
    fontSize: FONTSIZE.size_18,
    fontWeight: 'bold'
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
    width: 300 
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
});
