import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GameRunner } from "../components/GameRunner";
import { LevelBadge } from "../components/LevelBadge";
import { StickyFooter } from "../components/StickyFooter";
import {
  LEVEL_TRANSLATION_KEYS,
  SensorLevel,
  TranslationFunction,
} from "../constants/gameConfig";

type SensorSandboxProps = {
  t: TranslationFunction;
  onBack: () => void;
};

export default function SensorSandbox({ t, onBack }: SensorSandboxProps) {
  const [activeLevel, setActiveLevel] = useState<SensorLevel>(1);
  const [solvedLevels, setSolvedLevels] = useState<
    Partial<Record<SensorLevel, boolean>>
  >({});
  const [showHint, setShowHint] = useState(false);
  const activeLevelCopy = LEVEL_TRANSLATION_KEYS[activeLevel];

  const handleLevelComplete = () => {
    setSolvedLevels((previous) => ({ ...previous, [activeLevel]: true }));
  };

  const handleLevelSelect = (level: SensorLevel) => {
    setActiveLevel(level);
    setShowHint(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{t("sensorSandbox.title")}</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.hintTrigger, showHint && styles.hintTriggerActive]}
          onPress={() => setShowHint((visible) => !visible)}
        >
          <Text
            style={[
              styles.hintTriggerText,
              showHint && styles.hintTriggerTextActive,
            ]}
          >
            ?
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.badgeWrapper}>
        <LevelBadge
          title={t(activeLevelCopy.title)}
          solvedLabel={t("sensorSandbox.solvedLabel")}
          isSolved={!!solvedLevels[activeLevel]}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.hintContainer}>
          {showHint && (
            <Text style={styles.hintText}>{t(activeLevelCopy.hint)}</Text>
          )}
        </View>

        <GameRunner
          key={activeLevel}
          level={activeLevel}
          onLevelComplete={handleLevelComplete}
        />
      </View>

      <StickyFooter
        activeLevel={activeLevel}
        solvedLevels={solvedLevels}
        onLevelSelect={handleLevelSelect}
      />
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
    height: 40,
    marginBottom: 10,
  },
  backButton: {
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
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
  },
  hintTrigger: {
    position: "absolute",
    right: 0,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#1C1C1E",
    borderWidth: 1,
    borderColor: "#FFFFFF1A",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  hintTriggerActive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
  },
  hintTriggerText: {
    color: "#A1A1AA",
    fontSize: 16,
    fontWeight: "800",
  },
  hintTriggerTextActive: {
    color: "#09090B",
  },
  badgeWrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  section: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 130,
  },
  hintContainer: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 20,
    width: "100%",
  },
  hintText: {
    color: "#71717A",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 18,
  },
});
