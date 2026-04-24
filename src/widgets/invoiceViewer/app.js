/* Invoice Viewer Widget — app.js */

const QB_BASE_URL = "https://app.qbo.intuit.com/app/invoice?txnId=";

function setStatus(text, type = "") {
  const badge = document.getElementById("status-badge");
  badge.textContent = text;
  badge.className = "badge " + type;
}

function fillField(id, value) {
  document.getElementById(id).textContent = value || "—";
}

function loadInvoiceData(entity) {
  const qbId    = entity.QB_Invoice_ID;
  const amount  = entity.Amount ? "$" + Number(entity.Amount).toLocaleString("en-US", { minimumFractionDigits: 2 }) : null;
  const dueDate = entity.Closing_Date ? new Date(entity.Closing_Date).toLocaleDateString("en-US") : null;

  fillField("invoice-number", entity.Invoice_Number || entity.id);
  fillField("customer-name",  entity.Account_Name);
  fillField("invoice-amount", amount);
  fillField("due-date",       dueDate);
  fillField("qb-id",          qbId);

  if (qbId) {
    const btn = document.getElementById("open-qb-btn");
    btn.disabled = false;
    btn.addEventListener("click", () => window.open(QB_BASE_URL + qbId, "_blank"));
    setStatus("Synced", "synced");
  } else {
    setStatus("Not synced", "pending");
  }
}

function init() {
  setStatus("Loading...");

  // Zoho Widget SDK
  ZOHO.embeddedApp.on("PageLoad", function (data) {
    const entityId = data.EntityId;

    ZOHO.CRM.API.getRecord({ Entity: "Deals", RecordID: entityId })
      .then(function (response) {
        const record = response.data[0];
        loadInvoiceData(record);
      })
      .catch(function () {
        setStatus("Error", "error");
      });
  });

  ZOHO.embeddedApp.init();
}

document.addEventListener("DOMContentLoaded", init);
document.getElementById("refresh-btn").addEventListener("click", init);
