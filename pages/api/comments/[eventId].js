import { storeToDataBase } from '../newsletter'
import { MongoClient } from 'mongodb'

export async function getFromDataBase(collectionName, filterParam) {
  const client = await MongoClient.connect(
    'mongodb+srv://dbuser:VupAGEY5JlgRluRk@cluster0.gjftkdu.mongodb.net/events?retryWrites=true&w=majority'
  )

  const db = client.db()
  const documents = await db
    .collection(collectionName)
    .find({ eventId: filterParam }) // if no param sends all data
    .sort({ _id: -1 }) // param should be the sorting data and -1 sorts descending and thus now gives latest data
    .toArray() // to convert to array since default doesnt give array

  client.close()
  return documents
}

async function getCommentData(eventId, res) {
  const data = await getFromDataBase('comments', eventId)
  res.status(201).json(data)
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
