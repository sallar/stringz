import substring from "unicode-substring";

export default function limitStringLength(str, limit = 16, padString = "#", padPosition = "right") {
    if (typeof str !== "string" || typeof limit !== "number") {
        throw new Error("Invalid arguments specified");
    }
    
    const strLength = str.length;

    if (strLength > limit) {
        return substring(str, 0, limit);
    } else if (strLength < limit) {
        let newString = str;
        for (let i = 0; i < limit - strLength; i += 1) {
            if (padPosition === "right") {
                newString += padString;
            } else {
                newString = padString + newString;
            }
        }
        return newString;
    }

    return str;
}
