// Wrap the artifact fragment into a standalone HTML document.
// Reads and writes UTF-8 explicitly with no BOM — do NOT do this step with
// PowerShell's Get-Content/Set-Content, which round-trips through the ANSI
// code page and silently double-encodes every non-ASCII character.
const fs = require("fs");
const path = require("path");

const SRC = process.argv[2];
const OUT = path.join(__dirname, "index.html");

const frag = fs.readFileSync(SRC, "utf8").replace(/^﻿/, "");
const marker = '<div id="root"></div>';
const k = frag.indexOf(marker);
if (k < 0) { console.error("marker not found: " + marker); process.exit(1); }

const doc = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>:root{color-scheme:light dark}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
${frag.slice(0, k).trimEnd()}
</head>
<body>
${frag.slice(k)}
</body>
</html>
`;

fs.writeFileSync(OUT, doc, { encoding: "utf8" });

const b = fs.readFileSync(OUT);
const seq = (a, n) => { let c = 0; for (let i = 0; i <= a.length - n.length; i++) { let ok = 1; for (let j = 0; j < n.length; j++) if (a[i + j] !== n[j]) { ok = 0; break; } c += ok; } return c; };
const bad = seq(b, [0xC3, 0xA2]) + seq(b, [0xC3, 0x83]);
console.log(`wrote index.html  ${b.length.toLocaleString()} bytes`);
console.log(`BOM: ${b[0] === 0xEF && b[1] === 0xBB && b[2] === 0xBF}   double-encoded sequences: ${bad}`);
if (bad > 0) { console.error("ENCODING DAMAGE DETECTED - refusing to continue"); process.exit(1); }
