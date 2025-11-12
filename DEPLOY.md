# Инструкция по деплою на Render

## ⚠️ Важно: Persistent Disk недоступен на бесплатном тарифе Render!

Для бесплатного тарифа используйте **Vercel Blob Storage** (бесплатно до 1GB).

---

## Вариант 1: Vercel Blob Storage (рекомендуется для бесплатного тарифа)

### Шаг 1: Создать Blob Store на Vercel

1. Зайдите на https://vercel.com/dashboard/stores
2. Нажмите **"Create Store"**
3. Выберите **"Blob"**
4. Создайте store (например, `my-portfolio-data`)
5. Скопируйте **Read-Write Token**

### Шаг 2: Добавить токен в Render

В настройках вашего сервиса на Render добавьте переменную окружения:
- **Key**: `BLOB_READ_WRITE_TOKEN`
- **Value**: ваш токен от Vercel Blob

### Шаг 3: Деплой

После добавления токена задеплойте проект. Данные будут сохраняться в Vercel Blob Storage и не будут теряться.

**Преимущества:**
- ✅ Бесплатно до 1GB
- ✅ Работает на бесплатном тарифе Render
- ✅ Данные не теряются при перезапуске
- ✅ Быстрый доступ

---

## Вариант 2: Persistent Disk (только для платного тарифа Render)

Если у вас платный тариф Render ($7/месяц), можете использовать Persistent Disk:

### Шаг 1: Добавить Persistent Disk

1. Зайдите в настройки вашего сервиса на Render
2. Перейдите в раздел **"Disks"** или **"Persistent Disks"**
3. Нажмите **"Add Disk"**
4. Настройте:
   - **Name**: `content-data-disk`
   - **Mount Path**: `/opt/render/project/src/content_data`
   - **Size**: `1 GB`

### Шаг 2: Деплой

Данные будут сохраняться в файлах на диске.

---

## Как это работает

- **С `BLOB_READ_WRITE_TOKEN`**: данные сохраняются в Vercel Blob Storage
- **Без токена (локально)**: данные сохраняются в `content_data/` в корне проекта
- **С Persistent Disk**: данные сохраняются в `/opt/render/project/src/content_data/`

## Структура хранения данных

Данные сохраняются как JSON файлы:
- `content_data/news/{folder_name}.json` - новости
- `content_data/portfolio/{folder_name}.json` - портфолио

## Рекомендация

Для бесплатного тарифа Render используйте **Vercel Blob Storage** - это самый простой и надежный способ сохранять данные бесплатно.

