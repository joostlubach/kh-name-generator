export default function shuffle(array) {
	const copy = [...array]
	const result = []

	while (copy.length > 0) {
		const index = Math.floor(Math.random() * copy.length)
		result.push(copy.splice(index, 1))
	}

	return result
}