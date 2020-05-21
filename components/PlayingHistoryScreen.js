import React, { useState } from "react";
import { StyleSheet, View, Text, StatusBar, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function PlayingHistoryScreen(props) {
  const navigationOptions = { title: "PlayingHistoryScreen" };
  const { params } = props.navigation.state;
  const { navigate } = props.navigation;

  const [history, setHistory] = useState([
    {
      eventId: 1,
      startingTime: "12:45",
      endingTime: "13:30",
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
    {
      eventId: 2,
      startingTime: "14:50",
      endingTime: "16:40",
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

  const ListSeperator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
          opacity: 0.4,
        }}
      />
    );
  };

  const FlatListHeader = () => {
    return (
      <View>
        <View style={{ flexDirection: "row", margin: 10 }}>
          <Text style={{ flex: 1, fontSize: 20 }}>Item</Text>
          <Text style={{ flex: 1, marginLeft: 40, fontSize: 20 }}>Points</Text>
          <Text style={{ flex: 1 }}></Text>
          <Text style={{ flex: 1 }}></Text>
        </View>
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#000",
            opacity: 0.4,
          }}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <StatusBar hidden={true} />
      <Text>Playing history of {params.user} </Text>
      <FlatList
        data={history}
        ListHeaderComponent={FlatListHeader}
        ItemSeparatorComponent={ListSeperator}
        renderItem={({ item, index }) => {
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 1 }}>{item.startingTime} data</Text>
            <Text>{item.endingTime} end data</Text>
            <Text>Total Points: {getTotal(item.items)}</Text>
            <Button
              onPress={() => navigate("Map", { data: item })}
              title="Map"
            />
          </View>;
        }}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
    </View>
  );
}
