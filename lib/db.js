import { MongoClient } from 'mongodb'

export async function connectToDB() {
	const client = await MongoClient.connect(
		'mongodb+srv://dbuser:vp4PMItUzA7P4HOC@cluster0.gjftkdu.mongodb.net/auth-demo?retryWrites=true&w=majority'
	)

	return client
}
