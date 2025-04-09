import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = [192, 512];
const inputFile = join(__dirname, '../public/icons/fridge.svg');
const outputDir = join(__dirname, '../public/icons');

async function generateIcons() {
  for (const size of sizes) {
    await sharp(inputFile)
      .resize(size, size)
      .png()
      .toFile(join(outputDir, `pwa-${size}x${size}.png`));
    
    console.log(`Generated ${size}x${size} icon`);
  }
}

// 確保輸出目錄存在
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

generateIcons().catch(console.error); 