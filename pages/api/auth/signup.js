import { connectToDB, hashPassword } from '../../../lib'

async function handler(req, res) {
	if (req.method !== 'POST') return
	const data = req.body

	const { email, password } = data

	if (!email?.includes('@') || !password || password.trim().length < 7) {
		const message = 'Invalid input - Password should be at least 7 characters.'
		return res.status(422).json({ message })
	}
	const hashedPassword = await hashPassword(password)

	const client = await connectToDB()
	const db = client.db()
	await db.collection('users').insertOne({ email, password: hashedPassword })

	res.status(201).json({ message: 'Created User' })
}

export default handler
