import { StyleSheet, View } from "react-native";
import Animated, { css } from "react-native-reanimated";

const RADIUS = 120;
const TOTAL_STEPS = 360;
const FULL_ROTATION = 2 * Math.PI;

type OrbitKeyframeBlock = {
  transform: [{ translateX: number }, { translateY: number }];
};

// prettier-ignore
type PlanetKeyframeBlock = {
  transform: [{
    matrix: [
      number, number, number, number,
      number, number, number, number,
      number, number, number, number,
      number, number, number, number
    ];
  }];
};

const orbitObject: Record<string, OrbitKeyframeBlock> = {};
const planetObject: Record<string, PlanetKeyframeBlock> = {};

for (let i = 0; i <= TOTAL_STEPS; i++) {
  const progress = i / TOTAL_STEPS;
  const angle = progress * FULL_ROTATION;
  const key = i === TOTAL_STEPS ? "1" : progress.toFixed(4);

  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  orbitObject[key] = {
    transform: [{ translateX: RADIUS * cos }, { translateY: RADIUS * sin }],
  };

  const planetCos = cos;
  const planetSin = -sin;

  // prettier-ignore
  planetObject[key] = {
    transform: [{
      matrix: [
        planetCos, -planetSin, 0, 0,
        planetSin,  planetCos, 0, 0,
        0,          0,         1, 0,
        0,          0,         0, 1,
      ],
    }],
  };
}

const orbitKeyframes = css.keyframes(orbitObject);
const planetKeyframes = css.keyframes(planetObject);

const INITIAL_ORBIT_POSITION = [{ translateX: RADIUS }, { translateY: 0 }];

const INITIAL_PLANET_POSITION = [
  {
    matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  },
];

export default function Solution3() {
  return (
    <View style={styles.container}>
      <View style={styles.sun} />

      <View style={styles.orbitLayer}>
        <Animated.View
          style={[
            styles.planetContainer,
            {
              animationName: orbitKeyframes,
              animationDuration: "10000ms",
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
            },
          ]}
        >
          <Animated.View
            style={[
              styles.planet,
              {
                animationName: planetKeyframes,
                animationDuration: "500ms",
                animationIterationCount: "infinite",
                animationTimingFunction: "linear",
              },
            ]}
          >
            <View style={styles.topHalf} />
            <View style={styles.bottomHalf} />
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  sun: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ffff00",
  },
  orbitLayer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 0,
    height: 0,
  },
  planetContainer: {
    position: "absolute",
    transform: INITIAL_ORBIT_POSITION,
  },
  planet: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    transform: INITIAL_PLANET_POSITION,
  },
  topHalf: {
    flex: 1,
    backgroundColor: "#008000",
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: "#0000ff",
  },
});
