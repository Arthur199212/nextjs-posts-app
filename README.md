# nextjs-app

## MVP

User
- Can register
- Can login
- Can logout
- Can view/create/update/delete posts
- Can bookmark posts

```sh

# Register
curl -v -X POST localhost:4000/register -H "Content-Type:application/json" -d "{\"name\":\"Arthur\",\"email\":\"arthur@gmail.com\",\"password\":\"Secret12\",\"passwordConfirmation\":\"Secret12\"}"

# Login
curl -v -X POST localhost:4000/login -H "Content-Type:application/json" -d "{\"email\":\"arthur@gmail.com\",\"password\":\"Secret12\"}"

```

```sh

docker exec -it nextjs-app_db_1 mongo -u admin -p secret auth

```
