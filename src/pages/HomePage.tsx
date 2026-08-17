import type { DayType, DayRecord, Wallet } from '../domain/types'
import { getCompletedCount, getProgress } from '../game/progress'
import { DogScene } from '../components/DogScene'
import { QuickActions } from '../components/QuickActions'

interface HomePageProps {
  name: string
  day: DayRecord
  wallet: Wallet
  onChangeDayType: (type: DayType) => void
  onCompleteTask: (taskId: string) => void
}

export function HomePage({ name, day, wallet, onChangeDayType, onCompleteTask }: HomePageProps) {
  const progress = getProgress(day)
  const completed = getCompletedCount(day)
  const nextTask = day.tasks.find((task) => !task.completedAt)

  return (
    <main className="page home-page">
      <header className="topbar">
        <div>
          <p className="eyebrow">Сегодня вместе</p>
          <h1>{name}</h1>
        </div>
        <div className="wallet" aria-label="Игровые награды">
          <span>🦴 {wallet.bones}</span>
          <span>🪙 {wallet.coins}</span>
        </div>
      </header>

      <div className="day-switch" role="group" aria-label="Тип дня">
        <button className={day.type === 'weekday' ? 'active' : ''} onClick={() => onChangeDayType('weekday')} type="button">Будний</button>
        <button className={day.type === 'weekend' ? 'active' : ''} onClick={() => onChangeDayType('weekend')} type="button">Выходной</button>
      </div>

      <DogScene name={name} progress={progress} />

      <section className="progress-card">
        <div className="progress-heading">
          <div>
            <p className="eyebrow">Дневной прогресс</p>
            <strong>{completed} из {day.tasks.length} дел</strong>
          </div>
          <span className="progress-number">{progress}%</span>
        </div>
        <div className="progress-track" aria-label={`Выполнено ${progress}%`}>
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className="next-task">{nextTask ? `Дальше: ${nextTask.title}. ${nextTask.hint}` : 'План закрыт. Можно просто побыть вместе.'}</p>
      </section>

      <section className="section-block">
        <div className="section-title-row">
          <h2>Быстрые действия</h2>
          <span>тап - и готово</span>
        </div>
        <QuickActions tasks={day.tasks} onComplete={onCompleteTask} />
      </section>

      <section className="section-block">
        <div className="section-title-row">
          <h2>План дня</h2>
          <span>{day.type === 'weekday' ? 'спокойный ритм' : 'больше приключений'}</span>
        </div>
        <div className="task-list">
          {day.tasks.map((task) => (
            <button key={task.id} className={task.completedAt ? 'task-row task-done' : 'task-row'} onClick={() => !task.completedAt && onCompleteTask(task.id)} type="button">
              <span className="task-check">{task.completedAt ? '✓' : '○'}</span>
              <span className="task-copy">
                <strong>{task.title}</strong>
                <small>{task.hint}</small>
              </span>
              <span className="task-reward">+{task.rewardBones} 🦴</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
