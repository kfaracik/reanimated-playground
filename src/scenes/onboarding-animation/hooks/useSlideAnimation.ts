import { ViewStyle } from "react-native";
import {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedStyle,
} from "react-native-reanimated";

export function useSlideAnimation(
  index: number,
  scrollX: SharedValue<number>,
  width: number,
  slidesLength: number,
) {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const isFirst = index === 0;
  const isLast = index === slidesLength - 1;

  const animatedImgStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.get(),
      inputRange,
      [isFirst ? 1 : 0, 1, isLast ? 1 : 0],
      Extrapolation.CLAMP,
    );

    const scale = interpolate(
      scrollX.get(),
      inputRange,
      [0.85, 1, 0.85],
      Extrapolation.CLAMP,
    );

    return { opacity, transform: [{ scale }] } as ViewStyle;
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.get(),
      inputRange,
      [isFirst ? 1 : 0, 1, isLast ? 1 : 0],
      Extrapolation.CLAMP,
    );

    const translateX = interpolate(
      scrollX.get(),
      inputRange,
      [isFirst ? 0 : width * 0.5, 0, isLast ? 0 : -width * 0.5],
      Extrapolation.CLAMP,
    );

    return { opacity, transform: [{ translateX }] } as ViewStyle;
  });

  return { animatedImgStyle, animatedTextStyle };
}
