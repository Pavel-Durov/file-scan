import test from "ava";

import { scan, scanFiles } from "../src";

test("expected to find by specific file glob", async (t) => {
  const pattern = /L1 F1/;
  const match = await scan(pattern, "./test/file-samples/l1-f1.txt");
  t.deepEqual(match, [
    {
      file: "./test/file-samples/l1-f1.txt",
      line: "Donec a L1 F1 massa sem. ",
      lineNumber: 4,
    },
  ]);
  t.deepEqual(
    match,
    await scanFiles(pattern, ["./test/file-samples/l1-f1.txt"])
  );
});

test("expected to find pattern in files by /**/** glob pattern", async (t) => {
  const pattern = /L2.F1/;
  const match = await scan(pattern, "./test/file-samples/**/**");
  t.deepEqual(match, [
    {
      file: "./test/file-samples/l1-d/l2-f1.txt",
      line: "L2 F1",
      lineNumber: 2,
    },
  ]);
  t.deepEqual(
    match,
    await scanFiles(pattern, ["./test/file-samples/l1-d/l2-f1.txt"])
  );
});

test("expected to find multiple results", async (t) => {
  const match = await scan(
    /In rutrum mollis massa accumsan euismod/,
    "./test/file-samples/**/**"
  );
  t.is(match.length, 4);
  for (const m of match) {
    t.truthy(m.file);
    t.truthy(m.line);
    t.true(m.lineNumber >= 0);
  }
});
