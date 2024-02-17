import { Text } from "@/components/Themed";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { useState } from "react";

export default function EmptyComponent() {
  const [isReady, setIsReady] = useState(true);
  const ufoValue = useSharedValue(0);
  const ufoStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: ufoValue.value },
        { rotate: ufoValue.value.toString() + "deg" },
      ],
      flex: 1,
      alignItems: "center",
    };
  });

  const animateUFO = () => {
    if (isReady) {
      console.log(isReady);
      setIsReady(false);
      ufoValue.value = withRepeat(
        withTiming(5, {
          duration: 200,
          easing: Easing.ease,
        }),
        20,
        true,
        () => {
          runOnJS(setIsReady)(true);
        }
      );
    }
  };

  return (
    <Pressable style={styles.container} onPress={animateUFO}>
      <Animated.View style={ufoStyle}>
        <MaterialCommunityIcons name="ufo-outline" size={150} color="gray" />
      </Animated.View>
      <Text>Nothing to Show :(</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center" },
});
