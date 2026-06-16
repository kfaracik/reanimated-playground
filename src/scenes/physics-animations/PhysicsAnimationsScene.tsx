import { StyleSheet, Text, View } from "react-native";
import SvgOrbitPlaceholder from "./PhysicsAnimationsPlaceholder";

type TranslationFunction = (key: string) => string;

export default function PhysicsAnimationsScene({
  t,
  onBack,
}: {
  t: TranslationFunction;
  onBack: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={onBack} label={t("svgAnimations.back")} />
        <Text style={styles.title}>{t("svgAnimations.title")}</Text>
        <Text style={styles.subtitle}>{t("svgAnimations.subtitle")}</Text>
      </View>

      <View style={styles.stage}>
        <SvgOrbitPlaceholder />
      </View>
    </View>
  );
}

function BackButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Text onPress={onPress} style={styles.backButton}>
      {label}
    </Text>
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
  stage: {
    flex: 1,
    borderRadius: 28,
    backgroundColor: "#10172b",
    borderWidth: 1,
    borderColor: "#ffffff12",
    overflow: "hidden",
    justifyContent: "center",
  },
});
