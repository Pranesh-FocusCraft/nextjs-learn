import fs from 'fs'
import path from 'path'

function handler(req, res) {
	if (req.method === 'POST') {
		const email = req.body.email
		const feedbackText = req.body.feedbacktext

		const newFormData = {
			id: new Date().toISOString(),
			email,
			text: feedbackText,
		}

		const filePath = path.join(process.cwd(), 'data', 'feedback.json')
		const fileData = fs.readFileSync(filePath)
		const data = JSON.parse(fileData)
		data.push(newFormData)
		fs.writeFileSync(filePath, JSON.stringify(data))
		res.status(201).json({ message: 'Success!', feedback: newFormData })
	} else {
		res.status(200).json({ message: 'This works' })
	}
}

export default handler
