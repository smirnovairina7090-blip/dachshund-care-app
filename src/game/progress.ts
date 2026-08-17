import type { DayRecord } from '../domain/types'

export function getCompletedCount(day: DayRecord | null): number {
  return day?.tasks.filter((task) => task.completedAt).length ?? 0
}

export function getProgress(day: DayRecord | null): number {
  if (!day || day.tasks.length === 0) return 0
  return Math.round((getCompletedCount(day) / day.tasks.length) * 100)
}

export function isDayComplete(day: DayRecord | null): boolean {
  return Boolean(day && day.tasks.length > 0 && day.tasks.every((task) => task.completedAt))
}
