import test, { ExecutionContext } from "ava";
import { assertExec } from "./utils";
import { isFile, isDir } from "../src/fs";
import {
  PROC_EXIST_ERROR_CODE as ERROR,
  PROC_EXIST_SUCCESS_CODE as SUCCESS,
} from "../src/const";
import { execSync } from "child_process";

function assertDistDir(t: ExecutionContext) {
  t.true(isFile("./dist/README.md"));
  t.true(isDir("./dist/src"));
}
test("expected build and execute - exit with error code", (t) => {
  execSync("yarn build");
  assertDistDir(t);
  const pkg = require("dist/package.json");
  const cmd = `cd dist && node ${pkg.bin["file-scan"]}  --pattern "version" ./package.json`;
  assertExec(
    t,
    cmd,
    (str: string) => /package.json/.test(str) && /version/.test(str),
    ERROR
  );
});

test.only("expected build and execute - exit with success code", (t) => {
  execSync("yarn build");
  assertDistDir(t);
  const pkg = require("dist/package.json");
  const cmd = `cd dist && node ${pkg.bin["file-scan"]}  --pattern "not-common-pattern-to-find" ./**/*/*`;
  assertExec(t, cmd, (str: string) => true, SUCCESS);
});
