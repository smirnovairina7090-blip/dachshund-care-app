import { useState, type FormEvent } from 'react'

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
      <section className="onboarding-card">
        <div className="onboarding-dog" aria-hidden="true">🐕</div>
        <p className="eyebrow">Добро пожаловать</p>
        <h1>Как зовут твою таксу?</h1>
        <p>Имя будет жить во всём приложении: в плане дня, дрессировке, воспоминаниях и вечерних итогах.</p>
        <form onSubmit={submit} className="onboarding-form">
          <label htmlFor="dog-name">Имя питомца</label>
          <input
            id="dog-name"
            autoFocus
            autoComplete="off"
            maxLength={32}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Например, Бублик"
          />
          <button className="primary-button" disabled={!name.trim()} type="submit">Познакомить нас</button>
        </form>
      </section>
    </main>
  )
}
