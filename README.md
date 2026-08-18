# TastyMatch

TastyMatch is a full-stack restaurant discovery platform that helps users find restaurants according to cuisine, location, vibe, price range, ratings, and personal preferences.

The application allows users to browse restaurants, search and filter results, view restaurant details, write reviews, save favorite restaurants, update their profile preferences, sign in with Google, and receive personalized recommendations.

## Project Purpose

Many users want to discover restaurants that match their taste, budget, location, and occasion. TastyMatch solves this by combining restaurant data, user preferences, ratings, saved restaurants, and recommendation logic in one responsive web application.

## Live Demo

Live URL: (https://tastymatch-kohl.vercel.app)

## Repository Structure

This project is structured as a **Monorepo** containing both the `client` (Frontend) and `server` (Backend) in a single repository.

## Team Members & Roles

- Lior Azulay
  Responsible for frontend development, backend development, MongoDB schema design, REST API implementation, authentication, UI/UX, deployment, and documentation.

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Redux Toolkit
- React Redux
- Context API
- Axios
- Tailwind CSS
- Lucide React
- Google OAuth

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt
- Joi validation
- Helmet
- Express Rate Limit
- Multer
- Google Auth Library
- CORS
- dotenv

## Project Architecture

The project is divided into two main applications:

```txt
client/
  src/
    components/
    pages/
    context/
    hooks/
    services/
    store/

server/
  controllers/
  models/
  routes/
  middleware/
  validation/
  uploads/
```

### Backend Architecture

The backend follows an MVC structure:

- models define the MongoDB/Mongoose schemas.
- controllers contain the business logic.
- routes define the API endpoints.
- middleware handles authentication, validation, rate limiting, errors, logging, and file uploads.
- validation contains Joi schemas for request validation.

This separation keeps the route files clean and avoids placing business logic directly inside the routes.

### Frontend Architecture

The frontend uses reusable components, route-based pages, Context API for authentication, Redux Toolkit for shared restaurant and review state, and Axios for API communication.

Main frontend areas:

- AuthContext manages logged-in user state and token handling.
- Redux slices manage restaurant and review data.
- api.ts centralizes Axios configuration and attaches JWT tokens to protected requests.
- Lazy loading is used for route pages.
- Protected routes prevent unauthenticated access to private pages.

## MongoDB Data Architecture

The database contains three main collections:

### Users Collection

The User schema stores user account details and preferences.

Main fields:

- username: user display name
- email: unique user email
- password: encrypted password using bcrypt
- favoriteCuisines: array of preferred cuisines
- favoriteVibes: array of preferred restaurant vibes
- favoriteCities: array of preferred cities
- priceRangePreference: preferred price ranges
- savedRestaurants: array of ObjectId references to restaurants

Relationship:

- User.savedRestaurants -> Restaurant

### Restaurants Collection

The Restaurant schema stores restaurant information.

Main fields:

- name
- description
- image
- cuisine
- city
- priceRange
- rating
- reviewCount
- vibes
- tags

### Reviews Collection

The Review schema stores user reviews for restaurants.

Main fields:

- user: ObjectId reference to User
- restaurant: ObjectId reference to Restaurant
- rating
- comment

Relationships:

- Review.user -> User
- Review.restaurant -> Restaurant

This creates meaningful relations between multiple MongoDB collections, including references between users, restaurants, and reviews.

## Main Features

- User registration and login
- Google Login
- JWT authentication
- Protected routes
- User profile page
- Edit profile details
- Edit user preferences
- Change password
- Browse restaurants
- Search restaurants
- Filter by cuisine, city, vibe, and price range
- View restaurant details
- Add restaurant reviews
- View reviews per restaurant
- Save and remove favorite restaurants
- Personalized restaurant recommendations
- Upload restaurant images with Multer
- Replace restaurant image
- Loading and error states
- Responsive design
- 404 Not Found page

## Authentication and Security

The application includes several authentication and security mechanisms:

- Passwords are hashed with bcrypt before being saved.
- JWT tokens are issued after login, register, and Google login.
- Protected backend routes use middleware to verify JWT tokens.
- Protected frontend pages use PrivateRoute.
- Helmet is used to improve HTTP security headers.
- Rate limiting is used on API routes.
- Stricter rate limiting is used for login and register routes.
- Sensitive configuration values are stored in environment variables.
- Real .env files are not committed to GitHub.

## Environment Variables

### Server .env

Create a `.env` file inside the `server` folder:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your_google_client_id
```

### Client .env

Create a `.env` file inside the `client` folder:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## Installation and Running Locally

### Backend

```bash
cd server
npm install
npm start
```

The backend runs on:
`http://localhost:5000`

### Frontend

```bash
cd client
npm install
npm run dev
```

The frontend runs on:
`http://localhost:5173`

## Setup Notes

Before running the project locally, create the required `.env` files in both the `client` and `server` folders according to the environment variables listed above.

The frontend communicates with the backend through Axios using `VITE_API_URL`.

Protected API requests require a JWT token in the request header:

```txt
Authorization: Bearer <token>

## API Overview

### Auth Routes

- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/google`
- GET  `/api/auth/me`

### User Routes

- POST   `/api/users`
- GET    `/api/users`
- GET    `/api/users/profile`
- GET    `/api/users/:id`
- PUT    `/api/users/profile`
- PUT    `/api/users/change-password`
- PUT    `/api/users/save-restaurant/:restaurantId`
- DELETE `/api/users/save-restaurant/:restaurantId`
- PUT    `/api/users/:id`
- DELETE `/api/users/:id`

### Restaurant Routes

- POST   `/api/restaurants`
- GET    `/api/restaurants`
- GET    `/api/restaurants/:id`
- PUT    `/api/restaurants/:id`
- DELETE `/api/restaurants/:id`

### Review Routes

- POST   `/api/reviews`
- GET    `/api/reviews`
- GET    `/api/reviews/restaurant/:restaurantId`
- GET    `/api/reviews/my-reviews`
- PUT    `/api/reviews/:id`
- DELETE `/api/reviews/:id`

```md
## API Endpoints Table

### Auth API

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user and return JWT | No |
| POST | `/api/auth/login` | Login existing user and return JWT | No |
| POST | `/api/auth/google` | Login or register with Google OAuth | No |
| GET | `/api/auth/me` | Get the current logged-in user | Yes |

### Users API

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| POST | `/api/users` | Create a new user | No |
| GET | `/api/users` | Get all users | Yes |
| GET | `/api/users/profile` | Get logged-in user profile | Yes |
| PUT | `/api/users/profile` | Update logged-in user profile and preferences | Yes |
| PUT | `/api/users/change-password` | Change logged-in user password | Yes |
| PUT | `/api/users/save-restaurant/:restaurantId` | Save restaurant to favorites | Yes |
| DELETE | `/api/users/save-restaurant/:restaurantId` | Remove restaurant from favorites | Yes |
| GET | `/api/users/:id` | Get user by ID | Yes |
| PUT | `/api/users/:id` | Update user by ID | Yes |
| DELETE | `/api/users/:id` | Delete user by ID | Yes |

### Restaurants API

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| POST | `/api/restaurants` | Create a new restaurant with optional image upload | Yes |
| GET | `/api/restaurants` | Get all restaurants | No |
| GET | `/api/restaurants/:id` | Get restaurant by ID | No |
| PUT | `/api/restaurants/:id` | Update restaurant details or replace image | Yes |
| DELETE | `/api/restaurants/:id` | Delete restaurant | Yes |

### Reviews API

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| POST | `/api/reviews` | Create a review for a restaurant | Yes |
| GET | `/api/reviews` | Get all reviews | No |
| GET | `/api/reviews/restaurant/:restaurantId` | Get reviews for a specific restaurant | No |
| GET | `/api/reviews/my-reviews` | Get reviews written by the logged-in user | Yes |
| PUT | `/api/reviews/:id` | Update a review | Yes |
| DELETE | `/api/reviews/:id` | Delete a review | Yes |

## UI/UX

The application includes a consistent visual design system, responsive layouts for mobile and desktop, loading states, error states, empty states, and a dedicated 404 page.

Main UI pages:

- Home
- Explore
- Restaurant Details
- Login
- Register
- Profile
- Add Review
- Not Found

## Deployment Notes

Before deployment:

- Make sure the client and server environment variables are configured on the hosting platforms.
- Make sure the backend allows the deployed frontend URL in CORS.
- Make sure image upload and static file serving work in the deployed backend.
- Run a production build for the client.


```bash
cd client
npm run build
```