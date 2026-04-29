import sharp from "sharp";
import { writeFileSync } from "node:fs";

const W = 1200;
const H = 630;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#14110f"/>
      <stop offset="100%" stop-color="#1d1916"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>

  <!-- Mark: rounded square with italic H, mirrored from favicon -->
  <g transform="translate(${W / 2 - 110}, 110)">
    <rect width="220" height="220" rx="36" fill="#fafaf7"/>
    <text x="110" y="160" font-family="Georgia, 'Times New Roman', serif"
          font-size="150" fill="#14110f" text-anchor="middle" font-style="italic">H</text>
  </g>

  <!-- Studio name -->
  <text x="${W / 2}" y="430" font-family="Georgia, 'Times New Roman', serif"
        font-size="64" fill="#fafaf7" text-anchor="middle" letter-spacing="-1">
    Henrick F.
  </text>

  <!-- Accent rule -->
  <line x1="${W / 2 - 36}" y1="470" x2="${W / 2 + 36}" y2="470"
        stroke="#c8553d" stroke-width="2"/>

  <!-- Tagline -->
  <text x="${W / 2}" y="528" font-family="Inter, system-ui, sans-serif"
        font-size="26" fill="#9a938b" text-anchor="middle">
    Independent Product &amp; AI Builder
  </text>
  <text x="${W / 2}" y="568" font-family="Inter, system-ui, sans-serif"
        font-size="22" fill="#6f6962" text-anchor="middle">
    AI automations and custom apps for B2B companies.
  </text>
</svg>
`;

const out = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync("public/og-default.png", out);
console.log(`wrote public/og-default.png (${out.length} bytes)`);
