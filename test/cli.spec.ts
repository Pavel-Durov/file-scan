import test from "ava";
import { assertExec } from "./utils";
import {
  PROC_EXIST_ERROR_CODE as ERROR,
  PROC_EXIST_SUCCESS_CODE as SUCCESS,
} from "../src/const";

test("expected to find version in package.json", (t) => {
  const cmd = `yarn start package.json --pattern version`;
  const assert = (str: string) =>
    /package.json/.test(str) && /version/.test(str);
  assertExec(t, cmd, assert, ERROR);
});

test("expected to find pattern in ./test/file-samples/*", (t) => {
  const cmd = `yarn start ./test/file-samples/* --pattern 'L1.F1' `;
  const assert = (str: string) =>
    /Donec a L1 F1 massa sem/.test(str) && /l1-f1.txt/.test(str);
  assertExec(t, cmd, assert, ERROR);
});

test("expected to find pattern in ./test/file-samples/**/**/**", (t) => {
  const cmd = `yarn start ./test/file-samples/**/**/** --pattern 'L2 F2'`;
  const assert = (str: string) =>
    /Donec a massa sem. Cras L2 F2 placerat lectus vel dapibus elementum/.test(
      str
    );
  assertExec(t, cmd, assert, ERROR);
});

test("expected to NOT find - glob ignore pattern", (t) => {
  const pattern = "L2 F2";
  const cmd = `yarn start ./test/file-samples/**/[!l2-d]/** --pattern '${pattern}'`;
  assertExec(t, cmd, (str: string) => true, SUCCESS);
});
