# Phonebook Application Backend

This repository contains the backend code for the Phonebook Application, built using Node.js and Express. The application provides RESTful services for managing users and contacts. It also includes JWT-based authentication for user management.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [User Module](#user-module)
  - [Contact Module](#contact-module)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/ronakjn2912/Phone-Book-Application-Backend.git
   ```

2. Navigate to the backend folder:
   ```sh
   cd Phone-Book-Application-Backend
   ```

3. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

1. Start the server:
   ```sh
   npm start
   ```

2. The server will run on `http://localhost:3000`.

## API Endpoints

### User Module

- **Register a new user**
  - `POST /api/users/register`
  - Request body:
    ```json
    {
      "username": "example",
      "password": "password123"
    }
    ```

- **Login a user**
  - `POST /api/users/login`
  - Request body:
    ```json
    {
      "username": "example",
      "password": "password123"
    }
    ```

### Contact Module

- **Get all contacts**
  - `GET /api/contacts`

- **Create a new contact**
  - `POST /api/contacts`
  - Request body:
    ```json
    {
      "name": "John Doe",
      "phone": "123-456-7890",
      "email": "john.doe@example.com"
    }
    ```

- **Update a contact**
  - `PUT /api/contacts/:id`
  - Request body:
    ```json
    {
      "name": "John Doe",
      "phone": "123-456-7890",
      "email": "john.doe@example.com"
    }
    ```

- **Delete a contact**
  - `DELETE /api/contacts/:id`

## Authentication

The application uses JWT (JSON Web Token) for authentication. After a successful login, a token is returned which must be included in the `Authorization` header of subsequent requests to protected endpoints.

Example:
```sh
Authorization: Bearer <your-jwt-token>
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
