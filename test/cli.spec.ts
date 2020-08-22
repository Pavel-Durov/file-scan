import test from "ava";

import { execSync } from "child_process";

test("expected to find version in package.json", (t) => {
  const cmd = `yarn start package.json --pattern version`;
  const str = execSync(cmd).toString();
  t.regex(str, /package.json/);
  t.regex(str, /version/);
});

test("expected to find pattern in ./test/file-samples/*", (t) => {
  const cmd = `yarn start ./test/file-samples/* --pattern 'L1.F1' `;
  const str = execSync(cmd).toString();
  t.regex(str, /l1-f1.txt/);
  t.regex(str, /Donec a L1 F1 massa sem/);
});

test("expected to find pattern in ./test/file-samples/**/**/**", (t) => {
  const cmd = `yarn start ./test/file-samples/**/**/** --pattern 'L2 F2'`;
  const str = execSync(cmd).toString();
  t.regex(
    str,
    /Donec a massa sem. Cras L2 F2 placerat lectus vel dapibus elementum/
  );
});

test("expected to NOT find - glob ignore pattern", (t) => {
  const cmd = `yarn start ./test/file-samples/**/[!l2-d]/** --pattern 'L2 F2'`;
  const str = execSync(cmd).toString();
  t.notRegex(
    str,
    /Donec a massa sem. Cras L2 F2 placerat lectus vel dapibus elementum/
  );
});
