# nextjs-app

## MVP

User
- Can register
- Can login
- Can logout
- Can view/create/update/delete posts
- Can bookmark posts

```sh

curl -v -X POST localhost:4000/register -H "Content-Type:application/json" -d "{\"name\":\"Arthur\",\"email\":\"arthur@gmail.com\",\"password\":\"Secret12\",\"passwordConfirmation\":\"Secret12\"}"

```