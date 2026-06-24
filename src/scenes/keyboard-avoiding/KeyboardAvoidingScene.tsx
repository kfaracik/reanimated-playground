import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SceneScreen from "../../app/shared/SceneScreen";
import { KeyboardAvoiding } from "./KeyboardAvoiding";
import { KeyboardAvoiding as KeyboardAvoidingScrollView } from "./KeyboardAvoidingScrollView";

type TranslationFunction = (key: string) => string;

export default function KeyboardAvoidingScene({
  t,
  onBack,
}: {
  t: TranslationFunction;
  onBack: () => void;
}) {
  const [method, setMethod] = useState<"animated" | "scrollview">("animated");
  return (
    <SceneScreen
      title={t("keyboardAvoiding.title")}
      subtitle={t("keyboardAvoiding.subtitle")}
      onBack={onBack}
    >
      <View style={styles.content}>
        <View style={styles.methodRow}>
          <MethodButton
            title={t("keyboardAvoiding.animated")}
            description={t("keyboardAvoiding.animatedDescription")}
            active={method === "animated"}
            onPress={() => setMethod("animated")}
          />
          <MethodButton
            title={t("keyboardAvoiding.scrollView")}
            description={t("keyboardAvoiding.scrollViewDescription")}
            active={method === "scrollview"}
            onPress={() => setMethod("scrollview")}
          />
        </View>

        {method === "animated" ? (
          <KeyboardAvoiding />
        ) : (
          <KeyboardAvoidingScrollView />
        )}
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
  content: {
    flex: 1,
  },
  methodRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -6,
    marginBottom: 14,
  },
  methodCard: {
    width: "33%",
    minWidth: 160,
    padding: 8,
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
  pressed: {
    transform: [{ scale: 0.99 }],
  },
});
