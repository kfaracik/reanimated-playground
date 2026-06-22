import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SkiaPathAnimation } from "./SkiaPathAnimation";

type TranslationFunction = (key: string) => string;

export default function SkiaGradientScene({
  t,
  onBack,
}: {
  t: TranslationFunction;
  onBack: () => void;
}) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>{t("common.back")}</Text>
      </Pressable>
      <Text style={styles.title}>{t("skiaGradient.title")}</Text>
      <View style={styles.stage}>
        <SkiaPathAnimation />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backButton: { marginBottom: 12 },
  backText: { color: "#fff" },
  title: { color: "#fff", fontSize: 20, marginBottom: 12 },
  stage: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#081025",
  },
});
