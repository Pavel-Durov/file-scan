[![CircleCI](https://circleci.com/gh/Pavel-Durov/file-scan/tree/develop.svg?style=svg)](https://circleci.com/gh/Pavel-Durov/file-scan/tree/develop)

## file-scan - utility to scan text files

## Table of Contents

1. [Install](#install)
2. [Examples](#examples)
3. [Test](#tests)
4. [Logs](#logs)

## Install

Install with npm:

```bash
npm install --save-dev @ihcmikmai/file-scan
```

Install with yarn:

```bash
yarn add @ihcmikmai/file-scan --dev
```

## Examples

Scan all files in 2 level directories, ignoring node_modules directory
```bash
$ file-scan ./*[!node_modules]**/** --pattern=secret
```

+ if your regex include `\` escape them with `\\` : 
```bash
 --pattern="secret-\d+"
 # should be
 --pattern="secret-\\d+"
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

via `.bin/file-scan` link: 
```bash
FILE_SCAN_DEBUG=* file-scan
```

via `yarn start`
```bash
FILE_SCAN_DEBUG=* yarn start
```