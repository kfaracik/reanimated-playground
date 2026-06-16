import { StyleSheet } from "react-native";
import TabbedScene, { SolutionEntry } from "../shared/TabbedScene";
import Solution1 from "./animations/Solution1";
import Solution2 from "./animations/Solution2";

type TranslationFunction = (key: string) => string;

export default function PhysicsAnimationsScene({
  t,
  onBack,
}: {
  t: TranslationFunction;
  onBack: () => void;
}) {
  const solutions: SolutionEntry[] = [
    {
      id: "solution1",
      title: "Solution 1",
      description: "Example using useFrameCallback.",
      component: <Solution1 />,
    },
    {
      id: "solution2",
      title: "Solution 2",
      description: "Example using withDecay and useDerivedValue.",
      component: <Solution2 />,
    },
  ];

  return (
    <TabbedScene
      t={t}
      titleKey="physicsAnimations.title"
      subtitleKey="physicsAnimations.subtitle"
      backLabelKey="physicsAnimations.back"
      onBack={onBack}
      solutions={solutions}
    />
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
