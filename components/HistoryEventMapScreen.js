import React from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import MapView, { Marker } from "react-native-maps";
export default function HistoryEventMapScreen() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 60.200692,
          longitude: 24.934302,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
