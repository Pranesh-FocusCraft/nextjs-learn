import { useRef } from 'react'
import classes from './newsletter-registration.module.css'

function NewsletterRegistration() {
	const email = useRef()

	function registrationHandler(event) {
		event.preventDefault()

		const emailval = email.current.value

		fetch('/api/newsletter', {
			method: 'POST',
			body: JSON.stringify({ email: emailval }),
			// if headers not mentioned, the 'req.body' in api/newsletter will
			// be string , so have to do JSON.parse for that
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((a) => a.json())
			.then((a) => console.log(a))
	}

	return (
		<section className={classes.newsletter}>
			<h2>Sign up to stay updated!</h2>
			<form>
				<div className={classes.control}>
					<input
						type='email'
						id='email'
						placeholder='Your email'
						aria-label='Your email'
						ref={email}
					/>
					<button onClick={registrationHandler}>Register</button>
				</div>
			</form>
		</section>
	)
}

export default NewsletterRegistration
