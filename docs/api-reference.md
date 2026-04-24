# API Reference

Quick reference for external APIs used in this project.

---

## Zoho CRM API v6

**Base URL:** `https://www.zohoapis.com/crm/v6`

| Operation          | Method | Endpoint                          |
|--------------------|--------|-----------------------------------|
| Get Record         | GET    | `/Leads/{id}`                     |
| Create Record      | POST   | `/Leads`                          |
| Update Record      | PUT    | `/Leads/{id}`                     |
| Delete Record      | DELETE | `/Leads/{id}`                     |
| Search Records     | GET    | `/Leads/search?criteria=(...)`    |
| Bulk Create        | POST   | `/Leads/upsert`                   |

**Authentication:** OAuth 2.0 (Bearer Token)

```
Authorization: Zoho-oauthtoken {access_token}
```

**Refresh Token flow:**
```
POST https://accounts.zoho.com/oauth/v2/token
  ?grant_type=refresh_token
  &client_id={CLIENT_ID}
  &client_secret={CLIENT_SECRET}
  &refresh_token={REFRESH_TOKEN}
```

---

## QuickBooks Online API

**Sandbox Base URL:** `https://sandbox-quickbooks.api.intuit.com/v3/company/{realmId}`
**Production Base URL:** `https://quickbooks.api.intuit.com/v3/company/{realmId}`

| Operation          | Method | Endpoint              |
|--------------------|--------|-----------------------|
| Create Customer    | POST   | `/customer`           |
| Query Customer     | GET    | `/query?query=...`    |
| Create Invoice     | POST   | `/invoice`            |
| Get Invoice        | GET    | `/invoice/{id}`       |
| Void Invoice       | POST   | `/invoice?operation=void` |
| Create Payment     | POST   | `/payment`            |

**Authentication:** OAuth 2.0

```
Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json
```

**Refresh Token flow:**
```
POST https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer
  grant_type=refresh_token
  &refresh_token={REFRESH_TOKEN}
  (Basic Auth: client_id:client_secret)
```

---

## Zoho Cliq (Logging)

Used for operational logging and alerts.

**Deluge built-in:**
```deluge
zoho.cliq.postToChannel("channel-name", "message string");
```

**Channels used:**

| Channel             | Purpose                          |
|---------------------|----------------------------------|
| `#zoho-logs`        | General operation logs           |
| `#zoho-alerts`      | Errors and failures              |
| `#zoho-logs-sandbox`| Sandbox environment logs         |

---

## Common HTTP Status Codes

| Code | Meaning               | Action                              |
|------|-----------------------|-------------------------------------|
| 200  | OK                    | Success                             |
| 201  | Created               | Record created successfully         |
| 400  | Bad Request           | Check payload structure             |
| 401  | Unauthorized          | Refresh access token                |
| 404  | Not Found             | Check record ID or endpoint         |
| 429  | Rate Limited          | Implement retry with backoff        |
| 500  | Server Error          | Log and retry after delay           |
