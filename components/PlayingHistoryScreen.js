import React from "react";
import { StyleSheet, View, Text, StatusBar, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
export default function PlayingHistoryScreen(props) {
  const navigationOptions = { title: "PlayingHistoryScreen" };
  const { navigate } = props.navigation;
  const [history, setHistory] = useState([
    {
      eventId: 0,
      startingTime: "",
      endingTime: "",
      startingLocation: { latitude: 60.386804, longitude: 25.297504 },
      endingLocation: "",
      user: "",
      items: [
        {
          name: "squirel",
          itemId: 0,
          points: 10,
          collected: true,
          location: { latitude: 60.39007, longitude: 25.29778 },
          uri: "",
        },
        {
          name: "tree",
          points: 1,
          itemId: 1,
          collected: false,
          location: { latitude: 0, longitude: 0 },
          uri: "",
        },
        {
          name: "bear",
          points: 1000,
          itemId: 2,
          collected: true,
          location: { latitude: 60.388162, longitude: 25.305667 },
          uri: "",
        },
      ],
    },
  ]);

  const getTotal = (items) => {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i].collected) {
        total += items[i].points;
      }
    }
    return total;
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={true} />

      <FlatList
        data={history}
        renderItem={({ item }) => {
          <View>
            <Text>{item.startingTime}</Text>
            <Text>{item.endingTime}</Text>
            <Text>Total Points: {getTotal(item.items)}</Text>
            <Button
              onPress={() => navigate("Map", { data: item })}
              title="Map"
            />
          </View>;
        }}
      />
    </View>
  );
}
