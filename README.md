# Zomato Dining Reservation System Backend

This is a backend API for a dining reservation system, providing functionality for user authentication, dining place management, and reservations.

Clone the repository: git clone https://github.com/soumilaggarwal2003/Dining-Reservation-System.git

# Installation:

npm install

Create a .env file in the root directory and add your environment variables (see below).

Create a .env file in the root directory and add the following variables:

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=your_database_password

DB_NAME=zomato_reservation_system

JWT_SECRET=your_jwt_secret_key

PORT=3000


# API Endpoints

# Authentication

Signup

Endpoint: /api/auth/signup

Method: POST

Request Body:

json

{

  "username": "exampleuser",
  
  "password": "examplepassword",
  
  "email": "user@example.com"

}

Response:

json

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

{

  "username": "exampleuser",
  
  "password": "examplepassword"

}

Response:

json

{

  "status": "Login successful",
  
  "status_code": 200,
  
  "user_id": 1,
  
  "access_token": "your_jwt_token"

}

# Dining Places

Create Dining Place

Endpoint: /api/dining/create

Method: POST

Headers:


Authorization: Bearer <your_jwt_token>

Request Body:

json

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

{

  "place_id": 1,
  
  "start_time": "2024-08-07T12:00:00",
  
  "end_time": "2024-08-07T13:00:00"
}

Response:

json

{

  "status": "Slot booked successfully",
  
  "status_code": 200,
  
  "booking_id": 1

}

# Database Schema

The database schema includes the following tables:

users: Stores user details including their role (admin/user).

dining_places: Stores information about dining places.

booked_slots: Stores reservations with references to users and dining_places.

# Start the server using:
node app.js
Interact with the API using tools like Postman or cURL to test various endpoints.
