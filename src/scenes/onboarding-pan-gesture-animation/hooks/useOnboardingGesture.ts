import { useMemo } from "react";
import { ViewStyle } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import {
    Easing,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { OVERSCROLL_RESISTANCE } from "../constants/constants";

export function useOnboardingGesture(width: number, slidesCount: number) {
  const offsetX = useSharedValue(0);
  const startX = useSharedValue(0);

  const scrollX = useDerivedValue(() => -offsetX.get());
  const maxScroll = useMemo(
    () => (slidesCount - 1) * width,
    [slidesCount, width],
  );

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      startX.set(offsetX.get());
    })
    .onChange((event) => {
      const targetX = startX.get() + event.translationX;
      if (targetX > 0) {
        offsetX.set(targetX * OVERSCROLL_RESISTANCE);
      } else if (targetX < -maxScroll) {
        offsetX.set(-maxScroll + (targetX + maxScroll) * OVERSCROLL_RESISTANCE);
      } else {
        offsetX.set(targetX);
      }
    })
    .onEnd((event) => {
      const slideIndex = -offsetX.get() / width;
      let targetIndex = Math.round(slideIndex);

      if (event.velocityX > 500) {
        targetIndex = Math.max(0, Math.floor(slideIndex));
      } else if (event.velocityX < -500) {
        targetIndex = Math.min(slidesCount - 1, Math.ceil(slideIndex));
      }

      offsetX.set(
        withTiming(-targetIndex * width, {
          duration: 300,
          easing: Easing.out(Easing.cubic),
        }),
      );
    });

  const handlePageSelect = (index: number) => {
    offsetX.set(
      withTiming(-index * width, {
        duration: 350,
        easing: Easing.out(Easing.cubic),
      }),
    );
  };

  const animatedTrackStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offsetX.get(),
        },
      ],
    } as ViewStyle;
  });

  return {
    scrollX,
    panGesture,
    handlePageSelect,
    animatedTrackStyle,
  };
}
