import type { CSSProperties } from 'react'

const sprites = {
  'dog-idle': { image: 'dog-states.png', atlasWidth: 256, atlasHeight: 192, x: 0, y: 0, w: 64, h: 64 },
  'dog-sitting': { image: 'dog-states.png', atlasWidth: 256, atlasHeight: 192, x: 64, y: 0, w: 64, h: 64 },
  'dog-standing': { image: 'dog-states.png', atlasWidth: 256, atlasHeight: 192, x: 128, y: 0, w: 64, h: 64 },
  'dog-happy': { image: 'dog-states.png', atlasWidth: 256, atlasHeight: 192, x: 192, y: 0, w: 64, h: 64 },
  'dog-playing': { image: 'dog-states.png', atlasWidth: 256, atlasHeight: 192, x: 0, y: 64, w: 64, h: 64 },
  'dog-bringing': { image: 'dog-states.png', atlasWidth: 256, atlasHeight: 192, x: 64, y: 64, w: 64, h: 64 },
  'dog-waiting-walk': { image: 'dog-states.png', atlasWidth: 256, atlasHeight: 192, x: 128, y: 64, w: 64, h: 64 },
  'dog-eating': { image: 'dog-states.png', atlasWidth: 256, atlasHeight: 192, x: 192, y: 64, w: 64, h: 64 },
  'dog-drinking': { image: 'dog-states.png', atlasWidth: 256, atlasHeight: 192, x: 0, y: 128, w: 64, h: 64 },
  'dog-sleeping': { image: 'dog-states.png', atlasWidth: 256, atlasHeight: 192, x: 64, y: 128, w: 64, h: 64 },
  'dog-sad': { image: 'dog-states.png', atlasWidth: 256, atlasHeight: 192, x: 128, y: 128, w: 64, h: 64 },
  'dog-curious': { image: 'dog-states.png', atlasWidth: 256, atlasHeight: 192, x: 192, y: 128, w: 64, h: 64 },

  'care-food': { image: 'care-icons.png', atlasWidth: 336, atlasHeight: 112, x: 0, y: 0, w: 56, h: 56 },
  'care-water': { image: 'care-icons.png', atlasWidth: 336, atlasHeight: 112, x: 56, y: 0, w: 56, h: 56 },
  'care-leash': { image: 'care-icons.png', atlasWidth: 336, atlasHeight: 112, x: 112, y: 0, w: 56, h: 56 },
  'care-play': { image: 'care-icons.png', atlasWidth: 336, atlasHeight: 112, x: 168, y: 0, w: 56, h: 56 },
  'care-training': { image: 'care-icons.png', atlasWidth: 336, atlasHeight: 112, x: 224, y: 0, w: 56, h: 56 },
  'care-brush': { image: 'care-icons.png', atlasWidth: 336, atlasHeight: 112, x: 280, y: 0, w: 56, h: 56 },
  'care-sleep': { image: 'care-icons.png', atlasWidth: 336, atlasHeight: 112, x: 0, y: 56, w: 56, h: 56 },
  'care-pet': { image: 'care-icons.png', atlasWidth: 336, atlasHeight: 112, x: 56, y: 56, w: 56, h: 56 },
  'care-photo': { image: 'care-icons.png', atlasWidth: 336, atlasHeight: 112, x: 112, y: 56, w: 56, h: 56 },
  'care-vet': { image: 'care-icons.png', atlasWidth: 336, atlasHeight: 112, x: 168, y: 56, w: 56, h: 56 },
  'care-clean': { image: 'care-icons.png', atlasWidth: 336, atlasHeight: 112, x: 224, y: 56, w: 56, h: 56 },
  'care-learn': { image: 'care-icons.png', atlasWidth: 336, atlasHeight: 112, x: 280, y: 56, w: 56, h: 56 },

  'nav-home': { image: 'navigation.png', atlasWidth: 320, atlasHeight: 64, x: 0, y: 0, w: 64, h: 64 },
  'nav-training': { image: 'navigation.png', atlasWidth: 320, atlasHeight: 64, x: 64, y: 0, w: 64, h: 64 },
  'nav-adventures': { image: 'navigation.png', atlasWidth: 320, atlasHeight: 64, x: 128, y: 0, w: 64, h: 64 },
  'nav-history': { image: 'navigation.png', atlasWidth: 320, atlasHeight: 64, x: 192, y: 0, w: 64, h: 64 },
  'nav-more': { image: 'navigation.png', atlasWidth: 320, atlasHeight: 64, x: 256, y: 0, w: 64, h: 64 },

  'currency-bone': { image: 'currency-effects.png', atlasWidth: 280, atlasHeight: 112, x: 0, y: 0, w: 56, h: 56 },
  'currency-coin': { image: 'currency-effects.png', atlasWidth: 280, atlasHeight: 112, x: 56, y: 0, w: 56, h: 56 },
  'effect-heart': { image: 'currency-effects.png', atlasWidth: 280, atlasHeight: 112, x: 112, y: 0, w: 56, h: 56 },
  'effect-tail-1': { image: 'currency-effects.png', atlasWidth: 280, atlasHeight: 112, x: 168, y: 0, w: 56, h: 56 },
  'effect-tail-2': { image: 'currency-effects.png', atlasWidth: 280, atlasHeight: 112, x: 224, y: 0, w: 56, h: 56 },
  'effect-tail-3': { image: 'currency-effects.png', atlasWidth: 280, atlasHeight: 112, x: 0, y: 56, w: 56, h: 56 },
  'effect-tail-4': { image: 'currency-effects.png', atlasWidth: 280, atlasHeight: 112, x: 56, y: 56, w: 56, h: 56 },
  'effect-tail-5': { image: 'currency-effects.png', atlasWidth: 280, atlasHeight: 112, x: 112, y: 56, w: 56, h: 56 },
  'effect-tail-6': { image: 'currency-effects.png', atlasWidth: 280, atlasHeight: 112, x: 168, y: 56, w: 56, h: 56 },

  'room-sofa': { image: 'room-props.png', atlasWidth: 224, atlasHeight: 224, x: 0, y: 0, w: 112, h: 112 },
  'room-plant-table': { image: 'room-props.png', atlasWidth: 224, atlasHeight: 224, x: 112, y: 0, w: 112, h: 112 },
  'room-window': { image: 'room-props.png', atlasWidth: 224, atlasHeight: 224, x: 0, y: 112, w: 112, h: 112 },
  'room-dog-bed': { image: 'room-props.png', atlasWidth: 224, atlasHeight: 224, x: 112, y: 112, w: 112, h: 112 },
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
