import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  HomeScreen,
  Chat,
  TicketScreen,
  ProfileScreen,
} from "../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Feather, Entypo } from "@expo/vector-icons";
import { COLORS, SPACING } from "../themes/theme";
const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.Black,
          borderTopWidth: 0,
          height: SPACING.space_10 * 9,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <View
                style={[
                  styles.activeTab,
                  focused ? { backgroundColor: COLORS.RedRGBA0 } : {},
                ]}
              >
                <Feather name="home" color={COLORS.White} size={25} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={Chat}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={[
                  styles.activeTab,
                  focused ? { backgroundColor: COLORS.RedRGBA0 } : {},
                ]}
              >
                <Entypo name="message" color={COLORS.White} size={25} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="TicketTab"
        component={TicketScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={[
                  styles.activeTab,
                  focused ? { backgroundColor: COLORS.RedRGBA0 } : {},
                ]}
              >
                <FontAwesome name="ticket" color={COLORS.White} size={25} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View style={[
                styles.activeTab,
                focused ? {backgroundColor: COLORS.RedRGBA0} : {}
              ]}>
                <Feather name="user" color={COLORS.White} size={25} />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  activeTab: {
    backgroundColor: COLORS.Black,
    padding: SPACING.space_18,
    borderRadius: SPACING.space_18 * 12,
  },
});
