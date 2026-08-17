import type { DayTask, TaskKind } from '../domain/types'

const icons: Record<TaskKind, string> = {
  walk: '🦮',
  feed: '🍲',
  water: '💧',
  play: '🎾',
  train: '🧠',
  care: '🪮',
  mood: '💗',
  photo: '📷',
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
        <button className="action-button" key={task.id} onClick={() => onComplete(task.id)} type="button">
          <span className="action-icon" aria-hidden="true">{icons[task.kind]}</span>
          <span>{task.title.replace('Утренняя ', '').replace('Вечерняя ', '')}</span>
          <small>+{task.rewardBones} 🦴</small>
        </button>
      ))}
    </div>
  )
}
