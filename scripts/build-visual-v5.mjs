import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'

const root = new URL('..', import.meta.url)

async function decodeParts(relativeDir, outputName) {
  const dir = new URL(`${relativeDir}/`, root)
  const files = (await readdir(dir)).filter((file) => file.endsWith('.b64')).toSorted()
  if (!files.length) throw new Error(`No base64 parts in ${relativeDir}`)

  let encoded = ''
  for (const file of files) {
    encoded += (await readFile(new URL(file, dir), 'utf8')).replace(/\s+/g, '')
  }

  const remainder = encoded.length % 4
  if (remainder) encoded += '='.repeat(4 - remainder)

  const data = Buffer.from(encoded, 'base64')
  if (data.subarray(0, 4).toString('ascii') !== 'RIFF' || data.subarray(8, 12).toString('ascii') !== 'WEBP') {
    throw new Error(`${outputName} is not a valid WebP container`)
  }

  return data
}

function webpSize(data) {
  const chunk = data.subarray(12, 16).toString('ascii')
  if (chunk === 'VP8X') {
    const width = data.readUIntLE(24, 3) + 1
    const height = data.readUIntLE(27, 3) + 1
    return { width, height }
  }

  if (chunk === 'VP8 ') {
    for (let i = 20; i < Math.min(data.length - 10, 64); i += 1) {
      if (data[i] === 0x9d && data[i + 1] === 0x01 && data[i + 2] === 0x2a) {
        return {
          width: data.readUInt16LE(i + 3) & 0x3fff,
          height: data.readUInt16LE(i + 5) & 0x3fff,
        }
      }
    }
  }

  throw new Error(`Unsupported WebP chunk ${chunk}`)
}

const outputDir = new URL('../public/assets/art/v5/', import.meta.url)
await mkdir(outputDir, { recursive: true })

const scene = await decodeParts('scripts/visual-v5/room-lite', 'scene.webp')
const ui = await decodeParts('scripts/visual-v5/ui', 'ui.webp')

const sceneSize = webpSize(scene)
const uiSize = webpSize(ui)

if (sceneSize.width !== 720 || sceneSize.height !== 395) {
  throw new Error(`Unexpected scene dimensions ${sceneSize.width}x${sceneSize.height}`)
}
if (uiSize.width !== 768 || uiSize.height !== 384) {
  throw new Error(`Unexpected UI dimensions ${uiSize.width}x${uiSize.height}`)
}

await writeFile(new URL('scene.webp', outputDir), scene)
await writeFile(new URL('ui.webp', outputDir), ui)

console.log(`visual-v5: scene ${sceneSize.width}x${sceneSize.height}, ${scene.length} bytes`)
console.log(`visual-v5: ui ${uiSize.width}x${uiSize.height}, ${ui.length} bytes`)
