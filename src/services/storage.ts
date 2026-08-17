import type { AppState } from '../domain/types'

const STORAGE_KEY = 'dachshund-care-app:v1'

export const emptyState: AppState = {
  profile: null,
  today: null,
  wallet: { bones: 0, coins: 0 },
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState
    return { ...emptyState, ...JSON.parse(raw) } as AppState
  } catch {
    return emptyState
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function clearState(): void {
  localStorage.removeItem(STORAGE_KEY)
}
