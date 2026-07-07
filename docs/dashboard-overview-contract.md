# Dashboard Overview Contract

## Purpose
Provide the Command Center with a safe, read-only operational summary of Project Mnemosyne.

## Proposed endpoint
`GET /v1/dashboard/overview`

## Allowed output
- Worker health and infrastructure status
- Recent movement metadata only
- Pending acknowledgement count
- Attention-item count
- Generated timestamp

## Never return
- Matrix keys or credentials
- Raw exchange bodies or payloads
- Artifact contents or artifact keys
- Memory-search results
- Any write or dispatch capability

## Intended dashboard fields
```json
{
  "generated_at": "ISO-8601 timestamp",
  "worker": "alive",
  "d1": "enabled",
  "queue": "active",
  "email_route": "active",
  "artifacts": "inline-only",
  "recent_movement": [],
  "pending_acknowledgements": 0,
  "attention_count": 0
}
```
