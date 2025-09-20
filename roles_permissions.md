# Роли и права (RBAC)

| Роль        | Водители (CRUD) | Документы | Файлы | Зарплата | Комментарии | Напоминания |
|-------------|------------------|-----------|-------|----------|-------------|-------------|
| Admin       | Full             | Full      | Full  | Full     | Full        | Full        |
| HR          | CRUD             | CRUD      | Upload| Read     | CRUD        | Send        |
| Dispatcher  | Read             | Read      | Upload| None     | CRUD        | None        |
| Accounting  | Read             | Read      | Read  | CRUD     | Read        | None        |
| Driver      | Self only        | Self only | Upload| Self     | CRUD (self) | None        |

Примечания:
- Upload = загрузка новых версий, просмотр истории доступен всем кто видит документ.
- Self only — доступ к собственной карточке (если включён личный кабинет).
