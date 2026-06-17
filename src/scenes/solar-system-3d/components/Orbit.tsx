import { StyleSheet, View } from "react-native";
import { RADIUS_X, RADIUS_Y } from "../constants/dimentsions";

export const OrbitPath = () => (
  <>
    <View style={styles.orbitClipBack}>
      <View style={[styles.orbitLine, { top: 0 }]} />
    </View>
    <View style={styles.orbitClipFront}>
      <View style={[styles.orbitLine, { top: -RADIUS_X }]} />
    </View>
  </>
);

const styles = StyleSheet.create({
  orbitLine: {
    position: "absolute",
    width: RADIUS_X * 2,
    height: RADIUS_X * 2,
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
});
