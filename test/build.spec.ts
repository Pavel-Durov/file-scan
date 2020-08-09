import test from "ava";

import { execSync } from "child_process";

test("expected build and execute - find match in package.json", (t) => {
  execSync("yarn build");
  const str = execSync(
    'node ./dist package.json --pattern="version"'
  ).toString();
  t.regex(str, /package.json/);
  t.regex(str, /version/);
});
