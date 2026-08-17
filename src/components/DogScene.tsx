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
      ? 'интересуется, что будет дальше'
      : progress >= 25
        ? 'спокойно проводит день рядом'
        : 'кажется, пора придумать первое дело'

  return (
    <section className="dog-scene" aria-label={`Комната питомца ${name}`}>
      <div className="scene-wall-pattern" aria-hidden="true" />
      <div className="scene-floor-lines" aria-hidden="true" />

      <div
        className="room-prop"
        style={{ left: '49%', bottom: '-2%', transform: 'translateX(-50%)', zIndex: 1 }}
        aria-hidden="true"
      >
        <PixelSprite name="room-rug" scale={1.55} />
      </div>

      <div className="room-prop room-window" aria-hidden="true">
        <PixelSprite name="room-window" scale={1.35} />
      </div>
      <div className="room-prop room-sofa" aria-hidden="true">
        <PixelSprite name="room-sofa" scale={1.35} />
      </div>
      <div className="room-prop room-plant" aria-hidden="true">
        <PixelSprite name="room-plant" scale={1.05} />
      </div>
      <div className="room-prop room-bed" aria-hidden="true">
        <PixelSprite name="room-bed" scale={1.08} />
      </div>
      <div
        className="room-prop"
        style={{ right: '16%', bottom: '28%', zIndex: 2 }}
        aria-hidden="true"
      >
        <PixelSprite name="room-lamp" scale={0.72} />
      </div>

      <div className="scene-dog-wrap" aria-hidden="true">
        <PixelSprite name={dogState} scale={2.85} className="scene-dog-sprite" />
        <PixelSprite name="effect-heart" scale={0.8} className="scene-heart" />
      </div>

      <div className="scene-bubble pixel-panel">
        <strong>{name}</strong>
        <span>{mood}</span>
      </div>
    </section>
  )
}
