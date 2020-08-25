import * as glob from "glob";
import { Config, Match, processFile } from "./match";

import { initLog } from "./log";

const log = initLog("main");

export { Config, Match };

function getFilesByGlobAsync(globPattern: string): Promise<string[] | never> {
  return new Promise((resolve, reject) => {
    glob(globPattern, (err: Error | null, files?: string[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

export async function scanFiles(
  pattern: RegExp,
  files: string[]
): Promise<Match[]> {
  log(scan.name, files);
  const promises = files.map((f) => processFile(pattern, f));
  const match = await Promise.all(promises);
  return match.filter(Boolean) as Match[];
}

export async function scan(pattern: RegExp, glob: string): Promise<Match[]> {
  log(scan.name, { pattern, glob });
  const files = await getFilesByGlobAsync(glob);
  const promises = files.map((f) => processFile(pattern, f));
  const match = await Promise.all(promises);
  return match.filter(Boolean) as Match[];
}
