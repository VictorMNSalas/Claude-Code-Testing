/**
 * Unit Tests — leads_onCreate_assignOwner
 * Runner: Node.js (no framework required)
 */

// ─── Mock territory map (mirrors Deluge logic) ────────────────────────────────
const territoryMap = {
  California: "owner_zoho_id_001",
  Texas:      "owner_zoho_id_002",
  Florida:    "owner_zoho_id_003",
};

const DEFAULT_OWNER = "owner_zoho_id_default";

function assignOwner(state) {
  return territoryMap[state] || DEFAULT_OWNER;
}

// ─── Test runner ──────────────────────────────────────────────────────────────
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

// ─── Tests ────────────────────────────────────────────────────────────────────
console.log("\n[leads_onCreate_assignOwner]\n");

assert("California maps to owner_001",  assignOwner("California") === "owner_zoho_id_001");
assert("Texas maps to owner_002",       assignOwner("Texas")      === "owner_zoho_id_002");
assert("Florida maps to owner_003",     assignOwner("Florida")    === "owner_zoho_id_003");
assert("Unknown state uses default",    assignOwner("Nevada")     === DEFAULT_OWNER);
assert("Empty string uses default",     assignOwner("")           === DEFAULT_OWNER);
assert("Null uses default",             assignOwner(null)         === DEFAULT_OWNER);

// ─── Summary ──────────────────────────────────────────────────────────────────
console.log(`\nResults: ${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
