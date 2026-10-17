import { NativeTabs } from "expo-router/native-tabs";
import { useColorScheme } from "react-native";

import { TestIDs } from "@/constants/test-ids";
import { Colors } from "@/constants/theme";

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "dark" ? "dark" : "light"];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}
    >
      <NativeTabs.Trigger
        name="index"
        testID={TestIDs.tabs.home}
        accessibilityLabel="Home"
      >
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/home.png")}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger
        name="explore"
        testID={TestIDs.tabs.explore}
        accessibilityLabel="Explore"
      >
        <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/explore.png")}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
