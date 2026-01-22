# Hotfix Protocol

| Severity | Response | Examples |
|----------|----------|----------|
| P0 | 1 hour | System down, payments failing, data breach |
| P1 | 4 hours | Partial outage, app crashes, billing errors |
| P2 | 24 hours | UI bugs, minor features broken |

1. **Assess severity** - If unsure, rollback first and investigate after
2. **Create hotfix branch** from main (GitHub Flow)
3. **Fix + more observability + add regression test** - Prevent recurrence
4. **Review + merge** - Skip review for P0 if needed, require CI to pass
5. **Deploy** - P0 can skip staging, others deploy to staging first
6. **Post-mortem within 24h** - Root cause + prevention + observability gaps, share with team
