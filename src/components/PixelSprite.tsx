import type { CSSProperties } from 'react'

type SpriteDefinition = {
  image: 'dog.webp' | 'care.webp' | 'navigation.webp' | 'currency-effects.webp' | 'room.webp'
  atlasWidth: number
  atlasHeight: number
  x: number
  y: number
  w: number
  h: number
  displayScale: number
}

const dog = (x: number, y: number): SpriteDefinition => ({
  image: 'dog.webp', atlasWidth: 256, atlasHeight: 168, x, y, w: 64, h: 56, displayScale: 1,
})

const care = (x: number, y: number): SpriteDefinition => ({
  image: 'care.webp', atlasWidth: 200, atlasHeight: 108, x, y, w: 40, h: 36, displayScale: 1.4,
})

const nav = (x: number): SpriteDefinition => ({
  image: 'navigation.webp', atlasWidth: 160, atlasHeight: 32, x, y: 0, w: 32, h: 32, displayScale: 2,
})

const effect = (x: number): SpriteDefinition => ({
  image: 'currency-effects.webp', atlasWidth: 200, atlasHeight: 36, x, y: 0, w: 40, h: 36, displayScale: 1.4,
})

const room = (x: number, y: number): SpriteDefinition => ({
  image: 'room.webp', atlasWidth: 384, atlasHeight: 144, x, y, w: 96, h: 72, displayScale: 1.2,
})

const dogIdle = dog(0, 0)
const dogPlaying = dog(192, 56)
const heart = effect(80)
const careBed = care(0, 36)
const careCamera = care(40, 36)
const careTraining = care(0, 72)
const careGrooming = care(40, 72)
const roomPlant = room(0, 72)
const roomBed = room(96, 72)

const sprites = {
  'dog-idle': dogIdle,
  'dog-sitting': dog(64, 0),
  'dog-standing': dogIdle,
  'dog-happy': dog(128, 0),
  'dog-curious': dog(192, 0),
  'dog-waiting-walk': dog(0, 56),
  'dog-eating': dog(64, 56),
  'dog-drinking': dog(128, 56),
  'dog-playing': dogPlaying,
  'dog-bringing': dogPlaying,
  'dog-sleeping': dog(0, 112),
  'dog-brushed': dog(64, 112),
  'dog-sad': dog(128, 112),

  'care-food': care(0, 0),
  'care-water': care(40, 0),
  'care-leash': care(80, 0),
  'care-play': care(120, 0),
  'care-brush': care(160, 0),
  'care-bed': careBed,
  'care-sleep': careBed,
  'care-camera': careCamera,
  'care-photo': careCamera,
  'care-vet': care(80, 36),
  'care-diary': care(120, 36),
  'care-trophy': care(160, 36),
  'care-training': careTraining,
  'care-learn': careTraining,
  'care-grooming': careGrooming,
  'care-clean': careGrooming,
  'care-treat': care(80, 72),
  'care-shower': care(120, 72),
  'care-nails': care(160, 72),
  'care-pet': heart,

  'nav-home': nav(0),
  'nav-training': nav(32),
  'nav-adventures': nav(64),
  'nav-history': nav(96),
  'nav-more': nav(128),

  'currency-bone': effect(0),
  'currency-coin': effect(40),
  'currency-heart': heart,
  'effect-heart': heart,
  'effect-speech': effect(120),
  'effect-sparkle': effect(160),

  'room-window': room(0, 0),
  'room-sofa': room(96, 0),
  'room-side-table': room(192, 0),
  'room-lamp': room(288, 0),
  'room-plant': roomPlant,
  'room-plant-table': roomPlant,
  'room-bed': roomBed,
  'room-dog-bed': roomBed,
  'room-rug': room(192, 72),
} satisfies Record<string, SpriteDefinition>

export type PixelSpriteName = keyof typeof sprites

interface PixelSpriteProps {
  name: PixelSpriteName
  scale?: number
  className?: string
  label?: string
}

export function PixelSprite({ name, scale = 1, className, label }: PixelSpriteProps) {
  const sprite = sprites[name]
  const factor = sprite.displayScale * scale
  const style: CSSProperties = {
    display: 'inline-block',
    width: sprite.w * factor,
    height: sprite.h * factor,
    backgroundImage: `url(${import.meta.env.BASE_URL}assets/pixel/production/v2/${sprite.image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${sprite.atlasWidth * factor}px ${sprite.atlasHeight * factor}px`,
    backgroundPosition: `${-sprite.x * factor}px ${-sprite.y * factor}px`,
    imageRendering: 'pixelated',
    flex: '0 0 auto',
  }

  return <span className={className} style={style} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} />
}
