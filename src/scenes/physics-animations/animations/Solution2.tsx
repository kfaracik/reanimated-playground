import { StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";

const CONTAINER_SIZE = 300;
const BORDER_WIDTH = 4;
const BALL_DIAMETER = 60;
const BALL_RADIUS = BALL_DIAMETER / 2;

const FRICTION = 0.985;
const ELASTICITY = 0.75;

const minX = BALL_RADIUS;
const maxX = CONTAINER_SIZE - BALL_RADIUS - BORDER_WIDTH * 2;
const minY = BALL_RADIUS;
const maxY = CONTAINER_SIZE - BALL_RADIUS - BORDER_WIDTH * 2;

function clamp(val: number, min: number, max: number) {
  "worklet";
  return Math.max(min, Math.min(max, val));
}

function getDeltaTime(prevTime: SharedValue<number>): number {
  "worklet";
  const now = Date.now();
  const dt = now - prevTime.value;
  prevTime.value = now;
  return dt;
}

export default function PhysicsBall() {
  const x = useSharedValue(CONTAINER_SIZE / 2);
  const y = useSharedValue(CONTAINER_SIZE / 2);

  const prevTimeX = useSharedValue(Date.now());
  const prevTimeY = useSharedValue(Date.now());

  const isGrabbed = useSharedValue(false);

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  useAnimatedReaction(
    () => x.value,
    (currentX, previousX) => {
      if (isGrabbed.value || previousX === null) return;

      const dt = getDeltaTime(prevTimeX);
      if (dt <= 0) return;

      const v = ((currentX - previousX) / dt) * 1000;

      if (currentX <= minX && v < 0) {
        x.value = minX;
        x.value = withDecay({
          velocity: Math.abs(v) * ELASTICITY,
          deceleration: FRICTION,
        });
      } else if (currentX >= maxX && v > 0) {
        x.value = maxX;
        x.value = withDecay({
          velocity: -Math.abs(v) * ELASTICITY,
          deceleration: FRICTION,
        });
      }
    },
  );

  useAnimatedReaction(
    () => y.value,
    (currentY, previousY) => {
      if (isGrabbed.value || previousY === null) return;

      const dt = getDeltaTime(prevTimeY);
      if (dt <= 0) return;

      const v = ((currentY - previousY) / dt) * 1000;

      if (currentY <= minY && v < 0) {
        y.value = minY;
        y.value = withDecay({
          velocity: Math.abs(v) * ELASTICITY,
          deceleration: FRICTION,
        });
      } else if (currentY >= maxY && v > 0) {
        y.value = maxY;
        y.value = withDecay({
          velocity: -Math.abs(v) * ELASTICITY,
          deceleration: FRICTION,
        });
      }
    },
  );

  const panGesture = Gesture.Pan()
    .onStart(() => {
      isGrabbed.value = true;
      startX.value = x.value;
      startY.value = y.value;
    })
    .onUpdate((event) => {
      x.value = clamp(startX.value + event.translationX, minX, maxX);
      y.value = clamp(startY.value + event.translationY, minY, maxY);
    })
    .onEnd((event) => {
      const now = Date.now();
      prevTimeX.value = now;
      prevTimeY.value = now;

      isGrabbed.value = false;

      x.value = withDecay({
        velocity: event.velocityX,
        deceleration: FRICTION,
      });
      y.value = withDecay({
        velocity: event.velocityY,
        deceleration: FRICTION,
      });
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value - BALL_RADIUS },
        { translateY: y.value - BALL_RADIUS },
      ],
      backgroundColor: isGrabbed.value ? "#00bfa5" : "#ff1744",
    };
  });

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.ball, animatedStyle]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: CONTAINER_SIZE,
    height: CONTAINER_SIZE,
    borderWidth: BORDER_WIDTH,
    borderColor: "#444",
    backgroundColor: "#1e1e1e",
    borderRadius: 16,
    overflow: "hidden",
  },
  ball: {
    width: BALL_DIAMETER,
    height: BALL_DIAMETER,
    borderRadius: BALL_RADIUS,
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
});
