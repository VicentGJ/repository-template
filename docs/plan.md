# 30-Day Plan

## Week 1: Assessment & Consolidation

- Shadow existing developer (2 days) to learn systems, pain points, tribal knowledge. Document findings.
- Document all code repositories and their purposes
- Identify consolidation opportunities: monorepo structure, shared packages (types, configs)
- Define lightweight Git strategy (GitHub Flow): main = production, short lived feature branches, PR with approval required
- Deliver: **Documentation + consolidation plan + Git workflow**

## Week 2: Reliability Foundations

- Set up error tracking (Sentry) across backend and mobile apps
- Create staging environment for pre-production testing
- Establish uptime monitoring and alerting (know when systems break)
- Require CI checks (lint, test, build) before merging PRs
- Deliver: **Sentry dashboard + staging environment + CI pipeline**

## Week 3: Developer Experience & Deployment

- Implement pre-commit hooks (linting, formatting, commit messages)
- Create PR template with review checklist
- Begin CD automation: auto-deploy to staging on merge
- Document coding standards (lightweight, 1 page)
- Deliver: **PR template + pre-commit hooks + staging auto-deploy**

## Week 4: CD Completion & Security Foundations

- Complete CD pipeline: automated production deploys with rollback capability
- Add application metrics and performance dashboards
- Security audit: review auth, secrets management, identify vulnerabilities
- Document security strategy and improvement roadmap
- Deliver: **Production CD + metrics dashboard + security assessment**

---

**Evidence:** [CI Pipeline](.github/workflows/ci.yml) | [CD Pipeline](.github/workflows/cd.yml) | [PR Template](.github/pull_request_template.md)
