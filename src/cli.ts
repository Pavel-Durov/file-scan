import { initLog } from "./log";
import { Command } from "commander";
import * as pkg from "../package.json";

const log = initLog("cli");
const program = new Command();

program.version(pkg.version);
program.option("-p, --pattern <regex>", "regex pattern");

export interface Config {
  pattern: RegExp;
  files: string[];
}

export function parseArgs(): Config | null {
  log(parseArgs.name);
  program.parse(process.argv);
  let config = null;
  log(parseArgs.name, program.opts(), { args: program.args });
  if (program.pattern) {
    log(parseArgs.name, { pattern: program.pattern });
    const pattern = new RegExp(program.pattern as string);
    config = {
      pattern,
      files: program.args,
    };
  } else {
    log(parseArgs.name, "pattern not provided");
  }
  log(parseArgs.name, { config });
  return config;
}
