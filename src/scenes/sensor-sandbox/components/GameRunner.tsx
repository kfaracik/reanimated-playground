import React, { useCallback } from "react";
import { Vibration } from "react-native";
import {
  runOnJS,
  SensorType,
  useAnimatedReaction,
  useAnimatedSensor,
  useSharedValue,
} from "react-native-reanimated";
import {
  SensorLevel,
  sensorTypeMap,
  SensorValue,
} from "../constants/gameConfig";
import {
  evaluateSensorAccuracy,
  SensorAccuracy,
} from "../utils/evaluateSensorAccuracy";
import {
  evaluateSmoothOrbitProgress,
  SmoothOrbitProgress,
} from "../utils/evaluateSmoothOrbitProgress";
import { SensorCanvas } from "./SensorCanvas";

type GameRunnerProps = {
  level: SensorLevel;
  onLevelComplete: () => void;
};

type ProgressResult = SensorAccuracy | SmoothOrbitProgress;

export const GameRunner = ({ level, onLevelComplete }: GameRunnerProps) => {
  const sensorType = sensorTypeMap[level];
  const animatedSensor = useAnimatedSensor(
    (sensorType ?? SensorType.GRAVITY) as SensorType.GRAVITY,
    {
      interval: 10,
    },
  );

  const levelProgress = useSharedValue(0);
  const lastVibrationTime = useSharedValue(0);
  const targetGyroAngle = useSharedValue(0);
  const completedGyroAngle = useSharedValue(0);
  const gyroDirection = useSharedValue(0);

  const stableComplete = useCallback(() => {
    onLevelComplete();
  }, [onLevelComplete]);

  const stableHaptic = useCallback((type: "pulse" | "success") => {
    if (type === "success") {
      Vibration.vibrate([0, 100, 50, 200]);
    } else {
      Vibration.vibrate(12);
    }
  }, []);

  useAnimatedReaction(
    () => ({
      sensor: animatedSensor.sensor.value,
      progress: levelProgress.value,
      time: Date.now(),
    }),
    (state) => {
      const currentProgress = state.progress;
      if (currentProgress >= 1) return;

      const data = state.sensor as SensorValue;
      let result: ProgressResult;
      if (level === 2) {
        const smoothOrbitResult = evaluateSmoothOrbitProgress(data, {
          angle: targetGyroAngle.value,
          completedAngle: completedGyroAngle.value,
          direction: gyroDirection.value,
        });

        targetGyroAngle.value = smoothOrbitResult.nextAngle;
        completedGyroAngle.value = smoothOrbitResult.nextCompletedAngle;
        gyroDirection.value = smoothOrbitResult.nextDirection;
        result = smoothOrbitResult;
      } else {
        result = evaluateSensorAccuracy(level, data);
      }

      levelProgress.value = Math.max(
        0,
        Math.min(1, currentProgress + result.delta),
      );

      if (
        levelProgress.value > 0 &&
        levelProgress.value < 1 &&
        result.accuracy > 0
      ) {
        const interval = Math.max(
          50,
          380 - levelProgress.value * 220 - result.accuracy * 110,
        );
        if (state.time - lastVibrationTime.value > interval) {
          runOnJS(stableHaptic)("pulse");
          lastVibrationTime.value = state.time;
        }
      }

      if (levelProgress.value >= 1) {
        levelProgress.value = 1;
        runOnJS(stableHaptic)("success");
        runOnJS(stableComplete)();
      }
    },
    [level, stableComplete, stableHaptic],
  );

  return (
    <SensorCanvas
      level={level}
      levelProgress={levelProgress}
      targetGyroAngle={targetGyroAngle}
      sensorValue={animatedSensor.sensor}
    />
  );
};
