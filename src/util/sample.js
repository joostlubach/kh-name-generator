export default function sample(array, length = 1) {
	if (array.length === 0) { return null }

	if (length === 1) {
		const index = Math.floor(Math.random() * array.length)
		return array[index]
	} else {
		const copy = [...array]
		const result = []
		for (let i = 0; i < length && copy.length > 0; i++) {
			const index = Math.floor(Math.random() * array.length)
			result.push(array.splice(index, 1))
		}
		return result
	}
}