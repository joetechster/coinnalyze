import { StyleType } from "@custom_hooks/useStyles";
import themes, { ThemeKeys } from "@styles/themes";

interface TextInputStylesType {
    inputField: StyleType;
    container: StyleType;
}

export default function TextInputStyles(theme: ThemeKeys) {
    const styles: TextInputStylesType = {
        container: {
            flex: 1,
            flexDirection: "row",
            borderRadius: 10,
            padding: 8,
            alignItems: "center",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: themes[theme].textInput.backgroundColor,

            backgroundColor: themes[theme].textInput.backgroundColor,
        },
        inputField: {
            flex: 1,
            color: themes[theme].textInput.color,
        },
    };
    return styles;
}
