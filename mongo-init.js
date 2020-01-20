db.auth('root', 'secret')

db.createUser({
  user: 'admin',
  pwd: 'secret',
  roles: [
    {
      role: 'readWrite',
      db: 'auth'
    }
  ]
})
