# Zoho Project Template

> Standard repository template for Zoho integrations, automations, and custom development.

---

## Table of Contents

- [Overview](#overview)
- [Repository Structure](#repository-structure)
- [Environments](#environments)
- [Getting Started](#getting-started)
- [Naming Conventions](#naming-conventions)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)

---

## Overview

This template provides a standardized base for all Zoho-related projects including:

- **Zoho CRM Functions** (Deluge scripting)
- **Workflows & Blueprints**
- **Scheduled Functions**
- **Custom Widgets**
- **External API Integrations** (QuickBooks, REST APIs, etc.)
- **Multi-environment support** (Sandbox / Production)

---

## Repository Structure

```
zoho-project/
├── src/
│   ├── crm/
│   │   ├── functions/          # Deluge CRM functions
│   │   ├── workflows/          # Workflow rule definitions
│   │   ├── schedules/          # Scheduled function configs
│   │   └── blueprints/         # Blueprint stage definitions
│   ├── widgets/                # Custom Zoho Widgets (HTML/JS)
│   └── integrations/
│       ├── quickbooks/         # QuickBooks sync scripts
│       └── external_api/       # Other external API connectors
├── config/
│   ├── config.example.json     # Template config (safe to commit)
│   ├── config.sandbox.json     # Sandbox environment (gitignored)
│   └── config.production.json  # Production environment (gitignored)
├── docs/
│   ├── architecture.md         # System architecture overview
│   ├── deployment.md           # Step-by-step deployment guide
│   ├── naming-conventions.md   # Project naming standards
│   ├── api-reference.md        # External API references
│   └── changelog.md            # Version history
├── tests/
│   ├── unit/                   # Unit tests for functions
│   └── integration/            # Integration test scenarios
├── logs/                       # Local log output (gitignored)
├── .gitignore
├── CONTRIBUTING.md
└── README.md
```

---

## Environments

| Environment | Config File              | Zoho Org       |
|-------------|--------------------------|----------------|
| Sandbox     | `config.sandbox.json`    | Sandbox Org    |
| Production  | `config.production.json` | Production Org |

Always test in **Sandbox** before deploying to **Production**.

---

## Getting Started

1. **Use this template**: Click `Use this template` on GitHub.
2. **Clone the repo**:
   ```bash
   git clone https://github.com/YOUR_ORG/your-zoho-project.git
   cd your-zoho-project
   ```
3. **Set up config**:
   ```bash
   cp config/config.example.json config/config.sandbox.json
   # Fill in your Sandbox credentials
   ```
4. **Develop** in `src/` following the [naming conventions](docs/naming-conventions.md).
5. **Test** in `tests/` before deploying.
6. **Deploy** following [deployment guide](docs/deployment.md).

---

## Naming Conventions

| Asset Type       | Pattern                              | Example                          |
|------------------|--------------------------------------|----------------------------------|
| CRM Function     | `module_action_description.dg`       | `leads_onCreate_assignOwner.dg`  |
| Workflow         | `module_trigger_description.json`    | `deals_fieldUpdate_stageChange.json` |
| Schedule         | `frequency_description.json`         | `daily_syncQuickBooks.json`      |
| Widget           | `widgetName/` (folder)               | `invoiceViewer/`                 |
| Integration      | `system_action.dg`                   | `quickbooks_syncInvoices.dg`     |
| Test             | `target_test.js`                     | `assignOwner_test.js`            |
| Config key       | `SCREAMING_SNAKE_CASE`               | `QB_CLIENT_ID`                   |

---

## Deployment

See [docs/deployment.md](docs/deployment.md) for full instructions.

**Quick reference:**
- Deluge functions are deployed directly via Zoho CRM > Developer Space.
- Widgets are deployed via Zoho CRM > Setup > Developer Space > Widgets.
- Schedules are configured under Zoho CRM > Setup > Automation > Schedules.

---

## Testing

Unit tests are located in `tests/unit/` and integration tests in `tests/integration/`.

```bash
# Run unit tests (Node.js based mock runner)
node tests/unit/run_tests.js
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for branching strategy and PR guidelines.

---

## License

Internal use only. Proprietary.
