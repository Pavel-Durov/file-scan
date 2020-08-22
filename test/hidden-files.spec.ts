import test from "ava";

import { execSync } from "child_process";

test("expected to find pattern in hidden file - raw string", (t) => {
  const cmd = "yarn start test/file-samples/l1-d/l2-d/.*.txt";
  const pattern = "apikey-1234567890";

  const longOpt = execSync(`${cmd} --pattern '${pattern}'`).toString();
  t.regex(longOpt, /SECRET=apikey-1234567890/);
  t.regex(longOpt, /l2-f3-hidden.txt/);

  const shortOpt = execSync(`${cmd} -p '${pattern}'`).toString();
  t.regex(shortOpt, /SECRET=apikey-1234567890/);
  t.regex(shortOpt, /l2-f3-hidden.txt/);
});

test("expected to find pattern in hidden file - regex #1", (t) => {
  const cmd = "yarn start test/file-samples/l1-d/l2-d/.l2-f3-hidden.txt";
  const pattern = "[a-z]{6}-\\d{10}";

  const longOpt = execSync(`${cmd} --pattern '${pattern}'`).toString();
  t.regex(longOpt, /SECRET=apikey-1234567890/);
  t.regex(longOpt, /l2-f3-hidden.txt/);

  const shortOpt = execSync(`${cmd} -p '${pattern}'`).toString();
  t.regex(shortOpt, /SECRET=apikey-1234567890/);
  t.regex(shortOpt, /l2-f3-hidden.txt/);
});

test("expected to find pattern in hidden file - regex #2", (t) => {
  const cmd =
    "yarn start --pattern 'apikey-d{10}' test/file-samples/l1-d/l2-d/.*";
  const pattern = "apikey-\\d{10}";

  const longOpt = execSync(`${cmd} --pattern '${pattern}'`).toString();
  t.regex(longOpt, /SECRET=apikey-1234567890/);
  t.regex(longOpt, /l2-f3-hidden.txt/);

  const shortOpt = execSync(`${cmd} -p '${pattern}'`).toString();
  t.regex(shortOpt, /SECRET=apikey-1234567890/);
  t.regex(shortOpt, /l2-f3-hidden.txt/);
});
