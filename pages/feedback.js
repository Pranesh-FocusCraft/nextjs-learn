import { getData } from './api/feedback'

function HomePage({ data }) {
	return (
		<>
			<h1>The Feedback Page</h1>
			<ul>
				{data.map(({ id, email, text }) => (
					<li key={id} style={{ display: 'flex', gap: 20 }}>
						<div>{id}</div>
						<div>{email}</div>
						<div>{text}</div>
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
