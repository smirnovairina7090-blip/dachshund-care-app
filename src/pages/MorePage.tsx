interface MorePageProps {
  name: string
  onReset: () => void
}

export function MorePage({ name, onReset }: MorePageProps) {
  return (
    <main className="page simple-page">
      <p className="eyebrow">Профиль и развитие</p>
      <h1>Ещё</h1>
      <div className="settings-list">
        <article><span>🐕</span><div><strong>{name}</strong><small>Профиль питомца</small></div></article>
        <article><span>📚</span><div><strong>Знания о таксах</strong><small>Короткие полезные карточки</small></div></article>
        <article><span>🏆</span><div><strong>Достижения</strong><small>Мягкий долгосрочный прогресс</small></div></article>
      </div>
      <button className="secondary-button danger-button" onClick={onReset} type="button">Сбросить локальные данные</button>
    </main>
  )
}
