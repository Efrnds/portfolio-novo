import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import { spawn } from "node:child_process";

const root = process.cwd();
const directory = process.env.MOTION_REVIEW_DIR ?? await fs.mkdtemp(path.join(os.tmpdir(), "portfolio-motion-"));
const require = createRequire(path.join(root, "package.json"));
const { build } = createRequire(require.resolve("vite/package.json"))("esbuild");
const bundle = await build({ entryPoints: [path.join(root, "tests/browser/motion-review.jsx")], bundle: true, write: false, jsx: "automatic", format: "iife", logLevel: "error", loader: { ".css": "text" }, define: { "process.env.NODE_ENV": '"production"', "import.meta.glob": "__reviewVideos" }, banner: { js: "const __reviewVideos=()=>({});" } });
const assets = path.join(root, "dist/assets");
const cssFile = (await fs.readdir(assets)).find((name) => name.endsWith(".css"));
let css = await fs.readFile(path.join(assets, cssFile), "utf8");
css = css.replace(/url\(([^)]+)\)/g, (original, value) => {
  value = value.replace(/["']/g, "");
  if (value.startsWith("data:")) return original;
  const source = value.startsWith("/product-slices/") ? path.join(root, "public", value) : value.startsWith("/") ? path.join(root, "dist", value) : path.join(assets, value);
  return `url("${pathToFileURL(source).href}")`;
});
const selected = process.env.MOTION_CASES?.split(",");
const cases = [
  { name: "home-desktop", width: 1440, height: 1000 },
  { name: "home-mobile", width: 390, height: 844, compact: true },
  { name: "home-reduced", width: 390, height: 844, compact: true, reduced: true },
  { name: "home-low", width: 1440, height: 760 },
  { name: "home-wide", width: 1920, height: 1080 },
  { name: "home-tablet", width: 1024, height: 768, compact: true },
  ...["trato", "opinioteca", "calmera-os", "vwrks"].flatMap((slug) => [
    { name: `${slug}-desktop`, width: 1440, height: 1000, route: `/projects/${slug}` },
    { name: `${slug}-mobile`, width: 390, height: 844, compact: true, route: `/projects/${slug}` },
    { name: `${slug}-reduced`, width: 390, height: 844, compact: true, reduced: true, route: `/projects/${slug}` },
  ]),
].filter((item) => !selected || selected.includes(item.name));
await fs.mkdir(path.join(directory, "downloads"), { recursive: true });
for (const config of cases) {
  config.publicBase = pathToFileURL(path.join(root, "public/")).href;
  const profile = path.join(directory, `profile-${config.name}`);
  await fs.mkdir(profile, { recursive: true });
  await fs.writeFile(path.join(profile, "user.js"), `user_pref("browser.download.folderList",2);user_pref("browser.download.dir",${JSON.stringify(path.join(directory, "downloads"))});user_pref("browser.download.useDownloadDir",true);user_pref("browser.helperApps.neverAsk.saveToDisk","application/json");user_pref("browser.download.always_ask_before_handling_new_types",false);user_pref("ui.prefersReducedMotion",${config.reduced ? 1 : 0});`);
  await fs.writeFile(path.join(directory, config.name + ".html"), `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${css}</style></head><body><div id="root"></div><script>window.__motionReview=${JSON.stringify(config)};${bundle.outputFiles[0].text.replaceAll("</script", "<\\/script")}</script></body></html>`);
}
await fs.writeFile(path.join(directory, "cases.json"), JSON.stringify(cases, null, 2));
console.log(`Browser fixtures: ${directory}`);
if (process.argv.includes("--prepare-only")) process.exit(0);
let failed = 0;
for (const config of cases) {
  const browser = spawn(process.env.BROWSER_BIN ?? "/usr/bin/zen-browser", ["--headless", "--no-remote", "--width", String(config.width), "--height", String(config.height), "--profile", path.join(directory, `profile-${config.name}`), pathToFileURL(path.join(directory, config.name + ".html")).href], { env: { ...process.env, MOZ_DISABLE_CONTENT_SANDBOX: "1", MOZ_HEADLESS: "1", MOZ_HEADLESS_WIDTH: String(config.width), MOZ_HEADLESS_HEIGHT: String(config.height) }, stdio: "ignore" });
  let startError;
  browser.on("error", (error) => { startError = error; });
  const report = path.join(directory, "downloads", config.name + ".json");
  let result;
  const deadline = Date.now() + 24000;
  while (Date.now() < deadline && !startError) {
    try { result = JSON.parse(await fs.readFile(report, "utf8")); break; } catch { await new Promise((resolve) => setTimeout(resolve, 150)); }
  }
  browser.kill("SIGTERM");
  setTimeout(() => { if (browser.exitCode === null) browser.kill("SIGKILL"); }, 800).unref();
  const failures = result?.checks.filter((item) => !item.passed) ?? [{ name: startError?.message ?? "No browser report" }];
  failed += failures.length + (result?.errors.length ?? 0);
  console.log(`${config.name}: ${failures.length || result?.errors.length ? "FAIL" : "PASS"} ${JSON.stringify(failures)}`);
}
process.exitCode = failed ? 1 : 0;
