# Work Rules

1. **No direct commits to main** - All changes require a PR with passing CI and review by at least one team member
2. **PRs must include tests** - Unit or integration, preferably automated. This can be skipped for small changes but still reviewed by a team member.
3. **Check production errors daily** - Review Sentry/logs each morning. Automated alerts and notifications to relevant team members.
4. **Hotfixes require post-mortem** - 15-min write-up within 24 hours
5. **Big features and refactors require implementation plans** - Document approach, risks, and rollback strategy in repo (issue, PR, or docs/)
