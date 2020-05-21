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

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { max } from "react-native-reanimated";

export default function PictureScreen(props) {
  const { params } = props.navigation.state;
  const { navigate } = props.navigation;

  const [hasCameraPermission, setPermission] = useState(null);
  const [photoBase64, setPhotoBase64] = useState("");
  const [visible, setVisible] = useState(false);
  const [location, setLocation] = useState({
    coords: { latitude: 0, longitude: 0 },
  });

  const camera = useRef(null);
  var { width, height } = Dimensions.get("window");

  useEffect(() => {
    askCameraPermission();
  }, []);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const askCameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setPermission(status == "granted");
  };

  const snap = async () => {
    if (camera) {
      const photo = await camera.current.takePictureAsync({ base64: true });
      setPhotoBase64(photo.base64);
    }
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

  const handleAccept = () => {
    // Setting the uri to the right uri system doesn´t seem to work.
    // the eventData isn't recognice in the props.data format

    getLocation();
    let newObject = Object.assign({}, params.data);
    const indexCopy = params.itemId;
    newObject.items[indexCopy].uri = `data:image/gif;base64,${photoBase64}`;
    newObject.items[indexCopy].location.latitude = location.coords.latitude;
    newObject.items[indexCopy].location.longitude = location.coords.longitude;
    newObject.items[indexCopy].collected = true;

    params.setUri(newObject);
    const emptyCoordination = {
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    };

    //params.addMarker(emptyCoordination);

    navigate("Solo");
  };

  return (
    <View style={{ flex: 1 }}>
      {hasCameraPermission ? (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 4 }} ref={camera} />
          <View>
            <Button
              title="TakePhoto"
              onPress={() => {
                snap();
                toggleOverlay();
              }}
            />
          </View>
          <View>
            <Overlay
              isVisible={visible}
              onBackdropPress={() => toggleOverlay}
              overlayStyle={{
                position: "absolute",
                top: 15,
                right: 15,
                bottom: 15,
                left: 15,
              }}
            >
              <Image
                style={{ flex: 1 }}
                source={{ uri: `data:image/gif;base64,${photoBase64}` }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  margin: 10,
                }}
              >
                <Button title="Accept" onPress={() => handleAccept()} />
                <Button
                  title="Take again"
                  onPress={() => setVisible(!visible)}
                />
              </View>
            </Overlay>
          </View>
        </View>
      ) : (
        <Text>No access to camera</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
