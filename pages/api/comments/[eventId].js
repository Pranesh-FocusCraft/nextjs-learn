import fs from 'fs'
import path from 'path'

export const getData = () => {
  const filePath = path.join(process.cwd(), 'data', 'comments.json')
  const fileData = fs.readFileSync(filePath)
  return { filePath, data: JSON.parse(fileData) }
}

function getCommentData(eventId, res) {
  const { data } = getData()
  res.status(201).json(data[eventId] ?? [])
}

function postCommentData(eventId, res, { body: { email, name, comment } }) {
  if (!email.trim().includes('@') || !name.trim() || !comment.trim()) {
    res.status(422).json({ message: 'Invalid input' })
    return
  }

  const newComment = { time: new Date().toISOString(), email, name, comment }

  const { filePath, data } = getData()
  data[eventId] ??= []
  data[eventId].push(newComment)

  fs.writeFileSync(filePath, JSON.stringify(data))

  res.status(201).json({ message: 'Comment added!', newComment })
}

function handle(req, res) {
  const eventId = req.query.eventId
  if (req.method === 'POST') return postCommentData(eventId, res, req)
  if (req.method === 'GET') return getCommentData(eventId, res)
  res.status(201).json({ message: 'Works!' })
}

export default handle
