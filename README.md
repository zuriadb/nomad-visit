# Nomad Visit
# Project

## 🚀 Установка и запуск

### 1. Установить зависимости
Перед первым запуском:
```bash
npm install
````

### 2. Настройка окружения

Создай файл `.env` в корне проекта и пропиши туда свои переменные (например, для базы данных и ключей API):

```env
# App
APP_PORT=3009

# JWT
JWT_SECRET='10e921e3005d9f434877e29e240aa1b7a1609ee9839b7c6c20d5b3c322c5c1c4'
JWT_EXPIRATION=15m

REFRESH_TOKEN_SECRET='10e921e3005d9f434ffff877e29e240aa1b7a1609ee9839b7c6c20d5b3c322c5c1c4'
REFRESH_TOKEN_EXPIRATION=7d

NODE_ENV=development

# Database
DB_HOST=postgres
DB_PORT=5432
DB_USER=face_user
DB_PASSWORD=face_password
DB_NAME=face_db
GEMINI_API_KEY=your_key
```

> ⚠️ Если база крутится **локально**, укажи `DB_HOST=localhost`.
> Если используешь Docker Compose — оставь `DB_HOST=postgres`.

### 3. Запуск приложения

* **Dev режим (автоперезапуск):**

  ```bash
  npm run start:dev
  ```
* **Debug режим:**

  ```bash
  npm run start:debug
  ```
* **Production (после сборки):**

  ```bash
  npm run build
  npm run start:prod
  ```

Приложение по умолчанию поднимается на порту **3009** (можно менять в `main.ts` или через `.env`).

---

## 🛠️ Сборка

Собрать проект в `dist/`:

```bash
npm run build
docker-compose up -d 
```

---

## 🧪 Тестирование

* Запустить все тесты:

  ```bash
  npm test
  ```
* Запуск с watch:

  ```bash
  npm run test:watch
  ```
* Покрытие:

  ```bash
  npm run test:cov
  ```
* E2E тесты:

  ```bash
  npm run test:e2e
  ```

---

## 📜 Миграции (TypeORM)

### Генерация новой миграции (локально):

```bash
npm run typeorm migration:generate src/migrations/<You_file_name>
npm run migration:generate:local migration_name
```

### Запуск миграций:

```bash
npm run migration:run
docker-compose exec app npm run migration:run
```

---

## 📖 Дополнительно

### Линтинг и форматирование

* Проверить и исправить код:

  ```bash
  npm run lint
  ```
* Отформатировать:

  ```bash
  npm run format
  ```

### Swagger API Docs

При запуске в Dev режиме документация доступна по адресу:

```
http://localhost:3009/api
```

---

## ⚡ Полезные команды

* Сборка и запуск:

  ```bash
  npm run build && npm run start:prod
  ```
* Генерация миграции и прогон:

  ```bash
  npm run migration:generate:local init && npm run migration:run
  ```
