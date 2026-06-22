import { SlideData } from "../types";

export const SLIDES: SlideData[] = [
  {
    id: "1",
    title: "React Native Reanimated",
    subtitle:
      "Unlock the power of 120 FPS native animations. Fluid, thread-safe, and incredibly powerful gesture driven interfaces.",
    image: null,
    isLogo: true,
  },
  {
    id: "2",
    title: "Vector Fluidity",
    subtitle:
      "Master complex Bézier trajectories and pure SVG rendering. Craft highly responsive, declarative paths with infinite scalability.",
    image: require("../../../../assets/images/onboarding/svg.png"),
    isLogo: false,
  },
  {
    id: "3",
    title: "GPU Shaders & Gradients",
    subtitle:
      "Harness raw hardware capabilities through Skia. Render rich spectrum maps and dynamic path-tracking models with zero frame drops.",
    image: require("../../../../assets/images/onboarding/skia.png"),
    isLogo: false,
  },
  {
    id: "4",
    title: "Multi-Dimensional Space",
    subtitle:
      "Step into immersive, mathematical playgrounds. Simulate realistic depth-sorting, planetary orbits, and advanced orbital physics.",
    image: require("../../../../assets/images/onboarding/solar-system.png"),
    isLogo: false,
  },
];
