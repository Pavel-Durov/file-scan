import test from "ava";
import * as fs from "../src/fs";

import { stub, SinonStub } from "sinon";
import { scanFiles } from "../src";

const pattern = /find-me/;
const expectedLine = "this is a line find-me.";
const expectedFileName = "12.txt";

let readFileAsyncStub: SinonStub;
test.before(() => {
  stub(fs, "isFile").resolves(true);
  readFileAsyncStub = stub(fs, "readFileAsync");
});

test.serial("expected to match last line", async (t) => {
  readFileAsyncStub.reset();
  readFileAsyncStub
    .resolves("some dummy text")
    .withArgs(expectedFileName)
    .resolves(`line 1\nline 2\n${expectedLine}`);
  const result = await scanFiles(pattern, [
    "1.txt",
    expectedFileName,
    "another-file.json",
  ]);
  t.deepEqual(result, [
    {
      file: expectedFileName,
      line: expectedLine,
      lineNumber: 2,
    },
  ]);
});

test.serial("expected to match first line", async (t) => {
  readFileAsyncStub.reset();
  readFileAsyncStub
    .resolves("some dummy text")
    .withArgs(expectedFileName)
    .resolves(`${expectedLine}\nline 1\nline 2\n`);
  const result = await scanFiles(pattern, [
    expectedFileName,
    "1.txt",
    "another-file.json",
  ]);
  t.deepEqual(result, [
    {
      file: expectedFileName,
      line: expectedLine,
      lineNumber: 0,
    },
  ]);
});

test.serial("expected to match middle line", async (t) => {
  readFileAsyncStub.reset();
  readFileAsyncStub
    .resolves("some dummy text")
    .withArgs(expectedFileName)
    .resolves(`first line here \n\n${expectedLine}\nline 1\nline 2\n`);
  const result = await scanFiles(pattern, [
    expectedFileName,
    "1.txt",
    "another-file.json",
  ]);
  t.deepEqual(result, [
    {
      file: expectedFileName,
      line: expectedLine,
      lineNumber: 2,
    },
  ]);
});
