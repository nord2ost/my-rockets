import { FlatList, Image, Pressable, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Text, View } from "@/components/Themed";
import { useCallback, useEffect } from "react";
import {
  fetch,
  setCurrentRocket,
  toggleFavorites,
} from "../slices/rocketsSlice";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../types/StoreState";
import { Rockets } from "../types/Rockets";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import RocketItem from "./rocketItem";

export default function RocketList({ rockets }: { rockets: Rockets[] }) {
  return (
    <>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        renderItem={(item) => <RocketItem {...item} />}
        data={rockets}
      ></FlatList>
    </>
  );
}
