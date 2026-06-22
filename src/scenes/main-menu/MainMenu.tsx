import { ScrollView, StyleSheet, Text, View } from "react-native";
import TaskGroupCard from "./TaskGroupCard";

type TranslationFunction = (key: string) => string;

export default function MainMenu({
  t,
  onOpenSolarSystem,
  onOpenSolarSystem3D,
  onOpenKeyboardAvoiding,
  onOpenSvgAnimations,
  onOpenPhysicsAnimations,
  onOpenSkiaGradient,
  onOnboardingAnimation,
  onOpenOnboardingAnimatedScroll,
}: {
  t: TranslationFunction;
  onOpenSolarSystem: () => void;
  onOpenSolarSystem3D: () => void;
  onOpenKeyboardAvoiding: () => void;
  onOpenSvgAnimations: () => void;
  onOpenPhysicsAnimations: () => void;
  onOpenSkiaGradient?: () => void;
  onOnboardingAnimation?: () => void;
  onOpenOnboardingAnimatedScroll?: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>{t("app.title")}</Text>
      </View>
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        <TaskGroupCard
          title={t("groups.solarSystem.title")}
          description={t("groups.solarSystem.description")}
          onPress={onOpenSolarSystem}
        />
        <TaskGroupCard
          title={t("groups.solarSystem3d.title")}
          description={t("groups.solarSystem3d.description")}
          onPress={onOpenSolarSystem3D}
        />
        <TaskGroupCard
          title={t("groups.svgAnimations.title")}
          description={t("groups.svgAnimations.description")}
          onPress={onOpenSvgAnimations}
        />
        <TaskGroupCard
          title={t("groups.keyboard.title")}
          description={t("groups.keyboard.description")}
          onPress={onOpenKeyboardAvoiding}
        />
        <TaskGroupCard
          title={t("groups.physicsAnimations.title")}
          description={t("groups.physicsAnimations.description")}
          onPress={onOpenPhysicsAnimations}
        />
        {onOpenSkiaGradient && (
          <TaskGroupCard
            title={t("groups.skiaGradient.title")}
            description={t("groups.skiaGradient.description")}
            onPress={onOpenSkiaGradient}
          />
        )}
        {onOnboardingAnimation && (
          <TaskGroupCard
            title={t("groups.onboarding.title")}
            description={t("groups.onboarding.description")}
            onPress={onOnboardingAnimation}
          />
        )}
        {onOpenOnboardingAnimatedScroll && (
          <TaskGroupCard
            title={t("groups.onboardingAnimatedScroll.title")}
            description={t("groups.onboardingAnimatedScroll.description")}
            onPress={onOpenOnboardingAnimatedScroll}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  hero: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  list: {
    flex: 1,
    gap: 14,
  },
});
