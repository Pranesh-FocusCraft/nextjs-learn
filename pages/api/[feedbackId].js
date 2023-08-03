import { getData } from './feedback'

function handler(req, res) {
	if (req.method === 'GET') {
		const feedbackId = req.query.feedbackId
		const { data } = getData()
		res.status(201).json(data.find(({ id }) => id === feedbackId))
	} else {
		res.status(200).json('This works')
	}
}

export default handler
