import { SensorType } from "react-native-reanimated";

export type TranslationFunction = (key: string) => string;

export type SensorValue = {
  x?: number;
  y?: number;
  z?: number;
  roll?: number;
  pitch?: number;
};

export const SENSOR_LEVELS = [1, 2, 3, 4, 5] as const;

export type SensorLevel = (typeof SENSOR_LEVELS)[number];

export const sensorTypeMap: Record<SensorLevel, SensorType> = {
  1: SensorType.ACCELEROMETER,
  2: SensorType.GYROSCOPE,
  3: SensorType.MAGNETIC_FIELD,
  4: SensorType.ROTATION,
  5: SensorType.GRAVITY,
};

export const LEVEL_TRANSLATION_KEYS: Record<
  SensorLevel,
  { title: string; hint: string }
> = {
  1: {
    title: "sensorSandbox.levels.accelerometer.title",
    hint: "sensorSandbox.levels.accelerometer.hint",
  },
  2: {
    title: "sensorSandbox.levels.gyroscope.title",
    hint: "sensorSandbox.levels.gyroscope.hint",
  },
  3: {
    title: "sensorSandbox.levels.magneticField.title",
    hint: "sensorSandbox.levels.magneticField.hint",
  },
  4: {
    title: "sensorSandbox.levels.rotation.title",
    hint: "sensorSandbox.levels.rotation.hint",
  },
  5: {
    title: "sensorSandbox.levels.gravity.title",
    hint: "sensorSandbox.levels.gravity.hint",
  },
};
