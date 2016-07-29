import assert from "assert";
import { substring } from "../src/index";

describe("Substring", () => {
    const string = "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.";
    const unicodeString = "علم نور است و جهل تاریکی.";
    const emojiString = "Emojis 👍🏽 are 🍆 poison. 🌮s are bad.";

    it("Substrings latin text correctly", () => {
        assert.strictEqual(substring("Iñtërnâtiônàlizætiøn☃", 0, 10), "Iñtërnâtiô");
        assert.strictEqual(substring(string, 25, 57), "the universe and human stupidity");
    });

    it("Substrings unicode text correctly", () => {
        assert.strictEqual(substring(unicodeString, 0, 11), "علم نور است");
        assert.strictEqual(substring(emojiString, 7, 14), "👍🏽 are 🍆");
    });
});
