import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
  TextComponent,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("funtsdb.db");

export default function SoloScreen(props) {
  const { navigate } = props.navigation;
  const [eventData, setEventData] = useState({
    startingTime: "",
    endingTime: "",
    startingLocation: 0,
    endingLocation: "",
    user: "",
    items: [
      {
        name: "squirel",
        itemId: 0,
        points: 10,
        collected: false,
        location: { latitude: 0, longitude: 0 },
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
        collected: false,
        location: { latitude: 0, longitude: 0 },
        uri: "",
      },
    ],
  });

  const [huntObjects, setHuntObjects] = useState([]);

  const [totalPoints, setTotalPoints] = useState(0);

  const [location, setLocation] = useState({
    coords: { latitude: 60.200692, longitude: 24.934302 },
  });

  useEffect(() => {
    getLocation();
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists huntObject (id integer primary key not null, name text, points int, collected boolean, latitude int, longitude int);"
      );
    });
    updateList();
  }, []);

  useEffect(() => {
    getTotalPoints();
  }, [eventData]);

  const updateList = () => {
    db.transaction((tx) => {
      //(callback, error, success)
      tx.executeSql("select * from huntObject;", [], (_, { rows }) =>
        setHuntObjects(rows._array)
      );
    });
  };

  const saveItem = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into huntedObject (name, points, collected, latitude, longitude) values(?,?,?,?,?);",
          []
        );
      },
      null,
      updateList
    );
  };

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("No permission to access location");
    } else {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
  };

  const getTotalPoints = () => {
    let total = 0;
    for (let i = 0; i < eventData.items.length; i++) {
      if (eventData.items[i].collected) {
        total += eventData.items[i].points;
      }
    }
    setTotalPoints(total);
  };

  const changeCollect = (item, key) => {
    let newArr = [...eventData];
    newArr.items[key].collected = true;
    setEventData(newArr);
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
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <StatusBar hidden={true} />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            flex: 1,
            textAlignVertical: "center",
            textAlign: "center",
          }}
        >
          Points: {totalPoints}
        </Text>
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            textAlignVertical: "center",
          }}
        >
          Time:
        </Text>
      </View>
      <View style={{ flex: 3, backgroundColor: "yellow" }}>
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221,
          }}
        />
      </View>

      <View style={{ flex: 3, textAlign: "center" }}>
        <Text style={{ textAlign: "center", fontSize: 25, margin: 5 }}>
          Targets
        </Text>
        <FlatList
          data={eventData.items}
          ListHeaderComponent={FlatListHeader}
          ItemSeparatorComponent={ListSeperator}
          renderItem={({ item, index }) => {
            if (item.uri == "") {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 10,
                  }}
                >
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.points}>{item.points}</Text>

                  <Button
                    onPress={() =>
                      Alert.alert(
                        "Picture of " + item.name + " is not taken yet"
                      )
                    }
                    title="Not done"
                  />

                  <Button
                    onPress={() =>
                      navigate("Picture", {
                        itemId: index,
                        setUri: setEventData,
                        data: eventData,
                      })
                    }
                    title="take picture"
                  />
                </View>
              );
            } else {
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 10,
                }}
              >
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.points}>{item.points}</Text>

                <Button
                  onPress={() => navigate("ShowPicture", { uri: item.uri })}
                  title="Done"
                />

                <Button
                  onPress={() =>
                    navigate("Picture", {
                      data: eventData,
                      itemId: index,
                      uriFunction: setEventData,
                    })
                  }
                  title="take picture"
                />
              </View>;
            }
          }}
          keyExtractor={(item, index) => index.toString()}
        ></FlatList>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  map: {},
  text: {},
  points: { textAlign: "center" },
});
