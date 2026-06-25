import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type SceneScreenProps = {
  title: string;
  onBack: () => void;
  children: ReactNode;
  subtitle?: string;
  rightAction?: ReactNode;
  footer?: ReactNode;
  framed?: boolean;
  contentCentered?: boolean;
  contentPaddingBottom?: number;
};

export default function SceneScreen({
  title,
  onBack,
  children,
  subtitle,
  rightAction,
  footer,
  framed = true,
  contentCentered = false,
  contentPaddingBottom = 0,
}: SceneScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Pressable
          style={({ pressed }) => [
            styles.headerButton,
            pressed && styles.headerButtonPressed,
          ]}
          onPress={onBack}
        >
          <Text style={styles.headerButtonText}>{"<"}</Text>
        </Pressable>

        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>

        <View style={styles.rightAction}>{rightAction}</View>
      </View>

      <View
        style={[
          styles.content,
          framed && styles.framedContent,
          contentCentered && styles.contentCentered,
          { paddingBottom: contentPaddingBottom },
        ]}
      >
        {children}
      </View>

      {footer}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    backgroundColor: "#09090B",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    minHeight: 40,
    marginBottom: 20,
  },
  headerButton: {
    position: "absolute",
    left: 0,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#1C1C1E",
    borderWidth: 1,
    borderColor: "#FFFFFF14",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  headerButtonPressed: {
    opacity: 0.75,
  },
  headerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  titleWrapper: {
    maxWidth: "72%",
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
  },
  subtitle: {
    color: "#71717A",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
    marginTop: 6,
    textAlign: "center",
  },
  rightAction: {
    position: "absolute",
    right: 0,
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  framedContent: {
    borderRadius: 28,
    backgroundColor: "#10172B",
    borderWidth: 1,
    borderColor: "#FFFFFF12",
    overflow: "hidden",
  },
  contentCentered: {
    alignItems: "center",
    justifyContent: "center",
  },
});
