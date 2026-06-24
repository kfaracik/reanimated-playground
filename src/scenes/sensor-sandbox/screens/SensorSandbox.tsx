import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SceneScreen from "../../../app/shared/SceneScreen";
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
    <SceneScreen
      title={t("sensorSandbox.title")}
      onBack={onBack}
      framed={false}
      contentCentered
      contentPaddingBottom={130}
      rightAction={
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
      }
      footer={
        <StickyFooter
          activeLevel={activeLevel}
          solvedLevels={solvedLevels}
          onLevelSelect={handleLevelSelect}
        />
      }
    >
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
    </SceneScreen>
  );
}

const styles = StyleSheet.create({
  hintTrigger: {
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
    width: "100%",
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
