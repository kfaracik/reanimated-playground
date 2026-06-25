import React from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SceneScreen from "../../app/shared/SceneScreen";
import { ChessBoard } from "./components/ChessBoard";
import { EmojiBlast } from "./components/EmojiBlast";
import { PromotionOverlay } from "./components/PromotionOverlay";
import { ChessGameProvider } from "./context/ChessGameContext";

type ChessSceneProps = {
  t: (key: string) => string;
  onBack: () => void;
};

export default function ChessScene({ t, onBack }: ChessSceneProps) {
  return (
    <ChessGameProvider>
      <GestureHandlerRootView style={styles.root}>
        <SceneScreen title={t("app.title")} onBack={onBack} framed={false}>
          <View style={styles.container}>
            <EmojiBlast />
            <ChessBoard />
            <PromotionOverlay />
          </View>
        </SceneScreen>
      </GestureHandlerRootView>
    </ChessGameProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
