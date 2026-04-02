PROMPT 2 — Add Microsoft 365 connectors (NO Dataverse yet)

Extend the existing app by integrating Microsoft 365 data.

Goal:
Enhance realism using Office 365 connectors.
Still NO Dataverse.

--------------------------------------------------
CONNECTORS TO USE
--------------------------------------------------

- Office 365 Users
  - Name
  - Photo
  - Title

- Office 365 Outlook
  - Calendar events
  - Attendees
  - Emails (light usage)

--------------------------------------------------
BOUNDARY
--------------------------------------------------

- No Dataverse
- No custom backend
- Keep mock data where needed

--------------------------------------------------
FEATURE UPDATES
--------------------------------------------------

GLOBAL SHELL BAR:
- Add logged-in user info
- Show user photo

--------------------------------------------------
CUSTOMER OFFICER DASHBOARD
--------------------------------------------------

Calendar:
- Use Outlook events
- Map to weekly UI
- Combine with mock ActionItems

Kanban:
- Still mock phases
- Enrich with:
  - Organizer
  - Attendees
  - Profile photos

People Hub:
- Enrich with Office 365 Users
- External contacts remain partially mocked

Action Items:
- Keep local/mock
- Sorting still works

--------------------------------------------------
MEETING OVERLAY
--------------------------------------------------

Header:
- Real meeting subject
- Time
- Attendees
- Photos (internal only)

Summary:
- Still mocked but contextual

Tasks & AI:
- Mock but tied to meeting

Mail Hub:
- Use Outlook emails if possible
- Otherwise simulate:
  - Subject filtering
  - Domain matching

Social Insights:
- Filter participants
- Internal = real data
- External = mock

--------------------------------------------------
EXECUTIVE DASHBOARD
--------------------------------------------------

Greeting:
- From Office 365 Users

Today's Briefings:
- From Outlook calendar

Highlights:
- Still mock

Podcast:
- UI only

--------------------------------------------------
TECHNICAL NOTES
--------------------------------------------------

- Clearly separate:
  - Connector data
  - Mock fallback data
- Map Outlook → app models
- Keep logic simple

--------------------------------------------------
DELIVERABLE
--------------------------------------------------

Provide:
1. Updated architecture
2. Connector setup
3. Data mapping formulas
4. Fallback logic
5. Integration guidance
6. Limitations without Dataverse