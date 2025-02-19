import { useState, useCallback, useEffect } from "react";
import { View, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import Animated, { FadeIn, FadeOut, runOnJS } from "react-native-reanimated";
import { router } from "expo-router";
import splashAnimation from "@/assets/animations/splash-animations.json";
import { RandomColoredText } from "@/components";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function SplashScreen() {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAnimation(false);
    }, 4500);
    return () => clearTimeout(timeout);
  }, []);

  const navigateToHome = useCallback(() => {
    router.replace("/home");
  }, []);

  return (
    <View className="flex-1 items-center justify-start top-28">
      <Animated.Text
        className="text-4xl font-bold relative z-10 "
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(500)}
      >
        Welcome to
      </Animated.Text>
      <Animated.View
        className="text-4xl font-bold  z-10 flex flex-row gap-1"
        entering={FadeIn.duration(1000).delay(1000)}
      >
        <RandomColoredText text="Random" className="text-4xl font-bold" />
        <RandomColoredText text="Background" className="text-4xl font-bold" />
        <RandomColoredText text="Color" className="text-4xl font-bold" />
      </Animated.View>
      {showAnimation && (
        <Animated.View
          className="absolute  left-0 right-0 bottom-1/3"
          entering={FadeIn.duration(1000)}
          exiting={FadeOut.duration(500).withCallback((finished) => {
            if (finished) {
              runOnJS(navigateToHome)();
            }
          })}
        >
          <LottieView
            autoPlay
            style={{
              width: screenWidth,
              height: screenHeight / 2,
              backgroundColor: "#eee",
            }}
            source={splashAnimation}
          />
        </Animated.View>
      )}
    </View>
  );
}
