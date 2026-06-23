import { SensorLevel, SensorValue } from "../constants/gameConfig";

export type SensorAccuracy = {
  accuracy: number;
  delta: number;
};

export const evaluateSensorAccuracy = (
  level: SensorLevel,
  data: SensorValue,
): SensorAccuracy => {
  "worklet";

  switch (level) {
    case 1: {
      if (
        data.x !== undefined &&
        data.y !== undefined &&
        data.z !== undefined
      ) {
        const gForce =
          Math.sqrt(data.x ** 2 + data.y ** 2 + data.z ** 2) / 9.81;
        if (gForce > 1.2 && gForce < 2.2)
          return { accuracy: 0.8, delta: 0.025 };
        if (gForce >= 2.8) return { accuracy: 0, delta: -0.12 };
      }
      return { accuracy: 0, delta: -0.005 };
    }
    case 2: {
      if (data.z !== undefined) {
        const absSpeed = Math.abs(data.z);
        if (absSpeed > 0.5 && absSpeed < 6.0)
          return { accuracy: Math.min(1, absSpeed / 2.0), delta: 0.014 };
      }
      return { accuracy: 0, delta: -0.012 };
    }
    case 3: {
      if (
        data.x !== undefined &&
        data.y !== undefined &&
        data.z !== undefined
      ) {
        const totalField = Math.sqrt(data.x ** 2 + data.y ** 2 + data.z ** 2);
        if (totalField > 115)
          return {
            accuracy: Math.min(1, (totalField - 115) / 100),
            delta: 0.008,
          };
      }
      return { accuracy: 0, delta: -0.015 };
    }
    case 4: {
      if (data.roll !== undefined && data.pitch !== undefined) {
        const totalError =
          Math.abs(Math.abs(data.roll) - 1.1) +
          Math.abs(Math.abs(data.pitch) - 1.1);
        if (totalError < 0.45)
          return { accuracy: 1 - totalError / 0.45, delta: 0.005 };
      }
      return { accuracy: 0, delta: -0.015 };
    }
    case 5: {
      if (data.x !== undefined && data.y !== undefined) {
        const dist = Math.sqrt(data.x ** 2 + data.y ** 2);
        if (dist < 1.2) return { accuracy: 1, delta: 0.005 };
      }
      return { accuracy: 0, delta: -0.02 };
    }
    default:
      return { accuracy: 0, delta: -0.005 };
  }
};
