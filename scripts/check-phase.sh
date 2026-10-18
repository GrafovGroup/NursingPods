#!/bin/sh
set -eu
node node_modules/prettier/bin/prettier.cjs --write src tests scripts/*.cjs > /dev/null
node node_modules/eslint/bin/eslint.js .
node node_modules/next/dist/bin/next build
node node_modules/typescript/bin/tsc --noEmit
node --import tsx --test tests/unit/*.test.ts
