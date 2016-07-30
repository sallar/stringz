import assert from "assert";
import { length } from "../src/index";

describe("Count String Length", () => {

    it("Counts international strings correctly", () => {
        assert.strictEqual(length("Iñtërnâtiônàlizætiøn☃"), 21);
        assert.strictEqual(length("あ"), 1);
        assert.strictEqual(length("谢"), 1);
        assert.strictEqual(length("سلام خوبی؟"), 10);
    });

    it("Counts emojis correctly", () => {
        assert.strictEqual(length("🐴"), 1);
        assert.strictEqual(length("❤️"), 1);
        assert.strictEqual(length("👍🏽"), 1);
        assert.strictEqual(length("👍🏽💩😊💪🏼😻"), 5);
    });

    it("Throws an error if wrong arguments are specified.", () => {
        assert.throws(() => length(445), Error);
    });

});
