import { PixelSprite } from '../components/PixelSprite'

interface HistoryPageProps {
  name: string
}

export function HistoryPage({ name }: HistoryPageProps) {
  return (
    <main className="page simple-page">
      <p className="eyebrow">Совместный путь</p>
      <h1>История {name}</h1>
      <p className="page-lead">Завершённые дни будут собираться здесь в понятные карточки: прогулки, тренировки, настроение, награды и сохранённые воспоминания.</p>
      <div className="empty-state pixel-panel">
        <PixelSprite name="nav-history" scale={1} />
        <strong>История только начинается</strong>
        <p>Первый завершённый день станет первой записью.</p>
      </div>
    </main>
  )
}
