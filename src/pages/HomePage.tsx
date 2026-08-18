import { DogScene } from '../components/DogScene'
import { PixelSprite } from '../components/PixelSprite'
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
    <main className="page home-page game-home-page">
      <section className="game-stage-shell">
        <header className="game-topbar">
          <div className="game-title-block">
            <p className="game-kicker">Сегодня вместе</p>
            <h1>{name}</h1>
          </div>

          <div className="wallet game-wallet" aria-label="Игровые награды">
            <span><PixelSprite name="currency-bone" scale={0.46} /> <b>{wallet.bones}</b></span>
            <span><PixelSprite name="currency-coin" scale={0.46} /> <b>{wallet.coins}</b></span>
          </div>
        </header>

        <div className="scene-day-switch" role="group" aria-label="Тип дня">
          <button className={day.type === 'weekday' ? 'active' : ''} onClick={() => onChangeDayType('weekday')} type="button">Будни</button>
          <button className={day.type === 'weekend' ? 'active' : ''} onClick={() => onChangeDayType('weekend')} type="button">Выходной</button>
        </div>

        <DogScene name={name} progress={progress} tasks={day.tasks} onComplete={onCompleteTask} />
      </section>

      <section className="quest-strip" aria-label="Прогресс дня">
        <div className="quest-progress-copy">
          <span className="quest-progress-label">День {completed}/{day.tasks.length}</span>
          <strong>{nextTask ? nextTask.title : 'Сегодня всё сделано'}</strong>
          <small>{nextTask ? nextTask.hint : 'Можно просто побыть вместе и забрать заслуженный вечер.'}</small>
        </div>
        <div className="quest-progress-orb" style={{ '--day-progress': `${progress * 3.6}deg` } as React.CSSProperties}>
          <span>{progress}%</span>
        </div>
      </section>

      <section className="day-quest-sheet">
        <div className="day-quest-heading">
          <div>
            <p className="game-kicker">План Моти</p>
            <h2>{day.type === 'weekday' ? 'Спокойный будний ритм' : 'День для приключений'}</h2>
          </div>
          <span>{day.completionRewardClaimed ? 'Дневная награда получена' : 'Закрой день и получи монетки'}</span>
        </div>

        <div className="day-quest-list">
          {day.tasks.map((task, index) => (
            <button
              key={task.id}
              className={task.completedAt ? 'day-quest-row day-quest-row-done' : 'day-quest-row'}
              onClick={() => !task.completedAt && onCompleteTask(task.id)}
              type="button"
              disabled={Boolean(task.completedAt)}
            >
              <span className="day-quest-index">{task.completedAt ? '✓' : index + 1}</span>
              <span className="day-quest-copy">
                <strong>{task.title}</strong>
                <small>{task.hint}</small>
              </span>
              <span className="day-quest-reward"><PixelSprite name="currency-bone" scale={0.3} />+{task.rewardBones}</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
