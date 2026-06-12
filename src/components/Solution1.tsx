import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function Solution1() {
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
    <View style={styles.container}>
      <View style={styles.sun} />

      <View style={styles.orbitLayer}>
        <Animated.View style={[styles.planet, planetAnimatedStyle]}>
          <View style={styles.topHalf} />
          <View style={styles.bottomHalf} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  sun: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ffff00",
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
    backgroundColor: "#008000",
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: "#0000ff",
  },
});
