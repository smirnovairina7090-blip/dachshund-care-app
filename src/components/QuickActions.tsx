import type { DayTask, TaskKind } from '../domain/types'
import { PixelSprite, type PixelSpriteName } from './PixelSprite'

const icons: Record<TaskKind, PixelSpriteName> = {
  walk: 'care-leash',
  feed: 'care-food',
  water: 'care-water',
  play: 'care-play',
  train: 'care-training',
  care: 'care-brush',
  mood: 'care-pet',
  photo: 'care-photo',
}

interface QuickActionsProps {
  tasks: DayTask[]
  onComplete: (taskId: string) => void
}

export function QuickActions({ tasks, onComplete }: QuickActionsProps) {
  const nextByKind = new Map<TaskKind, DayTask>()
  tasks.filter((task) => !task.completedAt).forEach((task) => {
    if (!nextByKind.has(task.kind)) nextByKind.set(task.kind, task)
  })

  return (
    <div className="quick-actions" aria-label="Быстрые действия">
      {[...nextByKind.values()].slice(0, 6).map((task) => (
        <button className="action-button pixel-button" key={task.id} onClick={() => onComplete(task.id)} type="button">
          <PixelSprite name={icons[task.kind]} className="action-pixel-icon" />
          <span>{task.title.replace('Утренняя ', '').replace('Вечерняя ', '')}</span>
          <small><PixelSprite name="currency-bone" scale={0.34} /> +{task.rewardBones}</small>
        </button>
      ))}
    </div>
  )
}
