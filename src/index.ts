import { readFile, statSync } from 'fs'
import * as cliArgs from 'yargs';
import { promisify } from 'util'
import debug from 'debug'

const log = debug('index')

const readFileAsync = promisify(readFile)

interface Config {
  pattern: RegExp;
  files: string[]
}
interface Match {
  file: string,
  lineNumber: number;
  line: string;
}

function parseArgs(arg: cliArgs.Argv): Config {
  if (!arg.argv.pattern) {
    throw new Error('pattern not defined')
  }
  const pattern = new RegExp(arg.argv.pattern as string);
  return {
    pattern,
    files: arg.argv._ as string[]
  }
}

function constructMatch(file: string, pattern: RegExp, content: string): Match | null {
  let result = null;
  const split = content.split('\n');
  for (let i in split) {
    let line = split[i];
    if (line.match(pattern)) {
      result = {
        file,
        lineNumber: parseInt(i, 10),
        line: split[i]
      }
    }
  }
  return result;
}

async function processFile(pattern: RegExp, file: string): Promise<Match | null> {
  log(processFile.name, { file, pattern })
  let result = null;
  const stat = statSync(file);
  if (!stat.isDirectory()) {
    const content = (await readFileAsync(file)).toString()
    const match = content.match(pattern)
    if (match) {
      result = constructMatch(file, pattern, content)
    }
  }
  return result;
}



async function main() {
  const args = parseArgs(cliArgs);
  log(main.name, args.files)
  const promises = args.files.map(f => processFile(args.pattern, f));
  const matches = await Promise.all(promises)
  const filtered = matches.filter(m => m) as Match[];
  for (let m of filtered) {
    console.log(`${m.file} - [${m.lineNumber}] "${m.line}"`)
  }
}

main()