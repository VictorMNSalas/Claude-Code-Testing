# Contributing

## Branching Strategy

```
main          ← Production-ready. Protected. Requires PR + review.
  └── develop ← Integration branch. All features merge here first.
        ├── feature/leads-assign-owner
        ├── feature/qb-invoice-sync
        └── fix/schedule-null-pointer
```

## Workflow

1. **Branch** from `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Develop** following [naming conventions](docs/naming-conventions.md).

3. **Test** locally before pushing:
   ```bash
   node tests/unit/your_function_test.js
   node tests/integration/your_integration_test.js
   ```

4. **Commit** using Conventional Commits:
   ```bash
   git commit -m "feat(crm): add leads_onCreate_assignOwner function"
   ```

5. **Push** and open a PR against `develop`:
   ```bash
   git push origin feature/your-feature-name
   ```

6. PR is reviewed and merged to `develop`.
7. After QA in Sandbox, `develop` is merged to `main` for production deployment.

---

## PR Checklist

- [ ] Code follows naming conventions
- [ ] Tested in Zoho Sandbox
- [ ] No credentials or tokens committed
- [ ] `docs/changelog.md` updated
- [ ] Unit/integration tests added or updated

---

## Commit Message Types

| Type     | Use for                                |
|----------|----------------------------------------|
| `feat`   | New function, widget, or integration   |
| `fix`    | Bug fix in existing code               |
| `docs`   | Documentation only                     |
| `test`   | Adding or updating tests               |
| `chore`  | Config changes, dependency updates     |
| `refactor` | Code improvement without behavior change |
