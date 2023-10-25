import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../themes/theme";
import { SearchBox } from "../components";
import { baseImagePath, searchMovie } from "../api/apicalls";
import { SPACING } from "../themes/theme";
import {MovieCard} from "../components";
import { useNavigation } from "@react-navigation/native";
const SearchScreen = () => {
  const navigation = useNavigation()
  const [searchList, setSearchList] = useState('');
  const searchMoviesFunc = async (name) => {
    try {
      let res = await fetch(searchMovie(name))
      let json = await res.json()
    } catch (error) {
      console.log('Bi loi trong ham tim kim', error)
    }
  }
  console.log(searchList)
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View>
        <FlatList
          data={searchList}
          keyExtractor={(item) => item.id}
          bounces={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.inputContainer}>
              <SearchBox searchFunc={searchMoviesFunc} />
            </View>
          }
          contentContainerStyle={styles.centerContainer}
          renderItem={({ item, index }) => {
            return(

              <MovieCard
                shouldMarginateAtEnd={false}
                shouldMarginateAround={true}
                navigate={() => {
                  navigation.push("MovieDetailStack", { movieid: item.id });
                }}
                cardWidth={WIDTH / 2 - SPACING.space_12*2}
                title={item.original_title}
                imagePath={baseImagePath("w342", item.poster_path)}
              />
            )
          }}
        />
      </View>
    </View>
  );
};
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.Black,
  },
  inputContainer: {
    display: 'flex',
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_50,
    marginBottom: SPACING.space_28 - SPACING.space_12,
  },
  centerContainer:{
    // alignItems: 'center'
  }
});
export default SearchScreen;
