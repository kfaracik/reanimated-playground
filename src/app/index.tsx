import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const rotation = useSharedValue(0);
  const planetRotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 10000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );

    planetRotation.value = withRepeat(
      withTiming(-360, {
        duration: 500,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, []);

  const planetAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { translateY: 120 },
        { rotate: `${planetRotation.value}deg` },
      ],
    };
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.sun} />

      <Animated.View style={styles.orbitLayer}>
        <Animated.View style={[styles.planet, planetAnimatedStyle]}>
          <View style={styles.topHalf} />
          <View style={styles.bottomHalf} />
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0c0f1d",
    alignItems: "center",
    justifyContent: "center",
  },
  sun: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "yellow",
  },
  orbitLayer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 0,
    height: 0,
  },
  planet: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  topHalf: {
    flex: 1,
    backgroundColor: "green",
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: "blue",
  },
});
