import { Rockets } from "../types/Rockets";
import RocketItem from "./rocketItem";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";

export default function RocketList({ rockets }: { rockets: Rockets[] }) {
  return (
    <>
      <Animated.FlatList
        keyExtractor={(item) => item.id.toString()}
        itemLayoutAnimation={LinearTransition.springify()}
        entering={FadeIn}
        renderItem={(item) => <RocketItem {...item} />}
        data={rockets}
      />
    </>
  );
}
