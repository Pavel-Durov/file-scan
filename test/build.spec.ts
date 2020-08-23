import test from "ava";
import { assertExec } from "./utils";
import { PROC_EXIST_ERROR_CODE } from "../src/const";
import { execSync } from "child_process";

test("expected build and execute - find match in package.json", (t) => {
  execSync("yarn build");
  const cmd = 'cd dist && node src ./package.json --pattern "version"';
  assertExec(
    t,
    cmd,
    (str) => {
      return /package.json/.test(str) && /version/.test(str);
    },
    PROC_EXIST_ERROR_CODE
  );
});
