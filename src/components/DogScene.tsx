interface DogSceneProps {
  name: string
  progress: number
}

export function DogScene({ name, progress }: DogSceneProps) {
  const mood = progress >= 80 ? 'довольна сегодняшним днём' : progress >= 40 ? 'ждёт следующего приключения' : 'готова начинать день'

  return (
    <section className="dog-scene" aria-label={`Комната питомца ${name}`}>
      <div className="scene-window" aria-hidden="true">
        <span className="scene-cloud scene-cloud-one" />
        <span className="scene-cloud scene-cloud-two" />
      </div>
      <div className="scene-plant" aria-hidden="true">🌿</div>
      <div className="scene-bed" aria-hidden="true" />
      <div className="pixel-dog" aria-hidden="true">
        <span className="dog-tail" />
        <span className="dog-body" />
        <span className="dog-head" />
        <span className="dog-ear" />
        <span className="dog-muzzle" />
        <span className="dog-eye" />
        <span className="dog-leg dog-leg-one" />
        <span className="dog-leg dog-leg-two" />
      </div>
      <div className="scene-bubble">
        <strong>{name}</strong>
        <span>{mood}</span>
      </div>
    </section>
  )
}
