PROMPT 1 — Scaffold the app and UI (NO data sources)

You are building a Code App prototype called "Executive Briefing Manager".

Goal:
Create full UI scaffolding, navigation, and layout ONLY.
Do NOT use Dataverse or any connectors.
Use only mock collections / hardcoded data.

--------------------------------------------------
DESIGN LANGUAGE
--------------------------------------------------

- Dark premium theme (SAP Horizon-inspired)
- Glassmorphism panels
- Soft shadows, gradients, rounded corners
- Enterprise-grade, executive feel

--------------------------------------------------
GLOBAL SHELL BAR
--------------------------------------------------

Fixed top bar with:
- Icon: 📋
- Title: Executive Briefing Manager
- Role Switcher (toggle):
  - Customer Officer
  - Executive

This drives the entire app navigation.

--------------------------------------------------
SCREEN STRUCTURE
--------------------------------------------------

1. CUSTOMER OFFICER DASHBOARD

Layout:
- 70% left / 30% right

LEFT AREA:
Segmented navigation:
- 📅 Calendar
- 📋 Kanban
- 👥 People Hub

Calendar:
- Weekly layout (mock)
- Meetings = colored blocks
- Action items = grey tasks

Kanban:
6 columns:
- Inbox, Approved, Scheduled, In Progress, Ready, Done
Cards:
- Company
- Status
- Avatar placeholder

People Hub:
Grid of profile cards:
- Photo
- Name
- Role
- Technical stance
- Interests
- Button: Smalltalk Topics → opens popover

RIGHT SIDEBAR: "My Action Items"
- Task list
- Sort dropdown (Date / Priority)
- Each item:
  - Checkbox
  - Title
  - Priority badge
  - Due date
- Clicking → opens Meeting Overlay

--------------------------------------------------
2. FULL-SCREEN MEETING OVERLAY
--------------------------------------------------

Opened from:
- Calendar
- Kanban
- Action item

HEADER:
- Gradient banner
- Title
- Industry
- Time
- Avatars (click → smalltalk popup)

CENTER TABS:
- Summary (AI-style text + Copy button)
- Tasks & AI (tasks + buttons)
- Mail Hub (mock emails)
- Social Insights (filtered contacts)

FOOTER:
- Phase bar (6 stages)
- Back button

--------------------------------------------------
3. EXECUTIVE DASHBOARD
--------------------------------------------------

Design:
- Spacious
- Minimal
- Mobile-first

Sections:
- Greeting ("Welcome, Christian")
- Metrics
- Today's Briefings (horizontal cards)
- Upcoming Highlights (top 3 insights)
- Podcast Player (UI only)

--------------------------------------------------
MOCK DATA
--------------------------------------------------

Create collections:
- Meetings
- ActionItems
- Contacts
- Emails
- Participants
- Highlights

Use realistic companies:
BMW, SAP, BASF, Siemens, Deutsche Bank

--------------------------------------------------
TECHNICAL REQUIREMENTS
--------------------------------------------------

- Clean structure
- Reusable components
- Clear navigation logic
- State handled via collections/variables
- Easy to replace later with real data

--------------------------------------------------
CONSTRAINTS
--------------------------------------------------

- NO Dataverse
- NO connectors
- NO Power Automate

--------------------------------------------------
DELIVERABLE
--------------------------------------------------

Provide:
1. App structure
2. Screens/components
3. Mock collections
4. Key formulas (pseudo ok)
5. Build steps