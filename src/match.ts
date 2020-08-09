import { initLog } from "src/log";
import { Config } from "src/cli";
import { readFileAsync, isFile } from "./fs";

const log = initLog("main");

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
async function matchPattern(
  file: string,
  pattern: RegExp
): Promise<Match | null> {
  log(matchPattern.name, { file, pattern });
  let result = null;
  const content = (await readFileAsync(file)).toString();
  const match = content.match(pattern);
  log(matchPattern.name, { file, pattern, match, content });
  if (match) {
    result = constructMatch(file, pattern, content);
  }
  return result;
}

async function processFile(
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

export async function match(config: Config): Promise<Match[]> {
  log(match.name, config.files);
  const promises = config.files.map((f) => processFile(config.pattern, f));
  const matches = await Promise.all(promises);
  return matches.filter((m) => m) as Match[];
}
