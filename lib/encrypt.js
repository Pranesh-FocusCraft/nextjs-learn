import { hash } from 'bcryptjs'

export async function hashPassword(password) {
	const hashed = await hash(password, 12)
	return hashed
}
