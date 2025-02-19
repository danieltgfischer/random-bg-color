import { useMemo } from "react";
import { Text, TouchableWithoutFeedback } from "react-native";
import Animated, {
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { RandomColorGeneration } from "@/services";

export default function Home() {
  const backgroundColor = useSharedValue("#fff");
  const randomColorGeneration = useMemo(() => new RandomColorGeneration(), []);

  const viewStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(backgroundColor.value, { duration: 500 }),
    };
  });

  const handlePress = () => {
    backgroundColor.value = randomColorGeneration.getRandomColor();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View
        entering={FadeIn.duration(1000)}
        className="flex-1 items-center justify-center"
        style={viewStyle}
      >
        <Text className="text-4xl font-bold">Hello there!</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
