import {
  FlatList,
  FlatListComponent,
  Image,
  ImageSourcePropType,
  ListRenderItem,
  Pressable,
  StyleSheet,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Text, View } from "@/components/Themed";
import { useEffect } from "react";
import { RocketsState, fetch } from "../slices/rocketsSlice";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../types/StoreState";
import { Rockets } from "../types/Rockets";

export default function TabOneScreen() {
  const rockets = useSelector((state: StoreState) => state.rockets.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetch());
  }, []);
  const renderItem = ({ item }: { item: Rockets }) => {
    const { id, flickr_images, first_flight, description, rocket_name } = item;
    console.log(flickr_images[0]);
    return (
      <Pressable style={styles.row}>
        <View style={styles.headerSection}>
          <View>
            <Text style={styles.title}>{rocket_name}</Text>
          </View>
        </View>
        <View style={styles.imageSection}>
          <Image
            style={styles.image}
            source={{ uri: flickr_images[0] } as ImageSourcePropType}
          />
        </View>
        <View style={styles.dataSection}>
          <View style={styles.metadataSection}>
            <Text style={styles.title}>{first_flight}</Text>
            <Text style={styles.title}>{description}</Text>
          </View>
          <View style={styles.reactionSection}>
            <Pressable>
              <AntDesign name="hearto" size={32} color="grey" />
            </Pressable>
          </View>
        </View>

        {/* <View style={styles.mainSection}>
          
          <View style={styles.checkContainer}></View>
        </View> */}
      </Pressable>
    );
  };
  return (
    <FlatList
      contentContainerStyle={styles.container}
      renderItem={renderItem}
      data={rockets}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  row: { borderWidth: 1, flex: 1 },
  container: {
    borderWidth: 1,
  },
  headerSection: { flex: 1, flexDirection: "row" },
  dataSection: { flex: 1, flexDirection: "row" },
  reactionSection: { flex: 0.1, borderWidth: 1 },
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
