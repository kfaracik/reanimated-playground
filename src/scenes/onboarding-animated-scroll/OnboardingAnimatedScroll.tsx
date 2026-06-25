import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { BackgroundGradient } from "./components/BackgroundGradient";
import { PaginationBar } from "./components/PaginationBar";
import { SlideItem } from "./components/SlideItem";
import { SLIDES } from "./constants/slides";

type OnboardingProps = {
  onBack: () => void;
};

export default function Onboarding({ onBack }: OnboardingProps) {
  const { width, height } = useWindowDimensions();

  const scrollX = useSharedValue(0);
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.set(event.contentOffset.x);
    },
  });

  const handlePageSelect = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <BackgroundGradient width={width} height={height} scrollX={scrollX} />

      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        bounces={true}
        style={StyleSheet.absoluteFill}
      >
        {SLIDES.map((slide, index) => (
          <SlideItem
            key={slide.id}
            slide={slide}
            index={index}
            scrollX={scrollX}
            width={width}
            height={height}
          />
        ))}
      </Animated.ScrollView>

      <View style={styles.fixedFooter}>
        <View style={styles.paginationContainer}>
          {SLIDES.map((_, index) => (
            <Pressable
              key={index}
              onPress={() => handlePageSelect(index)}
              style={({ pressed }) => [
                styles.paginationTouchTarget,
                pressed && styles.paginationTouchTargetPressed,
              ]}
            >
              <PaginationBar index={index} scrollX={scrollX} width={width} />
            </Pressable>
          ))}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.primaryButtonPressed,
          ]}
          onPress={onBack}
        >
          <Text style={styles.primaryButtonText}>Go Back</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090B",
  },
  fixedFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 50,
    backgroundColor: "transparent",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
  },
  paginationTouchTarget: {
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  paginationTouchTargetPressed: {
    opacity: 0.7,
  },
  primaryButton: {
    width: "100%",
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  primaryButtonPressed: {
    opacity: 0.9,
  },
  primaryButtonText: {
    color: "#09090B",
    fontSize: 16,
    fontWeight: "700",
  },
});
