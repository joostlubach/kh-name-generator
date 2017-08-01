export default function namePrefix(name) {
	// Find first cluster of consonents after a vowel.
	const match = name.match(/[aeiuo\u00C0-\u017F]+?[^aeiou\u00C0-\u017F]+/i)
	console.log(match)

	if (match == null) {
		return name
	}

	return name.slice(0, match.index + match[0].length)
}