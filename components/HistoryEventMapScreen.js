import React from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function HistoryEventMapScreen(props) {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: props.startingLocation.latitude,
          longitude: props.startingLocation.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
      />
      {/*add markers from where items were collected */}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
