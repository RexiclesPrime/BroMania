#!/usr/bin/env node
/**
 * Static GitHub Pages build.
 *
 * `PAGES_DEPLOY=1` turns on SPA prerender + `/BroMania/` base. Nitro is
 * skipped (its github-pages preset dies on Rolldown). Output: dist/client.
 */
import { spawn } from "node:child_process";
import { copyFileSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const CLIENT = join(ROOT, "dist", "client");
const VITE = join(ROOT, "node_modules", ".bin", "vite");

process.env.PAGES_DEPLOY = "1";

const child = spawn(
  process.execPath,
  ["scripts/with-app-env.mjs", VITE, "build"],
  { stdio: "inherit", env: process.env, cwd: ROOT },
);

child.on("close", (code) => {
  if (code) process.exit(code);
  if (!existsSync(join(CLIENT, "index.html"))) {
    console.error("[pages] dist/client/index.html missing");
    process.exit(1);
  }
  const shell = join(CLIENT, "_shell.html");
  if (existsSync(shell)) {
    copyFileSync(shell, join(CLIENT, "404.html"));
  } else {
    copyFileSync(join(CLIENT, "index.html"), join(CLIENT, "404.html"));
  }
  writeFileSync(join(CLIENT, ".nojekyll"), "");
  console.log("[pages] dist/client ready for GitHub Pages");
});
