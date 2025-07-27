//git bash  npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/upload-images.ts

import { v2 as cloudinary } from 'cloudinary';
import { imagePaths, imageUrls } from './images';
import { writeFileSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

async function uploadAllImages() {
  const resultIds: string[] = [];

  for (const filePath of imagePaths) {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'story-mobile',
      });

      resultIds.push(`"${result.public_id}"`);
      console.log(`✅ ${result.public_id}`);
    } catch (err) {
      console.error(`❌ Ошибка загрузки ${filePath}`, err);
    }
  }

  const content = `export const uploadedIds = [\n${resultIds.map((id) => `  ${id},`).join('\n')}\n];\n`;

  writeFileSync('./scripts/uploaded-ids.ts', content, 'utf-8');
  console.log('\n📁 Файл saved to scripts/uploaded-ids.ts');
}

uploadAllImages();
