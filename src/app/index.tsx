import * as Device from "expo-device";
import { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnimatedIcon } from "@/components/animated-icon";
import { HintRow } from "@/components/hint-row";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

function getDevMenuHint() {
  if (Platform.OS === "web") {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === "android" ? "cmd+m (or ctrl+m)" : "cmd+d";
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  const [inputText, setInputText] = useState("");
  const [count, setCount] = useState(0);
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ThemedView style={styles.heroSection}>
            <AnimatedIcon />
            <ThemedText
              testID="txt_welcome_title"
              type="title"
              style={styles.title}
            >
              Welcome to&nbsp;Expo
            </ThemedText>
          </ThemedView>

          <ThemedText testID="txt_get_started" type="code" style={styles.code}>
            get started
          </ThemedText>

          <ThemedView
            testID="container_steps"
            type="backgroundElement"
            style={styles.stepContainer}
          >
            <HintRow
              testID="hint_editing"
              title="Try editing"
              hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
            />
            <HintRow
              testID="hint_devtools"
              title="Dev tools"
              hint={getDevMenuHint()}
            />
            <HintRow
              testID="hint_fresh_start"
              title="Fresh start"
              hint={<ThemedText type="code">npm run reset-project</ThemedText>}
            />
          </ThemedView>

          {/* Seção Interativa para testes E2E do AndroFlow */}
          <ThemedView
            testID="playground_card"
            type="backgroundElement"
            style={styles.playgroundContainer}
          >
            <ThemedText testID="txt_playground_title" type="subtitle">
              AndroFlow Playground
            </ThemedText>
            <ThemedText
              style={styles.playgroundSubtitle}
              themeColor="textSecondary"
            >
              Área interativa para testar digitação, edição, gestos e
              contadores.
            </ThemedText>

            <TextInput
              testID="input_user_name"
              style={[
                styles.input,
                {
                  color: theme.text,
                  backgroundColor: theme.background,
                  borderColor: theme.backgroundSelected,
                },
              ]}
              placeholder="Digite um texto para testar..."
              placeholderTextColor={theme.textSecondary}
              value={inputText}
              onChangeText={setInputText}
            />

            {inputText ? (
              <ThemedText
                testID="txt_preview"
                type="smallBold"
                style={styles.previewText}
              >
                Digitado: {inputText}
              </ThemedText>
            ) : null}

            <View style={styles.counterRow}>
              <Pressable
                testID="btn_decrement"
                style={styles.actionButton}
                onPress={() => setCount((c) => Math.max(0, c - 1))}
              >
                <ThemedText type="smallBold">-</ThemedText>
              </Pressable>

              <ThemedText
                testID="txt_counter_value"
                type="default"
                style={styles.counterText}
              >
                Contador: {count}
              </ThemedText>

              <Pressable
                testID="btn_increment"
                style={styles.actionButton}
                onPress={() => setCount((c) => c + 1)}
              >
                <ThemedText type="smallBold">+</ThemedText>
              </Pressable>

              {count > 0 && (
                <Pressable
                  testID="btn_reset_counter"
                  style={styles.actionButtonSecondary}
                  onPress={() => setCount(0)}
                >
                  <ThemedText type="small">Zerar</ThemedText>
                </Pressable>
              )}
            </View>
          </ThemedView>

          {Platform.OS === "web" && <WebBadge />}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    maxWidth: MaxContentWidth,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.four,
    paddingTop: Spacing.two,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
    paddingTop: Spacing.two,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  playgroundContainer: {
    gap: Spacing.two,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.four,
    marginTop: Spacing.two,
  },
  playgroundSubtitle: {
    marginBottom: Spacing.one,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    fontSize: 14,
  },
  previewText: {
    marginTop: Spacing.one,
  },
  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  counterText: {
    marginHorizontal: Spacing.one,
  },
  actionButton: {
    minWidth: 40,
    height: 36,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.two,
  },
  actionButtonSecondary: {
    height: 36,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: "#aaa",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.two,
    marginLeft: Spacing.two,
  },
});
