import { useEffect } from "react";
import { Keyboard, Platform } from "react-native";
import {
  SharedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export function useKeyboardHeight(): SharedValue<number> {
  const keyboardHeight = useSharedValue(0);

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSubscription = Keyboard.addListener(showEvent, (event) => {
      keyboardHeight.value = withTiming(event.endCoordinates.height, {
        duration: event.duration ?? 250,
      });
    });

    const hideSubscription = Keyboard.addListener(hideEvent, (event) => {
      keyboardHeight.value = withTiming(0, {
        duration: event.duration ?? 250,
      });
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [keyboardHeight]);

  return keyboardHeight;
}
