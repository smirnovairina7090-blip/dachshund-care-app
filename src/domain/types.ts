export type DayType = 'weekday' | 'weekend'
export type TaskKind = 'walk' | 'feed' | 'water' | 'play' | 'train' | 'care' | 'mood' | 'photo'

export interface DogProfile {
  id: string
  name: string
  createdAt: string
}

export interface DayTask {
  id: string
  kind: TaskKind
  title: string
  hint: string
  rewardBones: number
  completedAt?: string
}

export interface DayRecord {
  date: string
  type: DayType
  tasks: DayTask[]
  completionRewardClaimed: boolean
}

export interface Wallet {
  bones: number
  coins: number
}

export interface AppState {
  profile: DogProfile | null
  today: DayRecord | null
  wallet: Wallet
}
