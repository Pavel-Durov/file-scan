import { readFile, statSync } from "fs";

import { promisify } from "util";
import { compose, not } from "ramda";

export const readFileAsync = promisify(readFile);

export function isDir(filePath: string): boolean {
  const stat = statSync(filePath);
  return stat?.isDirectory();
}

export const isFile = compose(not, isDir);
