// Baut aus src/ eine einzige, komplett eigenständige index.html (JS + CSS inline).
// Aufruf: npm run build   (oder: node build.mjs --watch)
import { build, context } from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';

const watch = process.argv.includes('--watch');

async function bundleOnce() {
  const result = await build({
    entryPoints: ['src/main.js'],
    bundle: true,
    format: 'iife',
    minify: true,
    target: ['es2020'],
    write: false,
    legalComments: 'none',
    logLevel: 'silent',
  });
  const js = result.outputFiles[0].text;
  const css = readFileSync('src/styles.css', 'utf8');
  const genie = readFileSync('src/genie.svg', 'utf8').trim();
  const html = readFileSync('src/index.html', 'utf8')
    .replace('<!--__GENIE__-->', () => genie)
    .replace('/*__INLINE_CSS__*/', () => css)
    .replace('/*__INLINE_JS__*/', () => js.replace(/<\/script/gi, '<\\/script'));
  writeFileSync('index.html', html);
  console.log(`index.html geschrieben (${(html.length / 1024).toFixed(0)} kB)`);

  // Optional: Variante ohne Dokumentgerüst (für Hosts, die <html>/<head>/<body> selbst setzen).
  const fragIdx = process.argv.indexOf('--fragment');
  if (fragIdx !== -1 && process.argv[fragIdx + 1]) {
    const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? '';
    const body = html.match(/<body>([\s\S]*?)<\/body>/i)?.[1] ?? '';
    const keep = head
      .split('\n')
      .filter((l) => !/<meta charset|<meta name="viewport"/i.test(l))
      .join('\n');
    writeFileSync(process.argv[fragIdx + 1], `${keep}\n${body}`);
    console.log(`Fragment geschrieben: ${process.argv[fragIdx + 1]}`);
  }
}

if (watch) {
  const ctx = await context({ entryPoints: ['src/main.js'], bundle: true, write: false, logLevel: 'silent' });
  await bundleOnce();
  const { watch: fsWatch } = await import('node:fs');
  let pending = null;
  fsWatch('src', { recursive: true }, () => {
    clearTimeout(pending);
    pending = setTimeout(() => bundleOnce().catch((e) => console.error(e.message)), 80);
  });
  console.log('Watch-Modus: src/ wird beobachtet …');
  await ctx.watch();
} else {
  await bundleOnce();
}
