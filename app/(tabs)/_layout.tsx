import React, { useEffect } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { fetch } from "../slices/rocketsSlice";
import { useDispatch } from "react-redux";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetch());
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Latest Rocket Launches",
          tabBarIcon: ({ color }) => (
            <Ionicons
              size={28}
              style={{ marginBottom: -3 }}
              name="rocket-sharp"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={28}
              style={{ marginBottom: -3 }}
              name={"robot-love"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
