import React, { useState } from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function HistoryEventMapScreen(props) {
  const { params } = props.navigation.state;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <MapView
        style={styles.map}
        region={{
          latitude: props.startingLocation.latitude,
          longitude: props.startingLocation.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
      >
        {params.data.items.map((item) => (
          <Marker
            coordinate={{
              latitude: item.location.latitude,
              longitude: item.location.longitude,
            }}
            title={item.name}
            description={item.points}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
