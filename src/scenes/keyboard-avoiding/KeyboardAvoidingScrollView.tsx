import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useKeyboardHeight } from "./hooks/useKeyboardHeight";

export const KeyboardAvoiding = () => {
  const keyboardHeight = useKeyboardHeight();
  const insets = useSafeAreaInsets();

  const spacerStyle = useAnimatedStyle(() => {
    const height =
      Platform.OS === "ios"
        ? Math.max(0, keyboardHeight.value - insets.bottom - 50)
        : keyboardHeight.value;

    return {
      height,
    };
  });

  return (
    <SafeAreaView style={styles.stage} edges={["bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={false}
      >
        <View style={styles.graphicContainer}>
          <Image style={styles.largeGraphic} />
          <Image style={styles.largeGraphic} />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Wpisz tekst..."
            placeholderTextColor="#ffffff60"
          />
        </View>

        <View style={styles.graphicContainer}>
          <Image style={styles.largeGraphic} />
          <Image style={styles.largeGraphic} />
        </View>
      </ScrollView>

      <Animated.View style={spacerStyle} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  stage: {
    flex: 1,
    backgroundColor: "#0c0f1d",
  },
  scrollContent: {
    padding: 20,
  },
  graphicContainer: {
    alignItems: "center",
    gap: 15,
  },
  largeGraphic: {
    width: 300,
    height: 200,
    borderRadius: 20,
    backgroundColor: "#ffffff05",
  },
  inputWrapper: {
    width: "100%",
    marginVertical: 20,
  },
  input: {
    height: 50,
    backgroundColor: "#ffffff08",
    borderWidth: 1,
    borderColor: "#ffffff20",
    paddingHorizontal: 15,
    borderRadius: 12,
    color: "#ffffff",
  },
});
