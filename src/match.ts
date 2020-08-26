import { initLog } from "./log";
import { readFileAsync, isFile } from "./fs";

const log = initLog("main");

export interface Match {
  file: string;
  lineNumber: number;
  line: string;
}

export interface Config {
  pattern: RegExp;
  files: string[];
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

async function matchPattern(
  file: string,
  pattern: RegExp
): Promise<Match | null> {
  log(matchPattern.name, { file, pattern });
  let result = null;
  const content = (await readFileAsync(file)).toString();
  const match = content.match(pattern);
  if (match) {
    result = constructMatch(file, pattern, content);
  }
  return result;
}

export async function processFile(
  pattern: RegExp,
  file: string
): Promise<Match | null> {
  log(processFile.name, { file, pattern });
  let result = null;
  try {
    if (isFile(file)) {
      result = matchPattern(file, pattern);
    }
  } catch (e) {
    log(processFile.name, e);
  }
  return result;
}
