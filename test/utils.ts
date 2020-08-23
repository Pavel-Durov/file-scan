import { execSync } from "child_process";

import { ExecutionContext } from "ava";
import { PROC_EXIST_SUCCESS_CODE } from "src/const";

export function assertExec(
  t: ExecutionContext,
  cmd: string,
  stdOut: (str: string) => boolean,
  code: number = PROC_EXIST_SUCCESS_CODE
) {
  try {
    const out = execSync(cmd).toString();
    t.true(stdOut(out));
  } catch (e) {
    t.is(e.status, code);
  }
}
