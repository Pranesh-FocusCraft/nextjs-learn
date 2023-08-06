import { MongoClient } from 'mongodb'

export async function storeToDataBase(collectionName, data) {
  const client = await MongoClient.connect(
    'mongodb+srv://dbuser:VupAGEY5JlgRluRk@cluster0.gjftkdu.mongodb.net/events?retryWrites=true&w=majority'
  )

  const db = client.db()
  const res = await db.collection(collectionName).insertOne(data)
  client.close()
  return res
}

async function handle(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' })
      return
    }

    await storeToDataBase('newsletter', { email })

    res.status(201).json({ message: 'Signed up!' })
  }
}

export default handle
