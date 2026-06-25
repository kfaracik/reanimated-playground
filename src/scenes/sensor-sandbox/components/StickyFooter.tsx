import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SENSOR_LEVELS, SensorLevel } from "../constants/gameConfig";

type StickyFooterProps = {
  activeLevel: SensorLevel;
  solvedLevels: Partial<Record<SensorLevel, boolean>>;
  onLevelSelect: (level: SensorLevel) => void;
};

export const StickyFooter = ({
  activeLevel,
  solvedLevels,
  onLevelSelect,
}: StickyFooterProps) => (
  <View style={styles.stickyFooter}>
    <View style={styles.buttonGrid}>
      {SENSOR_LEVELS.map((level) => (
        <Pressable
          key={level}
          style={({ pressed }) => [
            styles.button,
            activeLevel === level && styles.buttonActive,
            solvedLevels[level] && styles.buttonSolved,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => onLevelSelect(level)}
        >
          <Text
            style={[
              styles.buttonText,
              activeLevel === level && styles.buttonTextActive,
              solvedLevels[level] && styles.buttonTextSolvedCombo,
            ]}
          >
            {level}
          </Text>
        </Pressable>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  stickyFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 35,
    backgroundColor: "#09090B",
    borderTopWidth: 1,
    borderColor: "#FFFFFF08",
    paddingTop: 15,
  },
  buttonGrid: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    flex: 1,
    height: 50,
    backgroundColor: "#18181B",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFFFFF0A",
  },
  buttonActive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
  },
  buttonSolved: {
    borderColor: "#00E6764D",
    backgroundColor: "#00E67614",
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: "#71717A",
    fontSize: 15,
    fontWeight: "800",
  },
  buttonTextActive: {
    color: "#09090B",
  },
  buttonTextSolvedCombo: {
    color: "#00E676",
  },
});
