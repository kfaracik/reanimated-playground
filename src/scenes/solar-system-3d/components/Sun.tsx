import { StyleSheet, View } from "react-native";

export const Sun = () => (
  <View style={styles.sunContainer}>
    <View style={styles.sun} />
  </View>
);

const styles = StyleSheet.create({
  sunContainer: { position: "absolute", zIndex: 3 },
  sun: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ffff00",
  },
});
