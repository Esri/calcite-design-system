/**
 * update-keywords.js
 * Preserves keywords.json formatting and injects "codepoint": <number|null> into each icon block.
 *
 * Usage:
 *   node update-keywords.js [fantasticonrc.json] [keywords.json] [output.json]
 */

const fs = require('fs');
const path = require('path');

// CLI args
const fantasticonrcPath = process.argv[2] || 'fantasticonrc.json';
const keywordsPath      = process.argv[3] || 'keywords.json';
const outputPath        = process.argv[4] || 'updated_keywords.json';

// Helpers
function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function safeReadJson(fp) {
  const txt = fs.readFileSync(fp, 'utf8');
  return JSON.parse(txt);
}
function findKeyStart(text, key) {
  const re = new RegExp(`^\\s*"${escapeRegExp(key)}"\\s*:\\s*\\{`, 'm');
  const m = re.exec(text);
  if (!m) return -1;
  return text.indexOf('{', m.index);
}
function findMatchingBrace(text, startIndex) {
  let depth = 1, inString = false, escape = false;
  for (let i = startIndex + 1; i < text.length; i++) {
    const ch = text[i];
    if (escape) { escape = false; continue; }
    if (ch === '\\') { escape = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === '{') depth++;
    else if (ch === '}') { depth--; if (depth === 0) return i; }
  }
  return -1;
}
function injectCodepointIntoBlock(text, startBraceIdx, endBraceIdx, key, cpValue) {
  const inner = text.slice(startBraceIdx + 1, endBraceIdx);
  const cpLineRe = /(\s*"codepoint"\s*:\s*)([^,\n}]+)(\s*)(,?)/;
  if (cpLineRe.test(inner)) {
    const cpLiteral = cpValue == null ? 'null' : String(cpValue);
    const innerNew = inner
      .replace(cpLineRe, (_, p1, _oldVal, p3, p4) => `${p1}${cpLiteral}${p3}${p4}`)
      .replace(/\s+$/,''); // ensure no trailing whitespace before closing brace
    return text.slice(0, startBraceIdx + 1) + innerNew + text.slice(endBraceIdx);
  }
  const lines = inner.split(/\r?\n/);
  while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();
  let propIndent = '    ';
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].trim()) {
      const m = /^(\s*)/.exec(lines[i]);
      propIndent = m ? m[1] : propIndent;
      break;
    }
  }
  if (lines.length) {
    const lastIdx = lines.length - 1;
    const lastTrim = lines[lastIdx].trim();
    if (!lastTrim.endsWith(',')) {
      lines[lastIdx] = lines[lastIdx].replace(/\s*$/,'') + ',';
    }
  }
  const cpLiteral = cpValue == null ? 'null' : String(cpValue);
  lines.push(`${propIndent}"codepoint": ${cpLiteral}`);
  const innerNew = lines.join('\n').replace(/\s+$/,'');
  return text.slice(0, startBraceIdx + 1) + innerNew + text.slice(endBraceIdx);
}

// Load inputs
let fc, codepoints, src, parsed;
try { fc = safeReadJson(fantasticonrcPath); } catch (e) {
  console.error(`Failed to read: ${fantasticonrcPath}\n${e.message}`); process.exit(1);
}
codepoints = fc.codepoints || {};
try { src = fs.readFileSync(keywordsPath, 'utf8'); } catch (e) {
  console.error(`Failed to read: ${keywordsPath}\n${e.message}`); process.exit(1);
}
try { parsed = JSON.parse(src); } catch (e) {
  console.error(`Failed to parse ${keywordsPath} (discover keys):\n${e.message}`); process.exit(1);
}
const iconKeys = Object.keys(parsed);

// Inject
let updatedSrc = src;
let updatedCount = 0;
const missingKeys = [];
for (const icon of iconKeys) {
  const startBraceIdx = findKeyStart(updatedSrc, icon);
  if (startBraceIdx < 0) continue;
  const endBraceIdx = findMatchingBrace(updatedSrc, startBraceIdx);
  if (endBraceIdx < 0) continue;
  const cpVal = Object.prototype.hasOwnProperty.call(codepoints, icon) ? codepoints[icon] : null;
  if (cpVal == null) missingKeys.push(icon); else updatedCount++;
  updatedSrc = injectCodepointIntoBlock(updatedSrc, startBraceIdx, endBraceIdx, icon, cpVal);
}

// Write (with optional backup when overwriting)
try {
  if (outputPath === keywordsPath) {
    const backup = path.join(path.dirname(keywordsPath), 'keywords_backup.json');
    fs.writeFileSync(backup, src, 'utf8');
    console.log(`Backup saved: ${backup}`);
  }
  fs.writeFileSync(outputPath, updatedSrc, 'utf8');
  console.log(`Updated file saved: ${outputPath}`);
} catch (e) {
  console.error(`Failed to write ${outputPath}\n${e.message}`); process.exit(1);
}

// Report
console.log(`Total icons processed: ${iconKeys.length}`);
console.log(`Icons updated with codepoints: ${updatedCount}`);
console.log(`Icons missing codepoints: ${missingKeys.length}`);
if (missingKeys.length) {
  console.log('Missing codepoints (first 20):');
  console.log(missingKeys.slice(0, 20).join(', '));
}
