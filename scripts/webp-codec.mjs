// Núcleo de conversão pra WebP via @jsquash (codecs WASM puros) —
// reaproveitado por migrate-wp-posts.mjs (converte cada imagem já na
// primeira migração) e convert-blog-images-webp.mjs (converteu o que já
// tinha sido baixado antes dessa etapa existir). `sharp` foi descartado:
// precisa baixar um binário nativo por plataforma no postinstall, e esse
// download trava neste ambiente sem erro nenhum, só nunca termina. O WASM
// do jsquash já vem dentro do pacote (zero fetch externo de verdade) — só
// precisa deste patch porque o loader dele assume que `fetch('file://...')`
// funciona (funciona no browser/Workers, não no Node).
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";

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

export const WEBP_QUALITY = 82;

export function sniffImageFormat(buf) {
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return "png";
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpeg";
  return null;
}

/** Converte um Buffer de imagem (PNG ou JPEG) pra Buffer WebP. Lança se o
 *  formato não for reconhecido — quem chama decide o que fazer (manter o
 *  arquivo original é a saída segura, ver os dois scripts que usam isto). */
export async function convertToWebp(buf, quality = WEBP_QUALITY) {
  const format = sniffImageFormat(buf);
  if (!format) throw new Error("formato de imagem não reconhecido (nem PNG nem JPEG)");
  const imageData = format === "png" ? await decodePng(buf) : await decodeJpeg(buf);
  return Buffer.from(await encodeWebp(imageData, { quality }));
}
