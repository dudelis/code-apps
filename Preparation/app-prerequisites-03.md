PROMPT 3 — Introduce Dataverse + data model + dummy data

Now convert the app into a structured solution using Dataverse.

Goal:
Make Dataverse the primary business data layer.

--------------------------------------------------
CORE CAPABILITIES
--------------------------------------------------

Support:
- Briefings
- Pipeline phases
- Action items
- Contacts
- Participants
- Emails
- Insights
- Highlights
- Audio briefings

--------------------------------------------------
DATAVERSE TABLES
--------------------------------------------------

1. Briefings
- Name
- Company
- Industry
- Start/End
- Phase
- Owner (CO / Executive)
- Summary
- Readiness Score
- Audio flag / URL
- OutlookEventId

2. Briefing Phases
- Name
- Order
- Color

3. Action Items
- Title
- Briefing lookup
- Due Date
- Priority
- Completed
- Assigned To

4. Contacts
- Name
- Company
- Role
- Email
- Photo
- Technical stance
- Interests
- Smalltalk topics

5. Briefing Participants
- Briefing lookup
- Contact lookup
- Role
- External flag

6. Mail Artifacts
- Subject
- Briefing lookup
- Contact lookup
- Preview
- Draft
- OutlookId

7. Social Insights
- Briefing lookup
- Contact lookup
- Insight text
- Priority

8. Weekly Highlights
- Title
- Description
- Related briefing
- Priority
- Week

9. Audio Briefings
- Briefing lookup
- Title
- Duration
- URL
- Transcript

--------------------------------------------------
INTERNAL USERS
--------------------------------------------------

- Use Office 365 Users for internal people
- Do NOT duplicate users in Dataverse
- Use IDs or email references where needed

--------------------------------------------------
DUMMY DATA
--------------------------------------------------

Create rich demo data:
- Companies: BMW, SAP, BASF, Siemens, Deutsche Bank
- Multiple briefings across phases
- Action items with priorities
- Contacts with interests
- Emails + insights
- Highlights
- Audio records

--------------------------------------------------
APP INTEGRATION
--------------------------------------------------

Customer Officer Dashboard:
- Calendar → Briefings
- Kanban → Briefings + Phases
- People Hub → Contacts
- Action Items → ActionItems table

Meeting Overlay:
- Summary → Briefings
- Tasks → ActionItems
- Mail → MailArtifacts
- Insights → SocialInsights
- Phase bar → Phases

Executive Dashboard:
- Today → Briefings
- Highlights → WeeklyHighlights
- Podcast → AudioBriefings

--------------------------------------------------
CONNECTOR INTERPLAY
--------------------------------------------------

- Office 365 Users → photos
- Outlook → optional event sync
- Dataverse = primary system of record

--------------------------------------------------
DELIVERABLE
--------------------------------------------------

Provide:
1. Dataverse schema
2. Relationships
3. Choice vs lookup decisions
4. Dummy data examples
5. App refactoring steps
6. Connector vs Dataverse guidance
7. Implementation order