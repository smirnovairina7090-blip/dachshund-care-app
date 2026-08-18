type AssetDefinition = {
  column: number
  row: number
  displayWidth: number
}

const asset = (column: number, row: number, displayWidth: number): AssetDefinition => ({ column, row, displayWidth })

// v5 UI atlas: 768x384, 6 columns x 3 rows, 128px per cell.
// Every cell comes from the approved warm 3D visual mockup and is rendered at or below native size.
const dogAvatar = asset(0, 0, 64)
const bone = asset(1, 0, 42)
const coin = asset(2, 0, 42)
const feed = asset(3, 0, 58)
const water = asset(4, 0, 58)
const walk = asset(5, 0, 58)
const play = asset(0, 1, 58)
const training = asset(1, 1, 58)
const grooming = asset(2, 1, 58)
const photo = asset(3, 1, 58)
const health = asset(4, 1, 58)
const brush = asset(5, 1, 58)
const home = asset(0, 2, 38)
const navTraining = asset(1, 2, 38)
const adventures = asset(2, 2, 38)
const history = asset(3, 2, 38)
const more = asset(4, 2, 38)

const sprites = {
  'dog-idle': dogAvatar,
  'dog-sitting': dogAvatar,
  'dog-standing': dogAvatar,
  'dog-happy': dogAvatar,
  'dog-curious': dogAvatar,
  'dog-waiting-walk': dogAvatar,
  'dog-eating': dogAvatar,
  'dog-drinking': dogAvatar,
  'dog-playing': dogAvatar,
  'dog-bringing': dogAvatar,
  'dog-sleeping': dogAvatar,
  'dog-brushed': dogAvatar,
  'dog-sad': dogAvatar,

  'care-food': feed,
  'care-water': water,
  'care-leash': walk,
  'care-play': play,
  'care-brush': brush,
  'care-bed': health,
  'care-sleep': health,
  'care-camera': photo,
  'care-photo': photo,
  'care-vet': health,
  'care-diary': history,
  'care-trophy': coin,
  'care-training': training,
  'care-learn': training,
  'care-grooming': grooming,
  'care-clean': grooming,
  'care-treat': feed,
  'care-shower': water,
  'care-nails': brush,
  'care-pet': health,

  'nav-home': home,
  'nav-training': navTraining,
  'nav-adventures': adventures,
  'nav-history': history,
  'nav-more': more,

  'currency-bone': bone,
  'currency-coin': coin,
  'currency-heart': health,
  'effect-heart': health,
  'effect-speech': health,
  'effect-sparkle': coin,

  // Room props are no longer composed from sprites in v5; the room is one HD illustration.
  // Keeping aliases here preserves component compatibility while we phase out legacy prop calls.
  'room-window': dogAvatar,
  'room-sofa': dogAvatar,
  'room-side-table': dogAvatar,
  'room-lamp': dogAvatar,
  'room-plant': dogAvatar,
  'room-plant-table': dogAvatar,
  'room-bed': dogAvatar,
  'room-dog-bed': dogAvatar,
  'room-rug': dogAvatar,
} satisfies Record<string, AssetDefinition>

export type PixelSpriteName = keyof typeof sprites

interface PixelSpriteProps {
  name: PixelSpriteName
  scale?: number
  className?: string
  label?: string
}

const CELL = 128
const COLS = 6
const ROWS = 3
const assetUrl = `${import.meta.env.BASE_URL}assets/art/v5/ui.webp?v=20260818-v5-final`

export function PixelSprite({ name, scale = 1, className, label }: PixelSpriteProps) {
  const item = sprites[name]
  const size = item.displayWidth * scale

  return (
    <span
      className={className ? `cinematic-asset ${className}` : 'cinematic-asset'}
      style={{
        position: 'relative',
        display: 'inline-block',
        overflow: 'hidden',
        width: size,
        height: size,
        flex: '0 0 auto',
        borderRadius: '22%',
      }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <img
        src={assetUrl}
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{
          position: 'absolute',
          left: -item.column * size,
          top: -item.row * size,
          width: size * COLS,
          height: size * ROWS,
          maxWidth: 'none',
          maxHeight: 'none',
          display: 'block',
          pointerEvents: 'none',
        }}
      />
    </span>
  )
}
