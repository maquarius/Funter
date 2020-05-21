import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  Dimensions,
} from "react-native";
import { Overlay } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";

export default function PictureTakenScreen(props) {
  const { navigate } = props.navigation;
  var { width, height } = Dimensions.get("window");

  return (
    <View style={{ flex: 1 }}>
      <Image style={{ flex: 1 }} source={props.uri} />
    </View>
  );
}

const styles = StyleSheet.create({});
