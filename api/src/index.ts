import express, { json } from 'express'

const app = express()

app.use(json())

app.get('/', (req, res) => {
  res.json({ message: 'OK' })
})

app.listen(4000, () => console.log(`API is running at http://localhost:${4000}/`))
