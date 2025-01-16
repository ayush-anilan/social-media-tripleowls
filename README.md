# Social Media Submission System

A web-based system that allows users to submit their name, social media handle, and upload multiple images. The submissions are stored in a database and displayed on an admin dashboard with secure access.

## Features

### User Features
- **Submission Form**: Users can input their name, social media handle, and upload multiple images.
- **Cloudinary Integration**: Images are securely uploaded and stored in Cloudinary.

### Admin Features
- **Secure Login**: Admins must log in to access the dashboard.
- **Dashboard**: Displays all user submissions, including names, social media handles, and uploaded images.
  
## Admin Access

### Credentials
Use the following credentials to log in to the admin dashboard:
- **Username:** admin
- **Password:** admin123

## Tech Stack

### Frontend
- **React.js** (with Vite for faster development)
- **Tailwind CSS**
- **Axios** (for API requests)

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose for database operations)
- **Cloudinary** (for image storage)

## Installation

### Prerequisites
- Node.js installed
- MongoDB instance (local or cloud-based, e.g., MongoDB Atlas)
- Cloudinary account (for image uploads)

### Steps to Run Locally

#### 1. Clone the repository
```bash
git clone https://github.com/ayush-anilan/social-media-tripleowls.git
cd social-media-tripleowls
```

#### 2. Set up the Backend

Navigate to the `social-media-backend` directory:
```bash
cd social-media-backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file and add the following variables:
```env
PORT=5000
MONGO_URI=<your-mongodb-uri>
ADMIN_USERNAME=<your-admin-username>
ADMIN_PASSWORD=<your-admin-password>
CLOUDINARY_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
```

Start the backend server:
```bash
npm start
```

#### 3. Set up the Frontend

Navigate to the `social-media-frontend` directory:
```bash
cd ../social-media-frontend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file and add the following variables:
```env
VITE_BACKEND_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
```

#### 4. Access the Application
- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:5000`

### Demo URL
URL: [https://social-media-frontend-lemon.vercel.app/](https://social-media-frontend-lemon.vercel.app/)

## Deployment

### Backend
The backend can be deployed on Render or a similar service.

1. Push your backend code to a GitHub repository.
2. Connect the repository to Render.
3. Set environment variables in the Render dashboard.
4. Deploy the backend.

### Frontend
The frontend can be deployed on Vercel.

1. Push your frontend code to a GitHub repository.
2. Connect the repository to Vercel.
3. Set environment variables in the Vercel dashboard.
4. Deploy the frontend.

## API Endpoints

### User Submission
**POST** `/api/submit`
- **Description**: Allows users to submit their name, social media handle, and upload images.
- **Body**:
  ```json
  {
    "name": "string",
    "socialMediaHandle": "string",
    "images": "[files]"
  }
  ```

### Admin Login
**POST** `/api/admin/login`
- **Description**: Allows admin to log in and receive a JWT token.
- **Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

### Get Submissions
**GET** `/api/submissions`
- **Description**: Fetch all user submissions (requires admin token).
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```

## Folder Structure
```
social-media/
├── social-media-backend/
│   ├── .env              # Environment variables
│   ├── server.js         # Main server file
│   ├── config/
│   │   └── db.js         # Database connection
│   │   └── storage.js    # Cloudinary storage 
│   ├── models/
│   │   └── Submission.js # Mongoose schema for submissions
│   ├── routes/
│   │   └── submissions.js # API routes
│   │   └── auth.js        # Auth routes
│   └── uploads/          # Directory for temporary uploads
├── social-media-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UserForm.jsx
│   │   │   └── AdminDashboard.jsx
│   │   │   └── AdminLogin.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env              # Environment variables
│   ├── vite.config.js    # Vite configuration
│   └── index.html        # Entry point
```

## Acknowledgments
- [Cloudinary](https://cloudinary.com/) for image storage.
- [Render](https://render.com/) and [Vercel](https://vercel.com/) for hosting solutions.

## License
This project is licensed under the MIT License.

