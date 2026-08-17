import { PixelSprite } from '../components/PixelSprite'

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
        <article className="pixel-panel"><PixelSprite name="dog-idle" scale={0.9} /><div><strong>{name}</strong><small>Профиль питомца</small></div></article>
        <article className="pixel-panel"><PixelSprite name="care-learn" scale={0.9} /><div><strong>Знания о таксах</strong><small>Короткие полезные карточки</small></div></article>
        <article className="pixel-panel"><PixelSprite name="currency-coin" scale={0.9} /><div><strong>Достижения</strong><small>Мягкий долгосрочный прогресс</small></div></article>
      </div>
      <button className="secondary-button danger-button pixel-button" onClick={onReset} type="button">Сбросить локальные данные</button>
    </main>
  )
}
