import { StyleSheet, View } from "react-native";
import SceneScreen from "../../app/shared/SceneScreen";
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
    <SceneScreen title={t("skiaGradient.title")} onBack={onBack} framed={false}>
      <View style={styles.stage}>
        <SkiaPathAnimation />
      </View>
    </SceneScreen>
  );
}

const styles = StyleSheet.create({
  stage: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#081025",
  },
});
