import test from "ava";
import * as fs from "../src/fs";

import * as matchModule from "../src/match";
import { stub, SinonStub } from "sinon";

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
    .resolves("?")
    .withArgs(expectedFileName)
    .resolves(`line 1\nline 2\n${expectedLine}`);
  const result = await matchModule.match({
    files: ["1.txt", expectedFileName, "another-file.json"],
    pattern,
  });
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
  const result = await matchModule.match({
    files: [expectedFileName, "1.txt", "another-file.json"],
    pattern,
  });
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
  const result = await matchModule.match({
    files: [expectedFileName, "1.txt", "another-file.json"],
    pattern,
  });
  t.deepEqual(result, [
    {
      file: expectedFileName,
      line: expectedLine,
      lineNumber: 2,
    },
  ]);
});