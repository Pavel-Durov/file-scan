#!/usr/bin/env node

import { parseArgs } from "./cli";
import { initLog } from "./log";
import { match, Match } from "./match";
import { isEmpty } from "ramda";
import { PROC_EXIST_ERROR_CODE, PROC_EXIST_SUCCESS_CODE } from "./const";

const log = initLog("main");

function existMatchFound(match: Match[]) {
  for (const { file, lineNumber, line } of match) {
    console.log(`${file} - [${lineNumber}] "${line}"`);
  }
  process.exit(PROC_EXIST_ERROR_CODE);
}
async function main() {
  log(main.name);
  const args = parseArgs();
  log(main.name, { args });
  const result = await match(args);
  if (isEmpty(result)) {
    process.exit(PROC_EXIST_SUCCESS_CODE);
  } else {
    existMatchFound(result);
  }
}

main();
