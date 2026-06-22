import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface PaginationBarProps {
  index: number;
  scrollX: SharedValue<number>;
  width: number;
}

export const PaginationBar = React.memo(
  ({ index, scrollX, width }: PaginationBarProps) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const indicatorStyle = useAnimatedStyle(() => {
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
      return { opacity, transform: [{ scaleX }] } as ViewStyle;
    });

    return <Animated.View style={[styles.paginationBar, indicatorStyle]} />;
  },
);

const styles = StyleSheet.create({
  paginationBar: {
    width: 20,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FFFFFF",
  },
});
