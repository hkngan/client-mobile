import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { BORDER_RADIUS, COLORS, FONTSIZE, SPACING } from "../themes/theme";
import { useNavigation } from "@react-navigation/native";

const Heading = ({ iconName, header }) => {
  const navigation = useNavigation();
  const goPreviousScreen = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={goPreviousScreen}>
        <Ionicons name="arrow-back-sharp" size={35} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerText}>{header}</Text>
      <View style={styles.emtyContainer}></View>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.space_8,
  },
  icon: {},
  headerText: {
    flex: 1,
    fontSize: FONTSIZE.size_18,
    textAlign: "center",
    color: COLORS.White,
    fontWeight: "500",
    left: SPACING.space_8
  },
  emtyContainer: {
    height: SPACING.space_20 * 2,
    width: SPACING.space_20 * 2,
  },
                                                                                                                                   button: {
    height: SPACING.space_20 * 2.5,
    width: SPACING.space_20 * 2.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SPACING.space_28,
    backgroundColor: COLORS.Red,
  },
});
