import { vec } from "@shopify/react-native-skia";
import { useEffect, useMemo } from "react";
import {
    Easing,
    Extrapolation,
    interpolate,
    SharedValue,
    useDerivedValue,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

export function useBackgroundAnimation(
  width: number,
  height: number,
  scrollX: SharedValue<number>,
) {
  const blob1X = useSharedValue(width * 0.2);
  const blob1Y = useSharedValue(height * 0.3);
  const blob2X = useSharedValue(width * 0.8);
  const blob2Y = useSharedValue(height * 0.7);

  useEffect(() => {
    blob1X.set(
      withRepeat(
        withTiming(width * 0.7, {
          duration: 12000,
          easing: Easing.inOut(Easing.sin),
        }),
        -1,
        true,
      ),
    );
    blob1Y.set(
      withRepeat(
        withTiming(height * 0.5, {
          duration: 15000,
          easing: Easing.inOut(Easing.sin),
        }),
        -1,
        true,
      ),
    );

    blob2X.set(
      withRepeat(
        withTiming(width * 0.3, {
          duration: 14000,
          easing: Easing.inOut(Easing.sin),
        }),
        -1,
        true,
      ),
    );
    blob2Y.set(
      withRepeat(
        withTiming(height * 0.4, {
          duration: 11000,
          easing: Easing.inOut(Easing.sin),
        }),
        -1,
        true,
      ),
    );
  }, [width, height, blob1X, blob1Y, blob2X, blob2Y]);

  const gradientStartY = useDerivedValue(() => {
    return interpolate(
      scrollX.get(),
      [0, width],
      [height * 0.55, height * 0.25],
      Extrapolation.CLAMP,
    );
  });

  const gradientStartVec = useDerivedValue(() => vec(0, gradientStartY.get()));
  const gradientEndVec = useMemo(() => vec(0, height), [height]);

  return {
    blob1X,
    blob1Y,
    blob2X,
    blob2Y,
    gradientStartVec,
    gradientEndVec,
  };
}
