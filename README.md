# Tele-Expertise Platform

This project aims to develop a tele-expertise website to enable doctors to collaborate by sharing patient analysis results and obtaining second opinions from peers. By enhancing medical collaboration, the platform improves the accuracy of diagnoses and ultimately provides better patient care.

## Features

- **Doctor Registration:** Medical centers are responsible for registering doctors. Once registered, doctors can access the platform and create detailed profiles including their specialty, years of experience, and country of practice.
  
- **Doctor Search:** Doctors can search for specialists in their field or receive recommendations based on their specialty, experience, and location.

- **Chat System:** Doctors can initiate real-time discussions about patient analysis results with other doctors, exchanging medical insights and providing second opinions.

- **Patient Analysis Uploads:** Doctors can upload patient analysis results (such as reports, scans, or test results) to facilitate discussion.

- **Second Opinion Requests:** Doctors can request second opinions on complex cases to enhance their diagnosis and treatment decisions.

- **Medical Center Management:** Only doctors registered by accredited medical centers can practice and use the platform.

## Technology Stack

- **Frontend:** Next.js (React-based framework for server-side rendering)
- **Backend:** NestJS (Node.js framework for building scalable backend applications)
- **Database:** PostgreSQL (Relational database for storing doctor profiles, chat logs, and other data)
- **Real-Time Communication:** WebSocket (For real-time chat functionality)

## Getting Started

### Prerequisites

To run this project locally, make sure you have the following installed:

- Node.js (v16 or higher)
- PostgreSQL
- Docker (optional, for local database setup)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/Gay-Grigoryan/tele-expertise-back
cd tele-expertise-back
```
#### 2. Install dependencies

```bash
npm install
```

#### 3. Set up the database

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=tele_expertise
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password

#### 4. Run the application locally

```bash
npm start
```
<p>The application will be live on <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> by default.</p>

#### 5. Automatic Deployment (via GitHub Push)

<p>This project is automatically built and deployed to production <strong>whenever changes are pushed to GitHub</strong>. Here’s how it works:</p>

<ol>
  <li><strong>GitHub Push</strong>: Once you push your code changes to the repository (usually to the <code>main</code> branch), the application will trigger the build and deployment automatically.</li>
  <li><strong>Build and Deploy</strong>: The build process generates a production-ready version of the app, and the deployment is automatically handled by your hosting platform (e.g., <strong>Railway</strong>, <strong>Vercel</strong>, etc.).</li>
  <li><strong>No Manual Steps</strong>: There is no need for manual intervention in the deployment process. Once the code is pushed to GitHub, the deployment will occur automatically.</li>
</ol>
