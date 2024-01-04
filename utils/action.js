import { THEME_CHANGE } from "./constants";

export const switchMode = (mode) => {
    return {
        type: THEME_CHANGE,
        payload: mode,
    };
};r