function handle(req, res) {
	const evenId = req.query.evenId
	if (req.method === 'POST') {
		const { email, name, comment } = req.body

		if (!email.trim().includes('@') || !name.trim() || !comment.trim()) {
			res.status(422).json({ message: 'Invalid input' })
			return
		}

		const newComment = { id: new Date().toISOString(), email, name, comment }

		res.status(201).json({ message: 'Comment added!', newComment })
		return
	}

	if (req.method === 'GET') {
		const comments = [
			{
				id: 'c1',
				email: 'email1@email.com',
				name: 'name1',
				comment: 'comment1',
			},
			{
				id: 'c1',
				email: 'email1@email.com',
				name: 'name1',
				comment: 'comment1',
			},
		]

		res.status(201).json({ comments })
		return
	}
}

export default handle
