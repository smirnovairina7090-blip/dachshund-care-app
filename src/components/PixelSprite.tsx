type AssetDefinition = {
  file: string
  displayWidth: number
  displayHeight?: number
}

const asset = (file: string, displayWidth: number, displayHeight?: number): AssetDefinition => ({
  file,
  displayWidth,
  displayHeight,
})

const dogIdle = asset('dog-idle.png', 78)
const dogHappy = asset('dog-happy.png', 72)
const dogCurious = asset('dog-curious.png', 62)
const dogPlaying = asset('dog-playing.png', 88)
const dogWaiting = asset('dog-waiting.png', 66)

const feed = asset('care-feed.png', 56)
const water = asset('care-water.png', 56)
const walk = asset('care-walk.png', 58)
const play = asset('care-play.png', 56)
const train = asset('care-train.png', 56)
const groom = asset('care-groom.png', 56)
const photo = asset('care-photo.png', 56)

const bone = asset('ui-bone.png', 42)
const coin = asset('ui-coin.png', 42)
const heart = asset('ui-heart.png', 42)
const home = asset('nav-home.png', 42)
const training = asset('nav-training.png', 42)
const adventures = asset('nav-adventures.png', 42)
const history = asset('nav-history.png', 42)
const more = asset('nav-more.png', 42)

const windowAsset = asset('room-window.png', 118)
const sofa = asset('room-sofa.png', 150)
const rug = asset('room-rug.png', 150)
const bed = asset('room-bed.png', 150)
const tableLamp = asset('room-table-lamp.png', 92)

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
  const src = `${import.meta.env.BASE_URL}assets/art/v4/${sprite.file}?v=20260818-0823`

  return (
    <img
      className={className ? `cinematic-asset ${className}` : 'cinematic-asset'}
      src={src}
      width={width}
      height={sprite.displayHeight ? sprite.displayHeight * scale : undefined}
      alt={label ?? ''}
      aria-hidden={label ? undefined : true}
      draggable={false}
      style={{
        display: 'block',
        width,
        height: sprite.displayHeight ? sprite.displayHeight * scale : 'auto',
        objectFit: 'contain',
        flex: '0 0 auto',
      }}
    />
  )
}
