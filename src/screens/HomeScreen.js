import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  StatusBar,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import PropTypes from "deprecated-react-native-prop-types";
import React, { useEffect, useState } from "react";
import { COLORS, FONTSIZE, SPACING } from "../themes/theme";
import { SearchBox, Title, MovieCard, MainCard } from "../components";
import { useNavigation } from "@react-navigation/native";
import { image } from "../constant";
import axios from "axios";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [nowPlayingMovieList, setNowPlayingMovieList] = useState([]);
  const [upComingMovieList, setUpComingMovieList] = useState([]);

  useEffect(() => {
    const getNowPlayingMovieList = async () => {
      try {
        let response = await axios.get(
          "http://192.168.1.36:3001/api/v1/admin/nowplaying-movie-list"
        );
        setNowPlayingMovieList(response.data.movieList);
      } catch (error) {
        console.log("Loi trong ham getNowPlayingMovieList", error);
      }
    };
    const getUpComingMovieList = async () => {
      try {
        let response = await axios.get(
          "http://192.168.1.36:3001/api/v1/admin/upcoming-movie-list"
        );
        setUpComingMovieList(response.data.movieList);
      } catch (error) {
        console.log("Loi trong ham getNowPlayingMovieList", error);
      }
    };
    getNowPlayingMovieList();
    getUpComingMovieList()
  }, []);
  // console.log(nowPlayingMovieList);
  if (nowPlayingMovieList.length === 0) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollviewContainer}
      >
        <StatusBar hidden />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={"large"} color={COLORS.Red} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      contentContainerStyle={styles.scrollviewContainer}
    >
      <SafeAreaView>
        <StatusBar hidden />
        <View style={styles.inputContainer}>
          <Image style={styles.logo} source={image.logo} />
          <Text style={{
            color: COLORS.White,
            fontSize: FONTSIZE.size_24,
            shadowColor:COLORS.White,
            shadowOffset: {
              height:1,
              width: 1
            },
            shadowOpacity: 0.8,
            shadowRadius: 0.8,
            marginLeft: SPACING.space_36*2,
          }}>CINEMAGIC</Text>
        </View>
        <Title title="Đang chiếu" />
        <FlatList
          data={nowPlayingMovieList}
          keyExtractor={(item) => item._id.toString()}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          snapToInterval={WIDTH * 0.8 + SPACING.space_12}
          decelerationRate={0}
          contentContainerStyle={styles.containerGap}
          renderItem={({ item, index }) => {
          const originalPath = item.img
          const updatedPath = originalPath.replace(/\\/g, "/");

            if (!item?.movie_name) {
              return (
                <View
                  style={{
                    width: (WIDTH - (WIDTH * 0.5 + SPACING.space_36)) / 2,
                  }}
                ></View>
              );
            }

            return (
              <MainCard
                shouldMarginateAtEnd={true}
                navigate={() => {
                  navigation.push("MovieDetailStack", { id: item._id });
                }}
                cardWidth={WIDTH * 0.8}
                isFirst={index == 0 ? true : false}
                isLast={index == nowPlayingMovieList?.length - 1 ? true : false}
                title={item.movie_name}
                time={item.time}
                date={item.start_date}
                imagePath={`http://192.168.1.36:3001/${updatedPath}`}
                genre={item.genres}
              />
            );
          }}
        />

        <Title title="Sắp chiếu" />
        <FlatList
          data={upComingMovieList}
          keyExtractor={(item) => item._id.toString()}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          snapToInterval={WIDTH * 0.8 + SPACING.space_12}
          decelerationRate={0}
          contentContainerStyle={styles.containerGap}
          renderItem={({ item, index }) => {
          const originalPath = item.img
          const updatedPath = originalPath.replace(/\\/g, "/");

            if (!item?.movie_name) {
              return (
                <View
                  style={{
                    width: (WIDTH - (WIDTH * 0.5 + SPACING.space_36)) / 2,
                  }}
                ></View>
              );
            }

            return (
              <MovieCard
                shouldMarginateAtEnd={true}
                navigate={() => {
                  navigation.push("MovieDetailStack", { id: item._id });
                }}
                cardWidth={WIDTH * 0.5}
                isFirst={index == 0 ? true : false}
                isLast={index == nowPlayingMovieList?.length - 1 ? true : false}
                title={item.movie_name}
                time={item.time}
                date={item.start_date}
                imagePath={`http://192.168.1.36:3001/${updatedPath}`}
                genre={item.genres}
              />
            );
          }}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black,
    display: "flex",
  },
  scrollviewContainer: {
    // flex: 1,
  },
  loadingContainer: {
    top: 40,
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  logo: {
    height: 50,
    width: 50,
    alignSelf: 'flex-start'
  },
  inputContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_50,
    alignItems: "center",
    flexDirection: 'row'
  },
  containerGap: {
    gap: SPACING.space_36,
  },
});
