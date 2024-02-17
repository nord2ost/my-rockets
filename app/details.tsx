import { StatusBar } from "expo-status-bar";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Text, View } from "@/components/Themed";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { StoreState } from "./types/StoreState";
import { Rockets } from "./types/Rockets";
import { AntDesign } from "@expo/vector-icons";
import { toggleFavorites } from "./slices/rocketsSlice";

export default function ModalScreen() {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: StoreState) => state.rockets.favorites ?? []
  );

  const currentRocket: Rockets | undefined = useSelector(
    (state: StoreState) =>
      state.rockets.data.find((m) => {
        return m.rocket_id === state.rockets.currentRocketId;
      }),
    shallowEqual
  );

  const { flickr_images, first_flight, description, rocket_id, rocket_name } =
    currentRocket ?? {};

  const isFavoriteIcon =
    rocket_id && favorites.indexOf(rocket_id) === -1 ? "staro" : "star";
  const isFavoriteLabel =
    rocket_id && favorites.indexOf(rocket_id) === -1
      ? "Add to favorites"
      : "Remove from favorites";

  const toggleFavorite = () => {
    // @ts-expect-error Expected 0 arguments, but got 1.ts(2554)
    dispatch(toggleFavorites(rocket_id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{rocket_name}</Text>
      <View style={styles.imageSection}>
        <Image style={styles.image} source={{ uri: flickr_images?.[0] }} />
      </View>
      <Pressable style={styles.favoriteBtn} onPress={toggleFavorite}>
        <AntDesign name={isFavoriteIcon} size={32} color="grey" />
        <Text style={styles.label}>{isFavoriteLabel}</Text>
      </Pressable>
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
    marginVertical: 15,
    borderBottomWidth: 1,
    height: 1,
    width: "80%",
  },
  favoriteBtn: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
