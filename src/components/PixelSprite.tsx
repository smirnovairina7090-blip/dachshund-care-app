import type { CSSProperties } from 'react'

const sprites = {
  'dog-idle': { image: 'dog-states.png', atlasWidth: 256, atlasHeight: 192, x: 0, y: 0, w: 56, h: 56 },
  'dog-sitting': { image: 'dog-states.png', atlasWidth: 256, atlasHeight: 192, x: 56, y: 0, w: 56, h: 56 },
  'dog-standing': { image: 'dog-states.png', atlasWidth: 256, atlasHeight: 192, x: 112, y: 0, w: 56, h: 56 },
  'dog-happy': { image: 'dog-states.png', atlasWidth: 256, atlasHeight: 192, x: 168, y: 0, w: 56, h: 56 },
  'dog-playing': { image: 'dog-states.png', atlasWidth: 256, atlasHeight: 192, x: 0, y: 56, w: 56, h: 56 },
  'dog-bringing': { image: 'dog-states.png', atlasWidth: 256, atlasHeight: 192, x: 56, y: 56, w: 56, h: 56 },
  'dog-waiting-walk': { image: 'dog-states.png', atlasWidth: 256, atlasHeight: 192, x: 112, y: 56, w: 56, h: 56 },
  'dog-eating': { image: 'dog-states.png', atlasWidth: 256, atlasHeight: 192, x: 168, y: 56, w: 56, h: 56 },
  'dog-drinking': { image: 'dog-states.png', atlasWidth: 256, atlasHeight: 192, x: 0, y: 112, w: 56, h: 56 },
  'dog-sleeping': { image: 'dog-states.png', atlasWidth: 256, atlasHeight: 192, x: 56, y: 112, w: 56, h: 56 },
  'dog-sad': { image: 'dog-states.png', atlasWidth: 256, atlasHeight: 192, x: 112, y: 112, w: 56, h: 56 },
  'dog-curious': { image: 'dog-states.png', atlasWidth: 256, atlasHeight: 192, x: 168, y: 112, w: 56, h: 56 },

  'care-food': { image: 'care-icons.png', atlasWidth: 336, atlasHeight: 112, x: 0, y: 0, w: 52, h: 52 },
  'care-water': { image: 'care-icons.png', atlasWidth: 336, atlasHeight: 112, x: 52, y: 0, w: 52, h: 52 },
  'care-leash': { image: 'care-icons.png', atlasWidth: 336, atlasHeight: 112, x: 104, y: 0, w: 52, h: 52 },
  'care-play': { image: 'care-icons.png', atlasWidth: 336, atlasHeight: 112, x: 156, y: 0, w: 52, h: 52 },
  'care-training': { image: 'care-icons.png', atlasWidth: 336, atlasHeight: 112, x: 208, y: 0, w: 52, h: 52 },
  'care-brush': { image: 'care-icons.png', atlasWidth: 336, atlasHeight: 112, x: 260, y: 0, w: 52, h: 52 },
  'care-sleep': { image: 'care-icons.png', atlasWidth: 336, atlasHeight: 112, x: 0, y: 52, w: 52, h: 52 },
  'care-pet': { image: 'care-icons.png', atlasWidth: 336, atlasHeight: 112, x: 52, y: 52, w: 52, h: 52 },
  'care-photo': { image: 'care-icons.png', atlasWidth: 336, atlasHeight: 112, x: 104, y: 52, w: 52, h: 52 },
  'care-vet': { image: 'care-icons.png', atlasWidth: 336, atlasHeight: 112, x: 156, y: 52, w: 52, h: 52 },
  'care-clean': { image: 'care-icons.png', atlasWidth: 336, atlasHeight: 112, x: 208, y: 52, w: 52, h: 52 },
  'care-learn': { image: 'care-icons.png', atlasWidth: 336, atlasHeight: 112, x: 260, y: 52, w: 52, h: 52 },

  'nav-home': { image: 'navigation.png', atlasWidth: 320, atlasHeight: 64, x: 0, y: 0, w: 60, h: 60 },
  'nav-training': { image: 'navigation.png', atlasWidth: 320, atlasHeight: 64, x: 60, y: 0, w: 60, h: 60 },
  'nav-adventures': { image: 'navigation.png', atlasWidth: 320, atlasHeight: 64, x: 120, y: 0, w: 60, h: 60 },
  'nav-history': { image: 'navigation.png', atlasWidth: 320, atlasHeight: 64, x: 180, y: 0, w: 60, h: 60 },
  'nav-more': { image: 'navigation.png', atlasWidth: 320, atlasHeight: 64, x: 240, y: 0, w: 60, h: 60 },

  'currency-bone': { image: 'currency-effects.png', atlasWidth: 280, atlasHeight: 112, x: 0, y: 0, w: 52, h: 52 },
  'currency-coin': { image: 'currency-effects.png', atlasWidth: 280, atlasHeight: 112, x: 52, y: 0, w: 52, h: 52 },
  'effect-heart': { image: 'currency-effects.png', atlasWidth: 280, atlasHeight: 112, x: 104, y: 0, w: 52, h: 52 },
  'effect-tail-1': { image: 'currency-effects.png', atlasWidth: 280, atlasHeight: 112, x: 156, y: 0, w: 52, h: 52 },
  'effect-tail-2': { image: 'currency-effects.png', atlasWidth: 280, atlasHeight: 112, x: 208, y: 0, w: 52, h: 52 },
  'effect-tail-3': { image: 'currency-effects.png', atlasWidth: 280, atlasHeight: 112, x: 0, y: 52, w: 52, h: 52 },
  'effect-tail-4': { image: 'currency-effects.png', atlasWidth: 280, atlasHeight: 112, x: 52, y: 52, w: 52, h: 52 },
  'effect-tail-5': { image: 'currency-effects.png', atlasWidth: 280, atlasHeight: 112, x: 104, y: 52, w: 52, h: 52 },
  'effect-tail-6': { image: 'currency-effects.png', atlasWidth: 280, atlasHeight: 112, x: 156, y: 52, w: 52, h: 52 },

  'room-sofa': { image: 'room-props.png', atlasWidth: 224, atlasHeight: 224, x: 0, y: 0, w: 96, h: 96 },
  'room-plant-table': { image: 'room-props.png', atlasWidth: 224, atlasHeight: 224, x: 96, y: 0, w: 96, h: 96 },
  'room-window': { image: 'room-props.png', atlasWidth: 224, atlasHeight: 224, x: 0, y: 96, w: 96, h: 96 },
  'room-dog-bed': { image: 'room-props.png', atlasWidth: 224, atlasHeight: 224, x: 96, y: 96, w: 96, h: 96 },
} as const

export type PixelSpriteName = keyof typeof sprites

interface PixelSpriteProps {
  name: PixelSpriteName
  scale?: number
  className?: string
  label?: string
}

export function PixelSprite({ name, scale = 1, className, label }: PixelSpriteProps) {
  const sprite = sprites[name]
  const style: CSSProperties = {
    display: 'inline-block',
    width: sprite.w * scale,
    height: sprite.h * scale,
    backgroundImage: `url(${import.meta.env.BASE_URL}assets/pixel/production/v1/${sprite.image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${sprite.atlasWidth * scale}px ${sprite.atlasHeight * scale}px`,
    backgroundPosition: `${-sprite.x * scale}px ${-sprite.y * scale}px`,
    imageRendering: 'pixelated',
    flex: '0 0 auto',
  }

  return <span className={className} style={style} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} />
}
