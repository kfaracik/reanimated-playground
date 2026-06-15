import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

const RADIUS = 120;
const FULL_ROTATION = 2 * Math.PI;

const ORBIT_DURATION = 10000;
const PLANET_ROTATION_DURATION = 500;

export default function Solution2() {
  const angle = useSharedValue(0);
  const planetRotation = useSharedValue(0);

  useEffect(() => {
    angle.value = withRepeat(
      withTiming(FULL_ROTATION, {
        duration: ORBIT_DURATION,
        easing: Easing.linear,
      }),
      -1,
      false,
    );

    planetRotation.value = withRepeat(
      withTiming(-FULL_ROTATION, {
        duration: PLANET_ROTATION_DURATION,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, []);

  const planetAnimatedStyle = useAnimatedStyle(() => {
    const planetCos = Math.cos(planetRotation.value);
    const planetSin = Math.sin(planetRotation.value);

    const planetTranslationX = RADIUS * Math.cos(angle.value);
    const planetTranslationY = RADIUS * Math.sin(angle.value);

    // prettier-ignore
    const transformationMatrix = [
      planetCos,          -planetSin,          0, 0,
      planetSin,           planetCos,          0, 0,
      0,                   0,                  1, 0,
      planetTranslationX,  planetTranslationY, 0, 1,
    ];

    return {
      transform: [{ matrix: transformationMatrix }],
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
