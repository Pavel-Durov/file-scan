[![CircleCI](https://circleci.com/gh/Pavel-Durov/file-scan/tree/develop.svg?style=svg)](https://circleci.com/gh/Pavel-Durov/file-scan/tree/develop)

## file-scan - utility to scan text files

## Table of Contents

1. [Install](#install)
2. [Examples](#examples)
3. [Test](#tests)
4. [Logs](#logs)

## Install

```bash
# npm
npm install --save-dev @ihcmikmai/file-scan
# yarn
yarn add @ihcmikmai/file-scan --dev
```

## Examples

```
$ file-scan -h
Usage: index [options]

Options:
  -V, --version          output the version number
  -p, --pattern <regex>  regex pattern
  -h, --help             display help for command

```
Scan all files in 2 level directories, ignoring node_modules directory
```bash
$ file-scan ./*[!node_modules]**/** --pattern secret
```

+ if your regex include `\` escape them with `\\` : 
```bash
 --pattern "secret-\d+"
 # should be
 --pattern "secret-\\d+"
```

```javascript
import { match, scanFiles } from '@ihcmikmai/file-scan';
// scanning via glob pattern
const results = await scan(/my-regex/, "./**/*.json");
// scanning via file list
const results = await scanFiles(/my-regex/, ["./file1.json", "./file2.json"])
```

## Use file-scan as pre-commit hook
configure precommit, this example use [husky](https://github.com/typicode/husky):

```json
  "husky": {
    "hooks": {
      "pre-commit": "file-scan -p apikey-1234567890 ./**/**"
    }
  }
```

## Tests

Run tests
```bash
yarn test
```

Run tests with verbose logs
```bash
yarn test:verbose
```

## Logs

```bash
FILE_SCAN_DEBUG=* file-scan
```
