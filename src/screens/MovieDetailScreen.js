import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTSIZE, SPACING } from "../themes/theme";
import { Heading } from "../components";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { WebView } from 'react-native-webview';
import axios from "axios";

const MovieDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const getNMovieDetails = async () => {
      try {
        // console.log(route.params.id);
        let res = await axios.get(
          `http://192.168.1.36:3001/api/v1/movie/detail-nmovie/${route.params.id}`
        );
        setMovieData(res.data.detailMovie);
      } catch (error) {
        console.log("Loi o ham lay du lieu phim", error);
      }
    };
    const getUMovieDetails = async () => {
      try {
        // console.log(route.params.id);
        let res = await axios.get(
          `http://192.168.1.36:3001/api/v1/movie/detail-umovie/${route.params.id}`
        );
        setMovieData(res.data.detailMovie);
      } catch (error) {
        console.log("Loi o ham lay du lieu phim", error);
      }
    };
    getNMovieDetails();
    getUMovieDetails()
  }, []);
  const getVideoID = (url) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return (match && match[1]) || null;
  };
  if (movieData.length === 0 ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <View style={styles.headerContainer}>
            <Heading iconName="arrow-left" header={""} />
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={"large"} color={COLORS.RedRGBA0} />
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }

  
  const originalPath = movieData.img;
  const updatedPath = originalPath.replace(/\\/g, "/");
  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView>
           <Heading header={'Chi tiết'}/>

           <WebView
          style={styles.imgBackground}
          source={{ uri: `https://www.youtube.com/embed/${getVideoID(movieData?.trailer)}` }}
          allowsFullscreenVideo={true}
        />
        <View style={styles.imgBackground}>
          <Image
            source={{ uri: `http://192.168.1.36:3001/${updatedPath}` }}
            style={styles.imgMovie}
          />
        </View>
        {/* {console.log(movieData.trailer)} */}
        <View style={styles.titleComponent}>
          <Text style={styles.titleText}>{movieData?.movie_name}</Text>
          <View style={styles.box}>
            <View style={styles.timeContainer}>
              <FontAwesome
                name="clock-o"
                color={COLORS.White}
                size={25}
                style={styles.icon}
              />
              <Text style={[styles.txt, { color: COLORS.White }]}>
                {Math.floor(movieData?.time / 60)}h
                {Math.floor(movieData?.time % 60)}m
              </Text>
            </View>
            <View style={styles.timeContainer}>
              <FontAwesome
                name="calendar"
                color={COLORS.White}
                size={25}
                style={styles.icon}
              />
              <Text style={[styles.txt, { color: COLORS.White }]}>
                {movieData?.start_date}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.infoContainer}>
      
                <Text style={styles.gerneText}>
                  Thể loại: {movieData?.genres}
                </Text>
          <View style={styles.rateContainer}></View>
          <Text style={styles.descrText}>Mô tả: {movieData?.des}</Text>
        </View>
        <Text style={[
            styles.txt, 
            {
              color: COLORS.Red, 
              paddingHorizontal: SPACING.space_4,
              marginVertical: SPACING.space_4,
              }]}>
              RATE: {movieData?.rate}
              </Text>

        <View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() =>
              navigation.push("SelectTheaterStack", {
                title: movieData.movie_name,
                img: `http://192.168.1.36:3001/${updatedPath}` 
              })
            }
          > 
            <Text style={styles.buttonText}>Book now</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    marginTop: SPACING.space_20,
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: SPACING.space_8
  },
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    flex: 1,
  },
  headerContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  imgBackground: {
    width: "100%",
    aspectRatio: 3072 / 1500,
    position: 'relative'
  },
  linearGradient: {
    height: "100%",
  },
  imgMovie: {
    width: "50%",
    aspectRatio: 400 / 500,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    borderRadius: SPACING.space_20,
  },
  icon: {
    marginRight: SPACING.space_8,
  },
  box:{
    flexDirection: 'row',
    paddingHorizontal: SPACING.space_15,
    // paddingVertical: SPACING.space_15
  },
  timeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.space_20
  },
  txt: {
    fontSize: FONTSIZE.size_16,
    fontStyle: "italic",
  },
  titleText: {
    fontSize: FONTSIZE.size_30,
    color: COLORS.White,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_8,
    textAlign: "center",
    fontWeight: "bold",
  },
  titleComponent: {
    flex: 1,
  },
  gerneContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: SPACING.space_10,
  },
  gerneBox: {
    borderWidth: 1,
    paddingHorizontal: SPACING.space_10,
    // paddingVertical: SPACING.space_4,
  },
  gerneText: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_16
  },

  infoContainer: {
    flex: 1,
    marginHorizontal: SPACING.space_8,
    marginVertical: SPACING.space_4,

  },
  rateContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: SPACING.space_4,
  },
  descrText: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_16,

  },
  castContainer: {
    display: "flex",
  },

  gap: {
    gap: SPACING.space_24,
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
});
