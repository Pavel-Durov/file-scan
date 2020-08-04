
import * as cliArgs from "yargs";

export  interface Config {
  pattern: RegExp;
  files: string[];
}

export function parseArgs(): Config {
  if (!cliArgs.argv.pattern) {
    throw new Error("pattern not defined");
  }
  const pattern = new RegExp(cliArgs.argv.pattern as string);
  return {
    pattern,
    files: cliArgs.argv._ as string[],
  };
}
