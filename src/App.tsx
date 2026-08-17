import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import { BottomNav } from './components/BottomNav'
import { createTasks } from './domain/dayTemplates'
import type { AppState, DayType } from './domain/types'
import { isDayComplete } from './game/progress'
import { AdventuresPage } from './pages/AdventuresPage'
import { HistoryPage } from './pages/HistoryPage'
import { HomePage } from './pages/HomePage'
import { MorePage } from './pages/MorePage'
import { OnboardingPage } from './pages/OnboardingPage'
import { TrainingPage } from './pages/TrainingPage'
import { clearState, loadState, saveState } from './services/storage'

function localDate(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function defaultDayType(): DayType {
  const weekday = new Date().getDay()
  return weekday === 0 || weekday === 6 ? 'weekend' : 'weekday'
}

export default function App() {
  const [state, setState] = useState<AppState>(() => loadState())
  const date = localDate()

  useEffect(() => {
    setState((current) => {
      if (!current.profile || current.today?.date === date) return current
      const type = defaultDayType()
      return { ...current, today: { date, type, tasks: createTasks(type, date), completionRewardClaimed: false } }
    })
  }, [date])

  useEffect(() => {
    saveState(state)
  }, [state])

  function createProfile(name: string) {
    const type = defaultDayType()
    setState({
      profile: { id: crypto.randomUUID(), name, createdAt: new Date().toISOString() },
      today: { date, type, tasks: createTasks(type, date), completionRewardClaimed: false },
      wallet: { bones: 10, coins: 0 },
    })
  }

  function changeDayType(type: DayType) {
    setState((current) => {
      if (!current.today || current.today.type === type) return current
      const hasProgress = current.today.tasks.some((task) => task.completedAt)
      if (hasProgress && !window.confirm('Сменить тип дня? Выполненные отметки сегодняшнего плана будут сброшены.')) return current
      return { ...current, today: { date, type, tasks: createTasks(type, date), completionRewardClaimed: false } }
    })
  }

  function completeTask(taskId: string) {
    setState((current) => {
      if (!current.today) return current
      const target = current.today.tasks.find((task) => task.id === taskId)
      if (!target || target.completedAt) return current

      const nextDay = {
        ...current.today,
        tasks: current.today.tasks.map((task) => task.id === taskId ? { ...task, completedAt: new Date().toISOString() } : task),
      }
      const justCompleted = isDayComplete(nextDay) && !current.today.completionRewardClaimed

      return {
        ...current,
        today: justCompleted ? { ...nextDay, completionRewardClaimed: true } : nextDay,
        wallet: {
          bones: current.wallet.bones + target.rewardBones,
          coins: current.wallet.coins + (justCompleted ? 2 : 0),
        },
      }
    })
  }

  function reset() {
    if (!window.confirm('Удалить локальные данные этого устройства и начать заново?')) return
    clearState()
    setState({ profile: null, today: null, wallet: { bones: 0, coins: 0 } })
  }

  if (!state.profile) return <OnboardingPage onCreate={createProfile} />

  const today = state.today ?? {
    date,
    type: defaultDayType(),
    tasks: createTasks(defaultDayType(), date),
    completionRewardClaimed: false,
  }

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<HomePage name={state.profile.name} day={today} wallet={state.wallet} onChangeDayType={changeDayType} onCompleteTask={completeTask} />} />
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/adventures" element={<AdventuresPage />} />
        <Route path="/history" element={<HistoryPage name={state.profile.name} />} />
        <Route path="/more" element={<MorePage name={state.profile.name} onReset={reset} />} />
      </Routes>
      <BottomNav />
    </div>
  )
}
