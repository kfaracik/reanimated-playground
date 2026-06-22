import React from "react";
import { StyleSheet } from "react-native";
import Animated, { SharedValue } from "react-native-reanimated";
import { usePaginationAnimation } from "../hooks/usePaginationAnimation";

interface PaginationBarProps {
  index: number;
  scrollX: SharedValue<number>;
  width: number;
}

export const PaginationBar = React.memo(
  ({ index, scrollX, width }: PaginationBarProps) => {
    const indicatorStyle = usePaginationAnimation(index, scrollX, width);

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
