import { Rockets } from "../types/Rockets";
import { View } from "@/components/Themed";
import RocketItem from "./rocketItem";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";
import EmptyComponent from "./emptyComponent";
import { StyleSheet } from "react-native";

export default function RocketList({ rockets }: { rockets: Rockets[] }) {
  return (
    <View style={styles.container}>
      <Animated.FlatList
        ListEmptyComponent={EmptyComponent}
        keyExtractor={(item) => item.id.toString()}
        itemLayoutAnimation={LinearTransition.springify()}
        entering={FadeIn}
        renderItem={(item) => <RocketItem {...item} />}
        data={rockets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
