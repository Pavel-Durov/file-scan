#!/usr/bin/env node
import { parseArgs } from "./cli";
import { initLog } from "./log";
import { match } from "./match";

const log = initLog("main");

async function main() {
  log(main.name);
  const args = parseArgs();
  if (args) {
    log(main.name, { args });
    const result = await match(args);
    for (const m of result) {
      console.log(`${m.file} - [${m.lineNumber}] "${m.line}"`);
    }
  } else {
    log(main.name, "args are not provided");
  }
}

main();
