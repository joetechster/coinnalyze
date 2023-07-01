import { View } from "react-native";

export function updateIconDimensions(
    ref: React.RefObject<View>,
    setIconDimensions: React.Dispatch<React.SetStateAction<{ pageX: number; width: number }>>
) {
    ref.current!.measure((fx, fy, width, height, pageX) => {
        setIconDimensions({ width, pageX });
    });
}
