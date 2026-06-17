import { LinearGradient } from "expo-linear-gradient";
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
const PLANET_WIDTH = 40;
const PLANET_RADIUS = PLANET_WIDTH / 2;

export default function SolaarSystem3D() {
  const rotation = useSharedValue(0);
  const planetRotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(FULL_ROTATION, { duration: 12000, easing: Easing.linear }),
      -1,
      false,
    );
    planetRotation.value = withRepeat(
      withTiming(-FULL_ROTATION, { duration: 3000, easing: Easing.linear }),
      -1,
      false,
    );
  }, []);

  const planetAnimatedStyle = useAnimatedStyle(() => {
    const angle = rotation.value;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    const translateX = Math.round(cos * RADIUS_X);
    const translateY = Math.round(sin * RADIUS_Y);
    const planetScale = 1 + sin * 0.6;
    const isBehindSun = sin <= 0 && Math.abs(translateX) < 110;

    return {
      transform: [{ translateX }, { translateY }, { scale: planetScale }],
      zIndex: isBehindSun ? 2 : 5,
    };
  });

  const planetShadowAnimatedStyle = useAnimatedStyle(() => {
    const angle = rotation.value;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    const translateX = cos * PLANET_RADIUS;
    const opacity = ((sin + 1) / 2) * 0.85;

    return { transform: [{ translateX }], opacity };
  });

  const textureAnimatedStyle = useAnimatedStyle(() => {
    const textureCycleWidth = 80;
    const translateX =
      (planetRotation.value / FULL_ROTATION) * textureCycleWidth;
    return { transform: [{ rotate: "20deg" }, { translateX }] };
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

        <Animated.View style={[styles.planetContainer, planetAnimatedStyle]}>
          <View style={styles.planet}>
            <Animated.View style={[styles.texture, textureAnimatedStyle]}>
              <View style={[styles.stripe, { backgroundColor: "#008000" }]} />
              <View style={[styles.stripe, { backgroundColor: "#0000ff" }]} />
              <View style={[styles.stripe, { backgroundColor: "#008000" }]} />
              <View style={[styles.stripe, { backgroundColor: "#0000ff" }]} />
            </Animated.View>
            <Animated.View
              style={[StyleSheet.absoluteFill, planetShadowAnimatedStyle]}
            >
              <LinearGradient
                colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.9)", "rgba(0,0,0,0)"]}
                locations={[0, 0.5, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>
          </View>
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
    backgroundColor: "#080911",
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
  planetContainer: {
    position: "absolute",
    width: PLANET_WIDTH,
    height: PLANET_WIDTH,
    borderRadius: PLANET_RADIUS,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#fff",
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 8,
  },
  planet: {
    width: PLANET_WIDTH,
    height: PLANET_WIDTH,
    borderRadius: PLANET_RADIUS,
    overflow: "hidden",
  },
  texture: {
    flexDirection: "row",
    width: 160,
    height: 80,
    top: -20,
    position: "absolute",
  },
  stripe: {
    width: PLANET_WIDTH,
    height: "100%",
  },
});
