import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  StatusBar,
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./components/HomeScreen";
import SettingScreen from "./components/SettingScreen";
import HistoryEventMapScreen from "./components/HistoryEventMapScreen";
import PlayingHistoryScreen from "./components/PlayingHistoryScreen";
import SoloScreen from "./components/SoloScreen";
import PictureScreen from "./components/PictureScreen";

const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Settings: { screen: SettingScreen },
  Map: { screen: HistoryEventMapScreen },
  PlayingHistory: { screen: PlayingHistoryScreen },
  Solo: { screen: SoloScreen },
  Picture: { screen: PictureScreen },
});

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return <AppContainer />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
