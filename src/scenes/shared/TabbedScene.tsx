import { ReactNode, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
  backLabelKey,
  onBack,
  solutions,
  initialId,
}: {
  t: TranslationFunction;
  titleKey: string;
  subtitleKey?: string;
  backLabelKey: string;
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={onBack}
          style={({ pressed }) => [pressed && styles.pressed]}
        >
          <Text style={styles.backButtonText}>{t(backLabelKey)}</Text>
        </Pressable>
        <Text style={styles.title}>{t(titleKey)}</Text>
        {subtitleKey ? (
          <Text style={styles.subtitle}>{t(subtitleKey)}</Text>
        ) : null}
      </View>

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

      <View style={styles.stage}>{active && active.component}</View>
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
  backButtonText: {
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
