import type { CSSProperties } from 'react'
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
    <main className="page home-page game-home-v6">
      <section className="game-stage-v6">
        <header className="game-hud-v6">
          <div className="game-hud-name-v6">
            <p className="game-kicker-v6">Сегодня вместе</p>
            <h1>{name}</h1>
          </div>

          <div className="wallet game-wallet-v6" aria-label="Игровые награды">
            <span><PixelSprite name="currency-bone" scale={0.44} /> <b>{wallet.bones}</b></span>
            <span><PixelSprite name="currency-coin" scale={0.44} /> <b>{wallet.coins}</b></span>
          </div>
        </header>

        <div className="day-switch-v6" role="group" aria-label="Тип дня">
          <button className={day.type === 'weekday' ? 'active' : ''} onClick={() => onChangeDayType('weekday')} type="button">Будни</button>
          <button className={day.type === 'weekend' ? 'active' : ''} onClick={() => onChangeDayType('weekend')} type="button">Выходной</button>
        </div>

        <DogScene name={name} progress={progress} tasks={day.tasks} onComplete={onCompleteTask} />
      </section>

      <section className="quest-strip-v6" aria-label="Прогресс дня">
        <div className="quest-copy-v6">
          <span>День {completed}/{day.tasks.length}</span>
          <strong>{nextTask ? nextTask.title : 'Сегодня всё сделано'}</strong>
          <small>{nextTask ? nextTask.hint : 'Можно просто побыть вместе и забрать заслуженный вечер.'}</small>
        </div>
        <div className="quest-ring-v6" style={{ '--day-progress': `${progress * 3.6}deg` } as CSSProperties}>
          <b>{progress}%</b>
        </div>
      </section>

      <section className="day-sheet-v6">
        <div className="day-sheet-heading-v6">
          <div>
            <p className="game-kicker-v6">План Моти</p>
            <h2>{day.type === 'weekday' ? 'Спокойный будний ритм' : 'День для приключений'}</h2>
          </div>
          <span>{day.completionRewardClaimed ? 'Дневная награда получена' : 'Закрой день и получи монетки'}</span>
        </div>

        <div className="day-list-v6">
          {day.tasks.map((task, index) => (
            <button
              key={task.id}
              className={task.completedAt ? 'day-row-v6 day-row-v6-done' : 'day-row-v6'}
              onClick={() => !task.completedAt && onCompleteTask(task.id)}
              type="button"
              disabled={Boolean(task.completedAt)}
            >
              <span className="day-index-v6">{task.completedAt ? '✓' : index + 1}</span>
              <span className="day-copy-v6">
                <strong>{task.title}</strong>
                <small>{task.hint}</small>
              </span>
              <span className="day-reward-v6"><PixelSprite name="currency-bone" scale={0.28} />+{task.rewardBones}</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
