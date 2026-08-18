import { useRef, useState, type PointerEvent } from 'react'
import type { DayTask, TaskKind } from '../domain/types'
import { PixelSprite, type PixelSpriteName } from './PixelSprite'

interface DogSceneProps {
  name: string
  progress: number
  tasks: DayTask[]
  onComplete: (taskId: string) => void
}

type SceneTaskKind = Extract<TaskKind, 'walk' | 'feed' | 'water' | 'play' | 'train'>

type Reaction = {
  key: 'pet' | SceneTaskKind
  text: string
}

const sceneActions: Array<{
  kind: SceneTaskKind
  icon: PixelSpriteName
  label: string
  className: string
  reaction: string
}> = [
  { kind: 'feed', icon: 'care-food', label: 'Покормить', className: 'scene-v6-feed', reaction: 'Миска появилась вовремя. Я это запомню.' },
  { kind: 'water', icon: 'care-water', label: 'Свежая вода', className: 'scene-v6-water', reaction: 'Вода свежая. Всё под контролем.' },
  { kind: 'walk', icon: 'care-leash', label: 'Гулять', className: 'scene-v6-walk', reaction: 'Поводок? Я уже готова. Дверь где?' },
  { kind: 'play', icon: 'care-play', label: 'Играть', className: 'scene-v6-play', reaction: 'Игрушка моя. Можешь попытаться забрать.' },
  { kind: 'train', icon: 'care-training', label: 'Тренировка', className: 'scene-v6-train', reaction: 'Команду знаю. Про вкусняшку тоже помню.' },
]

function getMood(progress: number): string {
  if (progress >= 85) return 'довольна сегодняшним днём'
  if (progress >= 55) return 'интересуется, что будет дальше'
  if (progress >= 25) return 'спокойно проводит день рядом'
  return 'явно ждёт первого приключения'
}

export function DogScene({ name, progress, tasks, onComplete }: DogSceneProps) {
  const [reaction, setReaction] = useState<Reaction | null>(null)
  const reactionTimer = useRef<number | undefined>(undefined)

  function showReaction(next: Reaction) {
    setReaction(next)
    if (reactionTimer.current) window.clearTimeout(reactionTimer.current)
    reactionTimer.current = window.setTimeout(() => setReaction(null), 2300)
  }

  function completeAction(kind: SceneTaskKind, text: string) {
    const task = tasks.find((candidate) => candidate.kind === kind && !candidate.completedAt)
    if (!task) return
    onComplete(task.id)
    showReaction({ key: kind, text })
  }

  function petMotya() {
    showReaction({ key: 'pet', text: 'Да. Вот здесь за ушком. Именно так.' })
  }

  function moveCamera(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    event.currentTarget.style.setProperty('--scene-look-x', x.toFixed(3))
    event.currentTarget.style.setProperty('--scene-look-y', y.toFixed(3))
  }

  function resetCamera(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty('--scene-look-x', '0')
    event.currentTarget.style.setProperty('--scene-look-y', '0')
  }

  const reactionClass = reaction ? ` dog-scene-reaction dog-scene-reaction-${reaction.key}` : ''

  return (
    <section
      className={`dog-scene dog-scene-v5 dog-scene-v6${reactionClass}`}
      aria-label={`Комната питомца ${name}`}
      onPointerMove={moveCamera}
      onPointerLeave={resetCamera}
    >
      <div className="scene-v6-camera" aria-hidden="true">
        <img
          className="scene-v5-image scene-v6-image"
          src={`${import.meta.env.BASE_URL}assets/art/v5/scene.webp?v=20260818-v6-interactive`}
          alt=""
          draggable={false}
        />
      </div>

      <button className="scene-motya-hotspot" type="button" onClick={petMotya} aria-label={`Погладить ${name}`}>
        <span>Погладить {name}</span>
      </button>

      {sceneActions.map((action) => {
        const task = tasks.find((candidate) => candidate.kind === action.kind && !candidate.completedAt)
        if (!task) return null

        return (
          <button
            key={action.kind}
            className={`scene-v6-action ${action.className}`}
            type="button"
            onClick={() => completeAction(action.kind, action.reaction)}
            aria-label={`${action.label}. Награда ${task.rewardBones} косточек`}
          >
            <PixelSprite name={action.icon} scale={0.82} className="scene-v6-action-icon" />
            <span className="scene-v6-action-label">{action.label}</span>
            <span className="scene-v6-action-reward"><PixelSprite name="currency-bone" scale={0.27} />+{task.rewardBones}</span>
          </button>
        )
      })}

      {reaction?.key === 'pet' && (
        <div className="scene-v6-heart-burst" aria-hidden="true">
          <PixelSprite name="effect-heart" scale={0.72} />
          <PixelSprite name="effect-heart" scale={0.48} />
          <PixelSprite name="effect-heart" scale={0.36} />
        </div>
      )}

      <div className={reaction ? 'scene-bubble pixel-panel scene-bubble-v5 scene-bubble-v6 scene-bubble-v6-active' : 'scene-bubble pixel-panel scene-bubble-v5 scene-bubble-v6'} aria-live="polite">
        <strong>{name}</strong>
        <span>{reaction?.text ?? getMood(progress)}</span>
      </div>

      <div className="scene-v6-hint" aria-hidden="true">Трогай Мотю и предметы в комнате</div>
    </section>
  )
}
