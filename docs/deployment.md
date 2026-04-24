# Deployment Guide

## Prerequisites

- Access to Zoho CRM (Developer or Admin role)
- Access to Zoho Developer Console
- QuickBooks Online account (Sandbox + Production)
- `config/config.sandbox.json` populated

---

## Step 1 — Deploy Deluge Functions

1. Log in to **Zoho CRM**.
2. Go to `Setup → Developer Space → Functions`.
3. Click **New Function**.
4. Copy the content from the corresponding `.dg` file in `src/crm/functions/`.
5. Set the function name to match the file name (without `.dg`).
6. Save and **Test** with a sample payload.

> Repeat for each function file.

---

## Step 2 — Configure Workflows

1. Go to `Setup → Automation → Workflow Rules`.
2. Create a new rule matching the definition in `src/crm/workflows/*.json`.
3. Set the module, trigger, conditions, and actions as specified.
4. Link the appropriate Deluge function in the **Function** action.

---

## Step 3 — Set Up Schedules

1. Go to `Setup → Automation → Schedules`.
2. Create a new schedule.
3. Set the frequency and time as specified in `src/crm/schedules/*.dg` header comments.
4. Select the corresponding deployed function.

---

## Step 4 — Deploy Widgets

1. Go to `Setup → Developer Space → Widgets`.
2. Click **New Widget** → select **CRM Widget**.
3. Upload the widget folder from `src/widgets/widgetName/`.
4. Associate the widget with the correct module and location (e.g., Detail page).

---

## Step 5 — Configure Blueprints

1. Go to `Setup → Process Management → Blueprint`.
2. Create or import the blueprint based on `src/crm/blueprints/*.json`.
3. Map stages, required fields, and triggered functions.

---

## Environment Promotion Checklist

Before promoting from **Sandbox → Production**:

- [ ] All functions tested with real records in Sandbox
- [ ] Workflows verified (no unintended triggers)
- [ ] Schedule tested manually before enabling automatic execution
- [ ] Widget tested in Sandbox CRM
- [ ] QB sync validated with at least 5 test records
- [ ] `config.production.json` populated with Production credentials
- [ ] Logging channel (`#zoho-logs`) is active
- [ ] Team notified of deployment window

---

## Rollback

If a deployment causes issues:

1. Disable the affected **Workflow** or **Schedule** immediately.
2. Revert the function to the previous version in Developer Space (Zoho keeps version history).
3. Investigate logs in Zoho Cliq `#zoho-logs`.
4. Re-deploy the corrected version after fix is validated in Sandbox.
