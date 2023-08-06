import { MongoClient } from 'mongodb'

async function storeToDataBase(email) {
  const client = await MongoClient.connect(
    'mongodb+srv://dbuser:VupAGEY5JlgRluRk@cluster0.gjftkdu.mongodb.net/newsletter?retryWrites=true&w=majority'
  )

  const db = client.db()
  await db.collection('emails').insertOne({ email })
  client.close()
}

async function handle(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' })
      return
    }

    await storeToDataBase(email)

    res.status(201).json({ message: 'Signed up!' })
  }
}

export default handle
