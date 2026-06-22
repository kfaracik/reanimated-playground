import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, { SharedValue } from "react-native-reanimated";
import { SLIDES } from "../constants/slides";
import { useSlideAnimation } from "../hooks/useSlideAnimation";

type SlideItemProps = {
  slide: (typeof SLIDES)[number];
  index: number;
  scrollX: SharedValue<number>;
  width: number;
  height: number;
};

export const SlideItem = React.memo(
  ({ slide, index, scrollX, width, height }: SlideItemProps) => {
    const { animatedImgStyle, animatedTextStyle } = useSlideAnimation(
      index,
      scrollX,
      width,
      SLIDES.length,
    );

    return (
      <View style={[styles.slide, { width, height }]}>
        {slide.isLogo ? (
          <View style={styles.logoSpacer} />
        ) : (
          <Animated.View style={[styles.screenshotContainer, animatedImgStyle]}>
            <Image
              source={slide.image!}
              style={styles.imageScreenshot}
              resizeMode="cover"
            />
          </Animated.View>
        )}

        <Animated.View style={[styles.textContainer, animatedTextStyle]}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.subtitle}>{slide.subtitle}</Text>
        </Animated.View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 70,
  },
  logoSpacer: {
    height: "44%",
    width: "100%",
  },
  screenshotContainer: {
    width: "78%",
    height: "44%",
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#000000",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.55,
    shadowRadius: 20,
  },
  imageScreenshot: {
    width: "115%",
    height: "125%",
    position: "absolute",
    top: "-16%",
    left: "-7%",
  },
  textContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 32,
    marginTop: 36,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "400",
    color: "#A0A0A9",
    textAlign: "center",
    marginTop: 14,
    lineHeight: 23,
  },
});
