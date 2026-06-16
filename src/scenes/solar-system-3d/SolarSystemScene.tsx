import { Pressable, StyleSheet, Text, View } from "react-native";
import Solution from "./SolaarSystem3D";

type TranslationFunction = (key: string) => string;

export default function SolarSystemScene({
  t,
  onBack,
}: {
  t: TranslationFunction;
  onBack: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
          onPress={onBack}
        >
          <Text style={styles.backButtonText}>{t("solarSystem.back")}</Text>
        </Pressable>
        <Text style={styles.title}>{t("groups.solarSystem3d.title")}</Text>
        <Text style={styles.subtitle}>
          {t("groups.solarSystem3d.description")}
        </Text>
      </View>

      <View style={styles.stage}>
        <Solution />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
  },
  header: {
    marginBottom: 18,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "#16213d",
    borderWidth: 1,
    borderColor: "#ffffff14",
    marginBottom: 16,
  },
  backButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "800",
  },
  subtitle: {
    color: "#93a4c3",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  methodRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -6,
    marginBottom: 14,
  },
  methodCard: {
    width: "33.333%",
    minWidth: 160,
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  methodCardActive: {
    opacity: 1,
  },
  methodTitle: {
    borderRadius: 20,
    backgroundColor: "#11182d",
    color: "#cbd5e1",
    fontSize: 15,
    fontWeight: "700",
    paddingTop: 14,
    paddingHorizontal: 14,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "#ffffff14",
  },
  methodTitleActive: {
    color: "#ffffff",
    borderColor: "#3b82f6",
    backgroundColor: "#132445",
  },
  methodDescription: {
    color: "#93a4c3",
    fontSize: 12,
    lineHeight: 18,
    paddingHorizontal: 14,
    paddingTop: 8,
  },
  stage: {
    flex: 1,
    borderRadius: 28,
    backgroundColor: "#10172b",
    borderWidth: 1,
    borderColor: "#ffffff12",
    overflow: "hidden",
  },
  pressed: {
    transform: [{ scale: 0.99 }],
  },
});
