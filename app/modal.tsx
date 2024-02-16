import { StatusBar } from "expo-status-bar";
import { Image, Platform, ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { shallowEqual, useSelector } from "react-redux";
import { StoreState } from "./types/StoreState";
import { Rockets } from "./types/Rockets";

export default function ModalScreen() {
  const currentRocket: Rockets | undefined = useSelector(
    (state: StoreState) =>
      state.rockets.data.find((m) => {
        return m.rocket_id === state.rockets.currentRocketId;
      }),
    shallowEqual
  );

  const { flickr_images, first_flight, description, rocket_name } =
    currentRocket ?? {};
  //TODO: add fallback placeholder
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{rocket_name}</Text>
      <View style={styles.imageSection}>
        <Image style={styles.image} source={{ uri: flickr_images?.[0] }} />
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.body}>{first_flight?.toString()}</Text>
      <Text style={styles.body}>{description}</Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageSection: {},
  image: {
    borderRadius: 3,
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  body: {
    alignSelf: "flex-start",
    fontSize: 20,
    textAlign: "left",
    marginBottom: 5,
  },
  separator: {
    marginVertical: 30,
    borderBottomWidth: 1,
    height: 1,
    width: "80%",
  },
});
