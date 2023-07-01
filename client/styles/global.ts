import { StyleType } from "../custom_hooks/useStyles";

export const paddingWidth = 15;
export const screenPadding: StyleType = {
    padding: paddingWidth,
};
export const screenPaddingHorizontal: StyleType = {
    paddingHorizontal: paddingWidth,
};
export const screenPaddingVertical: StyleType = {
    paddingVertical: paddingWidth,
};

export const boxShadow: StyleType = {
    shadowColor: "#000",
    shadowOffset: {
        width: 1,
        height: 0,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
};
