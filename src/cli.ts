import * as cliArgs from "yargs";
import { initLog } from "src/log";

const log = initLog("cli");

export interface Config {
  pattern: RegExp;
  files: string[];
}

export function parseArgs(): Config {
  if (!cliArgs.argv.pattern) {
    throw new Error("pattern not defined");
  }
  log(parseArgs, { args: cliArgs.argv });
  const pattern = new RegExp(cliArgs.argv.pattern as string);
  return {
    pattern,
    files: cliArgs.argv._ as string[],
  };
}
