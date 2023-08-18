import { useRef, useState } from 'react'
import classes from './auth-form.module.css'

async function createUser(email, password) {
	const response = await fetch('/api/auth/signup', {
		method: 'POST',
		body: JSON.stringify({ email, password }),
		headers: {
			'Content-Type': 'application/json',
		},
	})

	const data = await response.json()
	if (!response.ok) {
		throw new Error(data.message || 'Something went wrong!')
	}
	return data
}

function AuthForm() {
	const [isLogin, setIsLogin] = useState(true)
	const email = useRef('')
	const password = useRef('')

	function switchAuthModeHandler() {
		setIsLogin((prevState) => !prevState)
	}

	async function submitHandler(event) {
		event.preventDefault()

		const emailEntered = email.current.value
		const passwordEntered = password.current.value

		// add validation (optional)

		if (isLogin) {
			// log user in
		} else {
			try {
				const result = await createUser(emailEntered, passwordEntered)
				console.log(result)
				alert(result.message)
			} catch (err) {
				console.log(err)
			}
		}
	}

	const [title, login, create] = (() => {
		if (isLogin) return ['Login', 'Login', 'Create new account']
		return ['Sign Up', 'Create Account', 'Login with existing account']
	})()

	return (
		<section className={classes.auth}>
			<h1>{title}</h1>
			<form>
				<div className={classes.control}>
					<label htmlFor='email'>Your Email</label>
					<input type='email' id='email' required ref={email} />
				</div>
				<div className={classes.control}>
					<label htmlFor='password'>Your Password</label>
					<input type='password' id='password' required ref={password} />
				</div>
				<div className={classes.actions}>
					<button onClick={submitHandler}>{login}</button>
					<button
						type='button'
						className={classes.toggle}
						onClick={switchAuthModeHandler}
					>
						{create}
					</button>
				</div>
			</form>
		</section>
	)
}

export default AuthForm
