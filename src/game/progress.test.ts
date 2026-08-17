import { describe, expect, it } from 'vitest'
import { getProgress, isDayComplete } from './progress'
import type { DayRecord } from '../domain/types'

const day: DayRecord = {
  date: '2026-08-17',
  type: 'weekday',
  completionRewardClaimed: false,
  tasks: [
    { id: '1', kind: 'walk', title: 'A', hint: '', rewardBones: 1, completedAt: 'now' },
    { id: '2', kind: 'feed', title: 'B', hint: '', rewardBones: 1 },
  ],
}

describe('day progress', () => {
  it('calculates completed percentage', () => {
    expect(getProgress(day)).toBe(50)
  })

  it('marks day complete only when every task is complete', () => {
    expect(isDayComplete(day)).toBe(false)
  })
})
