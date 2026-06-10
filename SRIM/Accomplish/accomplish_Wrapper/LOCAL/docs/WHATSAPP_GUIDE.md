# WhatsApp Integration Guide

## Overview

DigiBull's WhatsApp integration lets you trigger AI tasks remotely from WhatsApp:
- **Self-chat mode**: Text yourself tasks from anywhere, AI runs them on your PC
- **Group mode**: Anyone in a configured WhatsApp group can @mention the bot to run tasks

All communication stays local. Auth credentials are stored on your device. Only task text is sent to the LLM — no chat history or personal data is scraped.

---

## Setup

### 1. Open Settings
In DigiBull desktop/web app: click ⚙️ → **Integrations** tab → find **WhatsApp** card

### 2. Connect your WhatsApp account

1. Click **Connect WhatsApp**
2. A QR code appears on screen
3. On your **phone**: WhatsApp → Settings → **Linked Devices** → **Link a Device**
4. Scan the QR code with your phone camera
5. Wait for connection to complete
6. Status badge turns green: **Connected (+91XXXXXXXXXX)**

**That's it.** Your number is linked. Baileys (the library) handles auth — no username/password needed.

---

## Usage — Self-Chat Mode

### Send a task to yourself

1. On your **phone**, open WhatsApp
2. Find your own chat (search your name, or "Saved Messages")
3. Type any task:

```
fix the login bug
```

or

```
summarize my recent task history
```

4. DigiBull receives it, AI agent processes it, bot replies to your self-chat with the result
5. Full conversation history stays in that self-chat thread

### Examples

```
@system: check what npm packages need updates
```

```
explain how the auth flow works
```

```
create a task list for the new dashboard
```

All run on your PC and reply back instantly (or within seconds for longer tasks).

---

## Usage — Group @Mention Mode

### One-time group setup

1. **Create a WhatsApp group** (or use existing one)
2. Add your number + the people who should have access
3. **Get the group JID**:
   - Option A: Ask DigiBull to `list my WhatsApp chats` (it will show JID)
   - Option B: In WhatsApp, go to group info → Group JID is usually in the address bar
   - Format: `1234567890-1640000000@g.us` (phone-timestamp@g.us)
4. In Settings → WhatsApp card → paste into **Group @mention JID** field → click **Save**

### Use group mode

Anyone in that group can now text:

```
@DigiBull check what PRs are open
```

```
@DigiBull summarize the latest commits
```

```
@DigiBull run the test suite
```

Bot replies in the group with the result.

---

## How It Works

### Message Flow

```
You text WhatsApp (self-chat or @mention in group)
        ↓
Baileys (local, on your PC) receives it
        ↓
TaskBridge checks:
  - For self-chat: only your own number ✓
  - For group: only if bot is @mentioned ✓
        ↓
Message text sanitized + sent to LLM
        ↓
AI agent processes task
        ↓
Result sent back via WhatsApp
```

### What's sent to the LLM

- **Only** the message text you sent (e.g., "fix the bug")
- Your name (if available)
- A marker that it came from WhatsApp

**Not sent:**
- Chat history
- Contact names of others
- Message timestamps
- Any data beyond the single message

### Rate limits

- **Per person**: 10 messages/minute
- **Global**: 30 messages/minute (across all senders)
- **Message size**: 4,096 characters max

Exceed these and you get a "slow down" message.

---

## Permissions & Safety

### Auto-deny policy

Tasks triggered via WhatsApp:
- **Cannot** request file permissions → auto-denied
- **Cannot** ask yes/no questions → auto-denied
- Can only run read-only operations or operations that don't need approval

This prevents a remote actor (if someone gets your number) from sneaking through permissions.

### Self-chat vs group security

| Mode | Who can trigger | Risk |
|------|---|---|
| Self-chat | Only you (your phone number) | Very low — only you have access |
| Group | Anyone in the group | Medium — depends on who you trust in the group |

---

## Managing Your Connection

### Check status

Settings → Integrations → WhatsApp card shows:
- Connection status (green = connected)
- Your phone number
- Group JID (if set)
- Last connected time

### Disable WhatsApp integration

Click **Disconnect** (double-tap to confirm) — closes the connection but keeps auth on disk.

### Remove all WhatsApp data

Click **Remove All Data** (double-tap to confirm) — **permanently deletes**:
- Auth credentials
- Local cache
- Configuration
- Everything

You'll need to scan the QR code again to reconnect.

---

## Troubleshooting

### "Connection timed out"
- QR code expires after 60 seconds
- Click **Connect WhatsApp** again to get a fresh QR
- Make sure your phone has internet
- WhatsApp must be installed on phone

### "WhatsApp is not connected"
- QR scan failed or you didn't complete it
- Click **Reconnect WhatsApp** → scan new QR
- Check if your phone's WhatsApp is up to date

### Bot doesn't reply
- Check DigiBull is running (daemon must be active)
- Verify WhatsApp status is green in Settings
- For groups: make sure bot JID is saved correctly
- Check rate limits (max 10 msgs/min per person)

### "Ban risk" warning
The integration uses Baileys, which is an unofficial WhatsApp library. WhatsApp _can_ ban accounts using unofficial clients, though it's rare for personal single-account use. If you're concerned:
- Use a secondary WhatsApp number
- Or use official Meta Business API (requires public webhook + verification)

---

## What's Local vs Cloud

| Data | Where it lives | Who has access |
|------|---|---|
| Auth credentials | Your PC (whatsapp-auth/ folder) | Only your daemon process |
| Chat messages | Your phone (WhatsApp) + Baileys cache | Only your PC (local in-memory store) |
| Task prompts | Sent to your configured LLM only | Your configured AI provider (OpenAI, local, etc.) |
| Results | Stored in DigiBull task history | Only you (on your PC) |

**Nothing goes to anonymous servers.** All WhatsApp communication is peer-to-peer with Meta's servers (same as WhatsApp Web).

---

## FAQ

**Q: Is my chat history sent to the LLM?**
No. Only the single message you just sent is processed. Full chat history stays on your phone and local Baileys cache.

**Q: Can other people see my tasks?**
- Self-chat: Only you can trigger it
- Group: Only people in that group see the @mention and reply (same as any WhatsApp message)

**Q: What if my phone's WhatsApp account is compromised?**
Someone with access to your phone could text the bot. Permissions are auto-denied as a safeguard. Recommended: use a secondary WhatsApp number or revoke the linked device from your phone's WhatsApp settings.

**Q: Can I use this on mobile?**
Baileys requires a PC/server (it's a Node.js library). DigiBull's web version runs on your PC daemon. You can't run it directly on mobile, but you can text your own bot from mobile and have it run tasks on your PC.

**Q: How do I find my group JID?**
- In WhatsApp Web, right-click the group → select group info
- Look for the JID in the URL or group details
- Or ask DigiBull: send a message saying `list my chats` and it shows all JIDs

**Q: Can I disable the group feature?**
Yes. Leave the **Group @mention JID** field empty. Only self-chat will work.

---

## Security Best Practices

1. **Keep DigiBull updated** — security patches are released regularly
2. **Don't share your group JID publicly** — treat it like a password
3. **Use a secondary WhatsApp number** if you're worried about bans
4. **Review task history** — check what's running in your task log
5. **Revoke linked device** anytime: Phone → Settings → Linked Devices → remove DigiBull

---

## Next Steps

- [Read the main DigiBull docs](./DIGIBULL_UI_UPDATE.md)
- [Learn about MCP integration](./MCP_GUIDE.md)
- Open an issue on GitHub if you hit problems

---

**Last updated**: June 10, 2026
