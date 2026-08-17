import type { DayTask, DayType } from './types'

const weekday: Omit<DayTask, 'id'>[] = [
  { kind: 'walk', title: 'Утренняя прогулка', hint: 'Спокойно пройтись и дать всё обнюхать', rewardBones: 6 },
  { kind: 'feed', title: 'Кормление', hint: 'Отметить приём пищи', rewardBones: 4 },
  { kind: 'water', title: 'Свежая вода', hint: 'Проверить и обновить воду', rewardBones: 2 },
  { kind: 'play', title: 'Немного игры', hint: '5-10 минут любимой игры', rewardBones: 5 },
  { kind: 'train', title: 'Короткая тренировка', hint: 'Повторить знакомую команду', rewardBones: 7 },
  { kind: 'walk', title: 'Вечерняя прогулка', hint: 'Закрыть день хорошей прогулкой', rewardBones: 6 },
  { kind: 'mood', title: 'Как прошёл день', hint: 'Коротко отметить состояние питомца', rewardBones: 3 },
]

const weekend: Omit<DayTask, 'id'>[] = [
  { kind: 'walk', title: 'Длинная прогулка', hint: 'Больше времени на исследование и нюхание', rewardBones: 9 },
  { kind: 'feed', title: 'Кормление', hint: 'Отметить приём пищи', rewardBones: 4 },
  { kind: 'water', title: 'Свежая вода', hint: 'Проверить и обновить воду', rewardBones: 2 },
  { kind: 'play', title: 'Интеллектуальная игра', hint: 'Поиск лакомств, коврик или головоломка', rewardBones: 8 },
  { kind: 'train', title: 'Полноценная тренировка', hint: '10-15 минут с паузами и наградой', rewardBones: 10 },
  { kind: 'care', title: 'Уход', hint: 'Проверить лапы, уши или когти', rewardBones: 6 },
  { kind: 'photo', title: 'Фото приключения', hint: 'Сохранить один момент на память', rewardBones: 5 },
  { kind: 'mood', title: 'Как прошёл день', hint: 'Коротко отметить состояние питомца', rewardBones: 3 },
]

export function createTasks(type: DayType, date: string): DayTask[] {
  const template = type === 'weekday' ? weekday : weekend
  return template.map((task, index) => ({ ...task, id: `${date}-${type}-${index}` }))
}
