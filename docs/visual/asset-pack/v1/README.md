# Generated Pixel Visual Pack v1

Это каноничная визуальная база Dachshund Care App. Источником интерфейса считаются только сгенерированные пиксельные изображения из согласованной визуальной системы - без самодельной замены примитивами.

## Generated references

- `public/assets/pixel/source/generated/v1/01-ui-system.jpg` - первый UI/asset reference с состояниями таксы, валютами, иконками, навигацией и декором.
- `public/assets/pixel/source/generated/v1/02-app-world.jpg` - экранная визуальная система: онбординг, главная комната, приключения и анимация хвоста.
- `public/assets/pixel/source/generated/v1/03-sprite-sheet.jpg` - большой generated asset pack со спрайтами, предметами, UI, комнатой, навигацией и эффектами.
- `public/assets/pixel/source/generated/v1/04-asset-sheet.jpg` - альтернативный generated asset sheet с состояниями персонажа, действиями, локациями и UI.

Эти четыре файла являются визуальным source of truth для текущего этапа. Они экспортированы в оптимизированные JPEG-копии для удобного хранения и просмотра прямо в GitHub; рисунок, композиция и сгенерированный контент сохранены, ничего не перерисовано из геометрических примитивов.

## Что удалено

Предыдущий `public/assets/pixel/v1/asset-pack.svg`, собранный вручную из примитивов, больше не используется и удалён.

## Следующий этап

После утверждения этих generated references мы создаём production-ассеты в отдельных папках:

```text
public/assets/pixel/production/v1/
  dog/
  currency/
  care/
  navigation/
  room/
  effects/
```

Production-файлы должны визуально наследовать именно generated references выше. До утверждения визуала продуктовый функционал не расширяем.
