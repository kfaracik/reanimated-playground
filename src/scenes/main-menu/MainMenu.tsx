import { Pressable, StyleSheet, Text, View } from "react-native";

type TranslationFunction = (key: string) => string;

export default function MainMenu({
  t,
  onOpenSolarSystem,
  onOpenSolarSystem3D,
  onOpenSvgAnimations,
  onOpenPhysicsAnimations,
}: {
  t: TranslationFunction;
  onOpenSolarSystem: () => void;
  onOpenSolarSystem3D: () => void;
  onOpenSvgAnimations: () => void;
  onOpenPhysicsAnimations: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>{t("app.title")}</Text>
      </View>

      <View style={styles.list}>
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
          title={t("groups.physicsAnimations.title")}
          description={t("groups.physicsAnimations.description")}
          onPress={onOpenPhysicsAnimations}
        />
      </View>
    </View>
  );
}

function TaskGroupCard({
  title,
  description,
  onPress,
}: {
  title: string;
  description: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardArrow}>{">"}</Text>
      </View>
      <Text style={styles.cardDescription}>{description}</Text>
    </Pressable>
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
  card: {
    borderRadius: 24,
    backgroundColor: "#121a31",
    borderWidth: 1,
    borderColor: "#ffffff14",
    padding: 18,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 6,
  },
  cardPressed: {
    transform: [{ scale: 0.99 }],
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  cardArrow: {
    color: "#7dd3fc",
    fontSize: 24,
    fontWeight: "700",
  },
  cardDescription: {
    color: "#a8b3c9",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
});
