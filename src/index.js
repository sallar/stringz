import { astralRange } from "./string";

export function length(str) {
    return str.match(astralRange).length;
}

export function substring(str, begin, end) {
    return str.match(astralRange).slice(begin, end).join("");
}

export function limit(str, limit = 16, padString = "#", padPosition = "right") {
    if (typeof str !== "string" || typeof limit !== "number") {
        throw new Error("Invalid arguments specified");
    }
    
    // Calculate string length considering astral code points
    const strLength = length(str);

    if (strLength > limit) {
        return substring(str, 0, limit);
    } else if (strLength < limit) {
        const padRepeats = padString.repeat(limit - strLength);
        return (padPosition === "left") ? padRepeats + str : str + padRepeats;
    }
    return str;
}
