/**
 * Integration Test — QuickBooks Sync
 * Validates payload structure and field mapping before deploying to Sandbox
 *
 * Prerequisites:
 *   - config/config.sandbox.json must exist with valid QB sandbox credentials
 *   - Run: node tests/integration/quickbooks_integration_test.js
 */

const fs   = require("fs");
const path = require("path");

// ─── Load sandbox config ──────────────────────────────────────────────────────
const configPath = path.resolve(__dirname, "../../config/config.sandbox.json");

if (!fs.existsSync(configPath)) {
  console.error("ERROR: config/config.sandbox.json not found. Copy config.example.json and fill credentials.");
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

// ─── Test helpers ─────────────────────────────────────────────────────────────
let passed = 0;
let failed = 0;

function assert(description, condition) {
  if (condition) {
    console.log(`  ✓ ${description}`);
    passed++;
  } else {
    console.error(`  ✗ ${description}`);
    failed++;
  }
}

// ─── Validate config structure ────────────────────────────────────────────────
console.log("\n[Config Validation]\n");

assert("Config has environment field",           !!config.environment);
assert("Config environment is sandbox",          config.environment === "sandbox");
assert("Zoho CRM base_url is defined",           !!config.zoho?.crm?.base_url);
assert("Zoho CRM client_id is defined",          !!config.zoho?.crm?.client_id);
assert("QuickBooks realm_id is defined",         !!config.quickbooks?.realm_id);
assert("QuickBooks client_id is defined",        !!config.quickbooks?.client_id);
assert("QB base_url is sandbox URL",             config.quickbooks?.base_url?.includes("sandbox"));

// ─── Validate QB Invoice payload builder ─────────────────────────────────────
console.log("\n[Payload Structure Validation]\n");

function buildQBInvoicePayload(dealName, accountName, amount, closeDate, qbCustomerId) {
  return {
    Line: [
      {
        Amount: amount,
        DetailType: "SalesItemLineDetail",
        SalesItemLineDetail: { UnitPrice: amount, Qty: 1 },
      },
    ],
    CustomerRef: { value: qbCustomerId, name: accountName },
    DueDate: closeDate,
  };
}

const payload = buildQBInvoicePayload("Test Deal", "Acme Corp", 5000, "2025-12-31", "123");

assert("Payload has Line array",                 Array.isArray(payload.Line));
assert("Line item has Amount",                   payload.Line[0].Amount === 5000);
assert("Line item has DetailType",               payload.Line[0].DetailType === "SalesItemLineDetail");
assert("CustomerRef has value",                  !!payload.CustomerRef.value);
assert("CustomerRef has name",                   !!payload.CustomerRef.name);
assert("DueDate is present",                     !!payload.DueDate);

// ─── Summary ──────────────────────────────────────────────────────────────────
console.log(`\nResults: ${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
