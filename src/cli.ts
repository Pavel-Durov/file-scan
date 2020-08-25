#!/usr/bin/env node

import { initLog } from "./log";
import { Command } from "commander";
import * as pkg from "../package.json";
import { Config } from "./match";
import { scanFiles } from "./";
import { PROC_EXIST_ERROR_CODE, PROC_EXIST_SUCCESS_CODE } from "./const";
import { isEmpty } from "ramda";

const log = initLog("cli");
const program = new Command();

program.version(pkg.version);
program.option("-p, --pattern <regex>", "regex pattern");

export function parseArgs(): Config {
  log(parseArgs.name);
  program.parse(process.argv);
  let config = null;
  log(parseArgs.name, { opts: program.opts() });
  const pattern = new RegExp(program.pattern as string);
  config = {
    pattern,
    files: program.args,
  };
  log(parseArgs.name, { config });
  return config;
}

async function main() {
  const { pattern, files } = parseArgs();
  const match = await scanFiles(pattern, files);
  if (isEmpty(match)) {
    process.exit(PROC_EXIST_SUCCESS_CODE);
  } else {
    for (const m of match) {
      console.log(JSON.stringify(m));
    }
    process.exit(PROC_EXIST_ERROR_CODE);
  }
}
main();
