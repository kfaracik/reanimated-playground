import { StyleSheet, Text, View } from "react-native";

export default function Solution2() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Rozwiązanie 2 (Miejsce na Twoją implementację)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
