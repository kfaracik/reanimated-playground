import SceneScreen from "../../app/shared/SceneScreen";
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
    <SceneScreen
      title={t("groups.solarSystem3d.title")}
      subtitle={t("groups.solarSystem3d.description")}
      onBack={onBack}
    >
      <Solution />
    </SceneScreen>
  );
}
