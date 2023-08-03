import { useRef, useState } from 'react'

function HomePage() {
	const emailVal = useRef()
	const feedbackVal = useRef()
	const [arr, setArr] = useState([])

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

	const handleClick = () => {
		fetch('/api/feedback')
			.then((a) => a.json())
			.then((a) => setArr(a))
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
			<hr></hr>
			<button onClick={handleClick}> Get Data </button>
			<ul>
				{arr.map(({ id, email, text }) => (
					<li key={id} style={{ display: 'flex', gap: 20 }}>
						<div>{id}</div>
						<div>{email}</div>
						<div>{text}</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export default HomePage
