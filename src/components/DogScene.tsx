import { PixelSprite, type PixelSpriteName } from './PixelSprite'

interface DogSceneProps {
  name: string
  progress: number
}

function getDogState(progress: number): PixelSpriteName {
  if (progress >= 85) return 'dog-happy'
  if (progress >= 55) return 'dog-curious'
  if (progress >= 25) return 'dog-idle'
  return 'dog-waiting-walk'
}

export function DogScene({ name, progress }: DogSceneProps) {
  const dogState = getDogState(progress)
  const mood = progress >= 85
    ? 'довольна сегодняшним днём'
    : progress >= 55
      ? 'любопытно смотрит, что будет дальше'
      : progress >= 25
        ? 'спокойно проводит день рядом'
        : 'кажется, пора придумать первое дело'

  return (
    <section className="dog-scene" aria-label={`Комната питомца ${name}`}>
      <div className="scene-wall-pattern" aria-hidden="true" />
      <div className="room-prop room-window" aria-hidden="true"><PixelSprite name="room-window" scale={1.35} /></div>
      <div className="room-prop room-sofa" aria-hidden="true"><PixelSprite name="room-sofa" scale={1.2} /></div>
      <div className="room-prop room-plant" aria-hidden="true"><PixelSprite name="room-plant-table" scale={1.05} /></div>
      <div className="room-prop room-bed" aria-hidden="true"><PixelSprite name="room-dog-bed" scale={1.05} /></div>

      <div className="scene-dog-wrap" aria-hidden="true">
        <PixelSprite name={dogState} scale={3} />
        <PixelSprite name="effect-heart" scale={0.48} className="scene-heart" />
      </div>

      <div className="scene-bubble pixel-panel">
        <strong>{name}</strong>
        <span>{mood}</span>
      </div>
    </section>
  )
}
