import { useEffect } from "react";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { FULL_ROTATION } from "../constants/dimentsions";

export const usePlanetAnimation = () => {
  const rotation = useSharedValue(0);
  const planetRotation = useSharedValue(0);
  const moonRotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(FULL_ROTATION, { duration: 12000, easing: Easing.linear }),
      -1,
      false,
    );

    planetRotation.value = withRepeat(
      withTiming(-FULL_ROTATION, { duration: 3000, easing: Easing.linear }),
      -1,
      false,
    );

    moonRotation.value = withRepeat(
      withTiming(FULL_ROTATION, { duration: 2500, easing: Easing.linear }),
      -1,
      false,
    );
  }, []);

  const rotationSin = useDerivedValue(() => Math.sin(rotation.value));
  const rotationCos = useDerivedValue(() => Math.cos(rotation.value));
  const planetRotationSin = useDerivedValue(() =>
    Math.sin(planetRotation.value),
  );
  const planetRotationCos = useDerivedValue(() =>
    Math.cos(planetRotation.value),
  );

  return {
    rotation,
    planetRotation,
    moonRotation,
    rotationSin,
    rotationCos,
    planetRotationSin,
    planetRotationCos,
  };
};
