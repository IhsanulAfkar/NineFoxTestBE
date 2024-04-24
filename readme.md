# NineFoxLab Technical Case Study
## Usage
To use this repo, run these commands:
```
npm i
npm run dev
// or
npm run build
npm start
```

## Tech Stacks
This project is build using
- Express JS
- Typescript
- Prisma & PostgreSQL

## API

### Create User

`POST /users`

<b>Body (FormData)</b>

| Name       | Type   |
|------------|--------|
| `username` | string (unique) |           
| `email`    | string (unique) |       
| `phone`   | string  (unique) |
| `password` | string |            
| `confirmPassword` | string |            
| `category` | string |            
| `description`   | string   |
| `media`   | file (optional)   |


<b>Success Response</b>

Status:200

```json
{ "message": "User created successfully" }
```

<b>Failed Response </b>

Status: 404

```json
{
    "error": {
        "phone": "phone number must be numeric",
        "category": "Invalid category",
        "username": "Username already taken",
        "email": "Email already taken"
    }
}
```

### Get All Users

`GET /users`

<b>Response</b>

Status 200


```json
[
    {
        "pkId": 3,
        "id": "737d3ce4-a19d-4f7e-8d93-97cc5b6bfea0",
        "username": "inmydream1",
        "email": "example@gmail.com",
        "phone": "08xxxxxxxxx",
        "category": "Food & Cooking",
        "description": "description",
        "media": "media/1713981774872-427134697.png"
    }
]
```