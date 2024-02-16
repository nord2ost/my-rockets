import { FlatList, Image, Pressable, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Text, View } from "@/components/Themed";
import { useEffect } from "react";
import {
  addToFavorites,
  fetch,
  setCurrentRocket,
} from "../slices/rocketsSlice";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../types/StoreState";
import { Rockets } from "../types/Rockets";
import { Link } from "expo-router";

export default function TabOneScreen() {
  const rockets = useSelector((state: StoreState) => state.rockets.data);
  const favorites = useSelector(
    (state: StoreState) => state.rockets.favorites ?? []
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetch());
  }, []);

  const renderItem = ({ item }: { item: Rockets }) => {
    const { flickr_images, first_flight, rocket_id, rocket_name } = item;

    const pressRow = () => {
      // @ts-expect-error Expected 0 arguments, but got 1.ts(2554)
      dispatch(setCurrentRocket(rocket_id));
    };

    const toggleFavorite = () => {
      // @ts-expect-error Expected 0 arguments, but got 1.ts(2554)
      dispatch(addToFavorites(rocket_id));
    };

    const isFavoriteIcon = "hearto";

    return (
      <Link href="/modal" asChild>
        <Pressable style={styles.row} onPress={pressRow}>
          <View style={styles.headerSection}>
            <View>
              <Text style={styles.title}>{rocket_name}</Text>
            </View>
          </View>
          <View style={styles.imageSection}>
            <Image style={styles.image} source={{ uri: flickr_images[0] }} />
          </View>
          <View style={styles.dataSection}>
            <View style={styles.metadataSection}>
              <Text style={styles.title}>{first_flight.toString()}</Text>
            </View>
            <View style={styles.reactionSection}>
              <Pressable onPress={toggleFavorite}>
                <AntDesign name={isFavoriteIcon} size={32} color="grey" />
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Link>
    );
  };
  return (
    <>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
        renderItem={renderItem}
        extraData={favorites}
        data={rockets}
      ></FlatList>
    </>
  );
}

const styles = StyleSheet.create({
  row: { flex: 1 },
  container: {},
  headerSection: { flex: 1, flexDirection: "row" },
  dataSection: { flex: 1, flexDirection: "row" },
  reactionSection: { flex: 0.1 },
  imageSection: { flex: 1 },
  metadataSection: {
    flex: 1,
  },
  titleSection: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
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
