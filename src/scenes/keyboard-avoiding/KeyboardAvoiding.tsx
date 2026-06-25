import React from "react";
import { Image, Platform, StyleSheet, TextInput, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useKeyboardHeight } from "./hooks/useKeyboardHeight";

export const KeyboardAvoiding = () => {
  const keyboardHeight = useKeyboardHeight();
  const insets = useSafeAreaInsets();

  const animatedStyle = useAnimatedStyle(() => {
    const baseDistance = 250;

    const distanceToBottom =
      Platform.OS === "ios"
        ? baseDistance + insets.bottom * 2
        : baseDistance + insets.bottom;

    const targetOffset = Platform.OS === "ios" ? -4 : 8;

    const overlap =
      keyboardHeight.value > distanceToBottom
        ? keyboardHeight.value - distanceToBottom + targetOffset
        : 0;

    return {
      transform: [{ translateY: -overlap }],
    };
  });

  return (
    <SafeAreaView style={styles.stage} edges={["bottom"]}>
      <View style={styles.container}>
        <Animated.View style={[styles.inputWrapper, animatedStyle]}>
          <TextInput
            style={styles.input}
            placeholder="Wpisz tekst..."
            placeholderTextColor="#ffffff60"
          />
        </Animated.View>

        <View style={styles.graphicContainer}>
          <Image style={styles.largeGraphic} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  stage: { flex: 1, backgroundColor: "#0c0f1d" },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  graphicContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  largeGraphic: {
    width: 300,
    height: 200,
    borderRadius: 20,
    backgroundColor: "#ffffff05",
  },
  inputWrapper: {
    width: "100%",
    zIndex: 10,
    backgroundColor: "#0c0f1d",
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
