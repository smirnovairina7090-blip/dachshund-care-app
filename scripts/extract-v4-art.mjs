import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const source = '/tmp/atlas.avif'
const outDir = path.resolve('public/assets/art/v4')

const assets = {
  'dog-idle.png': [23, 21, 153, 154],
  'dog-happy.png': [227, 5, 146, 170],
  'dog-curious.png': [441, 6, 118, 168],
  'dog-playing.png': [609, 5, 182, 170],
  'dog-waiting.png': [836, 5, 128, 170],

  'care-feed.png': [5, 185, 86, 86],
  'care-water.png': [101, 186, 86, 83],
  'care-walk.png': [201, 204, 82, 64],
  'care-play.png': [293, 186, 86, 83],
  'care-train.png': [389, 188, 86, 80],
  'care-groom.png': [485, 188, 86, 80],
  'care-photo.png': [581, 190, 86, 75],

  'ui-bone.png': [0, 276, 80, 80],
  'ui-coin.png': [80, 276, 80, 80],
  'ui-heart.png': [160, 276, 80, 80],
  'nav-home.png': [240, 276, 80, 80],
  'nav-training.png': [320, 276, 80, 80],
  'nav-adventures.png': [400, 276, 80, 80],
  'nav-history.png': [480, 276, 80, 80],
  'nav-more.png': [560, 276, 80, 80],

  'room-window.png': [30, 386, 119, 110],
  'room-sofa.png': [188, 386, 163, 110],
  'room-rug.png': [365, 387, 170, 77],
  'room-bed.png': [545, 369, 170, 113],
  'room-table-lamp.png': [761, 361, 97, 130],
}

await fs.mkdir(outDir, { recursive: true })

for (const [filename, [left, top, width, height]] of Object.entries(assets)) {
  await sharp(source)
    .extract({ left, top, width, height })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(outDir, filename))
}

console.log(`Generated ${Object.keys(assets).length} v4 PNG assets in ${outDir}`)
