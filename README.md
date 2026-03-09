# Gilgit-Baltistan Job Platform

A full-stack web application for job posting in Gilgit-Baltistan, built with Next.js, MongoDB, and Tailwind CSS.

## Features

- **User Authentication**: Secure login and registration with JWT.
- **Job Management**: Admin can post, edit, and delete jobs. Users can view and apply.
- **Applications**: Users can apply to jobs with their details.
- **Messaging**: Users can send messages to admin.
- **Responsive Design**: Works on desktop and mobile.

## Tech Stack

- **Frontend**: Next.js with React and Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Email**: Nodemailer for notifications

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd job-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/jobplatform
   JWT_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-password
   ```

4. Start MongoDB:
   If using local MongoDB, ensure it's running on port 27017.

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Creating Admin User

To create an admin user, register a user and manually set the role to 'admin' in the database.

Or, modify the register API to allow admin creation.

## Usage

- **Home**: Welcome page
- **Jobs**: Browse available jobs with filters
- **Login/Register**: User authentication
- **Apply**: Submit job applications
- **Contact**: Send messages to admin
- **Admin Dashboard**: Manage jobs, view applications and messages (admin only)

## Deployment

### Local Deployment

Follow the setup instructions above.

### Hosting on Vercel

1. Push code to GitHub.
2. Connect to Vercel.
3. Set environment variables in Vercel dashboard.
4. Deploy.

For MongoDB, use MongoDB Atlas and update MONGODB_URI.

## Database Schema

- **User**: name, email, password (hashed), role
- **Job**: title, description, category, location, salary, contact, createdBy
- **Application**: job, applicantName, applicantContact, resume, message, appliedAt
- **Message**: from, to, subject, content, isRead, createdAt

## API Endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/jobs` - Get jobs (with filters)
- `POST /api/jobs` - Create job (admin)
- `GET /api/jobs/[id]` - Get job details
- `PUT /api/jobs/[id]` - Update job (admin)
- `DELETE /api/jobs/[id]` - Delete job (admin)
- `POST /api/applications` - Submit application
- `GET /api/applications` - Get applications (admin)
- `POST /api/messages` - Send message
- `GET /api/messages` - Get messages (admin)

## Security

- Passwords are hashed with bcrypt.
- JWT tokens for authentication.
- Role-based access control.

## Contributing

1. Fork the repo.
2. Create a branch.
3. Make changes.
4. Submit PR.

## License

MIT
