import { expect, test } from "@jest/globals";
import * as utils from "./utils.js";

test("should return current year", () => {
  const date = new Date();

  expect(utils.getCurrentYear()).toBe(date.getFullYear());
});

test("should return correct output for footer", () => {
  expect(utils.getFooterCopy(true)).toBe("Holberton School");
  expect(utils.getFooterCopy(false)).toBe("Holberton School main dashboard");
});

test("should return correct urgent notification", () => {
  expect(utils.getLatestNotification()).toBe(
    "<strong>Urgent requirement</strong> - complete by EOD",
  );
});