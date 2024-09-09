# Online Voting Platform

A simple and secure online voting system built with **React.js**, **Tailwind CSS**, **Express**, and **MongoDB**. This platform allows registered voters to cast their votes for their preferred candidates. The admin can manage the election process, including CRUD operations on candidates and configuring the voting period.

## Features

- **User Features:**
  - Voter registration and login using vote ID, citizenship number, and email verification (OTP).
  - Secure voting process for registered users.
  - Real-time election status display.
  
- **Admin Features:**
  - Manage candidates (Create, Read, Update, Delete).
  - Set and manage election time periods.
  - Monitor voting results and analytics.

- **Security Features:**
  - OTP-based verification via email for added security.
  - Unique vote ID for each registered voter.
  - Role-based access control for voters and admins.

## Tech Stack

- **Frontend:**
  - React.js
  - Tailwind CSS
  - Chart.js (for visualizing voting results)
  
- **Backend:**
  - Express.js
  - MongoDB (for storing voter and candidate data)
  - NodeCron (for scheduling tasks, like checking voting periods)
  
- **Others:**
  - JWT (for authentication and authorization)
  - Nodemailer (for sending OTP emails)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anish-acharya123/Pre-Election-Analysis
   cd online-voting-platform

2. Install dependencies:
   ```bash
   npm install
   cd client
   npm install

3. Set up environment variables: Create a .env file in the root directory with the following:
   ```bash
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>

   #nodemailer
   EMAIL_USER=<your-email>
   EMAIL_PASS=<your-email-password>
   VITE_APP_SECRET_KEY=<your-secret-key-for-AES-encryption>
   
   #  cloudinary
   CLOUDINARY_CLOUD_NAME=<your-cloundinary-name>
   CLOUDINARY_API_KEY=<your-cloundinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloundinary-secret-key>

