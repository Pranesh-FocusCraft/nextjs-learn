import { useState } from 'react'
import { getData } from './api/feedback'

function HomePage({ data }) {
	const [idData, setIdData] = useState({})

	const handleClick = (id) => () => {
		fetch('/api/' + id)
			.then((a) => a.json())
			.then((a) => setIdData((prev) => ({ ...prev, [id]: a })))
	}

	return (
		<>
			<h1>The Feedback Page</h1>
			<ul>
				{data.map(({ id }) => (
					<li key={id} style={{ display: 'flex', gap: 20 }}>
						<div>{id}</div>
						<button onClick={handleClick(id)}> Get Id Data</button>
						{idData[id] ? (
							<>
								<div>{idData[id].email}</div>
								<div>{idData[id].text}</div>
							</>
						) : null}
					</li>
				))}
			</ul>
		</>
	)
}

export async function getStaticProps() {
	const { data } = getData()
	return { props: { data } }
}

export default HomePage
