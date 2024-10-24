# Backend Boilerplate

A secure authentication API built with **Express**, **TypeScript**, **Passport**, **JWT**, and **MongoDB**. This API handles user registration, login, and authentication using JWT tokens. The project also includes a Google OAuth integration and local authentication for admins.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)

## Features

- **User Authentication**: Register and login with JWT-based authentication.
- **Google OAuth**: Integrate with Google for user authentication.
- **Secure Password Storage**: User passwords are hashed before being stored.
- **Logging**: Winston for centralized logging.
- **MongoDB Integration**: Store user data securely in MongoDB.

## Tech Stack

- **Backend**: Express (TypeScript)
- **Database**: MongoDB
- **Authentication**: Passport, JWT
- **Logging**: Winston
- **Environment Configuration**: dotenv

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SecretariatV/Backend.git
   cd Backend
   ```

2. Install dependencies:

   ```bash
   yarn
   ```

3. Set up environment variables (see [Environment Variables](#environment-variables)).

4. Run the development server:

   ```bash
   yarn dev
   ```

5. Run the testing server:

   ```bash
   yarn test
   ```

## Environment Variables

To run this project, you will need to add the following environment variables to a `.env` file:

```plaintext
PORT=4000
MONGO_URI=mongodb://localhost:27017/authDB
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback
```

## Usage

1. **Register**: Users can sign up via the `/register` endpoint.
2. **Login**: Users can log in via `/login` and receive a JWT token for protected routes.
3. **Google Authentication**: Use Google OAuth to log in via `/auth/google`.

## API Endpoints

### Authentication

- **POST** `/register`: Register a new user.
- **POST** `/login`: Login user and return JWT.
- **GET** `/auth/google`: Initiates Google OAuth login.
- **GET** `/auth/google/callback`: Google OAuth callback.

## Error Handling

This API uses a custom error-handling middleware to manage all errors. Errors are returned in the following structure:

```json
{
  "status": "error",
  "message": "Error message"
}
```

## Folder Structure

```plaintext
Backend/
│
├── src/
│   ├── __tests__/       # Unit test logic
│   ├── config/          # Business logic
│   ├── controllers/     # Route handler logic
│   ├── middlewares/     # Custom and error-handling middleware
│   ├── models/          # Mongoose models for users
│   ├── routes/          # Route definitions
│   ├── types/           # Store the types
│   ├── utils/           # Utility functions and helpers
│   └── app.ts           # Express app configuration
│
├── .env                 # Environment variables
├── .gitignore           # Git ignore file
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md            # This README file
```

## Contributing

Contributions are always welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch with your feature or bugfix.
3. Commit your changes and push them.
4. Create a Pull Request.
