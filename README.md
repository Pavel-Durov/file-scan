[![CircleCI](https://circleci.com/gh/Pavel-Durov/file-scan/tree/develop.svg?style=svg)](https://circleci.com/gh/Pavel-Durov/file-scan/tree/develop)

## file-scan - utility to scan text files

## Table of Contents

1. [Install](#install)
2. [Examples](#examples)
2. [Logs](#logs)

<h2>Install</h2>

Install with npm:

```bash
npm install --save-dev webpack
```

Install with yarn:

```bash
yarn add webpack --dev
```

<h2>Examples</h2>

Scan all files in 2 level directories, ignoring node_modules directory
```
$ file-scan ./*[!node_modules]**/** --pattern=secret
```

+ if your regex include `\` escape them with `\\` : 
```
 --pattern="secret-\d+"
 # should be
 --pattern="secret-\\d+"
```

<h2>Logs</h2>

```
FILE_SCAN_DEBUG ..
```