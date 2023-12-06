import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { COLORS, FONTSIZE, SPACING } from '../themes/theme'
import { Heading } from '../components'
import { AntDesign } from '@expo/vector-icons'; 
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import { BookingContext } from '../context/bookingContext';
import config from '../../config';

const SelectCombo = ({route}) => {
  const IPV4 = config.extra.IPV4
  const PORT = config.extra.PORT
  const navigation = useNavigation()

  const {amount, setSelectedCombos} = useContext(BookingContext)
  const {sotien, seat} = amount

  const [comboData, setComboData] = useState([])
  const [counts, setCounts] = useState([])
  const [selectedCombo, setSelectedCombo] = useState([]);
  const [selectedComboCount, setSelectedComboCount] = useState(0);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://${IPV4}:${PORT}/api/v1/admin/combo-list`)
        setComboData(response.data.comboList)
        setCounts(response.data.comboList.map(() => 0));
        
      } catch (error) {
        console.log('Error in getData func', error)
      }
    }

    getData()
  }, [])
  const setIncrease = (index) => {
    setCounts(prevCounts => prevCounts.map((count, i) => i === index ? count + 1 : count));
    setSelectedCombo(comboData[index]);
    setSelectedComboCount(prevCount => prevCount + 1);
  }

  const setDecrease = (index) => {
    if (counts[index] > 0) {
      setCounts(prevCounts => prevCounts.map((count, i) => i === index ? count - 1 : count));
      setSelectedComboCount(prevCount => prevCount - 1);
    }
  }

  const totalPrice = selectedCombo && selectedCombo.price
    ? parseInt(sotien + selectedComboCount * selectedCombo.price)
    : parseInt(sotien)

  return (
    <SafeAreaView style={styles.container}>
            <Heading header={'Choose Combo'}/>
    <ScrollView >
      <View>
      {comboData.map((combo, index) => {
            const updatedPath = combo.img.replace(/\\/g, "/")
            return (
              <View style={styles.comboContainer} key={combo._id}>
                <Image
                  source={{uri: `http://${IPV4}:${PORT}/${updatedPath}`}}
                  style={styles.img}
                />
                <Text style={styles.titleText}>{combo.combo_name}</Text>
                <Text style={styles.desText}>{combo.des}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>Giá: {combo.price}</Text>
                  <View style={styles.addContainer}>
                    <TouchableOpacity style={{width: 30, height: 30, alignItems:'center'}} onPress={() => setDecrease(index)}>
                      <AntDesign name="minus" size={18} color="black" />
                    </TouchableOpacity>
                    <Text style={{ width: 30, textAlign: 'center' }}>{counts[index]}</Text>
                    <TouchableOpacity  style={{width: 30, height: 30, alignItems:'center'}} onPress={() => setIncrease(index)}>
                    <AntDesign name="plus" size={18} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              
            )
        })}
      </View>
    </ScrollView>
    <View style={[styles.totalContainer, styles.shadow]}>
              <View>
                <Text style={styles.selectedSeat}>Seat: {seat ? seat.join(', ') : ''}</Text>
                {selectedCombo && selectedComboCount > 0 ? (
                <View>
                  <Text style={styles.selectedSeat}>{selectedComboCount}x Combo</Text>
                  <Text style={styles.priceText}>Total: {totalPrice}  </Text>
                  
                </View>
                ): (
                <View>
                  <Text style={styles.priceText}>Total: {totalPrice } </Text>
                </View>
                )}
              </View>
              <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={()=> {
                 setSelectedCombos({
                  thanhtien: totalPrice,
                  combo_name: selectedCombo.combo_name,
                  quantity: selectedComboCount,
                  gia_combo: selectedCombo.price,
                  img_combo: selectedCombo.img
                 })
                 navigation.navigate('OrderScreenStack')
                }}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </View>
      </SafeAreaView>
  )
}
export default SelectCombo
const screenWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
  container:{
    backgroundColor: COLORS.Black,
    flex: 1
  },
  comboContainer:{
    width: screenWidth*0.8,
    height: screenWidth*0.8,
    backgroundColor: COLORS.White,
    alignSelf: 'center',
    marginHorizontal: SPACING.space_10,
    marginVertical: 5,
    borderRadius: SPACING.space_10,
    paddingVertical: SPACING.space_10
  },
  img:{
    width: screenWidth * 0.7,
    height: screenWidth*0.5,
    alignSelf: 'center',
    borderRadius: SPACING.space_10
  },
  titleText: {
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: FONTSIZE.size_16,
    marginHorizontal: SPACING.space_20,
    marginVertical: SPACING.space_10,
  },
  desText:{
    color: COLORS.Black,
    fontSize: FONTSIZE.size_14,
    marginHorizontal: SPACING.space_20,
  },
  priceContainer:{
    flexDirection: 'row',
    marginHorizontal: SPACING.space_20,
    marginVertical: SPACING.space_10-5,
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  addContainer:{
    flexDirection: 'row',
    marginHorizontal: SPACING.space_10,
    marginVertical: 5,
    
    alignSelf: 'center',

  },
  price:{
    alignSelf: 'center',
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',

  },
  totalContainer:{
    backgroundColor: COLORS.White,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: screenWidth,
    height: screenWidth*0.2,
    alignSelf: 'center',
    position: 'absolute',
    paddingTop: 5,
    bottom: 0,
    borderTopLeftRadius: SPACING.space_15,
    borderTopRightRadius: SPACING.space_15
  },
  buttonContainer: {
    backgroundColor: COLORS.Red,
    width: screenWidth * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 50,
    borderRadius: SPACING.space_12
  },
  buttonText: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_18
  },
  selectedSeat:{
    color: COLORS.Black,
    fontSize: FONTSIZE.size_16,
    fontWeight: 'bold'
  },
  priceText:{
    color: COLORS.Red,
    fontSize: FONTSIZE.size_18,
  },
  shadow:{
    shadowColor: COLORS.Black,
    shadowOffset:{
      width: 1,
      height:1
    },
    shadowOpacity: 0.99,
    shadowRadius: 1.22,
    elevation: 2
  }
})