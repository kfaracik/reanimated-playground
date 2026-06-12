import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Solution1 from "../components/Solution1";
import Solution2 from "../components/Solution2";
import Solution3 from "../components/Solution3";

export default function HomeScreen() {
  const [activeSolution, setActiveSolution] = useState<1 | 2 | 3>(1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Solar System Orbit</Text>
        <Text style={styles.subtitle}>Wybierz wersję implementacji</Text>
      </View>

      <View style={styles.content}>
        {activeSolution === 1 && <Solution1 />}
        {activeSolution === 2 && <Solution2 />}
        {activeSolution === 3 && <Solution3 />}
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity
          style={[styles.navButton, activeSolution === 1 && styles.activeNavButton]}
          onPress={() => setActiveSolution(1)}
          activeOpacity={0.8}
        >
          <Text style={[styles.navButtonText, activeSolution === 1 && styles.activeNavButtonText]}>
            Metoda 1
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, activeSolution === 2 && styles.activeNavButton]}
          onPress={() => setActiveSolution(2)}
          activeOpacity={0.8}
        >
          <Text style={[styles.navButtonText, activeSolution === 2 && styles.activeNavButtonText]}>
            Metoda 2
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, activeSolution === 3 && styles.activeNavButton]}
          onPress={() => setActiveSolution(3)}
          activeOpacity={0.8}
        >
          <Text style={[styles.navButtonText, activeSolution === 3 && styles.activeNavButtonText]}>
            Metoda 3
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0c0f1d",
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  subtitle: {
    color: "#6b7280",
    fontSize: 14,
    marginTop: 4,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#ffffff0d",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ffffff1a",
  },
  navButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  activeNavButton: {
    backgroundColor: "#3b82f6",
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  navButtonText: {
    color: "#9ca3af",
    fontSize: 14,
    fontWeight: "600",
  },
  activeNavButtonText: {
    color: "#ffffff",
  },
});
