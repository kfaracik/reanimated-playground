const pl = {
  app: {
    title: "Pokemon Reanimated v4",
  },
  groups: {
    solarSystem: {
      title: "Układ Słoneczny",
      description: "Otwórz demo orbity i porównaj trzy metody animacji.",
    },
    svgAnimations: {
      title: "Animacje SVG",
      description: "Przygotowane miejsce na prostą animację linii w kole.",
    },
    keyboard: {
      title: "Unikanie klawiatury",
      description:
        "Przykład pokazujący natywne zachowanie KeyboardAvoidingView.",
    },
    solarSystem3d: {
      title: "Układ Słoneczny 3D",
      description: "Odkryj demo orbity w 3D.",
    },
    physicsAnimations: {
      title: "Animacje fizyczne",
      description: "Przykłady oparte na sprężynach i fizyce.",
    },
    skiaGradient: {
      title: "Gradient Skia",
      description:
        "Linia gradientowa rysowana na warstwie tła przy użyciu Skia.",
    },
    onboarding: {
      title: "Animacja Onboardingu",
      description:
        "Kompletna animacja onboardingowa — przykład Reanimated i Skia.",
    },
  },
  solarSystem: {
    title: "Układ Słoneczny",
    subtitle: "Trzy implementacje orbity z angielskimi etykietami i notatkami.",
    back: "Wróć do menu",
  },
  methods: {
    method1: {
      title: "Metoda 1",
      description: "Obróć orbitę używając shared values i złożonego transform.",
    },
    method2: {
      title: "Metoda 2",
      description:
        "Animuj orbitę przy pomocy macierzy transformacji napędzanej shared values.",
    },
    method3: {
      title: "Metoda 3",
      description:
        "Użyj CSS keyframes, aby zsynchronizować orbitę i obrót planety.",
    },
  },
  svgAnimations: {
    title: "Animacje SVG",
    subtitle: "Miejsce na przyszłą animację linii w kole.",
    back: "Wróć do menu",
    placeholderTitle: "Zastępcza animacja",
    placeholderDescription: "Ta sekcja jest gotowa na animację SVG orbity.",
  },
  physicsAnimations: {
    title: "Animacje fizyczne",
    subtitle: "Dema sprężyn, grawitacji i ruchu fizycznego.",
    back: "Wróć do menu",
    placeholderTitle: "Demo fizyki",
    placeholderDescription: "Odkryj przykłady animacji opartych na fizyce.",
  },
  keyboardAvoiding: {
    title: "Unikanie klawiatury",
    subtitle: "Porównaj rozwiązanie animowane i oparte na ScrollView.",
    animated: "Animowane (Reanimated)",
    animatedDescription: "Użyj shared values i animated styles z Reanimated.",
    scrollView: "ScrollView",
    scrollViewDescription:
      "Podejście wykorzystujące ScrollView/KeyboardAvoidingView.",
  },
  skiaGradient: {
    title: "Gradient Skia",
    subtitle: "Gradientowa linia tła rysowana za pomocą Skia.",
  },
  common: {
    back: "Wróć do menu",
  },
} as const;

export default pl;
