interface DogSceneProps {
  name: string
  progress: number
}

export function DogScene({ name, progress }: DogSceneProps) {
  const mood = progress >= 85
    ? 'довольна сегодняшним днём'
    : progress >= 55
      ? 'интересуется, что будет дальше'
      : progress >= 25
        ? 'спокойно проводит день рядом'
        : 'кажется, пора придумать первое дело'

  return (
    <section className="dog-scene dog-scene-v5" aria-label={`Комната питомца ${name}`}>
      <img
        className="scene-v5-image"
        src={`${import.meta.env.BASE_URL}assets/art/v5/scene.webp?v=20260818-v5-final`}
        alt={`Уютная комната питомца ${name}`}
        draggable={false}
      />

      <div className="scene-bubble pixel-panel scene-bubble-v5">
        <strong>{name}</strong>
        <span>{mood}</span>
      </div>
    </section>
  )
}
