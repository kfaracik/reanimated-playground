import { ImageSourcePropType } from "react-native";

export interface SlideData {
  id: string;
  title: string;
  subtitle: string;
  image: ImageSourcePropType | null;
}
