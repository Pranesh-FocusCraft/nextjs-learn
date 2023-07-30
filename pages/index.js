import { useRef } from 'react'

function HomePage() {
	const emailVal = useRef()
	const feedbackVal = useRef()

	const handleSubmit = (event) => {
		event.preventDefault()

		const email = emailVal.current.value
		const feedbacktext = feedbackVal.current.value

		const data = { email, feedbacktext }

		fetch('/api/feedback', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((a) => a.json())
			.then((a) => console.log(a))
	}

	return (
		<div>
			<h1>The Home Page</h1>
			<form>
				<div>
					<label htmlFor='email'> Your Email Address </label>
					<input type='email' id='email' ref={emailVal} />
				</div>
				<div>
					<label htmlFor='feedback'> Your Feedback </label>
					<textarea id='feedback' rows='1' ref={feedbackVal} />
				</div>
				<button onClick={handleSubmit}> Send Feedback</button>
			</form>
		</div>
	)
}

export default HomePage
