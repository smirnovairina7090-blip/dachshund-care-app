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

const dog = (index: number): AssetDefinition => ({
  x: index * 200,
  y: 0,
  width: 200,
  height: 180,
  displayWidth: 64,
  displayHeight: 58,
})

const action = (index: number): AssetDefinition => ({
  x: index * 96,
  y: 180,
  width: 96,
  height: 96,
  displayWidth: 56,
  displayHeight: 56,
})

const ui = (index: number): AssetDefinition => ({
  x: index * 80,
  y: 276,
  width: 80,
  height: 80,
  displayWidth: 56,
  displayHeight: 56,
})

const room = (index: number): AssetDefinition => ({
  x: index * 180,
  y: 356,
  width: 180,
  height: 140,
  displayWidth: 115,
  displayHeight: 89,
})

const dogIdle = dog(0)
const dogHappy = dog(1)
const dogWaiting = dog(2)
const dogCurious = dog(3)
const dogSleeping = dog(4)
const feed = action(0)
const water = action(1)
const walk = action(2)
const play = action(3)
const train = action(4)
const groom = action(5)
const photo = action(6)
const bone = ui(0)
const coin = ui(1)
const heart = ui(2)
const home = ui(3)
const training = ui(4)
const adventures = ui(5)
const history = ui(6)
const more = ui(7)
const windowAsset = room(0)
const sofa = room(1)
const rug = room(2)
const bed = room(3)
const tableLamp = room(4)

const sprites = {
  'dog-idle': dogIdle,
  'dog-sitting': dogIdle,
  'dog-standing': dogIdle,
  'dog-happy': dogHappy,
  'dog-curious': dogCurious,
  'dog-waiting-walk': dogWaiting,
  'dog-eating': dogIdle,
  'dog-drinking': dogIdle,
  'dog-playing': dogHappy,
  'dog-bringing': dogHappy,
  'dog-sleeping': dogSleeping,
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
  const href = `${import.meta.env.BASE_URL}assets/art/v3/atlas.avif`

  return (
    <span
      className={className ? `cinematic-asset ${className}` : 'cinematic-asset'}
      style={{ width, height }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <svg
        viewBox={`0 0 ${sprite.width} ${sprite.height}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <image
          href={href}
          x={-sprite.x}
          y={-sprite.y}
          width={atlasWidth}
          height={atlasHeight}
          preserveAspectRatio="none"
        />
      </svg>
    </span>
  )
}
