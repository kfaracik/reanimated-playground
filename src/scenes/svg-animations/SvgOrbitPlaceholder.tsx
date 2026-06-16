import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const SIZE = 450;
const CX = SIZE / 2;
const CY = SIZE / 2;
const BASE_RADIUS = 50;
const HALF_L = Math.PI * BASE_RADIUS;
const KAPPA = 0.5522847498;

export default function Solution4() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, []);

  const animatedProps = useAnimatedProps(() => {
    const p = progress.value;

    const growth = 1 + 0.5 * Math.pow(p, 2);
    const R = BASE_RADIUS * growth;
    const L = HALF_L * growth;
    const K = R * KAPPA;

    const tCenter = p;
    const tSides = Math.pow(p, 1.4);
    const tEnds = Math.pow(p, 2.4);

    const pct = 0.5;
    const segL = L * pct;
    const hFlatIn = segL / 3;
    const hFlatOut = (L - segL) / 3;

    const x2 = CX;
    const y2 = CY - R * tCenter;

    const cp3_x = CX - hFlatIn + (hFlatIn - K) * tCenter;
    const cp3_y = y2;

    const x1 = CX - segL + (-R + segL) * tSides;
    const y1 = CY;

    const vx1 = 1 - Math.pow(p, 2);
    const vy1 = Math.pow(p, 2);
    const vlen1 = Math.sqrt(vx1 * vx1 + vy1 * vy1);
    const nx1 = vx1 / vlen1;
    const ny1 = vy1 / vlen1;

    const h1_in = hFlatIn + (K - hFlatIn) * tSides;
    const cp2_x = x1 + h1_in * nx1;
    const cp2_y = y1 - h1_in * ny1;

    const h1_out = hFlatOut + (K - hFlatOut) * tSides;
    const cp1_x = x1 - h1_out * nx1;
    const cp1_y = y1 + h1_out * ny1;

    const x0 = CX - L + L * tEnds;
    const y0 = CY + R * tEnds;

    const cp0_x = CX - L + hFlatOut + (L - hFlatOut - K) * tEnds;
    const cp0_y = y0;

    const cp4_x = 2 * CX - cp3_x;
    const cp4_y = cp3_y;

    const x3 = 2 * CX - x1;
    const y3 = y1;

    const cp5_x = 2 * CX - cp2_x;
    const cp5_y = cp2_y;

    const cp6_x = 2 * CX - cp1_x;
    const cp6_y = cp1_y;

    const x4 = 2 * CX - x0;
    const y4 = y0;

    const cp7_x = 2 * CX - cp0_x;
    const cp7_y = cp0_y;

    const d = `M ${x0} ${y0} C ${cp0_x} ${cp0_y}, ${cp1_x} ${cp1_y}, ${x1} ${y1} C ${cp2_x} ${cp2_y}, ${cp3_x} ${cp3_y}, ${x2} ${y2} C ${cp4_x} ${cp4_y}, ${cp5_x} ${cp5_y}, ${x3} ${y3} C ${cp6_x} ${cp6_y}, ${cp7_x} ${cp7_y}, ${x4} ${y4}`;

    return { d };
  });

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <AnimatedPath
          animatedProps={animatedProps}
          stroke="#ff0000"
          strokeWidth={6}
          fill="none"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
