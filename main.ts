import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const postPath = join(botDir, "POST.json");
const post = JSON.parse(readFileSync(postPath, "utf8")) as { url?: unknown };
if (typeof post.url !== "string" || post.url.length === 0) {
  throw new Error("POST.json must contain a non-empty string url");
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(postPath, join(outputDir, "POST.json"));
console.log(`POST.json copied to ${outputDir} (url: ${post.url})`);
