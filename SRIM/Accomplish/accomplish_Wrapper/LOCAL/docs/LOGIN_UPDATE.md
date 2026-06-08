# DigiBull Login Update

Short summary of the new SRIM login screen.

## Added

- Fancy animated DigiBull login page with orbit, scan, glow, and card motion.
- Three credential modes:
  - UID + password
  - Email + password
  - Mobile number + OTP
- Two OAuth-style entries:
  - NetBird / Windows login
  - Google login
- Forgot password panel.
- New user onboarding panel.
- Compact NetBird PAT login kept at the bottom.

## Works now

- UID + password works with the current local/test backend.
- NetBird PAT login keeps the existing real NetBird flow.
- Local tester login still appears in dev builds.

## Needs backend wiring

- Google OAuth login.
- Production email/password auth.
- Mobile OTP send/verify.
- Forgot-password email.
- New-user onboarding request.

The UI is ready for those flows and shows clear messages until the backend
endpoints are connected.
