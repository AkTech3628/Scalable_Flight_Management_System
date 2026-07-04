# Scalable_Flight_Management_System
Flight Management System a backend service for managing flight information with secure authentication, real-time flight synchronization, and Redis caching.
The application fetches live flight data from the AviationStack API, stores it in MongoDB, and exposes REST APIs for searching and managing flights. Frequently requested flight data is cached in Redis to reduce database reads and improve response time, while cache invalidation keeps the data consistent after updates.

## Features
JWT-based authentication
Role-based authorization (Admin/User)
Flight CRUD operations
Real-time flight synchronization from AviationStack API
MongoDB data persistence with Mongoose
Redis caching for read-heavy endpoints
Automatic cache invalidation after data changes
Dockerized Redis setup
MVC architecture
Centralized error handling
Environment-based configuration using .env

## Tech Stack
Node.js,
Express.js,
MongoDB,
Mongoose,
Redis,
Docker,
JWT,
bcrypt,
AviationStack API

## Project Structure
<img width="237" height="381" alt="image" src="https://github.com/user-attachments/assets/eb00f829-9eae-4647-810a-8e7a85026ce6" />


## Future Imporvements

- Pagination and filtering for flight listings
- Rate limiting using Redis
- Basic Apache Kafka integration for asynchronous event processing (Producer/Consumer)

## Caching Strategy
TheGET /api/flights endpoint uses Redis to cache frequently requested flight data. On the first request, data is fetched from MongoDB and stored in Redis. Subsequent requests are served directly from the cache. Whenever a flight is created or updated, the cache is cleared to ensure fresh data is returned on the next request.• Implemented Redis caching for flight listing APIs, reducing repeated MongoDB queries and improving response time for cached requests.

## Environment Variables

Create a `.env` file in the project root using `.env.example` as a reference.

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
AVIATION_API_KEY=your_aviationstack_api_key
REDIS_HOST=localhost
REDIS_PORT=6379

