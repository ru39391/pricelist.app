# Веб-приложение для управления прайслистом стоматологической клиники на 3000+ позиций

Доступный функционал:
- Парсинг xlsx-документа;
- Сравнение данных документа с существующими на сайте записями, отображение изменений;
- Создание, измененеие, удаление данных об услугах и прочих структурных единицах (группах услуг, их специализациях и отделениях специализаций);
- Создание кастомных прайслистов произвольных услуг и привязка их к ресурсам сайта (посадочным страницам, статьям и проч.)

## Запуск и сборка приложения

Используется Vite. Для установки зависимостей выполните в директории проекта:

### `npm i`

Для запуска приложения в режиме разработки:

### `npm run dev`

Приложение будет доступно по адресу [http://localhost:5173/](http://localhost:5173/)

Рекомендуется использовать NodeJS версии v18.0.0

Для подготовки приложения к публикации выполните в консоли:

### `npm run build`

Минифицированные файлы приложения будут доступны в директории `dist` в корне проекта.

## TODO:

- Составить документацию для компонентов и методов приложения;
- Устранить баг удаления специализации в списке множественного выбора (преобразование в строку недопустимого объекта);
- Поправить отображение списка привязанных услуг при установленном чекбоксе "Комплексный выбор".

## Рефакторинг:

- Пересмотреть используемые типы;
- Для фильтра ресурсов уточнить механизм переключения параметра "Категория" (до установки чекбокса отображает ресурсы всех типов, после установки - категории, после отмены установки - все, кроме категорий);
- Рассмотреть варианты применения useCallback и useMemo.
