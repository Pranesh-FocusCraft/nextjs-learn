import { MongoClient } from 'mongodb'

async function connectToDB() {
  let client
  try {
    client = await MongoClient.connect(
      'mongodb+srv://dbuser:VupAGEY5JlgRluRk@cluster0.gjftkdu.mongodb.net/events?retryWrites=true&w=majority'
    )
  } catch (err) {
    return 'Connnecting to the DataBase Failed!'
  }
  try {
    return { client, db: client.db() }
  } catch (err) {
    return 'Create a new Db instance failed!'
  }
}

export async function storeToDataBase(collectionName, data) {
  const response = await connectToDB()
  if (typeof response === 'string') return response
  const { client, db } = response
  const res = await db.collection(collectionName).insertOne(data)
  client.close()
  return res
}

export async function getFromDataBase(collectionName, filterParam) {
  const response = await connectToDB()
  if (typeof response === 'string') return response
  const { client, db } = response
  const documents = await db
    .collection(collectionName)
    .find({ eventId: filterParam }) // if no param sends all data
    .sort({ _id: -1 }) // param should be the sorting data and -1 sorts descending and thus now gives latest data
    .toArray() // to convert to array since default doesnt give array

  client.close()
  return documents
}
