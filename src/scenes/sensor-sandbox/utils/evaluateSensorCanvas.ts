import { ViewStyle } from "react-native";
import { SensorLevel, SensorValue } from "../constants/gameConfig";

export type SensorDotState = {
  translateX: number;
  translateY: number;
  opacity: number;
};

export type SensorCoreState = {
  transform: ViewStyle["transform"];
  backgroundColor: string;
  borderRadius: number;
  width?: number;
  height?: number;
};

export const evaluateSensorDotState = (
  level: SensorLevel,
  data: SensorValue,
  targetGyroAngle: number,
): SensorDotState => {
  "worklet";

  if (level === 3 || level === 4) {
    return {
      translateX: 0,
      translateY: 0,
      opacity: 0,
    };
  }

  if (data.x === undefined || data.y === undefined) {
    return {
      translateX: 0,
      translateY: 0,
      opacity: 1,
    };
  }

  if (level === 1) {
    return {
      translateX: -data.x * 11,
      translateY: data.y * 11,
      opacity: 1,
    };
  }

  if (level === 2) {
    return {
      translateX: Math.sin(targetGyroAngle) * 65,
      translateY: -Math.cos(targetGyroAngle) * 65,
      opacity: 1,
    };
  }

  return {
    translateX: -data.x * 15,
    translateY: data.y * 15,
    opacity: 1,
  };
};

export const evaluateSensorCoreState = (
  level: SensorLevel,
  data: SensorValue,
  progress: number,
  targetGyroAngle: number,
): SensorCoreState => {
  "worklet";

  switch (level) {
    case 1: {
      const transform =
        data.x !== undefined && data.y !== undefined
          ? [
              { translateX: -data.x * 11 },
              { translateY: data.y * 11 },
              { scale: 1 + progress * 0.7 },
            ]
          : [];

      return {
        transform,
        backgroundColor: progress > 0.7 ? "#00FF66" : "#00F5D4",
        borderRadius: 27,
      };
    }
    case 2:
      return {
        transform: [
          { rotate: `${targetGyroAngle}rad` },
          { scaleX: 1 + progress * 2.5 },
          { scaleY: 1 - progress * 0.4 },
        ],
        backgroundColor: "#FFAA00",
        borderRadius: 8,
      };
    case 3: {
      const totalField =
        data.x !== undefined && data.y !== undefined && data.z !== undefined
          ? Math.sqrt(data.x ** 2 + data.y ** 2 + data.z ** 2)
          : 0;
      const fieldScale = Math.min(3.2, 1 + totalField / 95);

      return {
        transform: [{ scale: fieldScale }],
        backgroundColor: progress > 0.5 ? "#00FF66" : "#FF0044",
        borderRadius: 27,
      };
    }
    case 4: {
      if (data.roll === undefined || data.pitch === undefined) {
        return {
          transform: [],
          backgroundColor: "#00F0FF",
          borderRadius: 27,
        };
      }

      const roll = data.roll;
      const pitch = data.pitch;

      return {
        transform: [
          { translateX: (roll * 240) / 2 },
          { translateY: (pitch * 240) / 2 },
        ],
        backgroundColor: progress > 0.8 ? "#00FF66" : "#A200FF",
        borderRadius: 4,
        width: Math.abs(roll) * 240 + 45,
        height: Math.abs(pitch) * 240 + 45,
      };
    }
    case 5: {
      const transform =
        data.x !== undefined && data.y !== undefined
          ? [{ translateX: -data.x * 15 }, { translateY: data.y * 15 }]
          : [];

      return {
        transform,
        backgroundColor: "#2D7FE6",
        borderRadius: 27,
      };
    }
  }
};
