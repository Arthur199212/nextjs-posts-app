# nextjs-app

### :construction: under construction

API
- [x] Can register
- [x] Can login
- [x] Can logout
- [x] Can view/create/update/delete posts
- [ ] Can bookmark posts

```sh

# Register
curl -v -X POST localhost:4000/register -H "Content-Type:application/json" -d "{\"name\":\"Arthur\",\"email\":\"arthur@gmail.com\",\"password\":\"Secret12\",\"passwordConfirmation\":\"Secret12\"}"

# Login
curl -v -X POST localhost:4000/login -H "Content-Type:application/json" -d "{\"email\":\"arthur@gmail.com\",\"password\":\"Secret12\"}"

# Logout
curl -v -X POST localhost:4000/logout --cookie "sid=s%3A8vDQNisgzetBC_GGcGjg5TG0mhFHw3XF.esGhOENn%2FjQCiaoIhxKEJHuhbFBAjdZEApsoZvrfh2s"

```

```sh

docker exec -it nextjs-app_db_1 mongo -u admin -p secret auth

```

## Technologies

### Back-End

- Node + Express
- GraphQL + Apollo Server
- express-session + Redis
- MongoDB + Mongoose

### Front-End

- Next.js + React 16.8+
- Redux
- TypeScript
- Apollo Client
- Material-UI

### DevOps
- Docker
