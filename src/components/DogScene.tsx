import { useRef, useState } from 'react'
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
  text: string
  sprite: PixelSpriteName
}

const sceneActions: Array<{
  kind: SceneTaskKind
  icon: PixelSpriteName
  label: string
  className: string
  reaction: Reaction
}> = [
  {
    kind: 'feed',
    icon: 'care-food',
    label: 'Покормить Мотю',
    className: 'scene-action-feed',
    reaction: { text: 'Вот это правильное решение. Миска одобрена.', sprite: 'dog-happy' },
  },
  {
    kind: 'water',
    icon: 'care-water',
    label: 'Обновить воду',
    className: 'scene-action-water',
    reaction: { text: 'Свежая вода на месте. Можно жить дальше.', sprite: 'dog-curious' },
  },
  {
    kind: 'walk',
    icon: 'care-leash',
    label: 'Пойти гулять',
    className: 'scene-action-walk',
    reaction: { text: 'Поводок? ПОВОДОК! Я уже у двери.', sprite: 'dog-happy' },
  },
  {
    kind: 'play',
    icon: 'care-play',
    label: 'Поиграть',
    className: 'scene-action-play',
    reaction: { text: 'Игрушка выбрана. Теперь попробуй её отнять.', sprite: 'dog-happy' },
  },
  {
    kind: 'train',
    icon: 'care-training',
    label: 'Начать тренировку',
    className: 'scene-action-train',
    reaction: { text: 'Я всё умею. Вопрос только в количестве вкусняшек.', sprite: 'dog-curious' },
  },
]

function getDogState(progress: number): PixelSpriteName {
  if (progress >= 85) return 'dog-happy'
  if (progress >= 55) return 'dog-curious'
  if (progress >= 25) return 'dog-idle'
  return 'dog-waiting-walk'
}

function getMood(progress: number): string {
  if (progress >= 85) return 'довольна сегодняшним днём'
  if (progress >= 55) return 'интересуется, что будет дальше'
  if (progress >= 25) return 'спокойно проводит день рядом'
  return 'явно ждёт, когда начнётся что-нибудь интересное'
}

export function DogScene({ name, progress, tasks, onComplete }: DogSceneProps) {
  const [reaction, setReaction] = useState<Reaction | null>(null)
  const reactionTimer = useRef<number | undefined>(undefined)
  const dogState = reaction?.sprite ?? getDogState(progress)

  function showReaction(next: Reaction) {
    setReaction(next)
    if (reactionTimer.current) window.clearTimeout(reactionTimer.current)
    reactionTimer.current = window.setTimeout(() => setReaction(null), 2400)
  }

  function completeSceneTask(kind: SceneTaskKind, nextReaction: Reaction) {
    const task = tasks.find((candidate) => candidate.kind === kind && !candidate.completedAt)
    if (!task) return
    onComplete(task.id)
    showReaction(nextReaction)
  }

  function petMotya() {
    showReaction({ text: 'Да. Вот здесь за ушком. Именно так.', sprite: 'dog-happy' })
  }

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    event.currentTarget.style.setProperty('--look-x', x.toFixed(3))
    event.currentTarget.style.setProperty('--look-y', y.toFixed(3))
  }

  function resetPointer(event: React.PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty('--look-x', '0')
    event.currentTarget.style.setProperty('--look-y', '0')
  }

  return (
    <section
      className="dog-scene game-room"
      aria-label={`Комната питомца ${name}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="room-glow" aria-hidden="true" />
      <div className="scene-layer scene-layer-back" aria-hidden="true">
        <div className="room-prop room-window"><PixelSprite name="room-window" scale={1.72} /></div>
        <div className="room-prop room-sofa"><PixelSprite name="room-sofa" scale={1.72} /></div>
        <div className="room-prop room-lamp"><PixelSprite name="room-lamp" scale={1.05} /></div>
      </div>

      <div className="scene-layer scene-layer-floor" aria-hidden="true">
        <div className="room-prop room-rug"><PixelSprite name="room-rug" scale={2.02} /></div>
        <div className="room-prop room-bed"><PixelSprite name="room-bed" scale={1.5} /></div>
      </div>

      {sceneActions.map((action) => {
        const task = tasks.find((candidate) => candidate.kind === action.kind && !candidate.completedAt)
        if (!task) return null

        return (
          <button
            key={action.kind}
            className={`scene-action ${action.className}`}
            type="button"
            onClick={() => completeSceneTask(action.kind, action.reaction)}
            aria-label={`${action.label}. Награда ${task.rewardBones} косточек`}
          >
            <span className="scene-action-art"><PixelSprite name={action.icon} scale={1.16} /></span>
            <span className="scene-action-label">{action.label}</span>
            <span className="scene-action-reward"><PixelSprite name="currency-bone" scale={0.3} />+{task.rewardBones}</span>
          </button>
        )
      })}

      <button className="scene-dog-button" type="button" onClick={petMotya} aria-label={`Погладить ${name}`}>
        <span className="scene-dog-shadow" aria-hidden="true" />
        <PixelSprite name={dogState} scale={3.25} className="scene-dog-sprite" />
      </button>

      <div className={reaction ? 'scene-bubble scene-bubble-active' : 'scene-bubble'} aria-live="polite">
        <strong>{name}</strong>
        <span>{reaction?.text ?? getMood(progress)}</span>
      </div>

      <div className="scene-hint" aria-hidden="true">Нажми на Мотю или предметы в комнате</div>
    </section>
  )
}
