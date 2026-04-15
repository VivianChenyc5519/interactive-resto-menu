# Backend API Documentation

## Base URL
- `http://localhost:3000`

## Common behavior
- Successful responses are returned as JSON.
- Errors are handled globally and return status codes with JSON body:
  - `400` Bad request
  - `401` Unauthorized
  - `404` Not found
  - `500` Internal server error
- Error body format:
  ```json
  { "error": "message" }
  ```
- Success body format varies by endpoint; many endpoints include a `status` field in the JSON response.

---

## Menu Endpoints

### 1. Get menu by category (French)
- Method: `GET`
- URL: `/menu/fr/category/:category`
- Example: `/menu/fr/category/main`
- Response:
  ```json
  {
    "status": 200,
    "menus": {
      "name": "...",
      "image": "...",
      "ingredients": [...],
      "allergens": [...],
      "footprint": ...,
      "category": "...",
      "price": ...,
      "vegetarian": ...
    }
  }
  ```
- Note: The route syntax is normal, but the backend currently uses `Array.find(...)` for category lookup, so it returns only the first matching dish rather than all category dishes.

### 2. Get menu by category (English)
- Method: `GET`
- URL: `/menu/en/category/:category`
- Example: `/menu/en/category/salad`
- Response:
  ```json
  {
    "status": 200,
    "menus": {
      ...
    }
  }
  ```
- Note: This also returns only the first matching category object because the backend uses `Array.find(...)`.

### 3. Get all French menu items
- Method: `GET`
- URL: `/menu/fr/all`
- Response:
  ```json
  {
    "status": 200,
    "menus": [
      { ... },
      { ... },
      ...
    ]
  }
  ```

### 4. Get all English menu items
- Method: `GET`
- URL: `/menu/en/all`
- Response:
  ```json
  {
    "status": 200,
    "menus": [
      { ... },
      { ... },
      ...
    ]
  }
  ```

### 5. Delete a French menu item
- Method: `DELETE`
- URL: `/menu/fr/delete`
- Request body:
  ```json
  {
    "name": "Dish Name"
  }
  ```
- Response:
  ```json
  {
    "status": 200
  }
  ```
- Error when the dish cannot be found: `404`.

### 6. Delete an English menu item
- Method: `DELETE`
- URL: `/menu/en/delete`
- Request body:
  ```json
  {
    "name": "Dish Name"
  }
  ```
- Response:
  ```json
  {
    "status": 200
  }
  ```
- Error when the dish cannot be found: `404`.

### 7. Add a French menu item
- Method: `POST`
- URL: `/menu/fr/add`
- Request body must include the required fields (from `menu_EN.json` sample):
  - `name` (string)
  - `image` (string)
  - `ingredients` (array)
  - `allergens` (array)
  - `footprint` (number)
  - `category` (string)
  - `price` (number)
  - `vegetarian` (boolean)
- The image link is relative !
- Example request:
  ```json
  {
    "name": "New Dish",
    "image": "/data/images/new.jpg",
    "ingredients": ["item1", "item2"],
    "allergens": ["milk"],
    "footprint": 2.1,
    "category": "main",
    "price": 14.5,
    "vegetarian": false
  }
  ```
- Response:
  ```json
  {
    "status": 200
  }
  ```
- Validation:
  - `ingredients` must be an array
  - `price` must be a number
  - missing fields return `400`

### 8. Add an English menu item
- Method: `POST`
- URL: `/menu/en/add`
- Request body: same shape as `/menu/fr/add`
- Response:
  ```json
  {
    "status": 200
  }
  ```
- Same validation rules apply.

### 9. Get French dish by name
- Method: `GET`
- URL: `/menu/fr/name/:name`
- Example: `/menu/fr/name/Caesar%20Salad`
- Response:
  ```json
  {
    "status": 200,
    "dish": {
      "name": "Caesar Salad",
      "image": "...",
      "ingredients": [...],
      "allergens": [...],
      "footprint": ...,
      "category": "salad",
      "price": ...,
      "vegetarian": true
    }
  }
  ```
- Error when not found: `404`.

### 10. Get English dish by name
- Method: `GET`
- URL: `/menu/en/name/:name`
- Example: `/menu/en/name/Grilled%20Salmon` (space must be encoded)

---

## User Authentication Endpoint

### Authenticate user
- Method: `POST`
- URL: `/user/authenticate`
- Request body:
  ```json
  {
    "username": "user1",
    "pwd": "password123"
  }
  ```
- Response on success:
  ```json
  {
    "status": 200
  }
  ```
- Errors:
  - `400` if `username` or `pwd` is missing
  - `401` if credentials are invalid
- Note: There is no token issued; the endpoint only verifies username and password.

---

## Backend notes for frontend
- All menu routes are mounted under `/menu`.
- The auth route is mounted under `/user`.
- Add/delete endpoints expect JSON request bodies.
- `GET` endpoints use route parameters for category and name.
- The backend reads and writes JSON files in `server/data/`.

## Updates to come
- Add token authorization for user authentication and maintain a cookie for each user session
