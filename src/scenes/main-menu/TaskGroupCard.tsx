import { Pressable, StyleSheet, Text, View } from "react-native";

type TaskGroupCardProps = {
  title: string;
  description: string;
  onPress: () => void;
};

export default function TaskGroupCard({
  title,
  description,
  onPress,
}: TaskGroupCardProps) {
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
    marginBottom: 8,
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
