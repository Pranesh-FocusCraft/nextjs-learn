import { storeToDataBase, getFromDataBase } from '../../../DB/mongodb'

async function getCommentData(eventId, res) {
  const response = await getFromDataBase('comments', eventId)
  if (typeof response === 'string') {
    return res.status(500).json({ message: response })
  }
  res.status(201).json(response)
}

async function postCommentData(
  eventId,
  res,
  { body: { email, name, comment } }
) {
  if (!email.trim().includes('@') || !name.trim() || !comment.trim()) {
    res.status(422).json({ message: 'Invalid input' })
    return
  }

  const newComment = { eventId, email, name, comment }
  const response = await storeToDataBase('comments', newComment)
  if (typeof response === 'string') {
    return res.status(500).json({ message: response })
  }
  newComment.id = response.insertedId.toString()

  res.status(201).json({ message: 'Comment added!', newComment })
}

function handle(req, res) {
  const eventId = req.query.eventId
  if (req.method === 'POST') return postCommentData(eventId, res, req)
  if (req.method === 'GET') return getCommentData(eventId, res)
  res.status(201).json({ message: 'Works!' })
}

export default handle
