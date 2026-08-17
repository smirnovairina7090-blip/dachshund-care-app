type AssetDefinition = {
  x: number
  y: number
  width: number
  height: number
  displayWidth: number
  displayHeight: number
}

const atlasWidth = 1000
const atlasHeight = 496
const atlasSrc = `${import.meta.env.BASE_URL}assets/art/v3/atlas.png?v=20260818-0250`

const asset = (
  x: number,
  y: number,
  width: number,
  height: number,
  displayWidth: number,
): AssetDefinition => ({
  x,
  y,
  width,
  height,
  displayWidth,
  displayHeight: displayWidth * (height / width),
})

// Character crops are taken from the real visible bounds of the generated art,
// rather than from equal atlas cells. This prevents neighbouring dogs from leaking in.
const dogIdle = asset(23, 21, 153, 154, 78)
const dogHappy = asset(227, 5, 146, 170, 70)
const dogCurious = asset(441, 6, 118, 168, 58)
const dogPlaying = asset(609, 5, 182, 170, 86)
const dogWaiting = asset(836, 5, 128, 170, 62)

const feed = asset(5, 185, 86, 86, 56)
const water = asset(101, 186, 86, 83, 56)
const walk = asset(201, 204, 82, 64, 58)
const play = asset(293, 186, 86, 83, 56)
const train = asset(389, 188, 86, 80, 56)
const groom = asset(485, 188, 86, 80, 56)
const photo = asset(581, 190, 86, 75, 56)

// UI/nav icons keep their complete 80x80 generated cells so their soft 3D frames are intact.
const bone = asset(0, 276, 80, 80, 42)
const coin = asset(80, 276, 80, 80, 42)
const heart = asset(160, 276, 80, 80, 42)
const home = asset(240, 276, 80, 80, 42)
const training = asset(320, 276, 80, 80, 42)
const adventures = asset(400, 276, 80, 80, 42)
const history = asset(480, 276, 80, 80, 42)
const more = asset(560, 276, 80, 80, 42)

// Room crops deliberately start below the generated sheet headings.
const windowAsset = asset(30, 386, 119, 110, 118)
const sofa = asset(188, 386, 163, 110, 150)
const rug = asset(365, 387, 170, 77, 150)
const bed = asset(545, 369, 170, 113, 150)
const tableLamp = asset(761, 361, 97, 130, 92)

const sprites = {
  'dog-idle': dogIdle,
  'dog-sitting': dogIdle,
  'dog-standing': dogIdle,
  'dog-happy': dogHappy,
  'dog-curious': dogCurious,
  'dog-waiting-walk': dogWaiting,
  'dog-eating': dogIdle,
  'dog-drinking': dogIdle,
  'dog-playing': dogPlaying,
  'dog-bringing': dogPlaying,
  'dog-sleeping': dogIdle,
  'dog-brushed': dogHappy,
  'dog-sad': dogWaiting,

  'care-food': feed,
  'care-water': water,
  'care-leash': walk,
  'care-play': play,
  'care-brush': groom,
  'care-bed': bed,
  'care-sleep': bed,
  'care-camera': photo,
  'care-photo': photo,
  'care-vet': groom,
  'care-diary': history,
  'care-trophy': coin,
  'care-training': train,
  'care-learn': train,
  'care-grooming': groom,
  'care-clean': groom,
  'care-treat': feed,
  'care-shower': water,
  'care-nails': groom,
  'care-pet': heart,

  'nav-home': home,
  'nav-training': training,
  'nav-adventures': adventures,
  'nav-history': history,
  'nav-more': more,

  'currency-bone': bone,
  'currency-coin': coin,
  'currency-heart': heart,
  'effect-heart': heart,
  'effect-speech': heart,
  'effect-sparkle': coin,

  'room-window': windowAsset,
  'room-sofa': sofa,
  'room-side-table': tableLamp,
  'room-lamp': tableLamp,
  'room-plant': tableLamp,
  'room-plant-table': tableLamp,
  'room-bed': bed,
  'room-dog-bed': bed,
  'room-rug': rug,
} satisfies Record<string, AssetDefinition>

export type PixelSpriteName = keyof typeof sprites

interface PixelSpriteProps {
  name: PixelSpriteName
  scale?: number
  className?: string
  label?: string
}

export function PixelSprite({ name, scale = 1, className, label }: PixelSpriteProps) {
  const sprite = sprites[name]
  const width = sprite.displayWidth * scale
  const height = sprite.displayHeight * scale
  const renderScale = width / sprite.width

  return (
    <span
      className={className ? `cinematic-asset ${className}` : 'cinematic-asset'}
      style={{
        width,
        height,
        display: 'inline-block',
        flex: '0 0 auto',
        backgroundImage: `url(${atlasSrc})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${atlasWidth * renderScale}px ${atlasHeight * renderScale}px`,
        backgroundPosition: `${-sprite.x * renderScale}px ${-sprite.y * renderScale}px`,
      }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  )
}
