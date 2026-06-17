import { StyleSheet, View } from "react-native";
import { OrbitPath } from "./components/Orbit";
import { Planet } from "./components/Planet";
import { Sun } from "./components/Sun";
import { usePlanetAnimation } from "./hooks/usePlanetOrbit";

export default function SolarSystem() {
  const {
    rotation,
    planetRotation,
    moonRotation,
    rotationSin,
    rotationCos,
    planetRotationSin,
    planetRotationCos,
  } = usePlanetAnimation();

  return (
    <View style={styles.screen}>
      <View style={styles.orbitLayer}>
        <OrbitPath />
        <Sun />
        <Planet
          rotation={rotation}
          planetRotation={planetRotation}
          rotationSin={rotationSin}
          rotationCos={rotationCos}
        />
        {/* <Moon rotation={rotation} moonRotation={moonRotation} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#080911",
  },
  orbitLayer: { alignItems: "center", justifyContent: "center" },
});
