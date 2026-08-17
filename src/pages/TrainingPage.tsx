import { PixelSprite } from '../components/PixelSprite'

const commands = [
  { name: 'Сидеть', level: 'Уверенно дома', progress: 80 },
  { name: 'Ждать', level: 'Закрепляем', progress: 55 },
  { name: 'Ко мне', level: 'Учимся на улице', progress: 35 },
]

export function TrainingPage() {
  return (
    <main className="page simple-page">
      <div className="page-heading-with-icon">
        <PixelSprite name="nav-training" scale={0.9} />
        <div>
          <p className="eyebrow">Навыки без спешки</p>
          <h1>Дрессировка</h1>
        </div>
      </div>
      <p className="page-lead">Пока здесь живёт базовая библиотека команд. Визуал уже приведён к общей пиксельной системе, а тренировочную логику подключим после утверждения интерфейса.</p>
      <div className="command-list">
        {commands.map((command) => (
          <article className="command-card pixel-panel" key={command.name}>
            <div><strong>{command.name}</strong><span>{command.level}</span></div>
            <div className="mini-progress"><span style={{ width: `${command.progress}%` }} /></div>
            <b>{command.progress}%</b>
          </article>
        ))}
      </div>
    </main>
  )
}
