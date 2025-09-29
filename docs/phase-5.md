# Phase 5: Admin Page

This document tracks the progress of the admin dashboard feature.

## Phase Goals

- [X] Create a hidden admin page accessible only via a direct URL.
- [X] Implement simple token-based authentication.
- [X] Allow adding, updating, and deleting portfolio projects.

## Current Progress

- **Completed:**
  - Created an admin dashboard at `/admin/dashboard`.
  - Implemented token-based authentication using a secret token stored in `.env.local`.
  - Created a login page at `/admin/login` to accept the token.
  - Used Next.js middleware to protect the dashboard route and redirect unauthenticated users.
  - Built a full set of CRUD (Create, Read, Update, Delete) API endpoints for managing projects.
  - Created a `ProjectForm` component for adding and editing project data.
  - The dashboard UI now lists all projects and includes controls for editing and deleting them, with a confirmation dialog for deletions.
- **Pending:**
  - None. This phase is complete.

## Implementation Details

- **Authentication:** Access is controlled by a secret `ADMIN_TOKEN` in `.env.local`. A successful login sets a secure, `httpOnly` cookie.
- **Middleware:** `src/middleware.ts` intercepts requests to `/admin/dashboard` and `/admin/login`, redirecting users based on the presence of a valid `auth_token` cookie.
- **API:** CRUD operations are handled by API routes. `POST` and `GET` are in `src/app/api/projects/route.ts`, while `PUT` and `DELETE` are in the dynamic route `src/app/api/projects/[id]/route.ts`. These routes read from and write to the `projects.json` file.
- **UI:** The dashboard is a client component that fetches project data and manages the state for the form and delete confirmations. It uses `sonner` for toast notifications to provide user feedback.
- **Error Handling:** The `shadcn/ui` `toast` component failed to install due to a registry issue. This was worked around by using the `sonner` component instead, which serves the same purpose.

## Next Steps

- Proceed to Phase 6: Final Touches & Deployment.