import {
  BlurMask,
  Canvas,
  Circle,
  Fill,
  ImageShader,
  LinearGradient,
  Path,
  Skia,
  useImage,
  vec,
} from "@shopify/react-native-skia";
import React, { useEffect, useMemo } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const SkiaPathAnimation = () => {
  const { width, height } = useWindowDimensions();
  const progress = useSharedValue(0);

  const image = useImage(require("../../../assets/images/map.png"));

  const path =
    "M 172.3 92.2 Q 180 90, 187.9 138.7 L 202.1 136.3 Q 210 135, 216.9 139.1 " +
    "L 228.1 145.9 Q 235 150, 230.9 156.9 L 224.1 168.1 Q 220 175, 227.2 178.6 " +
    "L 242.8 186.4 Q 250 190, 257.2 186.4 L 272.8 178.6 Q 280 175, 285.7 180.7 " +
    "L 299.3 194.3 Q 305 200, 298.9 205.1 L 281.1 219.9 Q 275 225, 280.7 230.7 " +
    "L 294.3 244.3 Q 300 250, 293.9 255.1 L 276.1 269.9 Q 270 275, 263.1 279.1 " +
    "L 251.9 285.9 Q 245 290, 252.8 291.7 L 282.2 298.3 Q 290 300, 282.3 302.3 " +
    "L 247.7 312.7 Q 240 315, 247.8 316.7 L 277.2 323.3 Q 285 325, 277.3 327.3 " +
    "L 242.7 337.7 Q 235 340, 242.8 341.7 L 272.2 348.3 Q 280 350, 272.3 352.3 " +
    "L 237.7 362.7 Q 230 365, 237.8 366.7 L 267.2 373.3 Q 275 375, 267.3 377.3 " +
    "L 232.7 387.7 Q 225 390, 232.8 391.7 L 262.2 398.3 Q 270 400, 274.4 406.7 " +
    "L 285.6 423.3 Q 290 430, 284.3 435.7 L 265.7 454.3 Q 260 460, 264.4 466.7 " +
    "L 275.6 483.3 Q 280 490, 273.6 494.8 L 246.4 515.2 Q 240 520, 233.3 515.6 " +
    "L 216.7 504.4 Q 210 500, 205.6 506.7 L 194.4 523.3 Q 190 530, 196.7 534.4 " +
    "L 213.3 545.6 Q 220 550, 212.4 552.5 L 182.6 562.5 Q 175 565, 181.9 569.0 " +
    "L 203.1 581.0 Q 210 585, 202.4 587.5 L 172.6 597.5 Q 165 600, 171.9 604.0 " +
    "L 193.1 616.0 Q 200 620, 192.7 623.2 L 162.3 636.8 Q 155 640, 161.1 645.1 " +
    "L 178.9 659.9 Q 185 665, 177.7 668.2 L 147.3 681.8 Q 140 685, 142.5 692.6 " +
    "L 147.5 707.4 Q 150 715, 142.8 711.4 L 127.2 703.6 Q 120 700, 116.8 692.6 " +
    "L 108.2 672.4 Q 105 665, 110.1 658.9 L 124.9 641.1 Q 130 635, 123.1 631.0 " +
    "L 101.9 619.0 Q 95 615, 100.1 608.9 L 114.9 591.1 Q 120 585, 113.5 580.4 " +
    "L 91.5 564.6 Q 85 560, 89.6 553.5 L 105.4 531.5 Q 110 525, 103.9 519.8 " +
    "L 81.1 500.2 Q 75 495, 81.4 490.2 L 108.6 469.8 Q 115 465, 108.9 459.8 " +
    "L 86.1 440.2 Q 80 435, 87.0 431.1 L 118.0 413.9 Q 125 410, 120.1 403.7 " +
    "L 94.9 371.3 Q 90 365, 96.3 360.1 L 128.7 334.9 Q 135 330, 129.7 324.0 " +
    "L 105.3 296.0 Q 100 290, 106.0 284.7 L 139.0 255.3 Q 145 250, 140.2 243.6 " +
    "L 119.8 216.4 Q 115 210, 121.0 204.7 L 149.0 180.3 Q 155 175, 152.0 167.6 " +
    "L 148.0 157.4 Q 145 150, 152.7 147.8 L 172.3 92.2 Z";

  const indicatorLength = 0.01;
  const tailLength = 0.03;

  const skiaPath = useMemo(() => Skia.Path.MakeFromSVGString(path)!, []);

  const contour = useMemo(() => {
    const iter = Skia.ContourMeasureIter(skiaPath, false, 1);
    return iter.next();
  }, [skiaPath]);

  useEffect(() => {
    progress.set(withTiming(1, { duration: 10000, easing: Easing.linear }));
  }, []);

  const indicatorEnd = useDerivedValue(() => progress.get());
  const indicatorStart = useDerivedValue(() =>
    Math.max(0, progress.get() - indicatorLength),
  );

  const tailPathEnd = useDerivedValue(() => indicatorStart.get());
  const tailPathStart = useDerivedValue(() =>
    Math.max(0, progress.get() - indicatorLength - tailLength),
  );

  const mainPathEnd = useDerivedValue(() => tailPathStart.get());

  const indicatorCoords = useDerivedValue(() => {
    if (contour) {
      const distance = progress.get() * contour.length();
      const [position] = contour.getPosTan(distance);
      return { x: position.x, y: position.y };
    }
    return { x: 172.3, y: 92.2 };
  });

  const cx = useDerivedValue(() => indicatorCoords.get().x);
  const cy = useDerivedValue(() => indicatorCoords.get().y);

  const tailEndVec = useDerivedValue(() => {
    if (contour) {
      const distance = tailPathEnd.get() * contour.length();
      const [position] = contour.getPosTan(distance);
      return vec(position.x, position.y);
    }
    return vec(172.3, 92.2);
  });

  const tailStartVec = useDerivedValue(() => {
    if (contour) {
      const distance = tailPathStart.get() * contour.length();
      const [position] = contour.getPosTan(distance);
      return vec(position.x, position.y);
    }
    return vec(172.3, 92.2);
  });

  if (!image) {
    return null;
  }

  return (
    <Canvas style={styles.canvas}>
      <Fill>
        <ImageShader
          image={image}
          fit="cover"
          rect={{ x: 0, y: 0, width, height }}
        />
      </Fill>

      <Path
        path={path}
        style="stroke"
        strokeWidth={5}
        strokeCap="round"
        strokeJoin="round"
        color="#ffffff25"
      />

      <Path
        path={path}
        style="stroke"
        strokeWidth={5}
        strokeCap="butt"
        strokeJoin="miter"
        start={0}
        end={mainPathEnd}
      >
        <LinearGradient
          start={vec(172.3, 92.2)}
          end={vec(310, 715)}
          colors={[
            "#FF0000",
            "#FF5E00",
            "#FFAA00",
            "#FFD600",
            "#00FF66",
            "#00E1FF",
            "#0072FF",
            "#4B0082",
          ]}
        />
      </Path>

      <Path
        path={path}
        style="stroke"
        strokeWidth={9}
        strokeCap="butt"
        strokeJoin="miter"
        opacity={0.35}
        start={tailPathStart}
        end={tailPathEnd}
      >
        <BlurMask blur={4} style="normal" />
        <LinearGradient
          start={tailEndVec}
          end={tailStartVec}
          colors={["#FF007A", "#FF007A00"]}
        />
      </Path>

      <Path
        path={path}
        style="stroke"
        strokeWidth={5}
        strokeCap="butt"
        strokeJoin="miter"
        start={tailPathStart}
        end={tailPathEnd}
      >
        <LinearGradient
          start={tailEndVec}
          end={tailStartVec}
          colors={["#FF007A", "#FF007A00"]}
        />
      </Path>

      <Path
        path={path}
        style="stroke"
        strokeWidth={9}
        strokeCap="butt"
        strokeJoin="miter"
        color="#ffffff"
        opacity={0.4}
        start={indicatorStart}
        end={indicatorEnd}
      >
        <BlurMask blur={5} style="normal" />
      </Path>
      <Circle cx={cx} cy={cy} r={4.5} color="#ffffff" opacity={0.4}>
        <BlurMask blur={5} style="normal" />
      </Circle>

      <Path
        path={path}
        style="stroke"
        strokeWidth={5}
        strokeCap="butt"
        strokeJoin="miter"
        color="#ffffff"
        start={indicatorStart}
        end={indicatorEnd}
      />
      <Circle cx={cx} cy={cy} r={2.5} color="#ffffff" />
    </Canvas>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
});
