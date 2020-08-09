import test from "ava";

import { execSync } from "child_process";

test("expected to find pattern in hidden file - raw string", (t) => {
  const cmd = "yarn start test/file-samples/l1-d/l2-d/.*.txt";
  const stringMatch = execSync(
    `${cmd} --pattern="apikey-1234567890"`
  ).toString();
  t.regex(stringMatch, /SECRET=apikey-1234567890/);
  t.regex(stringMatch, /l2-f3-hidden.txt/);
});

test("expected to find pattern in hidden file - regex pattern #1", (t) => {
  const cmd = "yarn start test/file-samples/l1-d/l2-d/.l2-f3-hidden.txt";
  const stringMatch = execSync(
    `${cmd} --pattern="[a-z]{6}-\\d{10}"`
  ).toString();
  t.regex(stringMatch, /SECRET=apikey-1234567890/);
  t.regex(stringMatch, /l2-f3-hidden.txt/);
});

test("expected to find pattern in hidden file - regex pattren #2", (t) => {
  const cmd = "yarn start test/file-samples/l1-d/l2-d/.*";
  const stringMatch = execSync(`${cmd} --pattern="apikey-\\d{10}"`).toString();
  t.regex(stringMatch, /SECRET=apikey-1234567890/);
  t.regex(stringMatch, /l2-f3-hidden.txt/);
});
