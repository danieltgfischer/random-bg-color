import { useEffect, useMemo } from "react";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { RandomColorGeneration } from "@/services";

type Props = {
  text: string;
  className?: string;
  delay?: number;
};

export default function RandomColoredText({
  text,
  className,
  delay = 0,
}: Props) {
  const randomColorGeneration = useMemo(() => new RandomColorGeneration(), []);
  const newColor = useSharedValue("#333");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomColor = randomColorGeneration.getRandomColor();
      newColor.value = randomColor;
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(newColor.value, { duration: 500 }),
    };
  });

  return (
    <Animated.Text
      entering={FadeIn.duration(1000).delay(delay)}
      exiting={FadeOut.duration(500)}
      style={animatedStyle}
      className={className ?? ""}
    >
      {text}
    </Animated.Text>
  );
}
