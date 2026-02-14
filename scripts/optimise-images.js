import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const INPUT_DIR = 'static/media/';
const OUTPUT_DIR = 'static/processed/';

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

if (!fs.existsSync(INPUT_DIR)) {
    console.log('No originals directory found, skipping.');
    process.exit(0);
}

const files = fs.readdirSync(INPUT_DIR);

for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    const outputPath = path.join(
        OUTPUT_DIR,
        file.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    );
    console.log(`Processing ${file}...`);

    await sharp(inputPath)
        .resize({
            width: 435,
            height: 500,
            fit: 'cover',
            position: 'centre',
            withoutEnlargement: true
        })
        .webp({ quality: 80 })
        .toFile(outputPath);

    console.log(`✔ ${file} → ${path.basename(outputPath)}`);
}

/**
 * CI-ONLY CLEANUP
 */
if (process.env.CI === 'true') {
    console.log('CI detected — deleting original images');
    fs.rmSync(INPUT_DIR, { recursive: true, force: true });
} else {
    console.log('Local build — keeping original images');
}
