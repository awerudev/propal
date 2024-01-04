import styles from "./styles/styles";
// utilities.js

import {v4 as uuidv4} from 'uuid';

export const hexToRGB = (hex) => {
    let r = 0, g = 0, b = 0;

    // 3 digits
    if (hex.length === 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];

        // 6 digits
    } else if (hex.length === 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
    }

    return "" + +r + "," + +g + "," + +b;
}

export const generateUUIDv4 = () => {
    return uuidv4();
}

// This function will remove bullet points and extra spaces from a string
const sanitizeMuscleName = (name) => {
    return name.replace('●', '').trim();
};

export const styleCheck = (muscle, isText) => {
    const sanitizedMuscle = sanitizeMuscleName(muscle);

    if (!isText) {
        switch (sanitizedMuscle) {
            case 'Abs':
                return styles.core;
            case 'Chest':
                return styles.chest;
            case 'Back':
                return styles.back;
            case 'Legs':
                return styles.legs;
            case 'Shoulders':
                return styles.shoulders;
            case 'Biceps':
                return styles.biceps;
            case 'Triceps':
                return styles.triceps;
            case 'Push':
                return styles.push;
            case 'Pull':
                return styles.pull;
            case 'Upper Body':
                return styles.upperBody;
            case 'Lower Body':
                return styles.lowerBody;
            case 'Cardio':
                return styles.cardio;
            default:
                return styles.generic;
        }
    } else {
        switch (sanitizedMuscle) {
            case 'Abs':
                return styles.coreText;
            case 'Chest':
                return styles.chestText;
            case 'Back':
                return styles.backText;
            case 'Legs':
                return styles.legsText;
            case 'Shoulders':
                return styles.shouldersText;
            case 'Biceps':
                return styles.bicepsText;
            case 'Triceps':
                return styles.tricepsText;
            case 'Push':
                return styles.pushText;
            case 'Pull':
                return styles.pullText;
            case 'Upper Body':
                return styles.upperBodyText;
            case 'Lower Body':
                return styles.lowerBodyText;
            case 'Cardio':
                return styles.cardioText;
            default:
                return styles.genericText;
        }
    }
}

