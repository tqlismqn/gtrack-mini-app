# API — Drivers Module (REST, v1.4)

Базовый URL: `/api`

## Аутентификация
- Bearer Token (JWT). Роли: Admin, HR, Dispatcher, Accounting, Driver.
- Ответы об ошибках — RFC 7807 (application/problem+json).

## 1. Drivers
### GET /drivers
Список водителей с фильтрами.
Параметры: 
- `search` (string), `status` (active|on_leave|inactive|terminated), 
- `docStatus` (expired|soon|warning|valid|unknown), 
- `euOnly` (boolean),
- `limit`, `offset`.
Ответ (200):
```json
{
  "items": [{"id":"drv-001","internal_number":1,"full_name":"Novák Jan","email":"...","phone":"...","status":"active",
    "citizenship":"CZ","doc_summary":{"expired":1,"soon":0,"warning":2,"valid":5,"unknown":0} }],
  "total": 123
}
```

### GET /drivers/{id}
Карточка водителя (все секции).
Ответ (200) включает персональные, рабочие, документы, файлы, историю, комментарии.

### POST /drivers
Создать водителя. `internal_number` присваивается автоматически.
Тело (пример):
```json
{"first_name":"Jan","last_name":"Novák","email":"x@y.cz","status":"active","citizenship":"CZ"}
```

### PATCH /drivers/{id}
Частичное обновление полей (персональные/рабочие/банковские).

### DELETE /drivers/{id}
Мягкое удаление (status → inactive/terminated по политике).

## 2. Documents
### GET /drivers/{id}/documents
Список документов водителя с расчётом статусов.

### POST /drivers/{id}/documents
Создать/обновить документ. Типы:
- `passport`, `visa`, `residence` (прописка), `license_generic`, `a1`, `a1_switzerland`, `declaration`,
  `insurance`, `travel_insurance`, `drivers_licence`, `adr`, `tacho_card`, `code95`, `medical_check`, `psihotest`.
Пример тела для паспорта:
```json
{"type":"passport","number":"CZ1234567","country":"CZ","to":"2031-01-14"}
```

### GET /drivers/{id}/documents/{docId}/files
Список версий файлов (история).

### POST /drivers/{id}/documents/{docId}/files
Загрузка файла (multipart/form-data). Разрешено: PDF, PNG, JPEG; ≤20MB. Новая версия становится текущей.

## 3. Comments
### GET /drivers/{id}/comments
Список комментариев (последние сверху).

### POST /drivers/{id}/comments
Создать комментарий с 1 вложением (опционально).

## 4. Reminders
### POST /reminders/preview
Предпросмотр напоминаний по выбранным водителям (expired/soon/warning).

### POST /reminders/send
Отправка напоминаний (e-mail/Telegram/webhook — по настройкам).

## 5. Meta
### GET /lookups
Справочники (страны, типы документов, статусы, адреса локаций Praha/Kladno и т.п.).
