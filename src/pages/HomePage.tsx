import { DogScene } from '../components/DogScene'
import { PixelSprite } from '../components/PixelSprite'
import { QuickActions } from '../components/QuickActions'
import type { DayRecord, DayType, Wallet } from '../domain/types'
import { getCompletedCount, getProgress } from '../game/progress'

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
      <header className="topbar pixel-panel">
        <div className="pet-heading">
          <PixelSprite name="dog-sitting" scale={0.85} />
          <div>
            <p className="eyebrow">Сегодня вместе</p>
            <h1>{name}</h1>
          </div>
        </div>

        <div className="wallet" aria-label="Игровые награды">
          <span><PixelSprite name="currency-bone" scale={0.48} /> <b>{wallet.bones}</b></span>
          <span><PixelSprite name="currency-coin" scale={0.48} /> <b>{wallet.coins}</b></span>
        </div>
      </header>

      <div className="day-switch pixel-panel" role="group" aria-label="Тип дня">
        <button className={day.type === 'weekday' ? 'active' : ''} onClick={() => onChangeDayType('weekday')} type="button">Будни</button>
        <button className={day.type === 'weekend' ? 'active' : ''} onClick={() => onChangeDayType('weekend')} type="button">Выходные</button>
      </div>

      <DogScene name={name} progress={progress} />

      <section className="progress-card pixel-panel">
        <div className="progress-heading">
          <div>
            <p className="eyebrow">Сегодня</p>
            <strong>{completed} из {day.tasks.length} дел</strong>
          </div>
          <span className="progress-number">{progress}%</span>
        </div>
        <div className="progress-track" aria-label={`Выполнено ${progress}%`}>
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className="next-task">{nextTask ? `Дальше: ${nextTask.title}. ${nextTask.hint}` : 'План закрыт. Можно просто побыть вместе.'}</p>
      </section>

      <section className="section-block pixel-panel">
        <div className="section-title-row">
          <h2>Быстрые действия</h2>
          <span>нажми после дела</span>
        </div>
        <QuickActions tasks={day.tasks} onComplete={onCompleteTask} />
      </section>

      <section className="section-block pixel-panel">
        <div className="section-title-row">
          <h2>План дня</h2>
          <span>{day.type === 'weekday' ? 'спокойный ритм' : 'день приключений'}</span>
        </div>
        <div className="task-list">
          {day.tasks.map((task) => (
            <button key={task.id} className={task.completedAt ? 'task-row task-done' : 'task-row'} onClick={() => !task.completedAt && onCompleteTask(task.id)} type="button">
              <span className="task-check">{task.completedAt ? '✓' : '○'}</span>
              <span className="task-copy">
                <strong>{task.title}</strong>
                <small>{task.hint}</small>
              </span>
              <span className="task-reward"><PixelSprite name="currency-bone" scale={0.38} /> +{task.rewardBones}</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
