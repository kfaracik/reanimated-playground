import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";

export default function SvgOrbitPlaceholder() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 240 240"
          style={styles.svg}
        >
          <Circle
            cx="120"
            cy="120"
            r="88"
            stroke="#1d4ed8"
            strokeWidth="3"
            strokeDasharray="10 10"
            fill="none"
          />
          <Circle cx="120" cy="120" r="16" fill="#facc15" />
          <Line
            x1="120"
            y1="44"
            x2="120"
            y2="196"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </Svg>
      </View>

      <Text style={styles.title}>{t("svgAnimations.placeholderTitle")}</Text>
      <Text style={styles.description}>
        {t("svgAnimations.placeholderDescription")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flex: 1,
  },
  card: {
    width: 260,
    height: 260,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#ffffff1f",
    backgroundColor: "#10172b",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 6,
  },
  svg: {
    width: "100%",
    height: "100%",
  },
  title: {
    marginTop: 20,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  description: {
    marginTop: 8,
    color: "#94a3b8",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 24,
  },
});