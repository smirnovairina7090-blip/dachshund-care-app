import { useState, type FormEvent } from 'react'
import { PixelSprite } from '../components/PixelSprite'

interface OnboardingPageProps {
  onCreate: (name: string) => void
}

export function OnboardingPage({ onCreate }: OnboardingPageProps) {
  const [name, setName] = useState('')

  function submit(event: FormEvent) {
    event.preventDefault()
    const value = name.trim()
    if (value) onCreate(value)
  }

  return (
    <main className="onboarding-shell">
      <section className="onboarding-card pixel-panel">
        <div className="onboarding-sparkle onboarding-sparkle-one" aria-hidden="true">✦</div>
        <div className="onboarding-sparkle onboarding-sparkle-two" aria-hidden="true">✦</div>

        <div className="onboarding-character" aria-hidden="true">
          <PixelSprite name="dog-sitting" scale={3} />
          <PixelSprite name="effect-heart" scale={0.65} className="onboarding-heart" />
        </div>

        <p className="eyebrow">Добро пожаловать в мир такс</p>
        <h1>Как зовут твою таксу?</h1>
        <p>Имя появится на главной, в приключениях, тренировках и вечерних итогах.</p>

        <form onSubmit={submit} className="onboarding-form">
          <label htmlFor="dog-name">Имя питомца</label>
          <input
            id="dog-name"
            autoFocus
            autoComplete="off"
            maxLength={32}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Например, Буся"
          />
          <button className="primary-button pixel-button" disabled={!name.trim()} type="submit">Начать</button>
        </form>
      </section>
    </main>
  )
}
