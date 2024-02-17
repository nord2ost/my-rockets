import { View, Text } from "@/components/Themed";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet } from "react-native";
import Animated, {
  Easing,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Rockets } from "../types/Rockets";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../types/StoreState";
import { setCurrentRocket, toggleFavorites } from "../slices/rocketsSlice";

export default function RocketItem({ item }: { item: Rockets }) {
  const { flickr_images, first_flight, rocket_id, rocket_name } = item;

  const dispatch = useDispatch();

  const favorites = useSelector(
    (state: StoreState) => state.rockets.favorites ?? []
  );

  const bigStarOpacity = useSharedValue(0);
  const bigStarScale = useSharedValue(1);
  const iconLikeStyle = useAnimatedStyle(() => {
    return {
      opacity: bigStarOpacity.value,
      transform: [{ scale: bigStarScale.value }],
      position: "absolute",
      top: 100,
      alignSelf: "center",
      justifyContent: "center",
      zIndex: 99,
      backgroundColor: "rgba(0,0,0,0)",
    };
  });

  const pressRow = () => {
    // @ts-expect-error Expected 0 arguments, but got 1.ts(2554)
    dispatch(setCurrentRocket(rocket_id));
  };

  const toggleFavorite = () => {
    // @ts-expect-error Expected 0 arguments, but got 1.ts(2554)
    dispatch(toggleFavorites(rocket_id));
    animateBigStar();
  };

  const isFavoriteIcon = favorites.indexOf(rocket_id) === -1 ? "staro" : "star";

  const animateBigStar = () => {
    bigStarOpacity.value = withTiming(
      1,
      {
        duration: 200,
        easing: Easing.ease,
      },
      () => {
        "worklet";
        bigStarScale.value = withTiming(
          1.25,
          {
            duration: 200,
            easing: Easing.ease,
          },
          () => {
            bigStarScale.value = withTiming(
              1,
              {
                duration: 200,
                easing: Easing.ease,
              },
              () => {
                bigStarOpacity.value = withTiming(0, {
                  duration: 300,
                  easing: Easing.ease,
                });
              }
            );
          }
        );
      }
    );
  };

  return (
    <Link href="/details" asChild>
      <Pressable style={styles.row} onPress={pressRow}>
        <Animated.View exiting={FadeOut}>
          <View style={styles.headerSection}>
            <View>
              <Text style={styles.title}>{rocket_name}</Text>
            </View>
          </View>
          <View style={styles.imageSection}>
            <Animated.View style={iconLikeStyle}>
              <AntDesign name={"star"} size={200} color={"#FDBF60"} />
            </Animated.View>
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
        </Animated.View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  row: { flex: 1, marginVertical: 5 },
  headerSection: { flex: 1, flexDirection: "row" },
  dataSection: { flex: 1, flexDirection: "row" },
  reactionSection: { flex: 0.1 },
  metadataSection: {
    flex: 1,
  },
  titleSection: {
    flex: 1,
  },
  imageSection: { flex: 1 },
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
