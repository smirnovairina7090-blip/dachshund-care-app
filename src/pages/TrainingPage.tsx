const commands = [
  { name: 'Сидеть', level: 'Уверенно дома', progress: 80 },
  { name: 'Ждать', level: 'Закрепляем', progress: 55 },
  { name: 'Ко мне', level: 'Учимся на улице', progress: 35 },
]

export function TrainingPage() {
  return (
    <main className="page simple-page">
      <p className="eyebrow">Навыки без спешки</p>
      <h1>Дрессировка</h1>
      <p className="page-lead">В первом рабочем срезе уже есть структура библиотеки команд. Следующим шагом подключим реальные тренировочные сессии и заметки.</p>
      <div className="command-list">
        {commands.map((command) => (
          <article className="command-card" key={command.name}>
            <div><strong>{command.name}</strong><span>{command.level}</span></div>
            <div className="mini-progress"><span style={{ width: `${command.progress}%` }} /></div>
            <b>{command.progress}%</b>
          </article>
        ))}
      </div>
    </main>
  )
}
