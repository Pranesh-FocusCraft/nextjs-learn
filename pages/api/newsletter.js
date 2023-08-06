import { storeToDataBase } from '../../DB/mongodb'

async function handle(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' })
      return
    }

    const response = await storeToDataBase('newsletter', { email })
    if (typeof response === 'string') {
      return res.status(500).json({ message: response })
    }
    res.status(201).json({ message: 'Signed up!' })
  }
}

export default handle
