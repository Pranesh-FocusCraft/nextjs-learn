import fs from 'fs'
import path from 'path'

export const getData = () => {
	const filePath = path.join(process.cwd(), 'data', 'feedback.json')
	const fileData = fs.readFileSync(filePath)
	return { filePath, data: JSON.parse(fileData) }
}

function handler(req, res) {
	if (req.method === 'POST') {
		const email = req.body.email
		const feedbackText = req.body.feedbacktext

		const newFormData = {
			id: new Date().toISOString(),
			email,
			text: feedbackText,
		}

		const { data, filePath } = getData()
		data.push(newFormData)
		fs.writeFileSync(filePath, JSON.stringify(data))
		res.status(201).json(newFormData)
	} else if (req.method === 'GET') {
		const { data } = getData()
		res.status(201).json(data)
	} else {
		res.status(200).json('This works')
	}
}

export default handler
