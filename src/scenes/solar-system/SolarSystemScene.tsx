import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SceneScreen from "../../app/shared/SceneScreen";
import Solution1 from "./animations/Solution1";
import Solution2 from "./animations/Solution2";
import Solution3 from "./animations/Solution3";

type TranslationFunction = (key: string) => string;

type MethodId = 1 | 2 | 3;

export default function SolarSystemScene({
  t,
  onBack,
}: {
  t: TranslationFunction;
  onBack: () => void;
}) {
  const [activeSolution, setActiveSolution] = useState<MethodId>(1);

  return (
    <SceneScreen
      title={t("solarSystem.title")}
      subtitle={t("solarSystem.subtitle")}
      onBack={onBack}
      framed={false}
    >
      <View style={styles.methodRow}>
        <MethodButton
          title={t("methods.method1.title")}
          description={t("methods.method1.description")}
          active={activeSolution === 1}
          onPress={() => setActiveSolution(1)}
        />
        <MethodButton
          title={t("methods.method2.title")}
          description={t("methods.method2.description")}
          active={activeSolution === 2}
          onPress={() => setActiveSolution(2)}
        />
        <MethodButton
          title={t("methods.method3.title")}
          description={t("methods.method3.description")}
          active={activeSolution === 3}
          onPress={() => setActiveSolution(3)}
        />
      </View>

      <View style={styles.stage}>
        {activeSolution === 1 && <Solution1 />}
        {activeSolution === 2 && <Solution2 />}
        {activeSolution === 3 && <Solution3 />}
      </View>
    </SceneScreen>
  );
}

function MethodButton({
  title,
  description,
  active,
  onPress,
}: {
  title: string;
  description: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.methodCard,
        active && styles.methodCardActive,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.methodTitle, active && styles.methodTitleActive]}>
        {title}
      </Text>
      <Text style={styles.methodDescription}>{description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "#11182D",
    color: "#CBD5E1",
    fontSize: 15,
    fontWeight: "700",
    paddingTop: 14,
    paddingHorizontal: 14,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "#FFFFFF14",
  },
  methodTitleActive: {
    color: "#FFFFFF",
    borderColor: "#3B82F6",
    backgroundColor: "#132445",
  },
  methodDescription: {
    color: "#93A4C3",
    fontSize: 12,
    lineHeight: 18,
    paddingHorizontal: 14,
    paddingTop: 8,
  },
  stage: {
    flex: 1,
    borderRadius: 28,
    backgroundColor: "#10172B",
    borderWidth: 1,
    borderColor: "#FFFFFF12",
    overflow: "hidden",
  },
  pressed: {
    transform: [{ scale: 0.99 }],
  },
});
