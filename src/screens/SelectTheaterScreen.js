import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import { COLORS, FONTSIZE, SPACING } from '../themes/theme';
import { Heading } from '../components';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const SelectTheaterScreen = ({route}) => {
  const navigation = useNavigation()
  const [cityData, setCityData] = useState([]);
  const [theaterData, setTheaterData] = useState([]);
  const [selectedCityValue, setSelectedCityValue] = useState(null);
  const [selectedTheaterValue, setSelectedTheaterValue] = useState(null);

  useEffect(() => {
    const getCity = async () => {
      try {
        let response = await axios.get('http://192.168.1.36:3001/api/v1/admin/city-list');
        setCityData(response.data.cityList);
      } catch (error) {
        console.log("Error in getCity func", error);
      }
    };
  
    const getTheater = async (cityId) => {
      try {
        if (cityId) {
          let response = await axios.get(`http://192.168.1.36:3001/api/v1/admin/sort-theater/${cityId}`);
          setTheaterData(response.data.theaterList);  
        } else {
          console.log('cityId is null or empty');
        }
      } catch (error) {
        console.log('Error in getTheater func', error);
      }
    }
  
    getCity();
  
    if (selectedCityValue) {
      getTheater(selectedCityValue);
    }
  }, [selectedCityValue]);
  
  const handleCityPress = (cityId) => {
    setSelectedCityValue(cityId);
  };
  const handleTheaterPress = (theater_name) => {
    setSelectedTheaterValue(theater_name)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Heading header={'Chọn rạp'} />
      <View style={styles.wrapper}>
          <View style={styles.cityContainer}>
            {cityData.map((city) => {
              return (
                <TouchableOpacity
                  onPress={() => handleCityPress(city._id)}
                  style={[
                    styles.buttonContainer,
                    selectedCityValue === city._id && styles.selected,
                  ]}
                  key={city._id}
                >
                  <Text style={styles.buttonText}>{city.city_name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.theaterContainer}>
            {theaterData.map((theater) => {
              return (
                <TouchableOpacity
                  onPress={() => handleTheaterPress(theater.theater_name)}
                  style={[
                    styles.buttonContainer,
                    selectedTheaterValue === theater.theater_name && {backgroundColor: COLORS.Yellow2},
                  ]}
                  key={theater._id}
                >
                  <Text style={styles.buttonText}>{theater.theater_name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      {selectedTheaterValue !== null && selectedTheaterValue.length > 0 ? (
          
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => navigation.navigate('BookingSeatStack', {
              title: route.params.title,
              theater_name: selectedTheaterValue,
              img: route.params.img

            })}
          > 
            <Text style={[styles.buttonText, {textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold', color: COLORS.White}]}>Tiếp tục</Text>
          </TouchableOpacity>
        ) : null}
    </SafeAreaView>
  );
}

export default SelectTheaterScreen

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container:{
    backgroundColor: COLORS.Black,
    flex: 1
  },
  wrapper:{
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.White
  },
  buttonContainer:{
    height: 50,
    paddingLeft: 5,
    justifyContent: 'center',
  },
  buttonText:{
    color: COLORS.Black,
    fontSize: FONTSIZE.size_18,
  },
  cityContainer:{
    width:  screenWidth*0.4
  },
  theaterContainer: {
    width:  screenWidth*0.6,
  },
  selected: {
    fontWeight: 'bold',
    backgroundColor: COLORS.Yellow,
  },
  continueButton:{
    backgroundColor: COLORS.Red,
    alignSelf: 'center', 
    position: 'absolute',
    paddingVertical: 10,   
    paddingHorizontal: 20, 
    marginTop: 20,
    bottom: 80,
    width: screenWidth * 0.5,
    borderRadius: SPACING.space_16    
  }
})