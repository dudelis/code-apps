Here is the detailed description of the entire **Executive Briefing Manager** app in its current state, structured according to your requirements:
 
### 1. Global Navigation & Design Language

*   **Design:** The app utilizes a modern, dark color scheme inspired by the "SAP Horizon" theme. It heavily features *Glassmorphism* (semi-transparent, blurred backgrounds), soft drop shadows, vibrant gradients, and rounded corners to achieve a highly premium feel.

*   **Global Shell Bar (fixed at the very top):**

    *   Left side: App icon (📋) and the title "Executive Briefing Manager".

    *   Center/Right: An interactive "Role Switcher" toggle that allows users to seamlessly switch between the **Customer Officer** and **Executive** views.
 
---
 
### 2. View: Customer Officer (CO) Dashboard

This is the highly functional main view for the organizer/coordinator. Layout: Split-Screen (`70% left / 30% right`).
 
**Left Main Area (70%):**

Controlled by a **Segmented Navigation** (three buttons on the top left), users can toggle between three primary views:

1.  📅 **Briefing Calendar:** An interactive UI5 weekly calendar. It displays all scheduled meetings (as colored blocks) and Action Items (as distinct grey tasks with a clipboard icon), placed exactly on their respective target dates.

2.  📋 **Kanban Board:** A visual 6-column pipeline (Inbox, Approved, Scheduled, In Progress, Ready, Done). All meetings are represented as small cards (showing company name, status, and an avatar) inside their current organizational phase.

3.  👥 **People Hub:** A graphical grid view that lists *all* external B2B contacts known within the system as profile cards. Each card displays a photo, role, technical stance (e.g., "SAP Promoter"), professional/personal interests, and a "Smalltalk Topics" button that opens an intelligent popover with icebreakers.
 
**Right Sidebar (30% - "My Action Items"):**

*   A dedicated to-do list for all open tasks (e.g., "Review BMW Budget").

*   Features a **Sort Dropdown** in the top right corner, allowing users to instantly sort the list either chronologically by Date (default) or by Priority.

*   Each item includes a checkbox, a priority badge (High/Medium/Low, color-coded), and the due date.

*   Clicking on an Action Item in this list instantly opens the full-screen detail overlay of the respective meeting it belongs to.
 
---
 
### 3. View: Full-Screen Meeting Detail (Overlay)

Clicking on an appointment in the calendar, a Kanban card, or an Action Item opens this large focus-mode overlay across the entire screen.
 
*   **Header (Top):** Features an eye-catching gradient background, the meeting title (e.g., "BMW Strategy Sync"), an industry tag, and the time. It also shows small, rounded avatars of all internal and external participants. Clicking an external avatar directly opens a mini-popup with a smalltalk hint.

*   **Center Area (Tab Navigation):**

    1.  `Summary`: An AI-generated abstract summarizing the briefing for the management level, including a "Copy" button with a success animation.

    2.  `Tasks & AI`: Detailed sub-tasks specific to this meeting, plus AI tools (e.g., "Generate Follow-up Draft").

    3.  `Mail Hub`: **Contextually Filtered:** Shows email drafts exclusively addressed to the partner company of this specific meeting (e.g., BMW), hiding drafts for other clients.

    4.  `Social Insights`: **Contextually Filtered:** Shows profile cards derived from the People Hub, but strictly limited to the external participants who are *actually invited* to this specific meeting (e.g., only Dr. Thomas Zeller).

*   **Footer (Fixed at the bottom):** A horizontal Phase Bar (Kanban progress tracker) that visually indicates the current organizational step (out of 6) this meeting is in. A "Back" button on the top left closes the overlay.
 
---
 
### 4. View: Executive Dashboard

Activated via the Role Switcher at the very top, this view is tailored for C-Level management (e.g., board members), focusing entirely on pure preparation right before an event.
 
*   Design: More spacious (mobile-first approach), fewer operational buttons, highly visual.

*   **Top:** A personalized greeting ("Welcome, Christian") alongside personal performance metrics.

*   **Today's Briefings:** A horizontally scrollable list of massive appointment cards for the current day, pre-populated with the essential "Briefing Status".

*   **Upcoming Highlights:** The app extracts the 3 most crucial KPIs or escalations from the week's summaries and lists them directly for the executive to absorb at a glance, without needing to click into individual meetings.

*   **The Podcast Feature:** At the bottom, there is an audio player designed to provide the executive with an AI-generated "Audio Briefing" that they can listen to via headphones on their way to the meeting.
 