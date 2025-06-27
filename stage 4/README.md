✅ MVP Development and Execution – Repaire des 2 Vallées
🚀 Sprint Planning & Execution
📅 Week 1 – Project Foundation
Back-end (Cyprien):

 Set up MongoDB database

 Created collections: event, admin, user, agenda, article

 Basic CRUD functions for DB interaction

 Token generation for admin login

 Password hashing function for admin creation

Front-end (Bryan):

 Created website mockup and first prototype

 Built initial structure and all main pages

📅 Week 2 – API Development & Front-End Integration
Back-end (Cyprien):

 Built all API routes using Express.js

 Defined and documented all endpoints

 Created controllers for GET, POST, PUT, DELETE

 Added middleware for token verification

 Implemented security checks for PUT and DELETE

Front-end (Bryan):

 Integrated fetch requests with the back-end API

 Developed admin interface to manage content

 Created dynamic forms for article, event, and agenda creation/modification

 Implemented delete functionality in admin interface

Integration:

 Established full communication between front-end and back-end

📅 Week 3 – Advanced Features & Media Upload
Back-end (Cyprien):

 Added multer for handling image uploads

 Adjusted routes and controllers to handle FormData

 Fixed bugs in routing and middleware

Front-end (Bryan):

 Added filter for agenda by day

 Integrated image upload in forms

 Switched data format from JSON to FormData where needed

📅 Week 4 – Finalization & Client Revisions
Back-end (Cyprien):

 Finalized all endpoints

 Tested all routes using Postman and Insomnia

 Refined data structures based on client feedback

 Final adjustments to article model

Front-end (Bryan):

 Improved admin forms UX

 Simplified admin request process

 Added contact page and association details

 Updated user pages to reflect changes

⚙️ Dev Workflow & QA
All working endpoints were pushed to a test branch before main integration.

Manual testing was done using Postman and Insomnia.

Short daily meetings (10–15 minutes) via Discord to sync progress and resolve blockers.

Client meetings helped validate work and adjust scope, including:

Dropping user account functionality in favor of downloadable PDFs for admin.

🔍 Sprint Review & Retrospective
✅ What Worked Well:
Admin content management system (articles, events, agenda)

User-friendly display interface

Secure admin login and token management

⚠️ Challenges:
Synchronizing front-end and back-end changes

Managing data formats and form submissions

Late-stage changes to client requirements

🔄 Improvements for Future Sprints:
Enhance security for admin access and data integrity

Build a mobile-responsive version of the website

Develop a native or hybrid mobile app for Repaire des 2 Vallées

✅ Final Integration & QA Testing
Comprehensive testing completed

Adjustments based on real-world usage and client feedback

MVP finalized and ready for presentation or deployment