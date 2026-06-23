const en = {
  app: {
    title: "Reanimated v4",
  },
  groups: {
    solarSystem: {
      title: "Solar System",
      description: "Open the orbit demo and compare three animation methods.",
    },
    svgAnimations: {
      title: "SVG Animations",
      description: "Reserved space for a simple circular SVG line animation.",
    },
    keyboard: {
      title: "Keyboard Avoiding",
      description: "Example showing native KeyboardAvoidingView behavior.",
    },
    solarSystem3d: {
      title: "Solar System 3D",
      description: "Explore a single-solution 3D orbit demo.",
    },
    physicsAnimations: {
      title: "Physics Animations",
      description:
        "Explore spring-based and physics-driven animation examples.",
    },
    skiaGradient: {
      title: "Skia Gradient",
      description: "Background-layer gradient line drawn with Skia.",
    },
    onboarding: {
      title: "Onboarding Animation",
      description:
        "Full onboarding animation demo showcasing Reanimated and Skia.",
    },
    onboardingAnimatedScroll: {
      title: "Onboarding Scroll",
      description:
        "Animated onboarding experience with horizontal scrolling and pagination.",
    },
    sensorSandbox: {
      title: "Sensor Sandbox",
      description:
        "Visualize device sensor inputs with Reanimated animated sensors.",
    },
  },
  solarSystem: {
    title: "Solar System",
    subtitle:
      "Three orbit implementations with English labels and method notes.",
    back: "Back to menu",
  },
  methods: {
    method1: {
      title: "Method 1",
      description:
        "Rotate the orbit with shared values and a composed transform.",
    },
    method2: {
      title: "Method 2",
      description:
        "Animate the orbit with a matrix transform driven by shared values.",
    },
    method3: {
      title: "Method 3",
      description:
        "Use CSS keyframes to keep the orbit and planet spin in sync.",
    },
  },
  svgAnimations: {
    title: "SVG Animations",
    subtitle: "Space reserved for a future line-in-circle animation.",
    back: "Back to menu",
    placeholderTitle: "Animation placeholder",
    placeholderDescription:
      "This section is ready for the SVG orbit animation.",
  },
  physicsAnimations: {
    title: "Physics Animations",
    subtitle: "Demos of springs, gravity and physics-driven motion.",
    back: "Back to menu",
    placeholderTitle: "Physics demo",
    placeholderDescription: "Explore physics-based animation examples.",
  },
  sensorSandbox: {
    title: "Outside The Box",
    subtitle: "Select a sensor and watch the live animated response.",
    selectorLabel: "Choose sensor value (1..5):",
    solvedLabel: "PASSED",
    levels: {
      accelerometer: {
        title: "ACCELEROMETER",
        hint: "Shake the phone rhythmically with moderate force. Overdoing it will drain progress.",
      },
      gyroscope: {
        title: "GYROSCOPE",
        hint: "Move the dot through one full smooth orbit, like turning a steering wheel. Stops, jerks, and direction changes drain progress.",
      },
      magneticField: {
        title: "MAGNETIC_FIELD",
        hint: "Bring the top edge of the phone close to a metal object or electronics, then hold it steady.",
      },
      rotation: {
        title: "ROTATION",
        hint: "Push the layout to an extreme position. Tilt the phone hard diagonally until the rectangle grows dramatically.",
      },
      gravity: {
        title: "GRAVITY",
        hint: "Hold the phone flat on your palm and guide the bubble into the small center target. Keep your hand still for three seconds.",
      },
    },
  },
  keyboardAvoiding: {
    title: "Keyboard Avoiding",
    subtitle: "Compare an animated solution and a ScrollView solution.",
    animated: "Animated (Reanimated)",
    animatedDescription: "Use Reanimated shared values and animated styles.",
    scrollView: "ScrollView",
    scrollViewDescription: "Use a ScrollView/KeyboardAvoidingView approach.",
  },
  common: {
    back: "Back to menu",
  },
  skiaGradient: {
    title: "Skia Gradient",
    subtitle: "Gradiented background line drawn with Skia.",
  },
} as const;

export default en;
