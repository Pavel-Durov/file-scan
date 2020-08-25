#!/usr/bin/env node

import { initLog } from "./log";
import { Command } from "commander";
import * as pkg from "../package.json";
import { Config } from "./match";
import { scan } from "./";

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

scan(parseArgs());
