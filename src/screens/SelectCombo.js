import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTSIZE, SPACING } from '../themes/theme'
import { Heading } from '../components'
import { AntDesign } from '@expo/vector-icons'; 
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
const SelectCombo = ({route}) => {
  const navigation = useNavigation()

  const [comboData, setComboData] = useState([])
  const [counts, setCounts] = useState([])
  const [selectedCombo, setSelectedCombo] = useState([]);
  const [selectedComboCount, setSelectedComboCount] = useState(0);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://192.168.1.36:3001/api/v1/admin/combo-list')
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
    ? parseInt(route.params.totalPrice + selectedComboCount * selectedCombo.price)
    : parseInt(route.params.totalPrice)

  return (
    <SafeAreaView style={styles.container}>
            <Heading header={'Chọn combo'}/>
    <ScrollView >
      <View>
      {comboData.map((combo, index) => {
            const updatedPath = combo.img.replace(/\\/g, "/")
            return (
              <View style={styles.comboContainer} key={combo._id}>
                <Image
                  source={{uri: `http://192.168.1.36:3001/${updatedPath}`}}
                  style={styles.img}
                />
                <Text style={styles.titleText}>{combo.combo_name}</Text>
                <Text style={styles.desText}>{combo.des}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>Giá: {combo.price}</Text>
                  <View style={styles.addContainer}>
                    <TouchableOpacity onPress={() => setDecrease(index)}>
                      <AntDesign name="minus" size={18} color="black" />
                    </TouchableOpacity>
                    <Text style={{ width: 30, textAlign: 'center' }}>{counts[index]}</Text>
                    <TouchableOpacity onPress={() => setIncrease(index)}>
                    <AntDesign name="plus" size={18} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              
            )
        })}

      </View>
    </ScrollView>
    {console.log(route.params.totalPrice)}

    <View style={[styles.totalContainer, styles.shadow]}>
              <View>
                <Text style={styles.selectedSeat}>Ghế: {route.params.selectedSeat.join(', ')}</Text>
                {selectedCombo && selectedCombo.price ? (
                <View>
                  <Text style={styles.selectedSeat}>{selectedComboCount}x Combo</Text>
                  <Text style={styles.priceText}>Tổng cộng: {totalPrice}  </Text>
                </View>
                ): (
                <View>
                  <Text style={styles.priceText}>Tổng cộng: {totalPrice } </Text>
                </View>
                )}
              </View>
              <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={()=> navigation.navigate('OrderScreenStack',{
                  selectedSeat: route.params.selectedSeat,
                  totalPrice: parseInt(route.params.totalPrice + selectedComboCount * selectedCombo.price),
                  room: route.params.room,
                  time: route.params.time,
                  date: route.params.date,
                  title: route.params.title,
                 
                })}
              >
                <Text style={styles.buttonText}>Tiếp tục</Text>
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
    marginVertical: SPACING.space_10,
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
  },
  addContainer:{
    flexDirection: 'row',
    paddingHorizontal: SPACING.space_10,
    paddingVertical: 5
  },
  price:{
    alignSelf: 'center'
  },
  totalContainer:{
    backgroundColor: COLORS.White,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: screenWidth,
    height: screenWidth*0.2,
    alignSelf: 'center',
    marginVertical: SPACING.space_10,
    paddingVertical: SPACING.space_10,
    position: 'absolute',
    bottom: 0
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