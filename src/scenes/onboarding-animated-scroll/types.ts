import { ImageSourcePropType } from "react-native";

export type TranslationFunction = (key: string) => string;

export interface SlideData {
  id: string;
  title: string;
  subtitle: string;
  image: ImageSourcePropType | null;
  isLogo: boolean;
}
