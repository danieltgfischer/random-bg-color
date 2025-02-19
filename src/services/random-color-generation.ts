import { colors } from "@/constants/colors";

interface IRandomColorGeneration {
  getRandomColor: () => string;
}

export default class RandomColorGeneration implements IRandomColorGeneration {
  getRandomColor() {
    const entries = Object.entries(colors);
    const randomColor = entries[Math.floor(Math.random() * entries.length)][1];
    return randomColor;
  }
}
