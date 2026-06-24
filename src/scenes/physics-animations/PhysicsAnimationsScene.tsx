import TabbedScene, { SolutionEntry } from "../../app/shared/TabbedScene";
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
