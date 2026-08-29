#!/usr/bin/env node
// Converte toda imagem baixada pro blog (public/assets/imgs/blog/**) pra
// .webp e reescreve as referências em content/blog/*.mdx (coverImage do
// frontmatter + toda imagem inline do corpo). Roda uma vez, manualmente —
// não faz parte do build (as imagens já nascem em .webp em migrações
// futuras, ver `toWebp()` em migrate-wp-posts.mjs).
//
// Usa @jsquash (codecs WASM puros) em vez de `sharp`: `sharp` precisa
// baixar um binário nativo por plataforma no postinstall, e esse download
// trava neste ambiente (sem erro, só nunca termina). O WASM do jsquash já
// vem dentro do pacote — zero fetch externo — só precisa do patch de
// `fetch` abaixo porque o loader dele assume que rodar `fetch('file://...')`
// funciona (funciona no browser/Workers, não no Node).
import { readFile, writeFile, readdir, rm, stat } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const realFetch = globalThis.fetch;
globalThis.fetch = async (input, init) => {
  const url = typeof input === "string" ? input : (input?.url ?? String(input));
  if (url.startsWith("file://")) {
    const buf = await readFile(fileURLToPath(url));
    return new Response(buf, { status: 200, headers: { "Content-Type": "application/wasm" } });
  }
  return realFetch(input, init);
};

const { decode: decodePng } = await import("@jsquash/png");
const { decode: decodeJpeg } = await import("@jsquash/jpeg");
const { encode: encodeWebp } = await import("@jsquash/webp");

const ROOT = path.resolve(import.meta.dirname, "..");
const IMG_DIR = path.join(ROOT, "public", "assets", "imgs", "blog");
const CONTENT_DIR = path.join(ROOT, "content", "blog");
const QUALITY = 82;

function sniffFormat(buf) {
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return "png";
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpeg";
  return null;
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

async function main() {
  const files = (await walk(IMG_DIR)).filter((f) => !f.toLowerCase().endsWith(".webp"));
  console.log(`${files.length} imagens encontradas.\n`);

  // caminho público ANTIGO ("/assets/imgs/blog/slug/nome.png") → NOVO
  // ("/assets/imgs/blog/slug/nome.webp") — usado depois pra reescrever os
  // .mdx numa passada só.
  const pathMap = new Map();
  let totalBefore = 0;
  let totalAfter = 0;
  let skipped = 0;

  for (const [i, file] of files.entries()) {
    const buf = await readFile(file);
    const format = sniffFormat(buf);
    const rel = "/" + path.relative(path.join(ROOT, "public"), file).split(path.sep).join("/");

    if (!format) {
      console.log(`[${i + 1}/${files.length}] SKIP (formato desconhecido): ${rel}`);
      skipped++;
      continue;
    }

    try {
      const imageData = format === "png" ? await decodePng(buf) : await decodeJpeg(buf);
      const webpBuf = Buffer.from(await encodeWebp(imageData, { quality: QUALITY }));

      const outFile = file.replace(/\.[a-zA-Z0-9]+$/, "") + ".webp";
      // arquivo sem extensão nenhuma (alguns vindos de URL do Google Fotos)
      const finalOutFile = outFile === file ? file + ".webp" : outFile;
      await writeFile(finalOutFile, webpBuf);
      await rm(file);

      const newRel = "/" + path.relative(path.join(ROOT, "public"), finalOutFile).split(path.sep).join("/");
      pathMap.set(rel, newRel);
      totalBefore += buf.length;
      totalAfter += webpBuf.length;
      console.log(`[${i + 1}/${files.length}] ${rel} → ${newRel} (${(buf.length / 1024).toFixed(0)}KB → ${(webpBuf.length / 1024).toFixed(0)}KB)`);
    } catch (err) {
      console.log(`[${i + 1}/${files.length}] ERRO em ${rel}: ${err.message}`);
      skipped++;
    }
  }

  console.log(`\n${pathMap.size} imagens convertidas, ${skipped} puladas.`);
  console.log(`Peso total: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB.`);

  // ── Reescreve as referências em content/blog/*.mdx ──────────────────────
  const mdxFiles = (await readdir(CONTENT_DIR)).filter((f) => f.endsWith(".mdx"));
  let filesUpdated = 0;
  for (const file of mdxFiles) {
    const full = path.join(CONTENT_DIR, file);
    let text = await readFile(full, "utf8");
    const original = text;
    for (const [oldPath, newPath] of pathMap) {
      text = text.split(oldPath).join(newPath);
    }
    if (text !== original) {
      await writeFile(full, text, "utf8");
      filesUpdated++;
    }
  }
  console.log(`${filesUpdated} arquivos .mdx atualizados.`);

  if (skipped > 0) {
    console.log(`\n${skipped} imagem(ns) não puderam ser convertidas — referência original mantida pra essas.`);
  }
}

main();
