import substring from "unicode-substring";

export default function(str, limit = 16, padString = "#", padPosition = "right") {
    if (typeof str !== "string" || typeof limit !== "number") {
        throw new Error("Invalid arguments specified");
    }
    
    const strLength = str.length;

    if (strLength > limit) {
        return substring(str, 0, limit);
    } else if (strLength < limit) {
        let padRepeats = padString.repeat(limit - strLength);
        return padPosition == 'left'? padRepeats + str: str + padRepeats;
    }
    return str;
}
