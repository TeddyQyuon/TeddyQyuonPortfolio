# Task 1: history secret scan (report only)

Audited 2026-11-10. Both named repositories were mirror-cloned without a depth limit. Gitleaks 8.30.1 was downloaded from its official GitHub release and its SHA-256 checked against the release checksums. All scans used `detect --log-opts=--all --redact --report-format json`.

The default rules reported no matches (duplicate: 14 commits; main: 129 commits). Manual inspection of `32f7d6037986aa3ff9c1d8c2138d0cb279660f38` found a plaintext login password and security passcode in `docs/agent_handoff.md`. A second scan extending the default rules with a handoff-password rule detected two introductions in the duplicate and four in the main repo. An exact-value search of every reachable commit confirmed the occurrences below. Scanner findings count introductions in diffs, rather than every historical snapshot.

| Repository | Secret type | Masked value | File and historical lines | Commits containing the value | At HEAD | Branches retaining the history |
|---|---|---|---|---|---|---|
| TeddyQyuonPortfolio-main | Account password | Qyuo… (12 chars) | docs/agent_handoff.md:76 | 6672ec9, 63d6f3a, b65ea6b | No | main, fix/security-audit-2026-11-05 |
| TeddyQyuonPortfolio-main | Security/2FA passcode | 2621… (6 chars) | docs/agent_handoff.md:77 | 6672ec9, 63d6f3a, b65ea6b | No | main, fix/security-audit-2026-11-05 |
| TeddyQyuonPortfolio | Account password | Qyuo… (12 chars) | docs/agent_handoff.md:26,71–73,76 | 9524746, f715e4c, c44083a, 2451faa, 520e8fe, c9a8e53, c0e0a02, eb6c50d | No | main, seo/social-preview-project-metadata, uiux-upgrade |
| TeddyQyuonPortfolio | Security/2FA passcode | 2621… (6 chars) | docs/agent_handoff.md:27,72–74,77 | Same eight commits | No | main, seo/social-preview-project-metadata, uiux-upgrade |

No current branch tip contains either value. The account is identified in the removed instructions as the Antigravity Mobile Coder login. Treat the password as critical and the passcode as compromised; whether that passcode was a one-time value, a static PIN, or is still valid was not tested. No login attempts were made. No provider API keys, service-role tokens or database passwords were detected by these scans; this is not a guarantee that other secrets do not exist.

## Remediation requiring separate approval

1. At the account provider, change the exposed password, revoke active sessions, and reset any static security PIN/recovery code. If it was a one-time passcode, confirm its expiry. Change any reused password at the relevant providers. History cleanup cannot revoke credentials already copied elsewhere.
2. Make the duplicate private, delete it, or rewrite its history. The main repository also contains the credentials historically, so cleaning only the duplicate is insufficient. Prefer removing the credential-bearing handoff file from both histories after rotation, then asking GitHub Support to purge cached views and affected PR refs. Coordinate with collaborators before rewriting.
3. Enable secret scanning and push protection on both repositories. Add a custom pattern or local check for plaintext handoff credentials, which the default Gitleaks rules missed.

These commands are proposals only; none was executed:

```powershell
# Option A: make the duplicate private
gh repo edit TeddyQyuon/TeddyQyuonPortfolio-main --visibility private --accept-visibility-change-consequences

# Option B: delete the duplicate (choose only if its removal is intended)
gh repo delete TeddyQyuon/TeddyQyuonPortfolio-main --yes

# Option C: remove the entire credential-bearing file from both histories.
# Run only in fresh dedicated mirrors after rotation and explicit approval.
git clone --mirror https://github.com/TeddyQyuon/TeddyQyuonPortfolio-main.git cleanup-duplicate.git
git -C cleanup-duplicate.git filter-repo --path docs/agent_handoff.md --invert-paths --force
git -C cleanup-duplicate.git remote add origin https://github.com/TeddyQyuon/TeddyQyuonPortfolio-main.git
git -C cleanup-duplicate.git push --force --all origin
git -C cleanup-duplicate.git push --force --tags origin
git clone --mirror https://github.com/TeddyQyuon/TeddyQyuonPortfolio.git cleanup-main.git
git -C cleanup-main.git filter-repo --path docs/agent_handoff.md --invert-paths --force
git -C cleanup-main.git remote add origin https://github.com/TeddyQyuon/TeddyQyuonPortfolio.git
git -C cleanup-main.git push --force --all origin
git -C cleanup-main.git push --force --tags origin

# Enable scanning/protection; repository settings changes need approval.
'{"security_and_analysis":{"secret_scanning":{"status":"enabled"},"secret_scanning_push_protection":{"status":"enabled"}}}' | Set-Content -Encoding ascii security-settings.json
gh api --method PATCH repos/TeddyQyuon/TeddyQyuonPortfolio --input security-settings.json
gh api --method PATCH repos/TeddyQyuon/TeddyQyuonPortfolio-main --input security-settings.json
```

Full commit SHAs and exact occurrence lines are in `secret-findings.json`. Only masked values are retained in that evidence.
