import { StyleSheet, View } from "react-native";
import SceneScreen from "../../app/shared/SceneScreen";
import SvgOrbitPlaceholder from "./SvgOrbitPlaceholder";

type TranslationFunction = (key: string) => string;

export default function SvgAnimationsScene({
  t,
  onBack,
}: {
  t: TranslationFunction;
  onBack: () => void;
}) {
  return (
    <SceneScreen
      title={t("svgAnimations.title")}
      subtitle={t("svgAnimations.subtitle")}
      onBack={onBack}
      contentCentered
    >
      <View style={styles.stage}>
        <SvgOrbitPlaceholder />
      </View>
    </SceneScreen>
  );
}

const styles = StyleSheet.create({
  stage: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
});
