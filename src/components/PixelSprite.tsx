type AtlasFile =
  | 'dog.webp'
  | 'care.webp'
  | 'navigation.webp'
  | 'currency-effects.webp'
  | 'room.webp'

type AssetDefinition = {
  atlas: AtlasFile
  x: number
  y: number
  width: number
  height: number
  atlasWidth: number
  atlasHeight: number
  displayWidth: number
}

const sprite = (
  atlas: AtlasFile,
  x: number,
  y: number,
  width: number,
  height: number,
  atlasWidth: number,
  atlasHeight: number,
  displayWidth: number,
): AssetDefinition => ({
  atlas,
  x,
  y,
  width,
  height,
  atlasWidth,
  atlasHeight,
  displayWidth,
})

const dog = (column: number, row: number, displayWidth: number) =>
  sprite('dog.webp', column * 64, row * 56, 64, 56, 256, 168, displayWidth)

const care = (column: number, row: number, displayWidth = 56) =>
  sprite('care.webp', column * 40, row * 36, 40, 36, 200, 108, displayWidth)

const nav = (column: number) =>
  sprite('navigation.webp', column * 32, 0, 32, 32, 160, 32, 42)

const currency = (column: number) =>
  sprite('currency-effects.webp', column * 40, 0, 40, 36, 200, 36, 42)

const room = (column: number, row: number, displayWidth: number) =>
  sprite('room.webp', column * 96, row * 72, 96, 72, 384, 144, displayWidth)

const dogIdle = dog(0, 0, 78)
const dogSitting = dog(1, 0, 78)
const dogHappy = dog(2, 0, 72)
const dogCurious = dog(3, 0, 62)
const dogWaiting = dog(0, 1, 66)
const dogEating = dog(1, 1, 78)
const dogDrinking = dog(2, 1, 78)
const dogPlaying = dog(3, 1, 88)
const dogSleeping = dog(0, 2, 82)
const dogBrushed = dog(1, 2, 72)
const dogSad = dog(2, 2, 66)

const feed = care(0, 0)
const water = care(1, 0)
const walk = care(2, 0, 58)
const play = care(3, 0)
const brush = care(4, 0)
const bed = care(0, 1)
const camera = care(1, 1)
const vet = care(2, 1)
const diary = care(3, 1)
const trophy = care(4, 1)
const training = care(0, 2)
const grooming = care(1, 2)
const treat = care(2, 2)
const shower = care(3, 2)
const nails = care(4, 2)

const home = nav(0)
const navTraining = nav(1)
const adventures = nav(2)
const history = nav(3)
const more = nav(4)

const bone = currency(0)
const coin = currency(1)
const heart = currency(2)
const speech = currency(3)
const sparkle = currency(4)

const windowAsset = room(0, 0, 118)
const sofa = room(1, 0, 150)
const sideTable = room(2, 0, 92)
const lamp = room(3, 0, 92)
const plant = room(0, 1, 92)
const dogBed = room(1, 1, 150)
const rug = room(2, 1, 150)

const sprites = {
  'dog-idle': dogIdle,
  'dog-sitting': dogSitting,
  'dog-standing': dogIdle,
  'dog-happy': dogHappy,
  'dog-curious': dogCurious,
  'dog-waiting-walk': dogWaiting,
  'dog-eating': dogEating,
  'dog-drinking': dogDrinking,
  'dog-playing': dogPlaying,
  'dog-bringing': dogPlaying,
  'dog-sleeping': dogSleeping,
  'dog-brushed': dogBrushed,
  'dog-sad': dogSad,

  'care-food': feed,
  'care-water': water,
  'care-leash': walk,
  'care-play': play,
  'care-brush': brush,
  'care-bed': bed,
  'care-sleep': bed,
  'care-camera': camera,
  'care-photo': camera,
  'care-vet': vet,
  'care-diary': diary,
  'care-trophy': trophy,
  'care-training': training,
  'care-learn': training,
  'care-grooming': grooming,
  'care-clean': grooming,
  'care-treat': treat,
  'care-shower': shower,
  'care-nails': nails,
  'care-pet': heart,

  'nav-home': home,
  'nav-training': navTraining,
  'nav-adventures': adventures,
  'nav-history': history,
  'nav-more': more,

  'currency-bone': bone,
  'currency-coin': coin,
  'currency-heart': heart,
  'effect-heart': heart,
  'effect-speech': speech,
  'effect-sparkle': sparkle,

  'room-window': windowAsset,
  'room-sofa': sofa,
  'room-side-table': sideTable,
  'room-lamp': lamp,
  'room-plant': plant,
  'room-plant-table': sideTable,
  'room-bed': dogBed,
  'room-dog-bed': dogBed,
  'room-rug': rug,
} satisfies Record<string, AssetDefinition>

export type PixelSpriteName = keyof typeof sprites

interface PixelSpriteProps {
  name: PixelSpriteName
  scale?: number
  className?: string
  label?: string
}

const assetRoot = `${import.meta.env.BASE_URL}assets/pixel/production/v2/`

function positionPercent(offset: number, atlasSize: number, cellSize: number) {
  if (atlasSize === cellSize) return '0%'
  return `${(offset / (atlasSize - cellSize)) * 100}%`
}

export function PixelSprite({ name, scale = 1, className, label }: PixelSpriteProps) {
  const item = sprites[name]
  const width = item.displayWidth * scale
  const height = width * (item.height / item.width)
  const backgroundWidth = (item.atlasWidth / item.width) * 100
  const backgroundHeight = (item.atlasHeight / item.height) * 100

  return (
    <span
      className={className ? `cinematic-asset ${className}` : 'cinematic-asset'}
      style={{
        display: 'inline-block',
        width,
        height,
        flex: '0 0 auto',
        backgroundColor: 'transparent',
        backgroundImage: `url("${assetRoot}${item.atlas}?v=20260818-direct")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${backgroundWidth}% ${backgroundHeight}%`,
        backgroundPosition: `${positionPercent(item.x, item.atlasWidth, item.width)} ${positionPercent(item.y, item.atlasHeight, item.height)}`,
      }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  )
}
