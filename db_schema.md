# DB Schema — PostgreSQL (v1.4)

## Таблицы (основные)
### 1) drivers
- `id` (uuid, pk)
- `internal_number` (bigserial, unique, not null)
- `first_name` (text), `last_name` (text), `middle_name` (text)
- `birth_date` (date)
- `citizenship` (text, country code)
- `rodne_cislo` (text, unique nullable; UI-правило показа см. ТЗ)
- `email` (text), `phone` (text)
- `reg_address` (text), `res_address` (text)
- `status` (enum: active|on_leave|inactive|terminated)
- `hire_date` (date), `fire_date` (date)
- `contract_from` (date), `contract_to` (date), `contract_indefinite` (bool), `contract_signed_by` (text)
- `work_location` (enum: praha|kladno)
- `bank_country` (text), `bank_account` (text), `iban` (text), `swift` (text)
- `flags` (jsonb: pas_souhlas, propiska_cz)
- `created_at` (timestamptz), `updated_at` (timestamptz)

Индексы: email, phone, (last_name, first_name, middle_name), internal_number, status.

### 2) driver_documents
- `id` (uuid, pk), `driver_id` (fk → drivers.id)
- `type` (enum): passport, visa, residence, license_generic, a1, a1_switzerland, declaration, insurance,
  travel_insurance, drivers_licence, adr, tacho_card, code95, medical_check, psihotest
- `number` (text, nullable) — для паспорт/виза/права/чип
- `country` (text, nullable)
- `from` (date, nullable), `to` (date, nullable)
- `meta` (jsonb) — флаги/примечания
- `created_at`, `updated_at`

Индексы: (driver_id, type), to, number.

### 3) document_files (версионность)
- `id` (uuid, pk), `document_id` (fk → driver_documents.id)
- `file_name` (text), `mime` (text), `size_bytes` (int)
- `version` (int) — 1..N
- `uploaded_by` (text/user id), `uploaded_at` (timestamptz)
- `is_current` (bool) — последняя версия = true

### 4) driver_comments
- `id` (uuid, pk), `driver_id` (fk)
- `author` (text/user id), `text` (text), `created_at` (timestamptz)
- `attachment_file_id` (fk → comment_files.id, nullable)

### 5) comment_files
- `id` (uuid, pk)
- `file_name` (text), `mime` (text), `size_bytes` (int)
- `uploaded_by` (text/user id), `uploaded_at` (timestamptz)

### 6) salaries
- `id` (uuid, pk), `driver_id` (fk)
- `type` (enum: monthly|hourly|per_trip)
- `base_amount` (numeric), `currency` (text)
- `bonuses` (jsonb), `deductions` (jsonb)
- `notes` (text)

### 7) per_diems
- `id` (uuid, pk), `driver_id` (fk)
- `period` (text YYYY-MM), `trips` (jsonb), `deductions` (jsonb)

### 8) audit_log
- `id` (uuid, pk)
- `entity` (text), `entity_id` (uuid), `action` (text)
- `user_id` (text), `payload` (jsonb), `created_at` (timestamptz)

## Валидации и правила
- `rodne_cislo` — уникально, может быть NULL; выводится по UI‑условию (citizenship=CZ или есть виза CZ).
- Банковские: если `bank_country='CZ'` → обязателен `bank_account`; иначе → `iban` + `swift`.
- Даты: if `from` and `to` → `from <= to`.
- Документы без поля «from» (declaration, insurance, travel_insurance) — допускают NULL для `from`.
