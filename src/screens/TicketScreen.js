import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { COLORS, FONTSIZE, SPACING } from '../themes/theme'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'
import config from '../../config'
import { AuthContext } from '../context/authContext'
const TicketScreen = () => {
  const IPV4 = config.extra.IPV4
  const PORT = config.extra.PORT
  const navigation = useNavigation()
  const {state} = useContext(AuthContext)
  const {user} = state
  const id= user._id
  // console.log("id",id)
  const [ticketData, setTicketData] = useState([])
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
    const getData = async () => {
      try {
        const response = await axios.get(`http://${IPV4}:${PORT}/api/v1/user/ticket-list/${id}`)
        const data = response.data.tickets
        console.log(data)
        setTicketData(data)
        
      } catch (error) {
        console.error("Error in getData in TicketScreen", error)
      }
    }
    getData()
   }
  },[isFocused])
  // console.log(ticketData)
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Vé vào rạp</Text>
      <ScrollView >
        {ticketData.length > 0 ? (ticketData.map((ticket) =>{
          const imagePath = ticket.itemInfo.img
          return (
            <View key={ticket._id} style={styles.ticketContainer}>
              <Image source={{uri: `http://${IPV4}:${PORT}/${imagePath}`}} style={styles.img} resizeMode='stretch' />
              <View style={styles.content}>
                <Text style={styles.textTitle}>{ticket.itemInfo.name}</Text>
                <Text style={styles.text}>{ticket.theater}</Text>
                <Text style={styles.text}>{ticket.date_start}/{ticket.time}</Text>
                <Text style={styles.text}>Ghế: {ticket.itemInfo.seat.join(", ")} ({ticket.room}) </Text>
              </View>
              <View
            style={[
              styles.blackCircle,
              { position: "absolute", top: 80, left: -30 },
            ]}
          ></View>
          <View
            style={[
              styles.blackCircle,
              { position: "absolute", top: 80, right: -30 },
            ]}
          ></View>
            </View>
          )
        })) : (
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center'
          }}>
            <Ionicons name="cart" size={24} color={COLORS.White} />
            <Text style={styles.emtyText}>Your ticket list is empty</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default TicketScreen
const WIDTH = Dimensions.get('window').width
const styles = StyleSheet.create({
  container:{
    backgroundColor: COLORS.Black,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingTop: 40,
  },
  headerText:{
    color: COLORS.White,
    fontSize: FONTSIZE.size_20,
    textTransform: 'uppercase',
    alignSelf: 'center',
    marginVertical: SPACING.space_10
  },
  emtyText:{
    color: COLORS.White,
    fontSize: FONTSIZE.size_16,
    textTransform: 'capitalize',
    alignSelf: 'center',
    marginVertical: SPACING.space_36 * 2,
    textAlign:'center'
  },
  ticketContainer:{
    width: WIDTH*0.85,
    height: WIDTH*0.45,
    flexDirection: 'row',
    backgroundColor: COLORS.White,
    marginHorizontal: SPACING.space_15,
    marginVertical: SPACING.space_20,
    paddingVertical: SPACING.space_15,
    paddingHorizontal: SPACING.space_15,
    borderRadius: SPACING.space_15
  },
  img:{
    height: WIDTH*0.39,
    width: WIDTH*0.3,
  },
  content:{
    marginHorizontal: SPACING.space_15,
  },
  textTitle:{
    width: WIDTH*0.4,
    fontWeight: 'bold',
    marginVertical: 3
  },
  text:{
    width: WIDTH*0.4,
    marginVertical: 3

  },
  blackCircle: {
    height: 40,
    width: 40,
    borderRadius: 80,
    backgroundColor: COLORS.Black,
  },
})