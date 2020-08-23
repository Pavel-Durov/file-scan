import test from "ava";
import { assertExec } from "./utils";
import { PROC_EXIST_ERROR_CODE as ERROR } from "../src/const";

test("expected to find pattern in hidden file - raw string", (t) => {
  const cmd = "yarn start test/file-samples/l1-d/l2-d/.*.txt";
  const pattern = "apikey-1234567890";
  const assert = (str: string) =>
    /SECRET=apikey-1234567890/.test(str) && /l2-f3-hidden.txt/.test(str);
  assertExec(t, `${cmd} --pattern '${pattern}'`, assert, ERROR);
  assertExec(t, `${cmd} -p '${pattern}'`, assert, ERROR);
});

test("expected to find pattern in hidden file - regex #1", (t) => {
  const cmd = "yarn start test/file-samples/l1-d/l2-d/.l2-f3-hidden.txt";
  const pattern = "[a-z]{6}-\\d{10}";
  const assert = (str: string) =>
    /SECRET=apikey-1234567890/.test(str) && /l2-f3-hidden.txt/.test(str);
  assertExec(t, `${cmd} --pattern '${pattern}'`, assert, ERROR);
  assertExec(t, `${cmd} -p '${pattern}'`, assert, ERROR);
});

test("expected to find pattern in hidden file - regex #2", (t) => {
  const cmd =
    "yarn start --pattern 'apikey-d{10}' test/file-samples/l1-d/l2-d/.*";
  const pattern = "apikey-\\d{10}";
  const assert = (str: string) =>
    /SECRET=apikey-1234567890/.test(str) && /l2-f3-hidden.txt/.test(str);
  assertExec(t, `${cmd} --pattern '${pattern}'`, assert, ERROR);
  assertExec(t, `${cmd} -p '${pattern}'`, assert, ERROR);
});
