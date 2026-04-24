# Architecture Overview

## System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Zoho Ecosystem                          │
│                                                                 │
│  ┌──────────────┐   Workflows/    ┌──────────────────────────┐  │
│  │  Zoho CRM    │◄──Blueprints───►│  Deluge Functions        │  │
│  │  (Records)   │                 │  (src/crm/functions/)    │  │
│  └──────┬───────┘                 └────────────┬─────────────┘  │
│         │                                      │                │
│         │ Schedules                            │ invokeurl      │
│         ▼                                      ▼                │
│  ┌──────────────┐                 ┌──────────────────────────┐  │
│  │  Zoho CRM    │                 │  External Integrations   │  │
│  │  Widgets     │                 │  (src/integrations/)     │  │
│  └──────────────┘                 └──────────┬───────────────┘  │
└─────────────────────────────────────────────┼───────────────────┘
                                              │
                    ┌─────────────────────────┼─────────────────┐
                    │                         │                  │
                    ▼                         ▼                  ▼
            ┌──────────────┐       ┌─────────────────┐  ┌────────────────┐
            │  QuickBooks  │       │  External REST  │  │  Zoho Cliq     │
            │  Online API  │       │  APIs           │  │  (Logging)     │
            └──────────────┘       └─────────────────┘  └────────────────┘
```

## Components

| Component         | Location                    | Description                              |
|-------------------|-----------------------------|------------------------------------------|
| CRM Functions     | `src/crm/functions/`        | Deluge scripts triggered by CRM events   |
| Workflows         | `src/crm/workflows/`        | Automation rules (JSON definitions)      |
| Blueprints        | `src/crm/blueprints/`       | Stage-gated sales processes              |
| Schedules         | `src/crm/schedules/`        | Time-based recurring Deluge functions    |
| Widgets           | `src/widgets/`              | Embedded HTML/JS UI components in CRM   |
| QB Integration    | `src/integrations/quickbooks/` | QuickBooks Online sync scripts        |
| External APIs     | `src/integrations/external_api/` | Generic REST API connectors         |

## Data Flow: Deal → QuickBooks Invoice

```
1. Deal reaches "Closed Won" stage in Zoho CRM
2. Blueprint triggers → deals_onUpdate_notifySlack.dg (Slack alert)
3. Schedule (or manual trigger) → quickbooks_syncInvoices.dg
4. Function queries QB for matching Customer by Account Name
5. QB Invoice is created and Invoice ID is written back to CRM Deal
6. Log entry posted to Zoho Cliq #zoho-logs channel
```

## Environments

| Layer        | Sandbox                        | Production                      |
|--------------|--------------------------------|---------------------------------|
| Zoho Org     | Sandbox Org                    | Production Org                  |
| QB API       | sandbox-quickbooks.api.intuit  | quickbooks.api.intuit.com       |
| Config       | config.sandbox.json            | config.production.json          |
| Logging      | #zoho-logs-sandbox             | #zoho-logs                      |
