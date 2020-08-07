import test from "ava";

import { execSync } from "child_process";
import { join } from "path";

test.skip("expected to find version in package.json", (t) => {
  const nodeBin = join(__dirname, "../node_modules/.bin/ts-node");
  const scriptPath = join(__dirname, "../src/index.ts");
  const cmd = `${nodeBin} ${scriptPath} package.json --pattern="version"`;
  const str = execSync(cmd).toString();
  console.log({ str });
  t.regex(str, /package.json/);
  t.regex(str, /version/);
});
