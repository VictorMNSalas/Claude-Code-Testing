# Naming Conventions

All assets in this project follow a strict naming convention to ensure consistency, discoverability, and maintainability across all Zoho environments.

---

## General Rules

- Use **snake_case** for all file names and function names.
- Use **camelCase** for JSON keys and JavaScript variables.
- Use **SCREAMING_SNAKE_CASE** for config keys and environment variables.
- Never use spaces in file or folder names.
- Keep names descriptive but concise (max ~60 characters).

---

## Deluge Functions (`src/crm/functions/`)

**Pattern:** `module_trigger_description.dg`

| Segment      | Description                              | Example           |
|--------------|------------------------------------------|-------------------|
| `module`     | Zoho CRM module (lowercase)              | `leads`, `deals`  |
| `trigger`    | Event that fires the function            | `onCreate`, `onUpdate`, `onDelete` |
| `description`| Short action description (camelCase)     | `assignOwner`, `notifySlack` |

**Examples:**
```
leads_onCreate_assignOwner.dg
deals_onUpdate_notifySlack.dg
contacts_onDelete_archiveRecord.dg
accounts_onCreate_createQBCustomer.dg
```

---

## Schedules (`src/crm/schedules/`)

**Pattern:** `frequency_description.dg`

| Segment       | Options                                   | Example       |
|---------------|-------------------------------------------|---------------|
| `frequency`   | `hourly`, `daily`, `weekly`, `monthly`    | `daily`       |
| `description` | What the schedule does (camelCase)        | `syncQuickBooks` |

**Examples:**
```
daily_syncQuickBooks.dg
hourly_checkPendingInvoices.dg
weekly_generateReports.dg
monthly_archiveClosedDeals.dg
```

---

## Workflows (`src/crm/workflows/`)

**Pattern:** `module_triggerType_description.json`

| Segment       | Options                                        | Example          |
|---------------|------------------------------------------------|------------------|
| `module`      | Zoho CRM module                                | `deals`          |
| `triggerType` | `onCreate`, `onEdit`, `fieldUpdate`, `onDelete`| `fieldUpdate`    |
| `description` | Short description (camelCase)                  | `stageChange`    |

**Examples:**
```
deals_fieldUpdate_stageChange.json
leads_onCreate_autoAssign.json
contacts_onEdit_syncToQB.json
```

---

## Blueprints (`src/crm/blueprints/`)

**Pattern:** `module_blueprint_description.json`

**Examples:**
```
deals_blueprint_salesProcess.json
leads_blueprint_qualificationFlow.json
```

---

## Integrations (`src/integrations/`)

**Pattern:** `system_action.dg`

**Examples:**
```
quickbooks_syncInvoices.dg
quickbooks_createCustomer.dg
quickbooks_voidPayment.dg
api_fetchAndMap.dg
stripe_processPayment.dg
```

---

## Widgets (`src/widgets/`)

**Pattern:** `widgetName/` (PascalCase folder, lowercase files inside)

**Examples:**
```
invoiceViewer/
  index.html
  app.js
  style.css

dealScorecard/
  index.html
  app.js
  style.css
```

---

## Tests (`tests/`)

**Pattern:** `targetFunctionName_test.js`

**Examples:**
```
tests/unit/assignOwner_test.js
tests/unit/notifySlack_test.js
tests/integration/quickbooks_integration_test.js
```

---

## Config Keys

All keys in `config.json` files use `SCREAMING_SNAKE_CASE`:

```json
{
  "QB_CLIENT_ID": "...",
  "QB_CLIENT_SECRET": "...",
  "ZOHO_REFRESH_TOKEN": "...",
  "WEBHOOK_SECRET": "..."
}
```

---

## Git Branches

| Branch           | Purpose                                |
|------------------|----------------------------------------|
| `main`           | Production-ready code                  |
| `develop`        | Integration branch                     |
| `feature/xxx`    | New features or functions              |
| `fix/xxx`        | Bug fixes                              |
| `release/x.x.x`  | Release preparation                    |

---

## Commit Messages

Follow **Conventional Commits**:

```
feat(crm): add leads_onCreate_assignOwner function
fix(qb): handle null customer in syncInvoices
chore(config): update sandbox QB credentials template
docs(arch): add system diagram to architecture.md
test(unit): add coverage for assignOwner edge cases
```
