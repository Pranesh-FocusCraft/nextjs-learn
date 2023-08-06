import fs from 'fs'
import path from 'path'
import { storeToDataBase } from '../newsletter'

export const getData = () => {
  const filePath = path.join(process.cwd(), 'data', 'comments.json')
  const fileData = fs.readFileSync(filePath)
  return { filePath, data: JSON.parse(fileData) }
}

function getCommentData(eventId, res) {
  const { data } = getData()
  res.status(201).json(data[eventId] ?? [])
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
