Zomato Dining Reservation System Backend
This is a backend API for a dining reservation system, providing functionality for user authentication, dining place management, and reservations.

Table of Contents
Installation
Environment Variables
API Endpoints
Authentication
Signup
Login
Dining Places
Create Dining Place
Search Dining Places
Get Dining Place Availability
Book Dining Place
Database Schema
Usage
Contributing
License
Installation
Clone the repository:

bash
Copy code
git clone <repository_url>
cd <repository_directory>
Install dependencies:

bash
Copy code
npm install
Create a .env file in the root directory and add your environment variables (see below).

Run the application:

bash
Copy code
npm start
Environment Variables
Create a .env file in the root directory and add the following variables:

makefile
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_database_password
DB_NAME=zomato_reservation_system
JWT_SECRET=your_jwt_secret_key
PORT=3000
API Endpoints
Authentication
Signup
Endpoint: /api/auth/signup
Method: POST
Request Body:
json
Copy code
{
  "username": "exampleuser",
  "password": "examplepassword",
  "email": "user@example.com"
}
Response:
json
Copy code
{
  "status": "Account successfully created",
  "status_code": 201,
  "user_id": 1
}
Login
Endpoint: /api/auth/login
Method: POST
Request Body:
json
Copy code
{
  "username": "exampleuser",
  "password": "examplepassword"
}
Response:
json
Copy code
{
  "status": "Login successful",
  "status_code": 200,
  "user_id": 1,
  "access_token": "your_jwt_token"
}
Dining Places
Create Dining Place
Endpoint: /api/dining/create
Method: POST
Headers:
Authorization: Bearer <your_jwt_token>
Request Body:
json
Copy code
{
  "name": "The Great Restaurant",
  "address": "123 Food Street",
  "phone_no": "123-456-7890",
  "website": "http://greatrestaurant.com",
  "open_time": "10:00:00",
  "close_time": "22:00:00"
}
Response:
json
Copy code
{
  "message": "Dining place added successfully",
  "place_id": 1,
  "status_code": 201
}
Search Dining Places
Endpoint: /api/dining/search
Method: GET
Query Parameter:
name - The name or part of the name to search for.
Response:
json
Copy code
{
  "results": [
    {
      "id": 1,
      "name": "The Great Restaurant",
      "address": "123 Food Street",
      "phone_no": "123-456-7890",
      "website": "http://greatrestaurant.com",
      "open_time": "10:00:00",
      "close_time": "22:00:00",
      "created_at": "2024-08-06T00:00:00.000Z",
      "updated_at": "2024-08-06T00:00:00.000Z"
    }
  ]
}
Get Dining Place Availability
Endpoint: /api/dining/availability
Method: GET
Query Parameters:
place_id - The ID of the dining place.
start_time - The start time for checking availability (ISO 8601 format).
end_time - The end time for checking availability (ISO 8601 format).
Response:
json
Copy code
{
  "place_id": 1,
  "name": "The Great Restaurant",
  "phone_no": "123-456-7890",
  "available": true,
  "next_available_slot": null
}
Book Dining Place
Endpoint: /api/dining/book
Method: POST
Headers:
Authorization: Bearer <your_jwt_token>
Request Body:
json
Copy code
{
  "place_id": 1,
  "start_time": "2024-08-07T12:00:00",
  "end_time": "2024-08-07T13:00:00"
}
Response:
json
Copy code
{
  "status": "Slot booked successfully",
  "status_code": 200,
  "booking_id": 1
}
Database Schema
The database schema includes the following tables:

users: Stores user details including their role (admin/user).
dining_places: Stores information about dining places.
booked_slots: Stores reservations with references to users and dining_places.
Usage
Start the server using npm start.
Interact with the API using tools like Postman or cURL to test various endpoints.