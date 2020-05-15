import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";

export default function App() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const buttonPressed = () => {
    Alert.alert("Button Pressed");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{ width: 200, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setText(text)}
        value={text}
      />
      <TextInput
        style={{ width: 200, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setText(text)}
        value={text}
      />
      <Button onPress={buttonPressed} title="Log in" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
