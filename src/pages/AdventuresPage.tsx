import { PixelSprite } from '../components/PixelSprite'

export function AdventuresPage() {
  return (
    <main className="page simple-page">
      <p className="eyebrow">Воспоминания</p>
      <h1>Доска приключений</h1>
      <p className="page-lead">Здесь будут фотографии с телефона, свободные подписи, дата, место и наклейки. Сейчас мы фиксируем визуальный язык доски до подключения загрузки фото.</p>
      <section className="pinboard" aria-label="Макет доски приключений">
        <article className="photo-note photo-note-one">
          <div className="photo-placeholder"><PixelSprite name="care-photo" scale={1.35} /></div>
          <strong>Первое приключение</strong>
          <span>твоя будущая фотокарточка</span>
        </article>
        <article className="photo-note photo-note-two">
          <div className="photo-placeholder"><PixelSprite name="nav-adventures" scale={1.1} /></div>
          <strong>Место для великой истории</strong>
          <span>подпись будет любой</span>
        </article>
      </section>
    </main>
  )
}
