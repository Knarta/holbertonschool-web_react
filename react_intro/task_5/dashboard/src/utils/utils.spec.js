import { expect, test } from "@jest/globals";
import * as utils from "./utils/utils.js";

test("getCurrentYear returns the correct year", () => {
    expect(utils.getCurrentYear()).toBe(new Date().getFullYear());
});

test("getFooterCopy returns the correct text", () => {
    expect(utils.getFooterCopy(true)).toBe("Holberton School");
    expect(utils.getFooterCopy(false)).toBe("Holberton School main dashboard");
});

test("getLatestNotification returns the correct text", () => {
    expect(utils.getLatestNotification()).toBe("<strong>Urgent requirement</strong> - complete by EOD");
});