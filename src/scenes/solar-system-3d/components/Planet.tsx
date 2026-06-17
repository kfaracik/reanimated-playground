import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import {
    FULL_ROTATION,
    PLANET_RADIUS,
    PLANET_WIDTH,
    RADIUS_X,
    RADIUS_Y,
} from "../constants/dimentsions";

export const Planet = ({ rotation, planetRotation }: any) => {
  const planetAnimatedStyle = useAnimatedStyle(() => {
    const angle = rotation.value;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    return {
      transform: [
        { translateX: Math.round(cos * RADIUS_X) },
        { translateY: Math.round(sin * RADIUS_Y) },
        { scale: 1 + sin * 0.6 },
      ],
      zIndex: sin <= 0 && Math.abs(cos * RADIUS_X) < 110 ? 2 : 5,
    };
  });

  const shadowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: Math.cos(rotation.value) * PLANET_RADIUS }],
    opacity: ((Math.sin(rotation.value) + 1) / 2) * 0.85,
  }));

  const textureStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: "20deg" },
      { translateX: (planetRotation.value / FULL_ROTATION) * 80 },
    ],
  }));

  return (
    <Animated.View style={[styles.container, planetAnimatedStyle]}>
      <View style={styles.planet}>
        <Animated.View style={[styles.texture, textureStyle]}>
          {["#008000", "#0000ff", "#008000", "#0000ff"].map((c, i) => (
            <View key={i} style={[styles.stripe, { backgroundColor: c }]} />
          ))}
        </Animated.View>
        <Animated.View style={[StyleSheet.absoluteFill, shadowStyle]}>
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
  );
};

const styles = StyleSheet.create({
  container: {
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
  stripe: { width: PLANET_WIDTH, height: "100%" },
});
