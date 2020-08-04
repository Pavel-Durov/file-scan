#!/usr/bin/env node

import { readFile, statSync } from "fs";

import { promisify } from "util";

import { parseArgs } from "./cli";
import { initLog } from "./log";

const log = initLog('main');

const readFileAsync = promisify(readFile);

interface Match {
  file: string;
  lineNumber: number;
  line: string;
}


function constructMatch(
  file: string,
  pattern: RegExp,
  content: string
): Match | null {
  let result = null;
  const split = content.split("\n");
  for (const i in split) {
    const line = split[i];
    if (line.match(pattern)) {
      result = {
        file,
        lineNumber: parseInt(i, 10),
        line: split[i],
      };
    }
  }
  return result;
}

async function processFile(
  pattern: RegExp,
  file: string
): Promise<Match | null> {
  log(processFile.name, { file, pattern });
  let result = null;
  const stat = statSync(file);
  if (!stat.isDirectory()) {
    const content = (await readFileAsync(file)).toString();
    const match = content.match(pattern);
    if (match) {
      result = constructMatch(file, pattern, content);
    }
  }
  return result;
}

async function main(): Promise<void> {
  const args = parseArgs();
  log(main.name, args.files);
  const promises = args.files.map((f) => processFile(args.pattern, f));
  const matches = await Promise.all(promises);
  const filtered = matches.filter((m) => m) as Match[];
  for (const m of filtered) {
    console.log(`${m.file} - [${m.lineNumber}] "${m.line}"`);
  }
}

main();
