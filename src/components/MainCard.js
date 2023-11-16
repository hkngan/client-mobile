import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { BORDER_RADIUS, COLORS, SPACING, FONTSIZE } from "../themes/theme";
import Dash from 'react-native-dash';
import { useNavigation } from "@react-navigation/native";
import {FontAwesome} from '@expo/vector-icons'
import { BookingContext } from "../context/bookingContext";
const MainCard = ({
  title,
  imagePath,
  shouldMarginateAtEnd,
  isLast,
  isFirst,
  cardWidth,
  shouldMarginateAround,
  navigate,
  time,
  date,
  genre,
  id
}) => {
  const navigation = useNavigation()
  const { setMovie } = useContext(BookingContext);

  return (
    <View
      style={[
        styles.container,
        shouldMarginateAtEnd
          ? isFirst
            ? { marginLeft: SPACING.space_40 }
            : isLast
            ? { marginRight: SPACING.space_40 }
            : {}
          : {},
        shouldMarginateAround ? { margin: SPACING.space_12 } : {},
        { maxWidth: cardWidth },
      ]}
    >
      <TouchableOpacity onPress={navigate}>
        <View>
          <Image
            style={[styles.img, { width: cardWidth, height: 300 }]}
            source={{ uri: imagePath }}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.textContainer}>
          <View style={{ marginTop: 10 }}>
            <Text numberOfLines={1} style={styles.txt}>
              {title}
            </Text>
            <View style={styles.infoContainer}>
              <FontAwesome name="clock-o" style={styles.starIcon} />
              <Text style={styles.infoText}>{time} phút</Text>
              <Text style={styles.infoText}>{date}</Text>
            </View>
            <View style={styles.gerneContainer}>
              <View style={styles.gerneContainer}>
                {genre.map((item, index) => (
                  <View key={index} style={styles.gerneBox}>
                    <Text style={styles.detailText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <Dash style={styles.linear} dashColor={COLORS.White} />
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
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              setMovie({
                title: title,
                img: imagePath,
                id: id
              });
              navigation.navigate("SelectTheaterStack");
            }}
          >
            <Text style={styles.txtButton}>book now</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MainCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 2,
    backgroundColor: COLORS.PinkRGBA75,
    borderRadius: SPACING.space_18,
    height: 500,
  },
  img: {
    aspectRatio: 3/3,
    borderRadius: BORDER_RADIUS.radius_10,
    alignSelf: "center",
    top: 10,
  },
  textContainer:{
    marginVertical: SPACING.space_2,
    marginHorizontal: SPACING.space_10

  },
  infoContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.space_10,
  },
  infoText: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  txt: {
    width: 300,
    color: COLORS.White,
    fontSize: FONTSIZE.size_20,
    textAlign: "center",
    fontWeight: "bold",
    top: 5
  },

  detailText: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_14,
  },
  gerneContainer: {
    // flex: 1,
    flexDirection: "row",
    gap: SPACING.size_20,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  gerneBox: {
    borderColor: COLORS.WhiteRGBA15,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.radius_8,
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_10,
    margin: SPACING.space_4,
  },
  linear: {
    marginVertical: SPACING.space_16,
    width: '100%',
   
  },
  blackCircle: {
    height: 60,
    width: 60,
    borderRadius: 80,
    backgroundColor: COLORS.Black,
  },
  buttonContainer:{
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.White,
    height: 50,
    paddingHorizontal: SPACING.space_28,
    borderRadius: SPACING.space_16
  },
  txtButton:{
    color: COLORS.Black,
    fontSize: FONTSIZE.size_18,
    textTransform: 'uppercase'
  },
  starIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
  },
});
