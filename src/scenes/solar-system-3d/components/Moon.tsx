import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { RADIUS_X, RADIUS_Y } from "../constants/dimentsions";

const MOON_ORBIT_R = 35;

export const Moon = ({
  rotation,
  moonRotation,
  rotationSin,
  rotationCos,
}: any) => {
  const moonStyle = useAnimatedStyle(() => {
    const planetX =
      (rotationCos ? rotationCos.value : Math.cos(rotation.value)) * RADIUS_X;
    const planetY =
      (rotationSin ? rotationSin.value : Math.sin(rotation.value)) * RADIUS_Y;

    const moonX = Math.cos(moonRotation.value) * MOON_ORBIT_R;
    const moonY = Math.sin(moonRotation.value) * MOON_ORBIT_R;

    return {
      transform: [
        { translateX: Math.round(planetX + moonX) },
        { translateY: Math.round(planetY + moonY) },
      ],
      zIndex: Math.sin(moonRotation.value) > 0 ? 6 : 1,
    };
  });

  return <Animated.View style={[styles.moon, moonStyle]} />;
};

const styles = StyleSheet.create({
  moon: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ccc",
  },
});
