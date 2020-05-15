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

export default function SoloScreen() {
  const [eventData, setEventData] = useState([
    {
      name: "squirel",
      points: 10,
      collected: false,
      location: { latitude: 0, longitude: 0 },
    },
    {
      name: "tree",
      points: 1,
      collected: false,
      location: { latitude: 0, longitude: 0 },
    },
    {
      name: "bear",
      points: 1000,
      collected: false,
      location: { latitude: 0, longitude: 0 },
    },
  ]);

  const [huntObjects, setHuntObjects] = [];

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
    for (let i = 0; i < eventData.length; i++) {
      if (eventData[i].collected) {
        total += eventData[i].points;
      }
    }
    setTotalPoints(total);
  };

  const changeCollect = (item, key) => {
    let newArr = [...eventData];
    newArr[key].collected = true;
    setEventData(newArr);
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
          backgroundColor: "red",
        }}
      >
        <Text
          style={{
            flex: 1,
            backgroundColor: "green",

            textAlign: "center",
          }}
        >
          Points: {totalPoints}
        </Text>
        <Text
          style={{
            flex: 1,
            backgroundColor: "blue",
            justifyContent: "center",

            textAlign: "center",
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

      <View style={{ flex: 3, textAlign: "center", backgroundColor: "grey" }}>
        <Text>Targets</Text>
        <FlatList
          data={eventData}
          renderItem={({ item, index }) => (
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Text style={styles.text}>{item.name}</Text>
              <Text>{item.points}</Text>

              <Button
                onPress={() => changeCollect(item, index)}
                title="take picture"
              />
            </View>
          )}
        ></FlatList>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {},
});
