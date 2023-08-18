import { connectToDB, hashPassword } from '../../../lib'

async function handler(req, res) {
	if (req.method !== 'POST') return
	const data = req.body

	const { email, password } = data

	if (!email?.includes('@') || !password || password.trim().length < 7) {
		const message = 'Invalid input - Password should be at least 7 characters.'
		return res.status(422).json({ message })
	}

	const client = await connectToDB()
	const db = client.db()

	const existingemail = await db.collection('users').findOne({ email })

	if (existingemail) {
		client.close()
		const message = 'User already exist'
		return res.status(422).json({ message })
	}

	const hashedPassword = await hashPassword(password)

	await db.collection('users').insertOne({ email, password: hashedPassword })
	client.close()
	res.status(201).json({ message: 'Created User' })
}

export default handler
