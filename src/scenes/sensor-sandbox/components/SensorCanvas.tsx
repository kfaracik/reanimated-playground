import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { SensorLevel, SensorValue } from "../constants/gameConfig";
import {
  evaluateSensorCoreState,
  evaluateSensorDotState,
} from "../utils/evaluateSensorCanvas";

type SensorCanvasProps = {
  level: SensorLevel;
  levelProgress: SharedValue<number>;
  targetGyroAngle: SharedValue<number>;
  sensorValue: {
    value: SensorValue;
    get: () => SensorValue;
  };
};

export const SensorCanvas = ({
  level,
  levelProgress,
  targetGyroAngle,
  sensorValue,
}: SensorCanvasProps) => {
  const fillingCircleStyle = useAnimatedStyle(() => {
    const progress = levelProgress.get();

    return {
      transform: [{ scale: progress }],
      opacity: progress * 0.95,
      backgroundColor: progress > 0.8 ? "#00FF66" : "#00F0FF",
    };
  });

  const outerEdgeRingStyle = useAnimatedStyle(() => {
    const progress = levelProgress.get();

    return {
      borderColor: progress > 0.8 ? "#00FF66" : "#00F0FF",
      borderWidth: 2 + progress * 8,
      shadowRadius: 12 + progress * 35,
      shadowOpacity: 0.4 + progress * 0.6,
    };
  });

  const sensorDotStyle = useAnimatedStyle(() => {
    const data = sensorValue.get();
    const dotState = evaluateSensorDotState(
      level,
      data,
      targetGyroAngle.get(),
    );

    return {
      transform: [
        { translateX: dotState.translateX },
        { translateY: dotState.translateY },
      ],
      opacity: dotState.opacity,
    };
  });

  const coreObjectStyle = useAnimatedStyle(() => {
    const progress = levelProgress.get();
    const data = sensorValue.get();
    const coreState = evaluateSensorCoreState(
      level,
      data,
      progress,
      targetGyroAngle.get(),
    );

    return {
      transform: coreState.transform,
      backgroundColor: coreState.backgroundColor,
      borderRadius: coreState.borderRadius,
      width: coreState.width,
      height: coreState.height,
    };
  });

  return (
    <View style={styles.canvas}>
      <Animated.View style={[styles.liquidFill, fillingCircleStyle]} />
      <Animated.View style={[styles.absoluteRingEdge, outerEdgeRingStyle]} />

      {level === 5 && <View style={styles.bubbleCenterTarget} />}
      {level === 3 && <View style={styles.radarWaveStatic} />}
      {level === 2 && <View style={styles.gyroOrbitGuideLine} />}

      <View style={styles.gridLineV} />
      <View style={styles.gridLineH} />

      <Animated.View style={[styles.ball, coreObjectStyle]} />
      <Animated.View style={[styles.sensorDot, sensorDotStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  canvas: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#020205",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "#FFFFFF05",
  },
  liquidFill: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    zIndex: 1,
  },
  absoluteRingEdge: {
    position: "absolute",
    width: 298,
    height: 298,
    borderRadius: 149,
    zIndex: 4,
    shadowColor: "#00F0FF",
    shadowOffset: { width: 0, height: 0 },
  },
  gridLineV: {
    position: "absolute",
    width: 1,
    height: "100%",
    backgroundColor: "#FFFFFF0F",
  },
  gridLineH: {
    position: "absolute",
    height: 1,
    width: "100%",
    backgroundColor: "#FFFFFF0F",
  },
  bubbleCenterTarget: {
    position: "absolute",
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#297FE666",
    zIndex: 2,
  },
  radarWaveStatic: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: "#FF004424",
    borderStyle: "dashed",
    zIndex: 2,
  },
  gyroOrbitGuideLine: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 1,
    borderColor: "#FFAA0014",
    borderStyle: "solid",
    zIndex: 2,
  },
  ball: {
    width: 54,
    height: 54,
    borderRadius: 27,
    zIndex: 5,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  sensorDot: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF0055",
    zIndex: 6,
    shadowColor: "#FF0055",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
});
