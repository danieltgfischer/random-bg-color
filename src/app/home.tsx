import { useEffect, useMemo, useState } from "react";
import { Dimensions } from "react-native";
import Animated, {
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  getRelativeCoords,
  useAnimatedRef,
  runOnJS,
  FadeInUp,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { RandomColorGeneration } from "@/services";

const { height: screenHeight } = Dimensions.get("window");

export default function Home() {
  const containerBackgroundColor = useSharedValue("#fff");
  const animatedBackgroundColor = useSharedValue("#fff");
  const circleSize = useSharedValue(0);
  const animatedViewRef = useAnimatedRef();
  const randomColorGeneration = useMemo(() => new RandomColorGeneration(), []);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (coords) {
      const randomColor = randomColorGeneration.getRandomColor();
      circleSize.value = 0;
      animatedBackgroundColor.value = randomColor ?? "#fff";
      circleSize.value = withTiming(screenHeight, { duration: 3000 }, () => {
        containerBackgroundColor.value = randomColor;
      });
    }
  }, [coords]);

  const tapGesture = Gesture.Tap().onEnd((event) => {
    const relativeCoords = getRelativeCoords(
      animatedViewRef,
      event.absoluteX,
      event.absoluteY
    );

    if (relativeCoords) {
      runOnJS(setCoords)(relativeCoords);
    }
  });

  const circleStyle = useAnimatedStyle(() => {
    return {
      width: circleSize.value,
      height: circleSize.value,
      borderRadius: circleSize.value / 2,
      backgroundColor: animatedBackgroundColor.value,
      transform: [{ scaleX: circleSize.value }, { scaleY: circleSize.value }],
      position: "absolute",
      top: coords?.y ?? 0,
      left: coords?.x ?? 0,
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: containerBackgroundColor.value,
    };
  });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={tapGesture}>
        <Animated.View
          ref={animatedViewRef}
          entering={FadeIn.duration(1000)}
          className="flex-1 items-center justify-center"
          style={containerStyle}
        >
          <Animated.Text
            entering={FadeInUp.duration(1000)}
            className="text-4xl font-bold z-10"
          >
            Hello there!
          </Animated.Text>
          <Animated.View style={[circleStyle]} />
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
