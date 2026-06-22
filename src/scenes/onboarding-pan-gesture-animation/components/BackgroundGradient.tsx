import {
  BlurMask,
  Canvas,
  Circle,
  LinearGradient,
  Rect,
} from "@shopify/react-native-skia";
import React from "react";
import { StyleSheet } from "react-native";
import { SharedValue } from "react-native-reanimated";
import { useBackgroundAnimation } from "../hooks/useBackgroundAnimation";

interface BackgroundGradientProps {
  width: number;
  height: number;
  scrollX: SharedValue<number>;
}

export const BackgroundGradient = React.memo(
  ({ width, height, scrollX }: BackgroundGradientProps) => {
    const { blob1X, blob1Y, blob2X, blob2Y, gradientStartVec, gradientEndVec } =
      useBackgroundAnimation(width, height, scrollX);

    return (
      <Canvas style={StyleSheet.absoluteFill}>
        <Rect x={0} y={0} width={width} height={height} color="#09090B" />

        <Circle cx={blob1X} cy={blob1Y} r={140} color="#FF0055">
          <BlurMask blur={90} style="normal" />
        </Circle>

        <Circle cx={blob2X} cy={blob2Y} r={160} color="#0066FF">
          <BlurMask blur={100} style="normal" />
        </Circle>

        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={gradientStartVec}
            end={gradientEndVec}
            colors={["#00000000", "#09090B", "#09090B"]}
            positions={[0, 0.3, 1]}
          />
        </Rect>
      </Canvas>
    );
  },
);
