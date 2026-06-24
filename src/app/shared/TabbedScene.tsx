import { ReactNode, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SceneScreen from "./SceneScreen";

type TranslationFunction = (key: string) => string;

export type SolutionEntry = {
  id: string | number;
  title: string;
  description?: string;
  component: ReactNode;
};

export default function TabbedScene({
  t,
  titleKey,
  subtitleKey,
  onBack,
  solutions,
  initialId,
}: {
  t: TranslationFunction;
  titleKey: string;
  subtitleKey?: string;
  backLabelKey?: string;
  onBack: () => void;
  solutions: SolutionEntry[];
  initialId?: string | number;
}) {
  const firstId = initialId ?? (solutions[0] && solutions[0].id);
  const [activeId, setActiveId] = useState<string | number | undefined>(
    firstId,
  );

  const active = solutions.find((s) => s.id === activeId) ?? solutions[0];

  return (
    <SceneScreen
      title={t(titleKey)}
      subtitle={subtitleKey ? t(subtitleKey) : undefined}
      onBack={onBack}
    >
      <View style={styles.methodRow}>
        {solutions.map((s) => (
          <Pressable
            key={String(s.id)}
            onPress={() => setActiveId(s.id)}
            style={({ pressed }) => [
              styles.methodCard,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.methodTitle}>{s.title}</Text>
            {activeId === s.id && s.description ? (
              <Text style={styles.methodDescription}>{s.description}</Text>
            ) : null}
          </Pressable>
        ))}
      </View>

      <View style={styles.content}>{active && active.component}</View>
    </SceneScreen>
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
  methodDescription: {
    color: "#93A4C3",
    fontSize: 12,
    lineHeight: 18,
    paddingHorizontal: 14,
    paddingTop: 8,
  },
  content: {
    flex: 1,
  },
  pressed: {
    transform: [{ scale: 0.99 }],
  },
});
