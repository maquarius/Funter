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

export default function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  const addItem = () => {
    setData([...data, { key: text }]);
    setText("");
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <TextInput
        style={{ width: 200, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setText(text)}
        value={text}
      />

      <Button onPress={addItem} title="Add Item" />
      <FlatList
        data={data}
        renderItem={({ item }) => <Text>{item.key}</Text>}
      />
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
