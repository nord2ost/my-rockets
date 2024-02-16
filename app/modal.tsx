import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { StoreState } from "./types/StoreState";
import { Rockets } from "./types/Rockets";
import { useEffect } from "react";
import { resetCurrentRocket } from "./slices/rocketsSlice";

export default function ModalScreen() {
  const currentRocket: Rockets | undefined = useSelector(
    (state: StoreState) =>
      state.rockets.data.find((m) => {
        return m.rocket_id === state.rockets.currentRocketId;
      }),
    shallowEqual
  );
  console.log(currentRocket);
  const { rocket_name } = currentRocket ?? {};
  //TODO: add fallback placeholder
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{rocket_name}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
