import React from "react";
import { View, Text, StatusBar, Button, StyleSheet } from "react-native";

export default function HomeScreen(props) {
  const navigationOptions = { title: "Home" };
  const { navigate } = props.navigation;

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.buttonRow}>
        <Button
          style={styles.button}
          onPress={() => navigate("Settings")}
          title="Settings"
        />
        <Button
          style={styles.button}
          onPress={() => navigate("LogIn")}
          title="Log in"
        />

        <Button
          onPress={() => navigate("PlayingHistory")}
          title="Playing History"
        />
      </View>
      <View style={styles.buttonRow}>
        <Button onPress={() => navigate("Solo")} title="Solo game"></Button>

        <Button
          onPress={() => navigate("Picture")}
          title="Take a picture"
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  buttonRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {},
});
