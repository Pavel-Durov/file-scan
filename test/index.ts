import test from "ava";
import * as nodefs from 'fs';
import { fs } from 'memfs';
import { stub } from 'sinon';
import { exec, execSync } from "child_process";
import { join } from "path";


test.before(() => {
  stub(nodefs, 'readFile');
});

test("expected to find version in package.json", (t) => {
  const nodeBin = join(__dirname, '../node_modules/.bin/ts-node')
  const scriptPath = join(__dirname, '../src/index.ts')
  const cmd = `${nodeBin} ${scriptPath} package.json --pattern="version"`;
  const str = execSync(cmd).toString();
  
  t.regex(str, /package.json/)
  t.regex(str, /version/)
});
