import { SensorValue } from "../constants/gameConfig";

const FULL_ROTATION = Math.PI * 2;
const MIN_SMOOTH_SPEED = 0.2;
const MAX_SMOOTH_SPEED = 7;
const DIRECTION_RESET_THRESHOLD = 0.4;
const ORBIT_PROGRESS_GAIN = 1.25;

export type SmoothOrbitState = {
  angle: number;
  completedAngle: number;
  direction: number;
};

export type SmoothOrbitProgress = {
  nextAngle: number;
  nextCompletedAngle: number;
  nextDirection: number;
  accuracy: number;
  delta: number;
};

export const evaluateSmoothOrbitProgress = (
  data: SensorValue,
  state: SmoothOrbitState,
): SmoothOrbitProgress => {
  "worklet";

  if (data.z === undefined) {
    return {
      nextAngle: state.angle,
      nextCompletedAngle: state.completedAngle,
      nextDirection: state.direction,
      accuracy: 0,
      delta: -0.012,
    };
  }

  const speed = data.z;
  const absSpeed = Math.abs(speed);

  if (absSpeed < MIN_SMOOTH_SPEED || absSpeed > MAX_SMOOTH_SPEED) {
    return {
      nextAngle: state.angle,
      nextCompletedAngle: Math.max(0, state.completedAngle - 0.018),
      nextDirection: state.direction,
      accuracy: 0,
      delta: -0.004,
    };
  }

  const direction = speed > 0 ? 1 : -1;
  const directionChanged =
    state.direction !== 0 &&
    state.direction !== direction &&
    absSpeed > DIRECTION_RESET_THRESHOLD;
  const stepAngle = Math.min(absSpeed * 0.075, 0.3);
  const nextAngle = state.angle + direction * stepAngle;

  if (directionChanged) {
    return {
      nextAngle,
      nextCompletedAngle: Math.max(0, state.completedAngle - 0.08),
      nextDirection: direction,
      accuracy: 0,
      delta: -0.01,
    };
  }

  const nextCompletedAngle = Math.min(
    FULL_ROTATION,
    state.completedAngle + stepAngle,
  );
  const completedStep = nextCompletedAngle - state.completedAngle;
  const accuracy = Math.min(1, absSpeed / 2.2);
  const delta = (completedStep / FULL_ROTATION) * ORBIT_PROGRESS_GAIN;

  return {
    nextAngle,
    nextCompletedAngle,
    nextDirection: direction,
    accuracy,
    delta,
  };
};
