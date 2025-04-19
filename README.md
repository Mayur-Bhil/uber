# User Registration API

## Endpoint
**POST** `/users/register`

## Description
This endpoint allows a new user to register by providing their personal information. Upon successful registration, a JSON Web Token (JWT) is generated and returned along with the user details.

## Request Body
The request body must be in JSON format and include the following fields:

- `fullname`: An object containing:
  - `firstname`: A string representing the user's first name (minimum length: 3 characters, required).
  - `lastname`: A string representing the user's last name (minimum length: 3 characters, optional).
- `email`: A string representing the user's email address (must be a valid email format, required).
- `password`: A string representing the user's password (minimum length: 6 characters, required).

### Example Request
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}

## Responses

### Success
- **Status Code**: 201 Created
- **Response Body**:
{
  "token": "JWT_TOKEN",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}

### Error
- **Status Code**: 400 Bad Request
- **Response Body**:
{
  "errors": [
    {
      "msg": "First Name Must  bbe at least 3characetrs long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}

## Status Codes
- **201**: User successfully registered.
- **400**: Validation errors occurred.

# User Registration, Login, and Profile API

## Endpoints

### **POST** `/users/register`

... (existing documentation for `/users/register`)

---

### **POST** `/users/login`

... (existing documentation for `/users/login`)

---

### **GET** `/users/profile`

#### Description
This endpoint allows an authenticated user to retrieve their profile information. The user's password is excluded from the response.

#### Authentication
This endpoint requires the user to be authenticated. A valid JWT token must be provided in the `Authorization` header or as a cookie.

#### Headers
- `Authorization`: Bearer `<JWT_TOKEN>` (if not using cookies).

#### Responses

##### Success
- **Status Code**: 200 OK
- **Response Body**:
```json
{
  "_id": "USER_ID",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}