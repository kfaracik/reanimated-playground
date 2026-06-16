import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const FULL_ROTATION = 2 * Math.PI;
const RADIUS_X = 160;
const RADIUS_Y = 45;
const PLANET_RADIUS = 20;

export default function SolaarSystem3D() {
  const rotation = useSharedValue(0);
  const planetRotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(FULL_ROTATION, {
        duration: 10000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );

    planetRotation.value = withRepeat(
      withTiming(-FULL_ROTATION, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, []);

  const planetAnimatedStyle = useAnimatedStyle(() => {
    const angle = rotation.value;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    const translateX = cos * RADIUS_X;
    const translateY = sin * RADIUS_Y;

    const planetScale = 1 + sin * 0.6;
    const isBehindSun = sin <= 0 && Math.abs(translateX) < 110;
    const zIndex = isBehindSun ? 2 : 5;

    return {
      transform: [{ translateX }, { translateY }, { scale: planetScale }],
      zIndex,
    };
  });

  const planetShadowAnimatedStyle = useAnimatedStyle(() => {
    const angle = rotation.value;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    const translateX = cos * PLANET_RADIUS;

    const opacity = ((sin + 1) / 2) * 0.7;

    return {
      backgroundColor: "#000",
      transform: [{ translateX }],
      opacity,
    };
  });

  const textureAnimatedStyle = useAnimatedStyle(() => {
    const textureWidth = 80;
    const translateX = (planetRotation.value / FULL_ROTATION) * textureWidth;

    return {
      transform: [{ rotate: "15deg" }, { translateX }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.orbitLayer}>
        <View style={styles.orbitClipBack}>
          <View style={[styles.orbitLine, { top: 0 }]} />
        </View>

        <View style={styles.sun} />

        <View style={styles.orbitClipFront}>
          <View style={[styles.orbitLine, { top: -RADIUS_X }]} />
        </View>

        <Animated.View style={[styles.planet, planetAnimatedStyle]}>
          <Animated.View style={[styles.texture, textureAnimatedStyle]}>
            <View style={[styles.stripe, { backgroundColor: "#008000" }]} />
            <View style={[styles.stripe, { backgroundColor: "#0000ff" }]} />
            <View style={[styles.stripe, { backgroundColor: "#008000" }]} />
            <View style={[styles.stripe, { backgroundColor: "#0000ff" }]} />
          </Animated.View>
          <Animated.View
            style={[StyleSheet.absoluteFill, planetShadowAnimatedStyle]}
          />
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
    backgroundColor: "#0c0d14",
  },
  sun: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ffff00",
    zIndex: 3,
  },
  orbitLayer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 0,
    height: 0,
  },
  orbitLine: {
    position: "absolute",
    width: RADIUS_X * 2,
    height: RADIUS_X * 2,
    left: 0,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: RADIUS_X,
    transform: [{ scaleY: RADIUS_Y / RADIUS_X }],
  },
  orbitClipBack: {
    position: "absolute",
    width: RADIUS_X * 2,
    height: RADIUS_X,
    overflow: "hidden",
    top: -RADIUS_X,
    left: -RADIUS_X,
    zIndex: 1,
  },
  orbitClipFront: {
    position: "absolute",
    width: RADIUS_X * 2,
    height: RADIUS_X,
    overflow: "hidden",
    top: 0,
    left: -RADIUS_X,
    zIndex: 4,
  },
  planet: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  texture: {
    flexDirection: "row",
    width: 160,
    height: 80,
    top: -10,
    position: "absolute",
  },
  stripe: {
    width: 40,
    height: "100%",
  },
});
