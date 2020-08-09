#!/usr/bin/env node
import { parseArgs } from "./cli";
import { initLog } from "./log";
import { match } from "./match";

const log = initLog("main");

async function main() {
  const args = parseArgs();
  log(main.name, { args });
  const result = await match(args);

  for (const m of result) {
    console.log(`${m.file} - [${m.lineNumber}] "${m.line}"`);
  }
}

main();
