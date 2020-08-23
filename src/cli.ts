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
