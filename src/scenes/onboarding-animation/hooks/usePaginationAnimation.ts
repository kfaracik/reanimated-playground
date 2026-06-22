import { ViewStyle } from "react-native";
import {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedStyle,
} from "react-native-reanimated";

export function usePaginationAnimation(
  index: number,
  scrollX: SharedValue<number>,
  width: number,
) {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const opacity = interpolate(
      scrollX.get(),
      inputRange,
      [0.3, 1, 0.3],
      Extrapolation.CLAMP,
    );

    const scaleX = interpolate(
      scrollX.get(),
      inputRange,
      [1, 1.6, 1],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      transform: [{ scaleX }],
    } as ViewStyle;
  });

  return animatedStyle;
}
