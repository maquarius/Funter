import React from "react";
import { StyleSheet, View, Text, StatusBar, Button } from "react-native";
export default function PlayingHistoryScreen(props) {
  const navigationOptions = { title: "PlayingHistoryScreen" };

  const { navigate } = props.navigation;
  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={true} />

      <Button onPress={() => navigate("Map")} title="Map" />
    </View>
  );
}
