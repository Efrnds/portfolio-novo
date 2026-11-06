import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const root = process.cwd();
const base = path.join(root, "src/product-slices");
const require = createRequire(path.join(root, "package.json"));
const productRoot = path.join(process.env.PROJECTS_ROOT ?? path.resolve(root, ".."), "calmera-os");
const productRequire = createRequire(path.join(productRoot, "package.json"));
const { build } = createRequire(require.resolve("vite/package.json"))("esbuild");
const { compile } = productRequire("@tailwindcss/node");
const { Scanner } = productRequire("@tailwindcss/oxide");
const postcss = require("postcss");
const kinds = { calmera: "Calmera", opinioteca: "Opinioteca", trato: "Trato", vwrks: "Vwrks" };
const external = /^(react($|\/)|react-dom($|\/)|motion($|\/))/;
const adapter = (name) => path.join(base, "compat", name);
const substitutions = {
  calmera: { StoreCartProvider: "../screens/Calmera.jsx" },
  opinioteca: {
    MenuDireito: "../screens/Opinioteca.jsx", WebSocketProvider: "opinioteca.jsx", ConfiguracoesProvider: "opinioteca.jsx", PlanoProvider: "opinioteca.jsx", AuthGateProvider: "opinioteca.jsx", AcessibilidadeProvider: "opinioteca.jsx",
    useDiario: "opinioteca.jsx", media: "opinioteca.jsx", avatar: "opinioteca.jsx", upload: "opinioteca.jsx", "session-cleanup": "opinioteca.jsx", pesquisa: "opinioteca.jsx",
    NovaAvaliacaoModal: "opinioteca.jsx", RegistrarLeituraModal: "opinioteca.jsx", DenunciarModal: "opinioteca.jsx", EditarAvaliacaoModal: "opinioteca.jsx", PlanoUpgradeModal: "opinioteca.jsx",
    AvisoAssinaturaExpirando: "opinioteca.jsx", NovaAvaliacaoFlutuante: "opinioteca.jsx", StreakFlutuante: "opinioteca.jsx",
  },
  trato: { "agendamento-slug": "trato.jsx", "google-login-enabled": "trato.jsx", "client-mobile-shell": "trato.jsx", "use-mobile": "trato.jsx", "mobile-layout": "trato.jsx", "app-sidebar": "trato.jsx", sidebar: "trato.jsx", "cliente-credenciais-fluxo": "trato.jsx", calendar: "trato.jsx", "catalogo-foto": "trato.jsx" },
  vwrks: { PagePreloader: "vwrks.jsx", ProgressivePreload: "vwrks.jsx", useIsMobile: "vwrks.jsx", mediaCache: "vwrks.jsx" },
};
await fs.mkdir(path.join(base, "generated"), { recursive: true });
const licenses = new Map();
for (const [kind, component] of Object.entries(kinds)) {
  const files = await fs.readdir(path.join(base, "upstream", kind));
  const byName = new Map(files.map((file) => [file.replace(/\.[^.]+$/, ""), path.join(base, "upstream", kind, file)]));
  const result = await build({
    stdin: { contents: `import React from 'react'; import Screen from './screens/${component}.jsx'; import {SliceProvider} from './compat/framework.jsx'; import {resetDemo as reset} from './screens/api.js'; export function resetDemo(){reset('${kind}')} export default function ProductScreen(){return <SliceProvider kind="${kind}" initialPath="${kind === "calmera" ? "/busca" : kind === "opinioteca" ? "/home" : kind === "vwrks" ? "/trabalho" : "/agendar/1-trato-barbershop"}"><Screen/></SliceProvider>}`, resolveDir: base, loader: "jsx" },
    outfile: path.join(base, "generated", `${kind}.mjs`), bundle: true, format: "esm", jsx: "automatic", minify: true, metafile: true, legalComments: "eof", mainFields: ["browser", "module", "main"], define: { "process.env.NODE_ENV": '"production"' },
    banner: { js: `import * as productReact from "react"; import * as productReactDOM from "react-dom"; const require = (id) => { if(id === "react") return productReact; if(id === "react-dom") return productReactDOM; throw new Error("Unsupported dependency: " + id); };` },
    plugins: [{ name: "product-framework-boundary", setup(build) {
      build.onResolve({ filter: /.*/ }, async (args) => {
        if (args.pluginData?.resolvedPackage) return;
        if (path.isAbsolute(args.path)) return { path: args.path, namespace: "file" };
        if (external.test(args.path)) return { path: args.path, external: true };
        if (args.path === "framer-motion") return { path: "motion/react", external: true };
        if (args.path.includes("portalContext")) return { path: "../portalContext.js", external: true };
        if (args.path === "__image__") return { path: adapter("framework.jsx"), namespace: "image-default" };
        if (args.path === "radix-ui" && !args.importer.endsWith("/compat/radix.jsx")) return { path: adapter("radix.jsx") };
        if (["next/link", "next/image", "next/navigation", "next-auth/react", "sonner"].includes(args.path)) return { path: adapter("framework.jsx"), namespace: args.path === "next/link" || args.path === "next/image" ? "next-default" : "file" };
        const name = path.basename(args.path).replace(/\.(jsx?|tsx?|json)$/, "");
        if (args.importer.includes("/upstream/")) {
          if (name === "utils") return { path: adapter("utils.js") };
          const replacement = substitutions[kind][name];
          if (replacement) return { path: adapter(replacement), namespace: ["MenuDireito", "PagePreloader", "ProgressivePreload"].includes(name) || /Modal$/.test(name) || /^(Aviso|StreakFlutuante|NovaAvaliacaoFlutuante)/.test(name) ? `adapter-${name}` : "file" };
          if (byName.has(name)) return { path: byName.get(name) };
        }
        if (!args.path.startsWith(".") && !path.isAbsolute(args.path) && !args.path.startsWith("@/")) {
          const resolved = await build.resolve(args.path, { resolveDir: productRoot, kind: args.kind, pluginData: { resolvedPackage: true } });
          if (!resolved.errors.length) return { path: resolved.path };
        }
      });
      build.onLoad({ filter: /.*/, namespace: "next-default" }, (args) => ({ contents: `export {${args.path === adapter("framework.jsx") ? "Link" : "Image"} as default} from ${JSON.stringify(adapter("framework.jsx"))}`, loader: "jsx" }));
      // Next Image and Link share a module but keep their original default imports.
      build.onResolve({ filter: /^__image__/ }, () => ({ path: adapter("framework.jsx"), namespace: "image-default" }));
      build.onLoad({ filter: /.*/, namespace: "image-default" }, () => ({ contents: `export {Image as default} from ${JSON.stringify(adapter("framework.jsx"))}`, loader: "jsx" }));
      for (const [name, target] of Object.entries(substitutions[kind])) {
        build.onLoad({ filter: /.*/, namespace: `adapter-${name}` }, () => ({ contents: `export {${["MenuDireito", "PagePreloader", "ProgressivePreload"].includes(name) ? name : /Modal$/.test(name) ? "ProductAction" : "Empty"} as default} from ${JSON.stringify(adapter(target))}`, loader: "jsx" }));
      }
      build.onLoad({ filter: /upstream\/.*\.(tsx?|jsx)$/ }, async (args) => {
        let contents = await fs.readFile(args.path, "utf8");
        contents = contents.replaceAll('"next/image"', '"__image__"');
        if (kind === "vwrks") contents = `import {scopedDocument as document} from ${JSON.stringify(adapter("vwrks.jsx"))};\n${contents}`;
        if (kind !== "vwrks") contents = `import {${kind}Request as fetch} from ${JSON.stringify(path.join(base, "screens/api.js"))};\n${contents}`;
        return { contents, loader: path.extname(args.path).slice(1), resolveDir: path.dirname(args.path) };
      });
    } }],
  });
  for (const file of Object.keys(result.metafile.inputs).filter((file) => file.includes("/node_modules/") || file.startsWith("../calmera-os/node_modules/"))) {
    let dir = path.dirname(path.resolve(root, file));
    while (dir.includes("/node_modules/")) {
      try {
        const pkg = JSON.parse(await fs.readFile(path.join(dir, "package.json"), "utf8"));
        if (pkg.name && !licenses.has(pkg.name)) {
          const licenseName = (await fs.readdir(dir)).find((name) => /^licen[sc]e(\.|$)/i.test(name));
          licenses.set(pkg.name, { version: pkg.version, license: pkg.license, text: licenseName ? await fs.readFile(path.join(dir, licenseName), "utf8") : "See upstream package." });
        }
        break;
      } catch { dir = path.dirname(dir); }
    }
  }
  const stylesheet = path.join(base, "upstream", kind, "globals.css");
  let css = await fs.readFile(stylesheet, "utf8");
  css = css.replace(/@import\s+["']shadcn\/tailwind.css["'];?/g, "");
  const compiler = await compile(css, { base: path.dirname(stylesheet), from: stylesheet, onDependency() {}, customCssResolver: async (id) => { if (id === "tw-animate-css") return path.join(path.dirname(productRequire.resolve("tailwindcss/package.json")), "../tw-animate-css/dist/tw-animate.css"); try { return productRequire.resolve(id === "tailwindcss" ? "tailwindcss/index.css" : id); } catch { return undefined; } } });
  const scanner = new Scanner({ sources: [{ base: path.join(base, "upstream", kind), pattern: "**/*.{tsx,ts,jsx,js}", negated: false }, { base: path.join(base, "screens"), pattern: "**/*.{jsx,js}", negated: false }, { base: path.join(base, "compat"), pattern: "**/*.{jsx,js}", negated: false }] });
  const ast = postcss.parse(compiler.build(scanner.scan()));
  // Registered custom properties are not applied inside every browser's ShadowRoot.
  // Keep Tailwind's initial values in its lowest-priority layer as well.
  const defaults = postcss.rule({ selector: "*, ::before, ::after, ::backdrop" });
  ast.walkAtRules("property", (node) => {
    const initial = node.nodes.find((entry) => entry.prop === "initial-value");
    if (initial) defaults.append(postcss.decl({ prop: node.params, value: initial.value }));
  });
  ast.append(postcss.atRule({ name: "layer", params: "properties" }).append(defaults));
  ast.walkRules((rule) => { rule.selector = rule.selector.replaceAll(":root", ":host").replace(/(^|[, ])html(?=[\s,.:{]|$)/g, "$1:host").replace(/(^|[, ])body(?=[\s,.:{]|$)/g, "$1.slice-app").replace(/(^|[, ])\.dark(?=[\s,.:{]|$)/g, "$1:host(.dark)"); });
  ast.walkAtRules("font-face", (node) => node.remove());
  await fs.writeFile(path.join(base, "generated", `${kind}.css`), ast.toString());
  console.log(`${kind}: original screen compiled`);
}
await fs.writeFile(path.join(base, "generated", "licenses.json"), JSON.stringify(Object.fromEntries(licenses), null, 2) + "\n");
await fs.mkdir(path.join(root, "public/product-slices"), { recursive: true });
await fs.writeFile(path.join(root, "public/product-slices/third-party-licenses.json"), JSON.stringify(Object.fromEntries(licenses), null, 2) + "\n");
